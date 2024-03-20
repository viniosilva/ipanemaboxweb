import styles from "./CardBody.module.css";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
}

export default function CardBody({ children }: Props) {
  return (
    <div className={styles.container}>{children}</div>
  );
}
