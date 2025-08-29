export default class Player {
    constructor(money, name) {
        this.hand = []
        this.money = money
        this.name = name
    }

    deal(deck,amountToDeal) {
        for(let i = 0; i < amountToDeal; ++i) {
            this.hand.push(deck.pop())
        }
    }
    

    bet(amount) {
        this.money = this.money - amount
    }

    toString() {
        return ('Player: ' +this.hand.toString()+'\n')
    }
} 

