import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";

import styles from "./layout.module.css";
import { BaseSyntheticEvent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Routes from "../../Routes";
import Breadcrumb, { Item as BreadcrumbItem } from "../molecules/Breadcrumb";
import Curtain from "../atoms/Curtain";

interface Props {
  title?: string;
  breadcrumbItems?: BreadcrumbItem[];
  children?: JSX.Element | JSX.Element[];
}

export default function Layout({ title, breadcrumbItems, children }: Props) {
  const [showCurtain, setShowCurtain] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const year = new Date().getFullYear();
  const isMobile = innerWidth < 700;
  const menuCls = isMobile ? styles.hidden : "";

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
      {isMobile && <Curtain hidden={!showCurtain} />}
      <div className={styles.layout}>
        <nav className={menuCls}>
          {isMobile && bars}
          <ul>
            <li>
              <Link to={Routes.home.path}>
                <FontAwesomeIcon icon={faHouse} />
                Início
              </Link>
            </li>
            <li>
              <Link to={Routes.customers.path}>
                <FontAwesomeIcon icon={faUsers} />
                Clientes
              </Link>
            </li>
          </ul>
        </nav>
        <header>{isMobile && bars}</header>
        <main>
          <header>
            {title && <h1>{title}</h1>}
            {breadcrumbItems?.length && <Breadcrumb items={breadcrumbItems} />}
          </header>
          {children}
        </main>
        <footer>{year} © IpanemaBox</footer>
      </div>
    </>
  );

  function barsOnClick(e: BaseSyntheticEvent) {
    e.preventDefault();

    setShowCurtain(!showCurtain);

    const element = document.querySelector(
      `div.${styles.layout} > nav`
    ) as HTMLElement;

    if (!element.classList.contains(styles.hidden)) {
      element.classList.add(styles.hidden);
    } else {
      element.classList.remove(styles.hidden);
    }
  }
}
