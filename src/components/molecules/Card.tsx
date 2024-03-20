import styles from "./Card.module.css";

interface Props {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
}

export default function Card({ className, children }: Props) {
  const cls = [styles.container, className].filter((v) => v).join(" ");

  return <article className={cls}>{children}</article>;
}
