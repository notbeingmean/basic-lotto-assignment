# Basic Lotto Service

This Basic Lotto Service implements a simple lottery system where users can buy lotto tickets and win based on the drawn result. The lotto service allows users to select the number of digits (from 1 to 6 digits) they wish to bet on, and the system calculates the winnings based on how many digits match the last digits of the randomly drawn 6-digit result.

## Key Features

- **Buy Ticket**: Buy lotto by inputting number and amount of money and add to customer ticket.
- **Get Ticket**: Get all tickets that customer bought.
- **Get Random Number**: Select digit length (1-6 digits), how many numbers to buy, how much money for each number, and optionally specify fixed digits for specific positions in the generated random numbers.
- **Set Draw**: Set payout randomly for the current draw result.
- **Check Win Ticket**: Check winning prize by inputting all tickets that customer bought and return which number is a win and the prize.

## Example Usage

```typescript
const buyTicket = [
  {
    number: 1234,
    amount: 1000,
  },
  {
    number: 58,
    amount: 1000,
  },
];

const buyDigit = 4;
const buyNumber = 10;
const buyAmount = 1000;
const fixedDigit = [
  {
    digit: 3,
    number: 8,
  },
  {
    digit: 2,
    number: 6,
  },
];

// Create a new instance of the LottoService

const lottoService = new LottoService();

const randomBuyTicket = lottoService.getRandomNumber(
  buyAmount,
  buyDigit,
  buyNumber,
  fixedDigit
);

const buyTicketResult = lottoService.buyTicket(buyTicket);
const randomBuyTicketResult = lottoService.buyTicket(randomBuyTicket);

// Set draw result and check win ticket
lottoService.setDraw();
console.log(lottoService.drawResult);
console.log(lottoService.checkWinTicket());
```

## Prize Calculation

- 1 digit = 10 times of bet
- 2 digits = 100 times of bet
- 3 digits = 1000 times of bet
- 4 digits = 10000 times of bet
- 5 digits = 100000 times of bet
- 6 digits = 1000000 times of bet

Example: If the draw result is `123456` and a customer buys the number `456` for 100 baht, the prize is 1000 times the bet, which is 100,000 baht.

## Assumptions

- The lottery draw result is a 6-digit number.
- Customers can buy tickets with numbers ranging from 1 to 6 digits.
- The prize calculation is based on the number of matching digits from the end of the draw result.
- The system supports the purchase of multiple tickets with different numbers and amounts.
- Customers can choose to buy random numbers with optional fixed digits for specific positions.
- The draw result is set randomly for each draw.
- The system checks winning tickets based on the current draw result and returns the corresponding prize.

## Installation

1. Clone the repository

```bash
git clone https://github.com/notbeingmean/basic-lotto-assignment.git
```

2. Install dependencies

```bash
# using npm
npm install

# or using yarn
yarn install

# or using pnpm
pnpm install

# or using bun
bun install
```

3. Run the test

```bash

# using npm
npm run dev

# or using yarn
yarn dev

# or using pnpm
pnpm dev

# or using bun
bun dev
```
