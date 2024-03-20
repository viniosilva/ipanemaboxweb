import TitleImage from "../../assets/title.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import styles from "./Header.module.css";
import { BaseSyntheticEvent } from "react";

interface Props {
  menuIconOnClick: (e: BaseSyntheticEvent) => void;
}

export default function Header({ menuIconOnClick }: Props) {
  return (
    <header className={styles.container}>
      <MenuRoundedIcon className={styles.menuIcon} onClick={menuIconOnClick} />
      <h1>
        <img src={TitleImage} alt="Ipanema Box" />
      </h1>
    </header>
  );
}
