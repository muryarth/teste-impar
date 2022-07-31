import React, { Component } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from "axios"

const url = "https://pokeapi.co/api/v2/pokemon";

class CardsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Items: [],
            AllPokeData: []
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
        // let items = this.state.Items;
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

    RenderCards(items) {
        items.map(item => {
            return <Card style={{ width: '18rem' }}><Card.Img variant="top" src={item.imageUrl} /><Card.Title>{item.name}</Card.Title></Card>
        })
    }

    componentDidMount() {
        this.GetAllData();
    }

    render() {
        const AllItems = this.state.AllPokeData

        return (
            <div>
                {/* {this.RenderCards(AllItems)} */}
                <Row>
                    {AllItems.length ? AllItems.map(item => {
                        return <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.imageUrl} />
                                <Card.Title>{item.name}</Card.Title>
                            </Card>
                        </Col>
                    }) : null}
                </Row>
                {/* <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.imageUrl} />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card> */}
                {/* {Items.length ? Items.map(item => { return <div>{item.name}</div> }) : null} */}
            </div>
        )
    }
}

export default CardsList