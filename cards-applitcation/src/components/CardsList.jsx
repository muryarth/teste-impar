import React, { Component } from 'react'
import { Card, Image, Form, Container, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios"

const url = "https://pokeapi.co/api/v2/pokemon";

class CardsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Items: [],
            AllPokeData: [],
            SearchValue: null
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
                            <Col><Button variant="danger">Excluir</Button></Col>
                            <Col><Button variant="light">Editar</Button></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    componentDidMount() {
        this.GetAllData();
    }

    render() {
        const AllItems = this.state.AllPokeData;
        const SearchValue = this.state.SearchValue;

        return (
            <>
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
                                    {/* <Button variant="light" id="button-addon">
                                    </Button> */}
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                </Container>

                <Container fluid style={{ paddingTop: "10px", backgroundColor: "#F6F4F6" }}>
                    <Container id="result-container">
                        <Row id="results-title-row">
                            <Col md={6} xs={6}>
                                <h1 id="results-title">Resultado de busca</h1>
                            </Col>
                            <Col md={6} xs={6}>
                                <Button id="button-new-card">Novo card</Button>
                            </Col>
                        </Row>
                    </Container>

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
            </>
        )
    }
}

export default CardsList