import { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./toast.module.css";
import concatClassNames from "../../utils/concatClassNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faClose } from "@fortawesome/free-solid-svg-icons";

const TIMEOUT = 5000;
const TIMEOUT_CLOSE = 1000;

type ToastType = "success" | "warning" | "danger" | "info";

export interface Props {
  type: ToastType;
  message: string;
}

export default function Toast({ type, message }: Props) {
  const [visible, setVisible] = useState(false);
  const [ok, setOk] = useState(false);
  const [closed, setClosed] = useState(false);
  const cls = [styles.toast];

  useEffect(() => {
    setVisible(true);
    setOk(true);

    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setClosed(true);
      }, TIMEOUT_CLOSE);
    }, TIMEOUT);

    return () => {
      setVisible(false);
      setOk(true);
    };
  }, []);

  if (closed) {
    return <></>;
  }

  if (!visible) {
    cls.push(styles.invisible);
  }
  if (ok) {
    cls.push(styles.ok);
  }

  return (
    <div className={concatClassNames(cls)}>
      <div>
        <span>
          <FontAwesomeIcon icon={faCircleCheck} className={styles[type]} />
          {message}
        </span>
        <FontAwesomeIcon
          icon={faClose}
          className={styles.close}
          onClick={closeOnClick}
        />
      </div>
    </div>
  );

  function closeOnClick(e: BaseSyntheticEvent) {
    e.preventDefault();

    setVisible(false);
    setTimeout(() => {
      setClosed(true);
    }, TIMEOUT_CLOSE);
  }
}

interface ToastBoxProps {
  toasts?: JSX.Element[];
}
export function ToastBox({ toasts }: ToastBoxProps) {
  return <div className={styles.toastBox}>{toasts}</div>;
}

export function setToast(toast: Props) {
  localStorage.setItem("toast", JSON.stringify(toast));
}

export function getToast(setToasts: Dispatch<SetStateAction<JSX.Element[]>>) {
  const toastStr = localStorage.getItem("toast");
  if (!toastStr) return;
  localStorage.removeItem("toast");
  
  const toastProps = JSON.parse(toastStr);
  const toast = <Toast type={toastProps.type} message={toastProps.message} />
  setToasts([toast])
}
