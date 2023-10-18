const DrinkMaker = require('./drink_maker');
class CoffeeMachine {
    drink
    sweetness
    stick

    balance

    order

    drinkMaker = new DrinkMaker()

    offeredDrinks = [
        { name: "coffee", pricing: 60 },
        { name: "tea", pricing: 40 },
        { name: "chocolate", pricing: 50 }
    ]
    offeredSweetness = [0, 1, 2]

    constructor() {
        this.sweetness = 0
        this.balance = 0
    }

    getDrinkData(_drink) {
        const drink = _drink ? _drink : this.drink
        return this.offeredDrinks.find(offeredDrink => offeredDrink.name == drink)
    }

    setDrink(drink) {
        const isValid = this.getDrinkData(drink)
        if (isValid) {
            this.drink = drink
        }
    }

    setSweetness(sweetness_level) {
        const isValid = this.offeredSweetness.includes(sweetness_level)
        if (isValid) {
            this.sweetness = sweetness_level
        }
    }

    // private method
    _needsStick() {
        return this.sweetness != 0
    }

    insertMoney(cts) {
        if (!Number.isInteger(cts)) throw "Inserted X not"

        this.balance = this.balance + cts
    }

    checkBalance() {
        const drinkWithPrice = this.getDrinkData(this.drink)
        const remainingBalance = this.balance - drinkWithPrice.pricing
        return remainingBalance
    }

    isBalanceEnough() {
        const balance = this.checkBalance()
        return balance >= 0
    }

    parseOrder() {
        let command = ""

        if (!this.isBalanceEnough()) {
            const missingBalance = this.checkBalance() * -1
            command = "M:Missing " + missingBalance + "cts to purchase " + this.drink
            return command
        }

        const drinks = {
            "coffee": "C",
            "tea": "T",
            "chocolate": "H"
        }

        const selectedDrink = drinks[this.drink]
        if (!selectedDrink) throw "No drink selected yet, order invalid"

        command = command + selectedDrink

        if (this.sweetness != 0) {
            command = command + ":" + this.sweetness + ":0"
        } else {
            command = command + "::"
        }

        return command
    }

    sendOrder() {
        const order = this.parseOrder()
        this.drinkMaker.execute(order)
    }

}

module.exports = CoffeeMachine;
