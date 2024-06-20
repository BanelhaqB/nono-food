import './App.css';

const {useEffect, useState} = require("react");

const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");
const {Button, Modal} = require('react-bootstrap');
const _ = require('lodash');

const recipes = require("./recipes.json");
const planning = require("./planning.json");

function App() {
    const [showRecipe, setShowRecipe] = useState(false);
    const [showRules, setShowRules] = useState(false);

    const [mondayResult, setMondayResult] = useState(null);
    const [tuesdayResult, setTuesdayResult] = useState(null);
    const [wednesdayResult, setWednesdayResult] = useState(null);
    const [thursdayResult, setThursdayResult] = useState(null);
    const [fridayResult, setFridayResult] = useState(null);
    const weekResult = [mondayResult, tuesdayResult, wednesdayResult, thursdayResult, fridayResult];


    const computeResult = (day) => {
        // Chef
        const chefs = ["Nohaida", "Bouchra", "Bilel"]

        const recipeOfTheDayId = planning[day].recipe;
        const recipeOfTheDay = recipes[recipeOfTheDayId];
        const numberOfChef = recipeOfTheDay.numberOfChef;

        const winners = []
        for (let chefNumber = 0; chefNumber < numberOfChef; chefNumber++) {
            const chefNumber = Math.floor(Math.random() * chefs.length);
            const winner = chefs[chefNumber];
            winners.push(winner)
            _.remove(chefs, (c) => c == winner)
        }

        // Time
        const time = Math.floor(Math.random() * (150 - 90) + 90);

        //Joker
        const joker = Math.floor(Math.random() * 3) == 0 ? true : false
        const jokerNumber = Math.floor(Math.random() * chefs.length)
        const theJoker = joker ? chefs[jokerNumber] : null;

        // Dessert
        const dessert = Math.floor(Math.random() * 2) == 0 ? true : false

        const result = {
            "chef": winners,
            "time": time,
            "joker": theJoker,
            "dessert": dessert
        };

        if (day === 0) {
            setMondayResult(result);
        }
        if (day === 1) {
            setTuesdayResult(result);
        }
        if (day === 2) {
            setWednesdayResult(result);
        }
        if (day === 3) {
            setThursdayResult(result);
        }
        if (day === 4) {
            setFridayResult(result);
        }
    }

    return (
        <div className="App">
            <h1 className="titre">Aux fourneaux <img className="oven" src="img/four.png"/></h1>

            <div className="container text-center">
                <div className="row mb-5">
                    {
                        planning.map((day) => <div className="col d-flex flex-column justify-content-between">
                            <div>
                                <h3>{day.name}</h3>
                                <div className="border justify-content-center align-items-center p-2 mb-5">
                                    <p>{recipes[day.recipe].name} <span>{
                                        _.range(recipes[day.recipe].numberOfChef).map((chef) => "👩‍🍳")
                                    }</span></p>
                                </div>
                            </div>
                            {weekResult[day.id] == null ?
                                <Button variant="outline-danger" className="" onClick={() => computeResult(day.id)}> TAP
                                    HERE!</Button>
                                : <div className="border justify-content-center align-items-center p-2 mb-5">
                                    <p><img className="chef" src="img/chef(3).png"/>
                                        : {weekResult[day.id].chef.join(" + ")} </p>
                                    <p><img className="time" src="img/temps-libre.png"/>

                                        : {moment.duration(weekResult[day.id].time, "minutes").format("h[h] mm[min]")}
                                    </p>
                                    {weekResult[day.id].joker == null ? null :
                                        <p><img className="joker" src="img/joker.png"/> {weekResult[day.id].joker}</p>}
                                    {weekResult[day.id].dessert == true ?
                                        <img className="dessert" src="img/dessert.png"/> : null}
                                </div>
                            }
                        </div>)
                    }
                </div>

                <Button variant="outline-info" onClick={() => setShowRecipe(true)}>
                    <img className="recipes-book" src="img/livre-de-recettes.png" alt="livre"/>
                    Récapitulatif des recettes
                </Button>

                <Button variant="outline-info" className="ms-5" onClick={() => setShowRules(true)}>
                    <img className="rules" src="img/regles(1).png" alt="règles"/>
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
                    <ul>
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
