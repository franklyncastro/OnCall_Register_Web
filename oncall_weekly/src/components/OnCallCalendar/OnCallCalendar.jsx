import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./OnCallCalendar.module.css";

function OnCallCalendar() {
  return (
    <div className={styles.calendarWrapper}>
      <Calendar />
    </div>
  );
}

export default OnCallCalendar;
