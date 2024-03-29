import React, { useState, useCallback } from 'react'
import styles from '../css/App.module.css';
import Board from './Board';
import Input from './Input';
import Header from './Header';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const easeInOutQuint = [0.86, 0, 0.1, 1];

function DuplicateMagic({ children }: { children: JSX.Element[] | JSX.Element}) {
  return <>
    <div style={{ position: 'absolute' }}>
      {children}
    </div>
    <div style={{ fontSize:'1.20rem', visibility: 'hidden', overflow: 'visible' }} aria-hidden>
      {children}
    </div>
  </>
}

export default function App() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback((ev) => {
    ev.preventDefault();
    setExpanded(x => !x);
  }, []);

  return (
      <div className={clsx(styles.root, expanded && styles.expanded)}>
        <h1>2048</h1>
        <p>
          <b>Join the numbers and get to the 2048 tile!</b> This is an experiment to
          learn <a href="https://redux.js.org/">Redux</a> and some better coding
          practices.
        </p>

        <motion.div
          className={styles.info}
          animate={{ height: expanded ? 'auto' : '0' }}
          initial={{ height: '0' }}
          style={{ overflowY: 'hidden' }}
          transition={{ ease: easeInOutQuint, duration: expanded ? 0.35 : 0.40 }}
        >
          <DuplicateMagic>
            <p>
              Previously, I have never used Redux, but I somehow learned the basics somewhat well, and
              implemented a copy of <a href="https://play2048.co/">2048</a> in about no time. Once I had all the game mechanics done, I
              started building the game UI.
            </p>
            <p>
              For the Game UI, I designed it all myself with <a href="https://figma.com">Figma</a>,
              exported it into a couple of React Components, and then animated it
              with <a href="https://framer.com/motion/">Framer Motion</a>. A couple more reducer tweaks
              later, and then you got a full game.
            </p>
            <p>
              The game is <a href="https://github.com/imdaveead/2048">open sourced on GitHub</a>, so you can see how I programmed it. And it's not that
              bad of code, I'd say at least.
            </p>
            <div style={{ height: '0.25em' }}></div>
          </DuplicateMagic>
        </motion.div>

        <p>
          <a href="#about" onClick={toggleExpanded}>
            {expanded ? 'Play the Game' : 'Read More'}
          </a>
          {
            <motion.span
              animate={{ opacity: expanded ? 1 : 0 }}
              initial={{ opacity: 0 }}
            >
              {' | '}
              <a href="https://davecode.me/">
                More Content
              </a>
            </motion.span>
          }
        </p>

        <motion.div
          animate={{ height: expanded ? '0' : 'auto' }}
          initial={{ height: 'auto' }}
          transition={{ ease: easeInOutQuint, duration: expanded ? 0.35 : 0.40 }}
          style={{ overflowY: 'hidden' }}
        >
          <Header />
          <Input disabled={expanded}>
            <Board />
          </Input>
        </motion.div>
      </div>
  )
}
