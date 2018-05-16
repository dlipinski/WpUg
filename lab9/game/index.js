//jshint node: true, esversion: 6
const newGame = (req, res) => {

    let newGame = {
        size: req.body.size || 5,
        dim: req.body.dim || 9,
        max: req.body.max || 0,
        colors: []
    };

    for(let i=0;i<newGame.size;i++){
        newGame.colors.push(Math.floor((Math.random() * newGame.dim) + 1));
    }

    req.session.game = newGame;

    res.send("Do zrobienia!");
};

const markAnswer = (req, res) => {

    let colors = [];
    colors = req.session.game.colors;

    let newMarkMove = [];
    newMarkMove=req.body.move;
    
    // Check if kod and ruch are equal length
    if (colors.length !== newMarkMove.length){
        res.send({"Error": "Colors and Mark not same length!" });
    }

    //Init arrays for black and white indexes
    let black =[];
    let white = [];

    // Find blacks and remember position
    colors.forEach( (value, index) => {
        
        if(value===newMarkMove[index]){
            black.push(index);
        }
    });

    // Find whites and remember position
    colors.forEach( (value, index) => {
        if(newMarkMove.includes(value) && !black.includes(index) && !white.includes(index)){
            white.push(index);
        }
    });


    res.send({ "white": white.length, "black" :  black.length });
};

module.exports = {
    newGame,
    markAnswer
};