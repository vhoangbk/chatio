import Card from "./Card";

class Desk{

    cards = new Array();

    constructor(name, players){
        this.name = name;
        this.players = players;
        this.reset();
    }

    reset(){
        for (let i=0; i<4; i++){
            for (let j=1; j<=13; j++){
                let card = new Card(j, i);
                this.cards.push(card);
            }
        }
    }
}

export default Desk;