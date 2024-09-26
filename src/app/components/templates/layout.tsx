"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "@/app/components/templates/layout.module.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-300">
        <h1 className="text-lg text-green-500">Ipanema Box</h1>
        <button onClick={toggleMobileMenu} className="sm:hidden">
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>
      </header>

      {/* Curtain */}
      <div
        className={`${styles.overlay} ${isMobileMenuOpen && styles.active}`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Menu */}
      <div className="flex flex-1">
        <nav
          className={`${styles.menu} ${
            !isMobileMenuOpen && "-translate-x-full"
          }`}
        >
          <ul>
            <li className="align-middle leading-10 pl-8 cursor-pointer duration-300 hover:bg-green-400">
              <a href="#">
                Início
              </a>
            </li>
            <li className="align-middle leading-10 pl-8 cursor-pointer duration-300 hover:bg-green-400">
              <a href="#">
                Clientes
              </a>
            </li>
          </ul>
        </nav>

        {/* Main */}
        <main className="flex-1 p-4 bg-gray-50">
          <div className="p-4 bg-white border border-gray-300 rounded-lg">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center border-t border-gray-300 text-green-500">
        <p>© 2024 Ipanema Box</p>
      </footer>
    </div>
  );
}
