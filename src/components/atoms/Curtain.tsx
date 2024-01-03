import concatClassNames from "../../utils/concatClassNames";
import styles from "./curtain.module.css";

interface Props {
  hidden?: boolean;
}

export default function Curtain({ hidden }: Props) {
  const cls = [styles.curtain];
  if (hidden) {
    cls.push(styles.hidden);
  }

  return <div className={concatClassNames(cls)} />;
}
