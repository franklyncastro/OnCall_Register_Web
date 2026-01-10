import styles from "./OnCallActualCard.module.css";

function OnCallActualCard({ asignaciones = [] }) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // 🔹 Calcular lunes de la semana actual
  const dia = hoy.getDay(); // 0 = domingo, 1 = lunes
  const diffLunes = dia === 0 ? -6 : 1 - dia;

  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() + diffLunes);
  lunes.setHours(0, 0, 0, 0);

  // 🔹 Calcular domingo
  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);
  domingo.setHours(23, 59, 59, 999);

  // 🔹 Buscar OnCall de esta semana
  const onCallSemana = asignaciones.find((a) => {
    const inicio = new Date(a.inicio + "T00:00:00");
    const fin = new Date(a.fin + "T23:59:59");

    return inicio <= domingo && fin >= lunes;
  });

  return (
    <div className={styles.card}>
      <h3 className={styles.titleH3}>OnCall de la Semana</h3>

      {onCallSemana ? (
        <div className={styles.containerItems}>
          <p><strong>Switch:</strong> {onCallSemana.switch}</p>
          <p><strong>Core:</strong> {onCallSemana.core}</p>
          <p>
            <strong>Desde:</strong> {onCallSemana.inicio}
          </p>
          <p>
            <strong>Hasta:</strong> {onCallSemana.fin}
          </p>
        </div>
      ) : (
        <p className={styles.empty}>No hay OnCall asignado esta semana</p>
      )}
    </div>
  );
}

export default OnCallActualCard;
