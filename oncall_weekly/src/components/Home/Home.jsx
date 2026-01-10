import OnCallActualCard from "../OnCallActualCard/OnCallActualCard";
import OnCallCalendar from "../OnCallCalendar/OnCallCalendar";
import styles from "./Home.module.css";

export default function Home({ asignaciones }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <OnCallActualCard asignaciones={asignaciones} />
      </div>

      <div className={styles.right}>
        <OnCallCalendar />
      </div>
    </div>
  );
}
