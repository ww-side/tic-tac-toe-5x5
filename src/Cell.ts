import { Game } from './Game.js';

export class Cell {
  element: HTMLElement;
  private value: string | null;

  constructor() {
    this.element = document.createElement('span');
    this.element.className = 'cell symbol';
    this.element.addEventListener('click', this.handleClick.bind(this));
    this.value = null;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getValue(): string | null {
    return this.value;
  }

  setValue(value: string | null): void {
    this.value = value;
    this.element.textContent = value;
  }

  handleClick(): void {
    if (Game.players.length === 0) {
      return;
    }

    if (!this.value && !Game.gameOver) {
      const currentPlayer = Game.getCurrentPlayer();
      this.element.classList.add('cell-active');
      this.setValue(currentPlayer.getSymbol());
      Game.checkForWin();
      Game.gameOver ? Game.handleWin(currentPlayer) : Game.togglePlayer();
    }
  }
}
