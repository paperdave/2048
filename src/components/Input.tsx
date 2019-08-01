import { useEffect } from 'react'
import { connect } from 'react-redux';
import { moveUp, moveDown, moveRight, moveLeft, start } from '../actions';
import { throttle } from '@reverse/debounce';

function Input({
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  reset,
}: {
  moveUp: Function,
  moveDown: Function,
  moveLeft: Function,
  moveRight: Function,
  reset: Function,
}) {
  useEffect(() => {
    const activateKey = throttle(function (key: 'Up' | 'Left' | 'Down' | 'Right' | 'Reset') {
      switch (key) {
        case 'Reset': { reset(); break; }
        case 'Up': { moveUp(); break; }
        case 'Down': { moveDown(); break; }
        case 'Left': { moveLeft(); break; }
        case 'Right': { moveRight(); break; }
        default:
          break;
      }
    }, 125);
    function onKeyPress(ev: KeyboardEvent) {
      switch (ev.key.toLowerCase()) {
        case 'escape':
        case 'r':
          activateKey('Reset'); break;
        case 'w':
        case 'arrowup':
          activateKey('Up'); break;
        case 's':
        case 'arrowdown':
          activateKey('Down'); break;
        case 'a':
        case 'arrowleft':
          activateKey('Left'); break;
        case 'd':
        case 'arrowright':
          activateKey('Right'); break;
        default:
      }
    }

    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [moveUp, moveDown, moveLeft, moveRight, reset]);

  return null;
}

export default connect(
  state => ({}),
  {
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    reset: start,
  }
)(Input);
