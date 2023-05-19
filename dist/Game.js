import { Player } from './Player.js';
export class Game {
    static players = [
        new Player('User 1', 'X'),
        new Player('User 2', 'O')
    ];
    static currentPlayerIndex = 0;
    static board;
    static gameOver = false;
    static getCurrentPlayer() {
        return Game.players[Game.currentPlayerIndex];
    }
    static isBoardFull() {
        const cells = Game.board.getCells();
        return cells.every(row => row.every(cell => cell.getValue() !== null));
    }
    static togglePlayer() {
        Game.currentPlayerIndex = (Game.currentPlayerIndex + 1) % Game.players.length;
    }
    static checkForWin() {
        const cells = Game.board.getCells();
        const currentPlayer = Game.getCurrentPlayer();
        let hasWon = false;
        //horizontal
        for (let row = 0; row < cells.length; row++) {
            let count = 0;
            for (let col = 0; col < cells[row].length; col++) {
                if (cells[row][col].getValue() === currentPlayer.getSymbol()) {
                    count++;
                    if (count === 4) {
                        hasWon = true;
                        break;
                    }
                }
                else {
                    count = 0;
                }
            }
            if (hasWon)
                break;
        }
        //vertical
        if (!hasWon) {
            for (let col = 0; col < cells[0].length; col++) {
                let count = 0;
                for (let row = 0; row < cells.length; row++) {
                    if (cells[row][col].getValue() === currentPlayer.getSymbol()) {
                        count++;
                        if (count === 4) {
                            hasWon = true;
                            break;
                        }
                    }
                    else {
                        count = 0;
                    }
                }
                if (hasWon)
                    break;
            }
        }
        // diagonal (top-left to bottom-right)
        if (!hasWon) {
            for (let startRow = 0; startRow <= cells.length - 4; startRow++) {
                for (let startCol = 0; startCol <= cells[0].length - 4; startCol++) {
                    let count = 0;
                    for (let i = 0; i < 4; i++) {
                        if (cells[startRow + i][startCol + i].getValue() === currentPlayer.getSymbol()) {
                            count++;
                            if (count === 4) {
                                hasWon = true;
                                break;
                            }
                        }
                        else {
                            count = 0;
                        }
                    }
                    if (hasWon)
                        break;
                }
                if (hasWon)
                    break;
            }
        }
        // diagonal (top-right to bottom-left)
        if (!hasWon) {
            for (let startRow = 0; startRow <= cells.length - 4; startRow++) {
                for (let startCol = cells[0].length - 1; startCol >= 3; startCol--) {
                    let count = 0;
                    for (let i = 0; i < 4; i++) {
                        if (cells[startRow + i][startCol - i].getValue() === currentPlayer.getSymbol()) {
                            count++;
                            if (count === 4) {
                                hasWon = true;
                                break;
                            }
                        }
                        else {
                            count = 0;
                        }
                    }
                    if (hasWon)
                        break;
                }
                if (hasWon)
                    break;
            }
        }
        if (hasWon) {
            Game.handleWin(currentPlayer);
            return;
        }
        if (Game.isBoardFull())
            Game.handleTie();
    }
    static handleWin(player) {
        if (Game.gameOver)
            return;
        Game.gameOver = true;
        setTimeout(() => {
            if (Game.gameOver) {
                alert(`Player ${player.getName()} wins!`);
                Game.resetGame();
            }
        }, 50);
    }
    static handleTie() {
        Game.gameOver = true;
        alert("It's a tie!");
        Game.resetGame();
    }
    static resetGame() {
        Game.currentPlayerIndex = 0;
        Game.board.reset();
        Game.gameOver = false;
    }
}
//# sourceMappingURL=Game.js.map