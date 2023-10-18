let CoffeeMachine = require('../src/coffee_machine')

let coffeeMachine

const buyWhatever = 1000

beforeEach(() => {
	coffeeMachine = new CoffeeMachine()
})

describe('CoffeeMachine', function () {
	describe("consturctor", () => {
		test("sweetness level default should be 0", () => {
			expect(coffeeMachine.sweetness).toBe(0)
		})

		test("balance should initially be 0", () => {
			expect(coffeeMachine.balance).toBe(0)
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
		test("correctly parse drink with no sweetness to drink maker command and balance is enough", () => {
			coffeeMachine.insertMoney(buyWhatever)
			const sweetness = 0
			coffeeMachine.setSweetness(sweetness)
			const drink = "coffee"
			coffeeMachine.setDrink(drink)
			const command = coffeeMachine.parseOrder()
			expect(command).toBe("C::")
		})

		test("correctly parse drink with sweetness to drink maker command and balance is enough", () => {
			coffeeMachine.insertMoney(buyWhatever)
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

		test("return a message with missing amount when balance is not enough", () => {
			coffeeMachine.setDrink("coffee")
			coffeeMachine.insertMoney(40)
			const message = coffeeMachine.parseOrder()
			const expectedMessage = "M:Missing 20cts to purchase coffee"
			expect(message).toBe(expectedMessage)
		})

		test("not return a message when order is processed correctly", () => {
			coffeeMachine.insertMoney(buyWhatever)
			const drink = "coffee"
			coffeeMachine.setDrink(drink)
			const command = coffeeMachine.parseOrder()
			expect(command[0]).not.toBe("M")
		})
	})

	describe("method insertMoney should", () => {
		test("increase balance for the inserted amount", () => {
			const insertedAmount = 100
			coffeeMachine.insertMoney(insertedAmount)
			expect(coffeeMachine.balance).toBe(insertedAmount)
		})

		test("increase balance for the inserted amount when it already had balance", () => {
			const initialBalance = 20
			coffeeMachine.balance = initialBalance
			const insertedAmount = 100
			coffeeMachine.insertMoney(insertedAmount)
			expect(coffeeMachine.balance).toBe(insertedAmount + initialBalance)
		})

		test.todo("to throw error when inserted coin is not valid")

		test("throw error when inserted incorrectly", () => {
			const insertedAmount = "paco"
			expect(() => coffeeMachine.insertMoney(insertedAmount)).toThrow()
		})
	})

	describe("method checkBalance should return the difference between the balance and the drink price", () => {
		const data = [
			{ testName: "when balance is above 0", insertedMoney: 100, expectedBalance: 40 },
			{ testName: "when balance is 0", insertedMoney: 60, expectedBalance: 0 },
			{ testName: "when balance is below 0", insertedMoney: 40, expectedBalance: -20 },
		]

		data.forEach(d => {
			test(d.testName, () => {
				coffeeMachine.setDrink("coffee")
				coffeeMachine.insertMoney(d.insertedMoney)
				expect(coffeeMachine.checkBalance()).toBe(d.expectedBalance)
			})
		})
	})

	describe("method isBalanceEnough should", () => {
		test("return true when balance after purchase would be 0 or above", () => {
			coffeeMachine.setDrink("coffee")
			coffeeMachine.insertMoney(100)
			expect(coffeeMachine.isBalanceEnough()).toBe(true)
		})
		test("return false when balance after purchase would be below 0", () => {
			coffeeMachine.setDrink("coffee")
			coffeeMachine.insertMoney(40)
			expect(coffeeMachine.isBalanceEnough()).toBe(false)
		})
	})
})

/*
- The drink maker should make the drinks only if the correct amount of money is given
- If not enough money is provided, we want to send a message to the drink maker. The message should contains at least the amount of money missing.

*/