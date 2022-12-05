const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export default class Deck {
    // calls the function freshDeck on cards
    constructor(cards = freshDeck()) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    dealCard() {
        // takes the first element in an array and returns it to us
        return this.cards.shift()
    }

    takeCard(card) {
        // adds element to end of array
        this.cards.push(card)
    }
    shuffle() {
        
        // starts at the back of the deck and moves forwrd
        for (let i = this.numberOfCards - 1; i > 0; i--) {

            // finds a new placement for the card (i) to be shuffled to
            const newIndex = Math.floor(Math.random() * (i + 1))

            // finds the card in the position that we want to swap too
            const oldValue = this.cards[newIndex]

            // we then swap positions 
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue

        }
    }
}

export class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color() {
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
    }
    
    getHTML() {
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
    
}


const freshDeck = () => {
    //takes al the suits...
    return SUITS.flatMap(suit => {
        // adds them to each value...
        return VALUES.map(value => {
            // returns a new card for each combintion, making a new deck
            return new Card(suit, value)
        })
    })
}