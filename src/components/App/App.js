import React from 'react';
import Board from '../Board';
import s from './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      winner: '',
      board: [...Array(3)].map(() => Array(3).fill('')),
      nextPlayer: 'X'
    };
  }

  onGameChanged = (rowIndex, cellIndex) => {
    const nextPlayer = this.state.nextPlayer;
    const board = [...this.state.board];
    board[rowIndex][cellIndex] = nextPlayer;
    if (board[0].every(cell => cell === nextPlayer)) {
      this.setState({winner: nextPlayer});
    }
    const newNextPlayer = this.state.nextPlayer === 'X' ? 'O' : 'X';
    this.setState({board, nextPlayer: newNextPlayer});
  }

  render() {
    return (
      <div data-hook="app" className={s.root}>
        <Board handleGameChanged={this.onGameChanged} board={this.state.board}/>
        {this.state.winner && <div data-hook="winner-message">{`${this.state.winner} Wins!`}</div>}
      </div>
    );
  }
}

export default App;
