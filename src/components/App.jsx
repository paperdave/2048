import React from 'react';
import { connect } from 'react-redux';
import { start, moveUp, moveDown, moveLeft, moveRight } from '../actions';

function App({
  score,
  scoreGained,
  board,
  started,
  start,
  turns,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
}) {
  return (
    <div className="App">
      <h1>2048 in redux</h1>
      {
        started
          ? <>
            <button
              onClick={start}
            >restart</button>
            <p>
              score: {score} {scoreGained ? <span key={turns} className='score-gained'>(+{scoreGained})</span> : null}
            </p>
            <table>
              <tbody>
                {
                  board.map((row, i) => {
                    return <tr key={i}>
                      {
                        row.map((item, i) => {
                          return <td key={i}>
                            {item || ''}
                          </td>
                        })
                      }
                    </tr>
                  })
                }
              </tbody>
            </table>

            <br/>

            <span style={{ width: '25px', display: 'inline-block' }} />
            <button onClick={moveUp}>{'^'}</button><br/>
            <button onClick={moveLeft}>{'<'}</button>
            <span style={{ width: '24px', display: 'inline-block' }} />
            <button onClick={moveRight}>{'>'}</button><br />
            <span style={{ width: '25px', display: 'inline-block' }} />
            <button onClick={moveDown}>{'v'}</button>
          </>
          : <>
            <p>
              press btn
            </p>
            <button
              onClick={start}
            >start</button>
          </>
      }
    </div>
  );
}

export default connect(
  state => ({
    started: state.game.started,
    board: state.game.board,
    score: state.game.score,
    scoreGained: state.game.scoreGained,
    turns: state.game.turns,
  }),
  {
    start,
    moveUp,
    moveDown,
    moveLeft,
    moveRight
  },
)(App);
