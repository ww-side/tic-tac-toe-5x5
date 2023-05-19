import { Game } from "./Game.js";
export class Cell {
    element;
    value;
    constructor() {
        this.element = document.createElement('span');
        this.element.className = 'cell symbol';
        this.element.addEventListener('click', this.handleClick.bind(this));
        this.value = null;
    }
    getElement() {
        return this.element;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
        this.element.textContent = value;
    }
    handleClick() {
        if (!this.value && !Game.gameOver) {
            const currentPlayer = Game.getCurrentPlayer();
            this.setValue(currentPlayer.getSymbol());
            Game.checkForWin();
            Game.gameOver ? Game.handleWin(currentPlayer) : Game.togglePlayer();
        }
    }
}
//# sourceMappingURL=Cell.js.map