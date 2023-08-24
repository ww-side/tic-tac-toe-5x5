export class Player {
  name: string;
  symbol: string;

  constructor(name: string, symbol: string) {
    this.name = name;
    this.symbol = symbol;
  }

  getName(): string {
    return this.name;
  }

  getSymbol(): string {
    return this.symbol;
  }
}
