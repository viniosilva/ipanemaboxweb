import styles from "./CardFooter.module.css";

interface Props {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
}

export default function CardFooter({ className, children }: Props) {
  const cls = [styles.container, className].filter((v) => v).join(" ");

  return <footer className={cls}>{children}</footer>;
}
