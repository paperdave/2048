import { useEffect } from 'react'
import { connect } from 'react-redux';
import { moveUp, moveDown, moveRight, moveLeft } from '../actions';
import { throttle } from '@reverse/debounce';

function Input({
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
}: {
  moveUp: Function,
  moveDown: Function,
  moveLeft: Function,
  moveRight: Function,
}) {
  useEffect(() => {
    const activateKey = throttle(function (key: 'ArrowUp' | 'ArrowLeft' | 'ArrowDown' | 'ArrowRight') {
      switch (key) {
        case 'ArrowUp': { moveUp(); break; }
        case 'ArrowDown': { moveDown(); break; }
        case 'ArrowLeft': { moveLeft(); break; }
        case 'ArrowRight': { moveRight(); break; }
        default:
          break;
      }
    }, 125);
    function onKeyPress(ev: KeyboardEvent) {
      switch (ev.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          activateKey('ArrowUp'); break;
        case 's':
        case 'arrowdown':
          activateKey('ArrowDown'); break;
        case 'a':
        case 'arrowleft':
          activateKey('ArrowLeft'); break;
        case 'd':
        case 'arrowright':
          activateKey('ArrowRight'); break;
        default:
      }
    }

    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [moveUp, moveDown, moveLeft, moveRight]);

  return null;
}

export default connect(
  state => ({}),
  {
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
  }
)(Input);
