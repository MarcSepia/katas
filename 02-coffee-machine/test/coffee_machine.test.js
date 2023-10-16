let CoffeeMachine = require('../src/coffee_machine')

let coffeeMachine

beforeEach(() => {
	coffeeMachine = new CoffeeMachine()
})

describe('CoffeeMachine', function () {
	describe("consturctor", () => {
		test("sweetness level default should be 0", () => {
			expect(coffeeMachine.sweetness).toBe(0)
		})
	})

	describe("method setDrink should", () => {
		test("select the drink when drink is sold", () => {
			const valid_drink = "coffee"
			coffeeMachine.setDrink(valid_drink)
			expect(coffeeMachine.drink).toBe(valid_drink)
		})

		test("not select the drink when drink is not sold", () => {
			const invalid_drink = "mataratas"
			coffeeMachine.setDrink(invalid_drink)
			expect(coffeeMachine.drink).toBe(undefined)
		})
	})

	describe("method setSweetness should", () => {
		test("modify the sweetness when level is valid", () => {
			const valid_sweetness_level = 2
			coffeeMachine.setSweetness(valid_sweetness_level)
			expect(coffeeMachine.sweetness).toBe(valid_sweetness_level)
		})

		test("not modify the sweetness when level is not valid", () => {
			const invalid_sweetness_level = 5
			const default_sweetness_level = 0
			coffeeMachine.setSweetness(invalid_sweetness_level)
			expect(coffeeMachine.sweetness).toBe(default_sweetness_level)
		})
	})

	describe("method _needsStick should", () => {
		test("return true when stick is needed", () => {
			const sweetness_level = 2
			coffeeMachine.setSweetness(sweetness_level)
			expect(coffeeMachine._needsStick()).toBe(true)
		})

		test("return false when stick is not needed", () => {
			const sweetness_level = 0
			coffeeMachine.setSweetness(sweetness_level)
			expect(coffeeMachine._needsStick()).toBe(false)
		})
	})
});