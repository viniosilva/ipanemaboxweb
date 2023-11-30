import { BaseSyntheticEvent } from "react";
import concatClassNames from "../../utils/concatClassNames";
import styles from "./button.module.css";
import { Link } from "react-router-dom";

type ButtonType = "button" | "submit";
type ButtonCategory =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface Props {
  category: ButtonCategory;
  children: string | JSX.Element | JSX.Element[];
  classname?: string;
  type?: ButtonType;
  to?: string;
  onClick?: (e: BaseSyntheticEvent) => void;
}

export default function Button({
  category,
  children,
  classname,
  type,
  to,
  onClick,
}: Props) {
  const cls = concatClassNames([classname, styles.button, styles[category]]);

  if (to) {
    return (
      <Link className={cls} to={to}>
        {children}
      </Link>
    );
  }

  if (type === "submit") {
    return <input type="submit" className={cls} value={String(children)} />;
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
