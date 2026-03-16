import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Table, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import styles from "./ResultadosCard.module.css";

function ResultadosCard({ asignaciones, setAsignaciones, loading }) {
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO + "T00:00:00");
    return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  const eliminarSemana = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ marginBottom: 8 }}>¿Eliminar este OnCall?</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={async () => {
                closeToast();
                await deleteDoc(doc(db, "asignaciones", id));
                setAsignaciones((prev) => prev.filter((a) => a.id !== id));
                toast.success("OnCall eliminado");
              }}
              style={{ background: '#e24b4a', color: 'white', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 12 }}
            >
              Eliminar
            </button>
            <button
              onClick={closeToast}
              style={{ background: 'transparent', border: '0.5px solid #9ca3af', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 12, color: 'inherit' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeButton: false }
    );
  };

  if (loading) return <div className={styles.loading}><Spinner animation="border" /></div>;

  return (
    <div className={styles.container}>
      <p className={styles.title}>OnCall Registrados</p>
      {asignaciones.length === 0 ? (
        <p className={styles.empty}>Aún no se ha registrado OnCall para esta semana.</p>
      ) : (
        <div className={styles.tableWrap}>
          <Table className={styles.table} style={{ marginBottom: 0 }}>
            <thead>
              <tr>
                <th>Switch</th><th>Core</th><th>Desde</th><th>Hasta</th><th>Acción</th>
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
                    <button className={styles.btn} onClick={() => eliminarSemana(a.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ResultadosCard;