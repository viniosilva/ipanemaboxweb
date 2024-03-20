import styles from "./Curtain.module.css";

interface Props {
  show?: boolean;
}

export default function Curtain({ show }: Props) {
  const cls = [styles.container];
  if (show) {
    cls.push(styles.show);
  }

  return <div className={cls.join(" ")} />;
}
