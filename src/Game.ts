import { Player } from './Player.js';
import { Board } from './Board.js';

export class Game {
  static players: Player[] = [];
  static initializePlayers(player1Name: string, player2Name: string) {
    Game.players = [new Player(player1Name, 'X'), new Player(player2Name, 'O')];
  }
  static currentPlayerIndex = 0;
  static board: Board;
  static gameOver = false;

  static getCurrentPlayer(): Player {
    return Game.players[Game.currentPlayerIndex];
  }

  static isBoardFull(): boolean {
    const cells = Game.board.getCells();

    return cells.every(row => row.every(cell => cell.getValue() !== null));
  }

  static togglePlayer(): void {
    Game.currentPlayerIndex =
      (Game.currentPlayerIndex + 1) % Game.players.length;
  }

  static checkForWin(): void {
    const cells = Game.board.getCells();
    const currentPlayer = Game.getCurrentPlayer();
    let hasWon = false;

    const checkConsecutiveSymbols = (symbols: string[]): boolean => {
      let count = 0;
      for (const symbol of symbols) {
        if (symbol === currentPlayer.getSymbol()) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          count = 0;
        }
      }
      return false;
    };

    // Horizontal
    for (const row of cells) {
      const rowSymbols = row.map(cell => cell.getValue()) as string[];
      if (checkConsecutiveSymbols(rowSymbols)) {
        hasWon = true;
        break;
      }
    }

    // Vertical
    if (!hasWon) {
      for (let col = 0; col < cells[0].length; col++) {
        const columnSymbols = cells.map(row => row[col].getValue()) as string[];
        if (checkConsecutiveSymbols(columnSymbols)) {
          hasWon = true;
          break;
        }
      }
    }

    // Diagonal (top-left to bottom-right)
    if (!hasWon) {
      for (let startRow = 0; startRow <= cells.length - 4; startRow++) {
        for (let startCol = 0; startCol <= cells[0].length - 4; startCol++) {
          const diagonalSymbols = [];
          for (let i = 0; i < 4; i++) {
            diagonalSymbols.push(cells[startRow + i][startCol + i].getValue());
          }
          if (checkConsecutiveSymbols(diagonalSymbols as string[])) {
            hasWon = true;
            break;
          }
        }
        if (hasWon) break;
      }
    }

    // Diagonal (top-right to bottom-left)
    if (!hasWon) {
      for (let startRow = 0; startRow <= cells.length - 4; startRow++) {
        for (let startCol = cells[0].length - 1; startCol >= 3; startCol--) {
          const diagonalSymbols = [];
          for (let i = 0; i < 4; i++) {
            diagonalSymbols.push(cells[startRow + i][startCol - i].getValue());
          }
          if (checkConsecutiveSymbols(diagonalSymbols as string[])) {
            hasWon = true;
            break;
          }
        }
        if (hasWon) break;
      }
    }

    if (hasWon) {
      Game.handleWin(currentPlayer);
      return;
    }

    if (Game.isBoardFull()) {
      Game.handleTie();
    }
  }

  static handleWin(player: Player): void {
    if (Game.gameOver) return;

    Game.gameOver = true;
    setTimeout(() => {
      if (Game.gameOver) {
        alert(`Player ${player.getName()} wins!`);
        Game.resetGame();
      }
    }, 10);
  }

  static handleTie(): void {
    Game.gameOver = true;
    alert("It's a tie!");
    Game.resetGame();
  }

  static resetGame(): void {
    Game.currentPlayerIndex = 0;
    Game.board.reset();
    Game.gameOver = false;

    const cells = Game.board.getCells();
    cells.forEach(row => {
      row.forEach(cell => {
        const cellElement = cell.getElement();
        cellElement.classList.remove('cell-active');
      });
    });
  }
}
