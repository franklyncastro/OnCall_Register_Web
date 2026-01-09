import { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "./ResultadosCard.module.css";

function ResultadosCard({ asignaciones, setAsignaciones }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (asignaciones) {
      setLoading(false);
    }
  }, [asignaciones]);

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO + "T00:00:00");
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    });
  };

  const eliminarSemana = (id) => {
    Swal.fire({
      title: "¿Eliminar semana?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "asignaciones", id));

        setAsignaciones((prev) => prev.filter((a) => a.id !== id));

        Swal.fire({
          icon: "success",
          title: "Eliminado",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>OnCall Registrados</h2>

      {asignaciones.length === 0 ? (
        <p className={styles.empty}>No hay registros aún.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Switch</th>
              <th>Core</th>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map((s) => (
              <tr key={s.id}>
                <td>{s.switch}</td>
                <td>{s.core}</td>
                <td>{formatearFecha(s.inicio)}</td>
                <td>{formatearFecha(s.fin)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => eliminarSemana(s.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ResultadosCard;
