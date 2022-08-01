import React, { Component } from 'react'
import { Modal, Card, Image, Form, Container, InputGroup, Button, Row, Col } from 'react-bootstrap';
import axios from "axios"
import logo from "../images/icone_criar@2x.png"

const url = "https://pokeapi.co/api/v2/pokemon";

class CardsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Items: [],
            AllPokeData: [],
            SearchValue: null,
            Show: false,
            showSidebar: false,
        }
    }

    //Lista todos os pokemons pelo nome
    async GetAllData() {
        await axios.get(url + "?offset=20&limit=20")
            .then(response => {
                // console.log(response);
                this.setState({ Items: response.data.results });
                this.GetDataImage(response.data.results);
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Acessa um dado pokemon, e retorna um objeto contendo nome e url de seu sprite
    GetDataImage(previousResponse) {
        let items = previousResponse;
        let allPokeData = [];

        items.map(async element => {
            await axios.get(url + "/" + element.name)
                .then(response => {
                    // console.log(response);
                    let pokeObject = { name: response.data.name, imageUrl: response.data.sprites.front_default }
                    allPokeData.push(pokeObject);
                    this.setState({ AllPokeData: allPokeData })
                })
                .catch(error => {
                    console.log(error);
                })
        })
    }

    //Renderiza cada um dos cards que será exibido na tela com base nos dados obtidos
    RenderCards(item) {
        return (
            <Col lg={3} md={4} sm={6} style={{ marginBottom: "38px" }}>
                <Card style={{ backgroundColor: "#FFFFFF" }}>
                    <Container>
                        <Image src={item.imageUrl} roundedCircle style={{ width: "95px", height: "95px", backgroundColor: "#F6F4F6", marginTop: "28px" }}></Image>
                    </Container>
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <hr
                            style={{
                                background: '#F0EFF0',
                                color: '#F0EFF0',
                                borderColor: '#F0EFF0',
                                height: '3px',
                            }}
                        />
                        <Card.Text>
                            Lorem ipsum dolor sit amet consectetur.
                        </Card.Text>
                        <Row>
                            <Col><Button variant="danger" onClick={this.toggleDeleteModal}>Excluir</Button></Col>
                            <Col><Button variant="light" onClick={this.toggleSidebar}>Editar</Button></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    toggleDeleteModal = () => {
        let show = this.state.Show;
        this.setState({ Show: !show });
    }

    toggleSidebar = () => {
        let showSidebar = this.state.showSidebar;
        this.setState({ showSidebar: !showSidebar })
    }

    componentDidMount() {
        this.GetAllData();
    }

    render() {
        const AllItems = this.state.AllPokeData;
        const SearchValue = this.state.SearchValue;
        const showSidebar = this.state.showSidebar;
        let displaySidebar = null;
        if (showSidebar == false)
            displaySidebar = "-100%";
        else
            displaySidebar = "0";


        return (
            <>
                {/* Menu lateral */}
                <Container fluid className="modal-container" style={{
                    right: displaySidebar,
                    padding: "0"
                }} onClick={() => { this.toggleSidebar() }}>
                    <Container className="modal-sidebar" style={{ width: "37%", paddingLeft: "30px" }}>
                        <Row style={{ marginTop: "41px", paddingBottom: "15px" }}>
                            <Col lg={2}><Image src={logo} id="criar-icon"></Image></Col>
                            <Col className="title-text"><h1>Criar card</h1></Col>
                        </Row>
                        <Container style={{
                            borderTop: "1.5px solid rgb(213 213 213)",
                            borderBottom: "1.5px solid rgb(213 213 213)",
                            paddingTop: "15px",
                            paddingBottom: "15px"
                        }}>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Digite um nome para o card</Form.Label>
                                            <Form.Control type="email" placeholder="Digite o título" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Inclua uma imagem para aparecer no card</Form.Label>
                                            <Form.Control type="email" placeholder="Nenhum arquivo selecionado" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                        <Row>
                            <Col>
                                <Button id="card-button" variant="light" style={{ marginTop: "15px", float: "right" }}>Criar card</Button>
                            </Col>
                        </Row>
                    </Container>
                </Container>

                {/* Barra de busca */}
                <Container fluid id="search-background">
                    <Container id="search-container">
                        <Row>
                            <Col md={12}>
                                <InputGroup id="search-bar">
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Digite aqui sua busca..."
                                        aria-label="Digite aqui sua busca..."
                                        style={{ paddingLeft: "27px" }}
                                        onChange={(event) => {
                                            let searchValue = event.target.value;
                                            this.setState({ SearchValue: searchValue })
                                        }}
                                    >
                                    </Form.Control>
                                    <InputGroup.Text id="search-icon"></InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                </Container>


                <Container fluid style={{ paddingTop: "10px", backgroundColor: "#F6F4F6" }}>
                    {/* Resultado de busca */}
                    <Container id="result-container">
                        <Row id="results-title-row">
                            <Col md={6} xs={6}>
                                <h1 className="title-text">Resultado de busca</h1>
                            </Col>
                            <Col md={6} xs={6}>
                                <Button id="card-button" variant="light" onClick={() => this.toggleSidebar()}>
                                    Novo card
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    {/* Renderização de cards */}
                    <Container style={{ marginTop: "36px" }}>
                        <Row className="text-center">
                            {AllItems.length ? AllItems.filter(val => {
                                if (SearchValue == "" || SearchValue == null) {
                                    return val;
                                } else if (val.name.toLowerCase().includes(SearchValue.toLowerCase())) {
                                    return val;
                                }
                            }).map(item => { return this.RenderCards(item) }) : null}
                        </Row>
                    </Container>
                </Container>

                {/* Modal de exlusão */}
                <Modal show={this.state.Show} onHide={this.toggleDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Aviso!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Esta funcionalidade ainda não foi implementada.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleDeleteModal}>
                            Fechar
                        </Button>
                        {/* <Button variant="primary" onClick={this.toggleDeleteModal}>
                            Salvar
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default CardsList