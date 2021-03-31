
stocksOwned = {}
stocks = {
    "STK1" : 4.00,
    "STK2" : 10.00
}

cash = 100

def buy(order):
    return

def sell(order):
    return

def displayBalances():
    print("You have $" + str(cash) + " in the bank.")
    print(stocks)

def main():
    displayBalances()
    print("---------------")
    select = input("Press 1 to buy, 2 to sell, and 3 to exit.")
    if select == "1":
        order = input("Type the symbol of the stock you want to buy.")
        if order in stocks:
            buy(order)
        main()
    if select == "2":
        order = input ("Type the symbol of the stock you want to sell.")
        if order in stocksOwned:
            sell(order)
        main()
    if select == "3":
        return
    else:
        print("Please make a valid selection.")
        main()

if __name__ == "__main__":
    main()