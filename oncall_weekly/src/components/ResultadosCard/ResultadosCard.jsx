import "../../style/resultCard.css";
import Swal from "sweetalert2";

function ResultadosCard({ asignaciones, setAsignaciones }) {

  // 👉 Función para formatear fechas
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const opciones = { day: "numeric", month: "long" };
    let texto = fecha.toLocaleDateString("es-ES", opciones);

    // Capitalizar primera letra
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  // 👉 Eliminar semana con SweetAlert2
  const eliminarSemana = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el registro permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevas = asignaciones.filter((a) => a.id !== id);
        setAsignaciones(nuevas);

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

  return (
    <div className="resultados-card">
      
      <div className="title">
        <h2><i className="fa-etch fa-solid fa-laptop"></i> On-Call</h2>
      </div>

      {asignaciones.length === 0 ? (
        <p className="vacio">No hay registros aún.</p>
      ) : (
        <div className="container_card">

          {asignaciones.map((semana) => (
            <div className="semana-item" key={semana.id}>
              
              {/* 📅 Fechas */}
              <div className="semana-info">
                <span className="fechas">
                  <i className="fa-etch fa-solid fa-calendar"></i>
                  <br />
                  {formatearFecha(semana.inicio)} hasta {formatearFecha(semana.fin)}
                </span>
              </div>

              {/* 👤 Nombres por departamento */}
              <div className="departamentos">
                <div className="dep">
                  <strong>Switch:</strong> {semana.switch}
                </div>
                <div className="dep">
                  <strong>Core:</strong> {semana.core}
                </div>
              </div>

              {/* 🗑 Botón eliminar */}
              <button className="button" onClick={() => eliminarSemana(semana.id)}>
                <svg viewBox="0 0 448 512" className="svgIcon">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default ResultadosCard;
