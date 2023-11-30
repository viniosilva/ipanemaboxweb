import { BaseSyntheticEvent, HTMLInputTypeAttribute } from "react";
import concatClassNames from "../../utils/concatClassNames";
import styles from "./input.module.css";

interface Props {
  name: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onchange?: (e: BaseSyntheticEvent) => void;
  classname?: string;
}

export default function Input({
  name,
  type,
  value,
  placeholder,
  required,
  onchange,
  classname,
}: Props) {
  const cls = concatClassNames([classname, styles.input]);

  return (
    <input
      className={cls}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onchange}
      required={required}
    />
  );
}
