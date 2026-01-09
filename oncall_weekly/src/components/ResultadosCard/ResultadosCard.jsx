import "../../style/resultCard.css";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";

function ResultadosCard({ asignaciones, setAsignaciones }) {
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO + "T00:00:00");
    const opciones = { day: "numeric", month: "long" };
    const texto = fecha.toLocaleDateString("es-ES", opciones);
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (asignaciones) {
      setLoading(false);
    }
  }, [asignaciones]);

  const eliminarSemana = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el registro permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "asignaciones", id));

        setAsignaciones(asignaciones.filter((a) => a.id !== id));

        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "La semana fue eliminada correctamente.",
          timer: 1800,
          showConfirmButton: false,
        });
      }
    });
  };
  if (loading) return <Loading />;

  return (
    <div className="resultados-card">
      <div className="title">
        <h2>
          <i className="fa-solid fa-laptop"></i> On-Call
        </h2>
      </div>

      {asignaciones.length === 0 ? (
        <p className="vacio">No hay registros aún.</p>
      ) : (
        <div className="table-wrapper">
          <table className="shuffle-table">
            <thead>
              <tr>
                <th>Switch</th>
                <th>Core</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Eliminar</th>
              </tr>
            </thead>

            <tbody>
              {asignaciones.map((semana) => (
                <tr key={semana.id}>
                  <td data-label="Switch">{semana.switch}</td>
                  <td data-label="Core">{semana.core}</td>
                  <td data-label="Desde">{formatearFecha(semana.inicio)}</td>
                  <td data-label="Hasta">{formatearFecha(semana.fin)}</td>
                  <td data-label="Acción">
                    <button
                      className="button"
                      onClick={() => eliminarSemana(semana.id)}
                      aria-label="Eliminar semana"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ResultadosCard;
