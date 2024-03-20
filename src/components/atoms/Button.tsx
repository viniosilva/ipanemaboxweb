import styles from "./Button.module.css";

interface Props {
  type: "primary" | "neutral" | "success" | "danger";
  onClick: () => void;
  children: string;
}

export default function Button({ type, onClick, children }: Props) {
  const cls = [styles.container, styles[type]];

  return (
    <button className={cls.join(" ")} onClick={onClick}>
      {children}
    </button>
  );
}
