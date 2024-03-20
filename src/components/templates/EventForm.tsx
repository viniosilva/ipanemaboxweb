import { BaseSyntheticEvent, useState } from "react";
import { formatDatetimeToPtBr, parseDatetimeFromPtBR } from "../../utils/date";
import Button from "../atoms/Button";
import CardBody from "../atoms/CardBody";
import CardFooter from "../atoms/CardFooter";
import InputBox from "../atoms/InputBox";
import Form from "../molecules/Form";
import ModalCard from "../molecules/ModalCard";
import { applyMask } from "../../utils/mask";
import Event from "../../models/event";

interface Props {
  show: boolean;
  modalCloseOnClick: () => void;
  saveOnClick: (event: Event) => void;
}

export default function EventForm({
  show,
  modalCloseOnClick,
  saveOnClick,
}: Props) {
  const [datetime, setDatetime] = useState(formatDatetimeToPtBr(new Date()));
  const [event, setEvent] = useState({
    datetime: parseDatetimeFromPtBR(datetime),
  } as Event);

  return (
    <ModalCard show={show} closeOnClick={modalCloseOnClick} title="Novo evento">
      <CardBody>
        <Form>
          <InputBox>
            <label htmlFor="datetime">Data</label>
            <input
              type="text"
              name="datetime"
              value={datetime}
              onChange={(e: BaseSyntheticEvent) => {
                const datetime = applyMask("xx/xx/xxxx xx:xx", e.target.value);
                setDatetime(datetime);
                setEvent({
                  ...event,
                  datetime: parseDatetimeFromPtBR(datetime),
                });
              }}
              placeholder="xx/xx/xxxx xx:xx"
            />
          </InputBox>
          <InputBox>
            <label htmlFor="type">Tipo de evento</label>
            <select
              name="type"
              value={event.type}
              onChange={(e: BaseSyntheticEvent) =>
                setEvent({ ...event, type: e.target.value })
              }
            >
              <option value=""></option>
              <option value="orcamento">Orçamento</option>
              <option value="servico">Serviço</option>
              <option value="manutencao">Manutenção</option>
            </select>
          </InputBox>
          <InputBox>
            <label htmlFor="description">Descrição</label>
            <textarea
              name="description"
              placeholder="Descrição do evento..."
              onChange={(e: BaseSyntheticEvent) =>
                setEvent({ ...event, description: e.target.value })
              }
            ></textarea>
          </InputBox>
        </Form>
      </CardBody>
      <CardFooter>
        <Button type="neutral" onClick={modalCloseOnClick}>
          Cancelar
        </Button>
        <Button type="primary" onClick={() => saveOnClick(event)}>
          Salvar
        </Button>
      </CardFooter>
    </ModalCard>
  );
}
