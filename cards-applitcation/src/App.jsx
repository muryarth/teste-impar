import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Form, Container, InputGroup, Button, Row, Col } from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai';

function App() {
  return (
    <>
    
      <Navbar id="header-title">
        <Navbar.Brand id="header-logo" />
      </Navbar>

      <Row>
        <Container fluid id="search-container">
          <Container>
            <InputGroup id="search-bar">
              <Form.Control
                placeholder="Digite aqui sua busca..."
                aria-label="Digite aqui sua busca..."
              >
              </Form.Control>
              <Button variant="light" id="button-addon">
                <AiOutlineSearch />
              </Button>
            </InputGroup>
          </Container>
        </Container>
      </Row>

      <Container id="result-container">
        <Row id="results-title-row">
          <Col md={6} xs={6}>
            <h1 id="results-title">Resultado de pesquisa</h1>
          </Col>
          <Col md={6} xs={6}>
            <Button id="btn-new-card">Novo card</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;