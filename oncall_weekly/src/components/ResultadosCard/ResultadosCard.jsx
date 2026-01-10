import { Table, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import styles from "./ResultadosCard.module.css";

function ResultadosCard({ asignaciones, setAsignaciones, loading }) {
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO + "T00:00:00");
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    });
  };

  const eliminarSemana = (id) => {
    Swal.fire({
      title: "¿Eliminar OnCall?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
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
        <Table
          striped
          hover
          responsive
          className={styles.table}
        >
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
            {asignaciones.map((a) => (
              <tr key={a.id}>
                <td>{a.switch}</td>
                <td>{a.core}</td>
                <td>{formatearFecha(a.inicio)}</td>
                <td>{formatearFecha(a.fin)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => eliminarSemana(a.id)}
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
