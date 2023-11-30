import concatClassNames from "../../utils/concatClassNames";
import styles from "./inputBox.module.css";

interface Props {
  classname?: string;
  children?: JSX.Element | JSX.Element[];
}

export default function InputBox({ classname, children }: Props) {
  const cls = concatClassNames([classname, styles.inputBox]);

  return <div className={cls}>{children}</div>;
}
