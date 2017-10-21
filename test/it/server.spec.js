import {expect} from 'chai';
import {testBaseUrl} from '../test-common';
import {beforeAndAfter} from '../environment';
import fetch from 'node-fetch';

describe('Saving and loading', () => {

  beforeAndAfter();

  it('should load a saved game', async () => {
    const aGame = {
      board: [['X', 'O', 'X'], ['', '', ''], ['', '', '']],
      xWins: 0,
      oWins: 0,
    };
    await fetch(`${testBaseUrl}/api/game`, {
      method: 'post',
      body: JSON.stringify(aGame),
      headers: {'Content-Type': 'application/json'}
    });

    const response = await fetch(`${testBaseUrl}/api/game`);
    expect(await response.json()).to.eql(aGame);
  });
  // it('should display a title', async () => {
  //   const response = await axiosInstance.get('/');
  //   expect(response.data).to.contain('Wix Full Stack Project Boilerplate');
  // });
});
