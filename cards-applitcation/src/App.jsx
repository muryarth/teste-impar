import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import CardsList from './components/CardsList';

function App() {
  return (
    <>
      {/* Renderiza a barra superior */}
      <Navbar id="header-title" fixed="top">
        <Navbar.Brand id="header-logo" />
      </Navbar>

      {/* Renderiza o restante da aplicação */}
      <CardsList />
    </>
  );
}

export default App;