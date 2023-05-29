import { Game } from './Game.js';

export class Form {
  form: HTMLFormElement | null = document.querySelector(
    '#playerForm'
  ) as HTMLFormElement | null;
  renameBtn: HTMLButtonElement | null = document.querySelector(
    '#rename-btn'
  ) as HTMLButtonElement | null;
  output: HTMLElement | null = document.querySelector(
    '#output-players'
  ) as HTMLElement | null;

  enableFormInputs(form: HTMLFormElement): void {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.disabled = false;
    });
  }

  enableFormButton(form: HTMLFormElement): void {
    const button = form.querySelector('button');
    if (button) {
      button.disabled = false;
    }
  }

  disableFormInputs(form: HTMLFormElement): void {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.disabled = true;
    });
  }

  disableFormButton(form: HTMLFormElement): void {
    const button = form.querySelector('button');
    if (button) {
      button.disabled = true;
    }
  }

  constructor() {
    if (this.form) {
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        const player1NameElement = document.getElementById(
          'player1'
        ) as HTMLInputElement | null;
        const player2NameElement = document.getElementById(
          'player2'
        ) as HTMLInputElement | null;

        if (player1NameElement && player2NameElement && this.output) {
          const player1Name = player1NameElement.value;
          const player2Name = player2NameElement.value;

          const isEmptyFields = [player2Name, player1Name].some(
            field => field.trim() === ''
          );

          if (isEmptyFields) return;

          Game.initializePlayers(player1Name, player2Name);

          this.output.innerHTML = `Player 1: ${player1Name}. Player 2: ${player2Name}`;
        }

        if (this.form) {
          this.form.reset();
          this.disableFormInputs(this.form);
          this.disableFormButton(this.form);
        }
      });
    }

    if (this.renameBtn) {
      this.renameBtn.addEventListener('click', () => {
        if (this.form) {
          this.enableFormInputs(this.form);
          this.enableFormButton(this.form);
        }
      });
    }
  }
}
