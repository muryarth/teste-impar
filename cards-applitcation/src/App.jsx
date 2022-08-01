import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import CardsList from './components/CardsList';

function App() {
  return (
    <>
      <Navbar id="header-title" fixed="top">
        <Navbar.Brand id="header-logo" />
      </Navbar>
      <CardsList />
    </>
  );
}

export default App;