/*Create Basic Lotto Service following this requirement

This Basic Lotto Service implements a simple lottery system where users can buy lotto tickets and win based on the drawn result. The lotto service allows users to select the number of digits (from 1 to 6 digits) they wish to bet on, and the system calculates the winnings based on how many digits match the last digits of the randomly drawn 6-digit result. The service should support the purchase of multiple tickets with different numbers and amounts, and users can choose to buy random numbers based on their selected digit length. Additionally, users can specify fixed digits for specific positions in the generated random numbers. The system should also allow users to set the draw result, check winning tickets, and return the corresponding prize based on matching digits.


given: 
- customer can choose to buy ticket that contain many number with different digit example: 123456 for 1000baht, 124 for 500baht
- lotto has 6 digits
- lotto result will draw 1 time which each digit payout is from the last digit example the draw of lotto result is 123456 the prize of 3 digit is 456
- ticket payout base on digit
 1 digit = 10 times of bet example customer buy number 6 for 100 baht and the result is 123456 then the prize is 1000 baht
 2 digit = 100 times of bet example customer buy number 56 for 100 baht and the result is 123456 then the prize is 10000 baht
 3 digit = 1000 times of bet example customer buy number 456 for 100 baht and the result is 123456 then the prize is 100000 baht
 4 digit = 10000 times of bet example customer buy number 3456 for 100 baht and the result is 123456 then the prize is 1000000 baht
 5 digit = 100000 times of bet example customer buy number 23456 for 100 baht and the result is 123456 then the prize is 10000000 baht
 6 digit = 1000000 times of bet example customer buy number 123456 for 100 baht and the result is 123456 then the prize is 100000000 baht


key features:
- buy ticket: buy lotto by input number and amount of money and add to customer ticket
- get ticket: get all ticket that customer buy
- get random number: select digit that want to buy from 1-6 digits, how many numbers to buy, how much money for each number, and optional customer can select fixed number of digit (example: 5 digits, 10 number, 1000 baht and 4th digit is 5 and 5th digit is 6 then output must be random 10 number that last 2 digit is 56)
- set draw: set payout randomly one munber and used for the current draw result
- check win ticket: check winning prize by input all ticket that customer buy and return which number is win and prize
*/

//Example data
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

//Example data for buy random number
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
// mean that customer want to buy 4 digits, 10 number, each 1000 baht,fxied third digit is 8 and fixed second digit is 6

type TicketType = {
  number: number;
  amount: number;
};

class LottoService {
  customerTicket: TicketType[];
  drawResult: string | null;
  constructor() {
    this.customerTicket = [];
    this.drawResult = null;
  }

  buyTicket(ticket: TicketType[]) {
    this.customerTicket.push(...ticket);
    return this.customerTicket;
  }

  getTicket() {
    return this.customerTicket;
  }

  getRandomNumber(
    buyAmount: number,
    buyDigit: number,
    buyNumber: number,
    fixedDigit?: { digit: number; number: number }[]
  ) {
    const randomNumbers: TicketType[] = [];
    const maxNumber = Math.pow(10, buyDigit);
    let fixedPositions: Map<number, string> | null = null;

    if (fixedDigit?.length) {
      fixedPositions = new Map();
      for (const fixed of fixedDigit) {
        const position = buyDigit - fixed.digit;
        fixedPositions.set(position, fixed.number.toString());
      }
    }

    for (let i = 0; i < buyNumber; i++) {
      let randomNumber;
      let numberStr;

      do {
        randomNumber = Math.floor(Math.random() * maxNumber);
        numberStr =
          "0".repeat(buyDigit - randomNumber.toString().length) +
          randomNumber.toString();
      } while (numberStr[0] === "0");

      if (fixedPositions) {
        let digits = numberStr.split("");

        fixedPositions.forEach((value, position) => {
          digits[position] = value;
        });

        randomNumber = parseInt(digits.join(""), 10);
      }

      randomNumbers.push({
        number: randomNumber,
        amount: buyAmount,
      });
    }

    return randomNumbers;
  }

  setDraw() {
    const randomLotto = Math.floor(Math.random() * 1000000);
    this.drawResult = randomLotto.toString();
    // for testing
    // this.drawResult = "123458";
  }

  checkWinTicket() {
    const winningTickets: { ticket: TicketType; prize: number }[] = [];
    const drawResult = this.drawResult;

    if (!drawResult) {
      return winningTickets;
    }

    for (const ticket of this.customerTicket) {
      const ticketStr = ticket.number.toString();
      const winNumber = drawResult.slice(-ticketStr.length);

      if (ticketStr === winNumber) {
        const multiplier = Math.pow(10, ticketStr.length);
        const prize = ticket.amount * multiplier;
        winningTickets.push({ ticket, prize });
      }
    }

    return winningTickets;
  }
}

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
console.log(randomBuyTicketResult);
lottoService.setDraw();
console.log(lottoService.drawResult);
console.log(lottoService.checkWinTicket());
