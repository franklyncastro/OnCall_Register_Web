import styles from "./OnCallActualCard.module.css";

function OnCallActualCard({ asignaciones = [] }) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const dia = hoy.getDay();
  const diffLunes = dia === 0 ? -6 : 1 - dia;
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() + diffLunes);
  lunes.setHours(0, 0, 0, 0);

  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);
  domingo.setHours(23, 59, 59, 999);

  const onCallSemana = asignaciones.find((a) => {
    const inicio = new Date(a.inicio + "T00:00:00");
    const fin = new Date(a.fin + "T23:59:59");
    return inicio <= domingo && fin >= lunes;
  });

  return (
    <div className={styles.card}>
      <p className={styles.title}>OnCall esta semana</p>

      {onCallSemana ? (
        <>
          <div className={styles.item}>
            <span className={styles.itemKey}>Switch</span>
            <span className={styles.itemVal}>
              {onCallSemana.switch}
              <span className={`${styles.badge} ${styles.badgeSwitch}`}>Switch</span>
            </span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemKey}>Core</span>
            <span className={styles.itemVal}>
              {onCallSemana.core}
              <span className={`${styles.badge} ${styles.badgeCore}`}>Core</span>
            </span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemKey}>Desde</span>
            <span className={styles.itemVal}>{onCallSemana.inicio}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemKey}>Hasta</span>
            <span className={styles.itemVal}>{onCallSemana.fin}</span>
          </div>
        </>
      ) : (
        <p className={styles.empty}>No hay OnCall asignado esta semana.</p>
      )}
    </div>
  );
}

export default OnCallActualCard;