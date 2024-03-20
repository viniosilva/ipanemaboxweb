import styles from "./InputBox.module.css";

interface Props {
  children?: JSX.Element | JSX.Element[];
}
export default function InputBox({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
