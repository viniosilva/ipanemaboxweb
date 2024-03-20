import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import styles from "./VerticalMenu.module.css";
import Curtain from "../atoms/Curtain";

interface Props {
  showMenu: boolean;
}
export default function VerticalMenu({ showMenu }: Props) {
  const cls = [styles.container];
  if (!showMenu) {
    cls.push(styles.hiddenMenu);
  }

  return (
    <>
      <Curtain show={showMenu} />
      <nav className={cls.join(" ")}>
        <ul>
          <li>
            <a href="#">
              <CalendarMonthRoundedIcon />
              <span>Início</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
