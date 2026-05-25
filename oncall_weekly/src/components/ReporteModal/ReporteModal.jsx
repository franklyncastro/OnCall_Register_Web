import styles from "./ReporteModal.module.css";

const CORE_TEAM = ["Anglis Mercedes", "Luis Feliz", "Rafael Humberto"];
const SWITCH_TEAM = ["Jose Suarez", "Franklyn Castro"];


const REFERENCIA = new Date("2026-05-19T00:00:00");
const CORE_REF_INDEX = 1;
const SWITCH_REF_INDEX = 0;

function getLunes(fecha) {
  const d = new Date(fecha);
  d.setHours(0, 0, 0, 0);
  const dia = d.getDay();
  const diff = dia === 0 ? -6 : 1 - dia;
  d.setDate(d.getDate() + diff);
  return d;
}

function getIndices(lunes) {
  const diffMs = lunes - REFERENCIA;
  const diffSemanas = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
  const coreIdx = ((CORE_REF_INDEX + diffSemanas) % CORE_TEAM.length + CORE_TEAM.length) % CORE_TEAM.length;
  const switchIdx = ((SWITCH_REF_INDEX + diffSemanas) % SWITCH_TEAM.length + SWITCH_TEAM.length) % SWITCH_TEAM.length;
  return { coreIdx, switchIdx };
}

const DIAS_CORE = ["Lun", "Mié"];
const DIAS_SWITCH = ["Mar", "Jue", "Vie"];
const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function ReporteModal({ onClose }) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const diaHoy = hoy.getDay(); // 0=dom, 1=lun...

  const lunes = getLunes(hoy);
  const { coreIdx, switchIdx } = getIndices(lunes);

  const personaCore = CORE_TEAM[coreIdx];
  const personaSwitch = SWITCH_TEAM[switchIdx];

  // ¿Hoy le toca a quién?
  const diaAbrev = DIAS_SEMANA[diaHoy];
  const hoyEsCore = DIAS_CORE.includes(diaAbrev);
  const hoyEsSwitch = DIAS_SWITCH.includes(diaAbrev);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Reporte de esta semana</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* CORE */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={`${styles.deptBadge} ${styles.core}`}>Core</span>
            <span className={styles.dias}>Lun · Mié</span>
          </div>
          <div className={`${styles.personaCard} ${hoyEsCore ? styles.hoy : ""}`}>
            <div className={styles.personaInfo}>
              <span className={styles.avatar}>
                {personaCore.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
              <span className={styles.nombre}>{personaCore}</span>
            </div>
            {hoyEsCore && (
              <span className={styles.hoyBadge}>🟢 Hoy le toca</span>
            )}
          </div>
        </div>

        {/* SWITCH */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={`${styles.deptBadge} ${styles.switchDept}`}>Switch</span>
            <span className={styles.dias}>Mar · Jue · Vie</span>
          </div>
          <div className={`${styles.personaCard} ${hoyEsSwitch ? styles.hoy : ""}`}>
            <div className={styles.personaInfo}>
              <span className={styles.avatar}>
                {personaSwitch.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
              <span className={styles.nombre}>{personaSwitch}</span>
            </div>
            {hoyEsSwitch && (
              <span className={styles.hoyBadge}>🟢 Hoy le toca</span>
            )}
          </div>
        </div>

        {/* Si hoy es fin de semana */}
        {!hoyEsCore && !hoyEsSwitch && (
          <p className={styles.finde}>No hay reporte hoy — fin de semana.</p>
        )}
      </div>
    </div>
  );
}

export default ReporteModal;