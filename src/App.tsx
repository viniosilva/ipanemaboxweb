import SectionBox from "./components/atoms/SectionBox";
import Layout from "./components/templates/Layout";

export default function App() {
  return (
    <Layout title="Início">
      <SectionBox>
        <p>Olá mundo!</p>
      </SectionBox>
    </Layout>
  );
}
