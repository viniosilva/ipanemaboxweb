import concatClassNames from "../../utils/concatClassNames";
import styles from "./sectionBox.module.css";

interface Props {
  classname?: string;
  children?: JSX.Element | JSX.Element[];
}

export default function SectionBox({ classname, children }: Props) {
  const cls = concatClassNames([classname, styles.sectionBox]);

  return <section className={cls}>{children}</section>;
}
