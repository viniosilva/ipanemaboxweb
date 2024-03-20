import CardHeader from "../atoms/CardHeader";
import Curtain from "../atoms/Curtain";
import Card from "./Card";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ModalCard.module.css";

interface Props {
  show: boolean;
  closeOnClick: () => void;
  title?: string;
  children?: JSX.Element | JSX.Element[] | string;
}

export default function ModalCard({ show, closeOnClick, title, children }: Props) {
  const cls = [styles.container];
  if (show) {
    cls.push(styles.show);
  }

  return (
    <>
      <Curtain show={show} />
      <div className={cls.join(" ")}>
        <Card className={styles.content}>
          <>
            <CardHeader>
              <h1>{title}</h1>
              <CloseIcon className={styles.close} onClick={closeOnClick} />
            </CardHeader>
            {children}
          </>
        </Card>
      </div>
    </>
  );
}
