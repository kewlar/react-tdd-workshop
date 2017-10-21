import React from 'react';
import Board from '../Board';
import './App.scss';

export const WON = 'WON';
export const TIE = 'TIE';

export const getGameStatus = board => {
  const isGameWon = player => {
    const lines = [
      // rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    return lines.some(line => {
      return line
        .map(cell => {
          const rowIndex = Math.floor(cell / 3);
          const cellIndex = cell % 3;

          return board[rowIndex][cellIndex]
        })
        .every(cell => cell === player)
      ;
    });
  };

  if (isGameWon('X') || isGameWon('O')) {
    return WON;
  }

  if (board.every(row => row.every(cell => cell !== ''))) {
    return TIE;
  }

  return false;
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      winner: '',
      nextPlayer: 'X'
    };
  }

  save() {
    fetch('/api/game', {
      method: 'POST',
      body: JSON.stringify({board: this.state.board}),
      headers: {'Content-Type': 'application/json'}
    });
  }

  async load() {
    const response = await fetch('/api/game');
    const {board} = await response.json();
    this.setState({board});
  }

  gameStatus() {
    return getGameStatus(this.state.board);
  }

  handleGameChange(rowI, cellI) {
    const board = [...this.state.board];
    const nextPlayer = this.state.nextPlayer;

    if(board[rowI][cellI])
      return;

    board[rowI][cellI] = nextPlayer;

    if (getGameStatus(board) === WON) {
      this.setState({winner: nextPlayer});
    }
    const newNextPlayer = nextPlayer === 'X' ? 'O' : 'X';
    this.setState({board, nextPlayer: newNextPlayer});
  }

  render() {
    const itIsATie = this.gameStatus() === TIE;

    return (
      <div data-hook="app" className="root">
        <span data-hook="player-X" className={this.state.nextPlayer === 'X' ? 'active':''}>X</span>
        <span data-hook="player-O" className={this.state.nextPlayer === 'O' ? 'active':''}>O</span>
        <Board
          board={this.state.board}
          onGameChanged={(rowIndex, cellIndex) => this.handleGameChange(rowIndex, cellIndex)}
          />
        {this.gameStatus() &&
          <div data-hook="winner-message" className="winner-message">
            {itIsATie ? "It's a tie!": `${this.state.winner} Wins!`}
          </div>}
        <div>
          <button onClick={() => this.save()} data-hook="save">Save</button>
          <button onClick={() => this.load()} data-hook="load">Load</button>
        </div>
      </div>
    );
  }
}

export default App;
