import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import styles from "./App.module.css";
import Card from "./components/molecules/Card";
import Layout from "./components/templates/Layout";
import CardHeader from "./components/atoms/CardHeader";
import CardBody from "./components/atoms/CardBody";
import {
  formatDateToPtBr,
  getPtBrWeekDay,
  parseDatetimeFromPtBR,
} from "./utils/date";
import CardFooter from "./components/atoms/CardFooter";
import Button from "./components/atoms/Button";
import EventForm from "./components/templates/EventForm";
import { useCallback, useEffect, useState } from "react";
import Event, { eventTypeToString } from "./models/event";
import Schedule from "./models/schedule";
import { getSchedule } from "./integrations/ipanemaboxapi";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [schedule, setSchedule] = useState<Schedule>({});

  const newEventOnClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const modalCloseOnClick = useCallback(() => {
    setShowModal(false);
  }, []);

  const saveOnClick = useCallback((event: Event) => {
    const datetime = new Date(event.datetime);
    datetime.setHours(0, 0, 0, 0);

    const scheduleDay = schedule[formatDateToPtBr(datetime)];
    if (scheduleDay) {
      scheduleDay.push(event);
      setSchedule({ ...schedule });
    }

    setShowModal(false);
  }, [schedule]);

  useEffect(() => {
    setSchedule(getSchedule());

    return () => {
      setSchedule({});
    };
  }, []);

  return (
    <Layout>
      <Card>
        <CardHeader className={styles.header}>
          <span className={styles.title}>
            <CalendarMonthRoundedIcon />
            <h1>Agenda</h1>
          </span>
          <Button type="primary" onClick={newEventOnClick}>
            Novo evento
          </Button>
        </CardHeader>
        <CardBody>
          <div className={styles.container}>
            <div className={styles.content}>
              {Object.entries(schedule)?.map(([date, events], i) => {
                let cls = [styles.weekday];

                const curDatetime = parseDatetimeFromPtBR(date);
                if (curDatetime.getDate() === new Date().getDate()) {
                  cls.push(styles.currentDate);
                }

                return (
                  <div key={`day_${i}`} className={cls.join(" ")}>
                    <header>
                      <span className={styles.weekday}>
                        {getPtBrWeekDay(curDatetime.getDay())}
                      </span>
                      <span className={styles.day}>
                        {curDatetime.getDate()}
                      </span>
                    </header>
                    {events?.map((event, j) => (
                      <div
                        key={`schedule_${i}_${j}`}
                        className={styles.content}
                      >
                        <h3>
                          {event.datetime
                            .getHours()
                            .toString()
                            .padStart(2, "0")}
                          :
                          {event.datetime
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}{" "}
                          - {eventTypeToString(event.type)}
                        </h3>
                        <span>{event.description}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </CardBody>
        <CardFooter className={styles.footer}></CardFooter>
      </Card>
      <EventForm
        show={showModal}
        modalCloseOnClick={modalCloseOnClick}
        saveOnClick={saveOnClick}
      />
    </Layout>
  );
}
