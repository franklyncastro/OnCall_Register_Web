import styles from "./OnCallProximaCard.module.css";

function OnCallProximaCard({ asignaciones = [] }) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Calcular lunes de la PRÓXIMA semana
  const dia = hoy.getDay();
  const diffLunes = dia === 0 ? -6 : 1 - dia;
  const lunesProximo = new Date(hoy);
  lunesProximo.setDate(hoy.getDate() + diffLunes + 7); // +7 = próxima semana
  lunesProximo.setHours(0, 0, 0, 0);

  const domingoProximo = new Date(lunesProximo);
  domingoProximo.setDate(lunesProximo.getDate() + 6);
  domingoProximo.setHours(23, 59, 59, 999);

  const onCallProxima = asignaciones.find((a) => {
    const inicio = new Date(a.inicio + "T00:00:00");
    const fin = new Date(a.fin + "T23:59:59");
    return inicio <= domingoProximo && fin >= lunesProximo;
  });

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO + "T00:00:00");
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const enviarPorCorreo = () => {
    if (!onCallProxima) return;

    const desde = formatearFecha(onCallProxima.inicio);
    const hasta = formatearFecha(onCallProxima.fin);

    const asunto = `OnCall de la Semana: ${desde} - ${hasta}`;

    const cuerpo = `
Equipo,

A continuación el detalle del OnCall asignado para la próxima semana:

━━━━━━━━━━━━━━━━━━━━━━━━
ONCALL DE LA SEMANA
━━━━━━━━━━━━━━━━━━━━━━━━

🔹 Switch
   Nombre:       ${onCallProxima.switch}
   Departamento: Switch

🔹 Core
   Nombre:       ${onCallProxima.core}
   Departamento: Core

📅 Período
   Desde: ${desde}
   Hasta: ${hasta}

━━━━━━━━━━━━━━━━━━━━━━━━

Ante cualquier incidencia durante este período, contactar al personal indicado.

Saludos,
Core Network App
    `.trim();

    const mailtoLink = `mailto:?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={styles.card}>
      <p className={styles.title}>OnCall próxima semana</p>

      {onCallProxima ? (
        <>
          <div className={styles.item}>
            <span className={styles.itemKey}>Switch</span>
            <span className={styles.itemVal}>
              {onCallProxima.switch}
              <span className={`${styles.badge} ${styles.badgeSwitch}`}>Switch</span>
            </span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemKey}>Core</span>
            <span className={styles.itemVal}>
              {onCallProxima.core}
              <span className={`${styles.badge} ${styles.badgeCore}`}>Core</span>
            </span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemKey}>Desde</span>
            <span className={styles.itemVal}>{formatearFecha(onCallProxima.inicio)}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.itemKey}>Hasta</span>
            <span className={styles.itemVal}>{formatearFecha(onCallProxima.fin)}</span>
          </div>

          <button className={styles.btnEmail} onClick={enviarPorCorreo}>
            <i className="fa-solid fa-envelope me-2"></i>
            Enviar OnCall por correo
          </button>
        </>
      ) : (
        <p className={styles.empty}>No hay OnCall registrado para la próxima semana.</p>
      )}
    </div>
  );
}

export default OnCallProximaCard;