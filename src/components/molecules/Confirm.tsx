import { BaseSyntheticEvent } from "react";
import concatClassNames from "../../utils/concatClassNames";
import Button from "../atoms/Button";
import Curtain from "../atoms/Curtain";
import styles from "./confirm.module.css";

interface Props {
  text: string;
  onConfirm: (e: BaseSyntheticEvent) => void;
  onReject: (e: BaseSyntheticEvent) => void;
  hidden?: boolean;
}

export default function Confirm({ text, onConfirm, onReject, hidden }: Props) {
  const cls = [styles.confirm];

  if (hidden) {
    cls.push(styles.invisible);
  }

  return (
    <>
      <Curtain hidden={hidden} />
      <div className={concatClassNames(cls)}>
        <p>{text}</p>
        <div className={styles.actions}>
          <Button category="success" onClick={confirmOnClick}>
            Sim
          </Button>
          <Button category="danger" onClick={rejectOnClick}>
            Não
          </Button>
        </div>
      </div>
    </>
  );

  function confirmOnClick(e: BaseSyntheticEvent) {
    e.preventDefault();
    onConfirm(e);
    rejectOnClick(e);
  }

  function rejectOnClick(e: BaseSyntheticEvent) {
    e.preventDefault();
    onReject(e);
  }
}
