import Layout from "../../templates/Layout";

interface Schedule {
  weekday: string;
  day: number;
  events: {
    id: number;
    datetime: Date;
    type: "Orçamento" | "Serviço" | "Manutenção";
    customer: {
      id: number;
      name: string;
      address: string;
    };
  }[];
}

export default function Home() {
  const today = new Date();

  const schedules: Schedule[] = [];
  const columns = 3;
  for (let i = 0; i < columns; i += 1) {
    const now = new Date(today);
    now.setDate(now.getDate() + i);

    schedules.push({
      weekday: getWeekday(now.getDay()),
      day: now.getDate(),
      events: [],
    });
  }

  schedules[0].events.push({
    id: 1,
    datetime: new Date(2023, 3, 15, 10, 0),
    type: "Orçamento",
    customer: { id: 1, name: "John Doe", address: "R. A 123" },
  });

  return (
    <Layout>
      <header>
        <h2>Agenda</h2>
        <div>
          <a href="/eventos/novo">Novo evento</a>
        </div>
      </header>

      <div className="schedule">
        {schedules.map(({ weekday, day, events }, i: number) => (
          <div key={`schedule_${i}`}>
            <header>
              <span>{weekday}</span>
              <span>{day}</span>
            </header>
            <ul>
              {events.map(({ id, datetime, type, customer }) => (
                <li key={`event_${id}`}>
                  <span>
                    [{getTime(datetime)}] {type}
                  </span>
                  <span>{customer.address}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );

  function getWeekday(day: number): string {
    return ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][day];
  }

  function getTime(datetime: Date): string {
    const hours = datetime.getHours().toString().padStart(2, "0");
    const minutes = datetime.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }
}
