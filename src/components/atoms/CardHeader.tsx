import styles from "./CardHeader.module.css";

interface Props {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
}

export default function CardHeader({ className, children }: Props) {
  const cls = [styles.container, className].filter((v) => v).join(" ");

  return <header className={cls}>{children}</header>;
}
