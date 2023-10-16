const DrinkMaker = require('./drink_maker');
class CoffeeMachine {
    drink
    sweetness
    stick

    order

    drinkMaker = new DrinkMaker()

    offeredDrinks = ["coffee", "tea", "chocolate"]
    offeredSweetness = [0, 1, 2]

    constructor() {
        this.sweetness = 0
    }

    setDrink(drink) {
        const isValid = this.offeredDrinks.includes(drink)
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

    parseOrder() {
        let command = ""

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
