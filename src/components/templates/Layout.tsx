import { useCallback, useState } from "react";
import Header from "../organisms/Header";
import VerticalMenu from "../organisms/VerticalMenu";
import styles from "./Layout.module.css";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const menuIconOnClick = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  return (
    <>
      <Header menuIconOnClick={menuIconOnClick} />
      <VerticalMenu showMenu={showMenu} />
      <div className={styles.container}>
        <main>{children}</main>
      </div>
    </>
  );
}
