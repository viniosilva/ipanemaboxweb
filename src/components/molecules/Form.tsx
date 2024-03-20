import styles from "./Form.module.css";

interface Props {
  children?: JSX.Element | JSX.Element[];
}
export default function Form({ children }: Props) {
  return <form className={styles.container}>{children}</form>;
}
