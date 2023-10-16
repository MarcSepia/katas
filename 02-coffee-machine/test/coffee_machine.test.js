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

	describe("private method _needsStick should", () => {
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

	describe("method parseOrder should", () => {
		test("correctly parse drink with no sweetness to drink maker command", () => {
			const sweetness = 0
			coffeeMachine.setSweetness(sweetness)
			const drink = "coffee"
			coffeeMachine.setDrink(drink)
			const command = coffeeMachine.parseOrder()
			expect(command).toBe("C::")
		})

		test("correctly parse drink with sweetness to drink maker command", () => {
			const sweetness = 2
			coffeeMachine.setSweetness(sweetness)
			const drink = "coffee"
			coffeeMachine.setDrink(drink)
			const command = coffeeMachine.parseOrder()
			expect(command).toBe("C:2:0")
		})

		test("throw error when order is invalid", () => {
			const invalid_drink = "orchata"
			coffeeMachine.setDrink(invalid_drink)
			expect(() => coffeeMachine.parseOrder()).toThrow()
		})
	})
});