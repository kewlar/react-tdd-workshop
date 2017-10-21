import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import App, {WON, TIE, getGameStatus} from './App';

let wrapper;
const render = element => mount(
  element, {attachTo: document.createElement('div')}
);
const clickACellAt = index => wrapper.find('[data-hook="cell"]')
  .at(index).simulate('click');
const getCellTextAt = index => wrapper.find('[data-hook="cell"]')
  .at(index).text();
const getWinnerMessage = () => wrapper.find('[data-hook="winner-message"]').text();

describe('App', () => {

  afterEach(() => wrapper.detach());

  it('should have "O" after second user plays', () => {
    wrapper = render(<App/>);
    clickACellAt(0);
    clickACellAt(1);
    expect(getCellTextAt(1)).to.equal('O');
  });

  it('player "O" should win the game', () => {
    wrapper = render(<App/>);
    clickACellAt(4);
    clickACellAt(0);
    clickACellAt(5);
    clickACellAt(1);
    clickACellAt(7);
    clickACellAt(2);
    expect(getWinnerMessage()).to.equal('O Wins!');
  });
});

it('should not change state of cell when it is taken', () => {
  wrapper = render(<App/>);
  clickACellAt(0);
  clickACellAt(0);
  expect(getCellTextAt(0)).to.equal('X');
});

it('should detect a tie', () => {
  // ['O', 'X', 'O'],
  // ['X', 'O', 'X'],
  // ['X', 'O', 'X']

  wrapper = render(<App/>);
  clickACellAt(1); // X
  clickACellAt(0); // O
  clickACellAt(3); // X
  clickACellAt(2); // O
  clickACellAt(6); // X
  clickACellAt(4); // O
  clickACellAt(8); // X
  clickACellAt(7); // O
  clickACellAt(5); // X
  expect(getWinnerMessage()).to.equal("It's a tie!");
});

describe('getGameStatus', () => {
  it('X should win the game', () => {
    const board = [
      ['X', 'X', 'X'],
      ['', '', ''],
      ['', '', '']
    ];
    expect(getGameStatus(board)).to.equal(WON);
  });

  it('O should win the game', () => {
    const board = [
      ['', '', ''],
      ['O', 'O', 'O'],
      ['', '', '']
    ];
    expect(getGameStatus(board)).to.equal(WON);
  });

  it('O should win the game', () => {
    const board = [
      ['', '', ''],
      ['', '', ''],
      ['O', 'O', 'O'],
    ];
    expect(getGameStatus(board)).to.equal(WON);
  });

  it('O should win the game on the first column', () => {
    const board = [
      ['O', '', ''],
      ['O', '', ''],
      ['O', '', ''],
    ];
    expect(getGameStatus(board)).to.equal(WON);
  });


  it('O should win the game on the second column', () => {
    const board = [
      ['', 'O', ''],
      ['', 'O', ''],
      ['', 'O', ''],
    ];
    expect(getGameStatus(board)).to.equal(WON);
  });


  it('X should win the game on the last column', () => {
    const board = [
      ['', 'O', 'X'],
      ['', 'O', 'X'],
      ['', '', 'X'],
    ];
    expect(getGameStatus(board)).to.equal(WON);
  });

  it('X should win the game on diagonal', () => {
    const board = [
      ['X', '', ''],
      ['', 'X', ''],
      ['', '', 'X']
    ];
    expect(getGameStatus(board)).to.equal(WON);
  });

  it('O should win the game on diagonal', () => {
    const board = [
      ['', '', 'O'],
      ['', 'O', ''],
      ['O', '', '']
    ];
    expect(getGameStatus(board)).to.equal(WON);
  });

  it('should detect an unfinished game', () => {
    const board = [
      ['O', 'X', 'O'],
      ['X', 'O', ''],
      ['X', 'O', 'X']
    ];
    expect(getGameStatus(board)).to.equal(false);
  });

  it('should detect a tie situation', () => {
    const board = [
      ['O', 'X', 'O'],
      ['X', 'O', 'O'],
      ['X', 'O', 'X']
    ];
    expect(getGameStatus(board)).to.equal(TIE);
  });

});
