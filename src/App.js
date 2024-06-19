import {useEffect, useState} from "react";

import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import {Button, Modal} from 'react-bootstrap';
import _ from 'lodash';
import './App.css';

const recipes = require("./recipes.json");
const initialPlanning = require("./planning.json");

function App() {
    const [showRecipe, setShowRecipe] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const [mondayResult, setMondayResult] = useState(null);
    const [tuesday, setTuesday] = useState(null);
    const [wednesday, setWednesday] = useState(null);
    const [thursday, setThursday] = useState(null);
    const [friday, setFriday] = useState(null);

    const week = [mondayResult, tuesday, wednesday, thursday, friday];

    const setIRandom = (max) => {
        console.log(Math.floor(Math.random() * max));
    }

    setIRandom(5);
    setIRandom(50);


    const computeResult = (day) => {
        // Dessert
        const dessert = Math.floor(Math.random() * 2) == 0 ? true : false

        // Chef
        const chefs = ["Nohaida", "Bouchra", "Bilel"]
        const chefNumber = Math.floor(Math.random() * 3);
        const winner = chefs[chefNumber];

        // Time
        const time = Math.floor(Math.random() * (150 - 90) + 90);

        //Joker
        const players = ["Nohaida", "Bilel", "Bouchra"]
        const joker = Math.floor(Math.random() * 3) == 0 ? true : false
        const jokerNumber = Math.floor(Math.random() * 3);
        const theJoker = joker ? players[jokerNumber] : null;


        const result = {
            "chef": winner,
            "time": time,
            "joker": theJoker,
            "dessert": dessert
        };


        if (day === 0) {
            setMondayResult(result);
        }
        if (day === 1) {
            setTuesday(result);
        }
        if (day === 2) {
            setWednesday(result);
        }
        if (day === 3) {
            setThursday(result);
        }
        if (day === 4) {
            setFriday(result);
        }
    }

    return (
        <div className="App">
            <h1 className="titre">Aux fourneaux</h1>

            <div className="container text-center">
                <div className="row mb-5">

                    {
                        initialPlanning.map((day) => <div className="col d-flex flex-column justify-content-between">
                            <div>
                                <h3>{day.name}</h3>
                                <div className="border justify-content-center align-items-center p-2 mb-5">
                                    <p>{recipes[day.recipe].name} <span>{
                                        _.range(recipes[day.recipe].numberOfChef).map((chef) => "👩‍🍳")
                                    }</span></p>
                                </div>
                            </div>
                            {week[day.id] == null ?
                                <Button variant="outline-danger" className="" onClick={() => computeResult(day.id)}> TAP
                                    HERE!</Button>
                                : <div className="border justify-content-center align-items-center p-2 mb-5">
                                    <p> Chef : {week[day.id].chef} </p>
                                    <p> Time
                                        : {moment.duration(week[day.id].time, "minutes").format("h[h] mm[min]")} </p>
                                    {week[day.id].joker == null ? null : <p>🃏{week[day.id].joker}</p>}
                                    {week[day.id].dessert == true ? <p>🍰</p> : null}
                                </div>
                            }
                        </div>)
                    }
                </div>

                <Button variant="outline-info" onClick={() => setShowRecipe(true)}>
                    Récapitulatif des recettes
                </Button>

                <Button variant="outline-info" className="ms-5" onClick={() => setShowRules(true)}>
                    Règles
                </Button>

            </div>

            <Modal show={showRecipe} onHide={() => setShowRecipe(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Recettes</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ul className="recipes">
                        {
                            recipes.map((recipe, index) =>
                                <li key={index}>{recipe.name} <span>{
                                    _.range(recipe.numberOfChef).map((chef) => "👩‍🍳")
                                }</span></li>)
                        }
                    </ul>
                </Modal.Body>

                <Modal.Footer>
                </Modal.Footer>
            </Modal>

            <Modal show={showRules} onHide={() => setShowRules(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Règles</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ul className="rules">
                        <li> Chaque personne a le droit à un jour off par semaine</li>
                        <li> Possibilité de composé des duos pour les plats difficiles</li>
                        <li> Préparer des repas pour 6</li>
                        <li> 1 chance sur 3 de tomber sur un joker</li>
                        <li> Respecter le temps limité</li>
                        <li> 1 chance sur 2 de tomber sur un dessert ou un jus</li>
                    </ul>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-info" onClick={() => setShowRules(false)}>
                        D'accord
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default App;
