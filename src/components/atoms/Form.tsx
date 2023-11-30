import { BaseSyntheticEvent } from "react";
import concatClassNames from "../../utils/concatClassNames";
import styles from "./form.module.css";

interface Props {
  onSubmit: (e: BaseSyntheticEvent) => void;
  classname?: string;
  children?: JSX.Element | JSX.Element[];
}

export default function Form({ onSubmit, classname, children }: Props) {
  const cls = concatClassNames([classname, styles.form]);

  return (
    <form className={cls} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
