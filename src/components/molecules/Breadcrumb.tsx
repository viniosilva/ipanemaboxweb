import { Link } from "react-router-dom";
import concatClassNames from "../../utils/concatClassNames";
import styles from "./breadcrumb.module.css";

export interface Item {
  name: string;
  to?: string;
}

interface Props {
  items: Item[];
  classname?: string;
}

export default function Breadcrumb({ items, classname }: Props) {
  const cls = concatClassNames([classname, styles.breadcrumb]);

  return (
    <nav className={cls}>
      <ul>
        {items?.map(({ name, to }) => (
          <li>{to ? <Link to={to}>{name}</Link> : name}</li>
        ))}
      </ul>
    </nav>
  );
}
