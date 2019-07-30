import { useEffect } from 'react'
import { connect } from 'react-redux';
import { moveUp, moveDown, moveRight, moveLeft } from '../actions';

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
    console.log('rebinding');
    function onKeyPress(ev: KeyboardEvent) {
      switch (ev.key) {
        case 'ArrowUp': { moveUp(); break; }
        case 'ArrowDown': { moveDown(); break; }
        case 'ArrowLeft': { moveLeft(); break; }
        case 'ArrowRight': { moveRight(); break; }
        default:
          break;
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
