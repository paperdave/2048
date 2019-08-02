import React, { useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux';
import { moveUp, moveDown, moveRight, moveLeft, start } from '../actions';
import { throttle } from '@reverse/debounce';
import { Swipeable, defineSwipe } from 'react-touch';

const swipeConfig = defineSwipe({ swipeDistance: 50 });

function Input({
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  reset,
  disabled,
  children,
}: {
  moveUp: Function,
  moveDown: Function,
  moveLeft: Function,
  moveRight: Function,
  reset: Function,
  disabled: boolean,
  children: JSX.Element,
}) {
  const activateKey = useMemo(() => throttle(function (key: 'Up' | 'Left' | 'Down' | 'Right' | 'Reset') {
    switch (key) {
      case 'Reset': { reset(); break; }
      case 'Up': { moveUp(); break; }
      case 'Down': { moveDown(); break; }
      case 'Left': { moveLeft(); break; }
      case 'Right': { moveRight(); break; }
      default:
        break;
    }
  }, 125), [moveUp, moveDown, moveLeft, moveRight, reset]);

  const onKeyPress = useCallback((ev: KeyboardEvent) => {
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
  }, [activateKey]);

  useEffect(() => {
    if (!disabled) {
      window.addEventListener('keydown', onKeyPress);
      return () => {
        window.removeEventListener('keydown', onKeyPress);
      };
    }
  }, [disabled, onKeyPress]);

  // const activateKeyReset = useCallback(() => activateKey('Reset'), [activateKey])
  const activateKeyUp = useCallback(() => (console.log('Up'), activateKey('Up')), [activateKey])
  const activateKeyDown = useCallback(() => (console.log('Down'), activateKey('Down')), [activateKey])
  const activateKeyLeft = useCallback(() => (console.log('Left'), activateKey('Left')), [activateKey])
  const activateKeyRight = useCallback(() => (console.log('Right'), activateKey('Right')), [activateKey])

  return <Swipeable
    onSwipeUp={activateKeyUp}
    onSwipeDown={activateKeyDown}
    onSwipeLeft={activateKeyLeft}
    onSwipeRight={activateKeyRight}
    config={swipeConfig}
  >
    {children}
  </Swipeable>;
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
