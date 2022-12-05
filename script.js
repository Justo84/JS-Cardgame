import Deck, { Card } from './deck.js'

const CARD_VALUE_MAP = {
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "10" : 10,
    "J" : 11,
    "Q" : 12,
    "K" : 13,
    "A" : 14
}

const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

let playerDeck, computerDeck, inRound, stop

document.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards()
    }
})

startGame()
function startGame() {
    stop = false
    const deck = new Deck()
    deck.shuffle()

    //finds the mid point of the number of cards in the deck
    const deckMidPoint = Math.ceil(deck.numberOfCards / 2)

    // gives us the first half of the cards, in a new deck
    playerDeck = new Deck(deck.cards.slice(0, deckMidPoint))

    //gives us the second half of the cards, in a new deck
    // computerDeck = new Deck([new Card("s", 2)])
    computerDeck = new Deck(deck.cards.slice(deckMidPoint, deck.numberOfCards))

    inRound = false

    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ''
    playerCardSlot.innerHTML = ''
    text.innerText = ''

    updateDeckCount()
}

function flipCards() {
    inRound = true;
    
    const playerCard = playerDeck.dealCard()
    const computerCard = computerDeck.dealCard()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = "Win!"
        playerDeck.takeCard(playerCard)
        playerDeck.takeCard(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Lose!"
        computerDeck.takeCard(playerCard)
        computerDeck.takeCard(computerCard)
    } else {
        text.innerText = "Draw"
        playerDeck.takeCard(playerCard)
        computerDeck.takeCard(computerCard)
    }

    if (isGameOver(playerDeck)) {
        text.innerText = "You've lost"
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerText = "You've won"
        stop = true
    }
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
    return deck.numberOfCards === 0 
}