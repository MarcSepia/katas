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

    }

    parseOrder() {
        return "C:2:0"
    }

    sendOrder() {
        const order = this.parseOrder()
        this.drinkMaker.execute(order)
    }

}

module.exports = CoffeeMachine;
