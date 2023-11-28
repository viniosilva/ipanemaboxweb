import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";

import styles from "./layout.module.css";
import { BaseSyntheticEvent, useCallback, useEffect, useState } from "react";

interface Props {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

export default function Layout({ title, children }: Props) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const year = new Date().getFullYear();
  const isMobile = innerWidth < 700;
  const menuCls = isMobile ? styles.hidden : "";
  // const menuCls = isMobile
  //   ? `${styles.mobileMenu} ${styles.hidden}`
  //   : styles.menu;
  const bars = (
    <FontAwesomeIcon
      icon={faBars}
      className={styles.bars}
      onClick={barsOnClick}
    />
  );

  const handleWindowResize = useCallback(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <>
      {isMobile && <div className={`${styles.curtain} ${styles.hidden}`}></div>}
      <div className={styles.layout}>
        <nav className={menuCls}>
          {isMobile && bars}
          <ul>
            <li>
              <FontAwesomeIcon icon={faHouse} />
              Início
            </li>
            <li><FontAwesomeIcon icon={faUsers} /> Clientes</li>
          </ul>
        </nav>
        <header>{isMobile && bars}</header>
        <main>
          <header>
            <h1>{title}</h1>
          </header>
          {children}
        </main>
        <footer>{year} © IpanemaBox</footer>
      </div>
    </>
  );

  function barsOnClick(e: BaseSyntheticEvent) {
    e.preventDefault();

    const elements = document.querySelectorAll(
      `div.${styles.layout} > nav, div.${styles.curtain}`
    );

    elements.forEach((e) => {
      if (!e.classList.contains(styles.hidden)) {
        e.classList.add(styles.hidden);
      } else {
        e.classList.remove(styles.hidden);
      }
    });
  }
}
