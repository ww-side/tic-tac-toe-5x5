import { Cell } from './Cell.js';

export class Board {
  private boardElement: HTMLElement;
  cells: Cell[][];

  constructor() {
    this.boardElement = document.querySelector('#board')!;
    this.cells = [];
    const rows = 5;
    const cols = 5;

    this.boardElement.className = `board`;

    const boardTable = document.createElement('table');
    this.boardElement.append(boardTable);

    for (let row = 0; row < rows; row++) {
      const rowElement = document.createElement('tr');
      boardTable.append(rowElement);

      const rowCells: Cell[] = [];
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

  getCells(): Cell[][] {
    return this.cells;
  }

  reset(): void {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.setValue(null);
      });
    });
  }
}
