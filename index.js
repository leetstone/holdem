import { Suits } from "./suits.js"
import Card from "./card.js"
import Player from "./player.js"
import promptSync from "prompt-sync"

const prompt = promptSync()

let checked = 0
let betAmount = null
let deck = []
let numberOfPlayers = 3
let Players = []
for (let i = 0; i < numberOfPlayers; ++i){
    Players.push(new Player(100, `Player ${i}`))
}
let CommunityCards = []

function CommunityCardsDraw(n) {
    for (let i = 0; i < n; ++ i) {
        CommunityCards.push(deck.pop())
    }
    console.log("Community: " + CommunityCards)
    return
}


for (let i = 0; i < 52; ++i) {
    let suit = null
    let value = i%13 + 1
    if (i < 13) {
        suit = Suits.CLUBS
    } else if (i < 26) {
        suit = Suits.DIAMONDS
    }  else if (i < 39) {
       suit = Suits.SPADES 
    } else {
        suit = Suits.HEARTS
    }

    let aceOfHearts = new Card(suit, value)
    
    aceOfHearts.toString()

    deck.push(aceOfHearts)
}
deck.sort(() => Math.random() - 0.5);
console.log(deck.toString());
Players.forEach((p) => p.deal(deck, 2))
// PlayersHand.forEach(c => c.print())
console.log(Players.toString())

// Player2Hand.forEach(c => c.print())

console.log(deck.length.toString())

checked = 0



function bettingRound() {
    let stillInHand = [...Players]
    let keepBetting = true
    while (keepBetting) {
        Players.forEach((p,i) => {
            if (!keepBetting){
                return
            }
            let betted = false
            let actionOnYou = true
            while (actionOnYou) {
                let action = prompt ("do you want to check, bet, or fold? ")
                if (action == "bet") {
                    betAmount = prompt("You have " + p.money + " how much do you want to bet?")
                    p.bet(betAmount)
                    betted = true
                    actionOnYou = false
                }
                if (action == "fold") {
                    actionOnYou = false
                    stillInHand = stillInHand.filter(playerToFilter => {
                        return p.name !== playerToFilter.name
                    })
                    console.log(stillInHand)
                }
                if (action == "check") {
                    if (!betted) {
                        checked = checked + 1
                        console.log(checked + " player have checked")
                        actionOnYou = false
                    } else {
                        console.log("you can't check")
                    }
                }
                if (stillInHand.length === 1) {
                    keepBetting = false
                    console.log(`${stillInHand[0].name} has won the hand`)
                    break
                }
                if (checked === Players.length) {
                    console.log("all checked", stillInHand)
                    keepBetting = false
                }
            }
        })
    }
}

bettingRound()

CommunityCardsDraw(3)

CommunityCardsDraw(1)

CommunityCardsDraw(1)

