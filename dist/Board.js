import { Cell } from './Cell.js';
export class Board {
    boardElement;
    cells;
    constructor() {
        this.boardElement = document.querySelector('#board');
        this.cells = [];
        const rows = 5;
        const cols = 5;
        this.boardElement.className = `board`;
        const boardTable = document.createElement('table');
        this.boardElement.append(boardTable);
        for (let row = 0; row < rows; row++) {
            const rowElement = document.createElement('tr');
            boardTable.append(rowElement);
            const rowCells = [];
            for (let col = 0; col < cols; col++) {
                const cell = new Cell();
                const cellElement = document.createElement('td');
                cellElement.className = 'cell';
                cellElement.append(cell.getElement());
                rowElement.append(cellElement);
                rowCells.push(cell);
            }
            this.cells.push(rowCells);
        }
    }
    getCells() {
        return this.cells;
    }
    reset() {
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.setValue(null);
            });
        });
    }
}
//# sourceMappingURL=Board.js.map