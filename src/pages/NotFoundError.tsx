import { useRouteError } from "react-router-dom";

interface AppError {
  statusText: string;
  message: string;
}

export default function NotFoundError() {
  const err = useRouteError() as AppError;
  console.error(err);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Desculpe, ocorreu um erro inesperado.</p>
      <p>
        <i>{err.statusText || err.message}</i>
      </p>
    </div>
  );
}
