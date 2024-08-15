import { Link } from "react-router-dom";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  return (
    <>
      <header>
        <h1>Ipanema Box</h1>
        <nav>
          <ul>
            <li><Link to={"/"}>Início</Link></li>
            <li><Link to={"/clientes"}>Clientes</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
