import concatClassNames from "../../utils/concatClassNames";
import styles from "./formActions.module.css";

interface Props {
  classname?: string;
  children?: JSX.Element | JSX.Element[];
}

export default function FormActions({ classname, children }: Props) {
  const cls = concatClassNames([classname, styles.formActions]);

  return <div className={cls}>{children}</div>;
}
