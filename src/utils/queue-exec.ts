export default function queueExec<Args extends any[]>(func: (...args: Args) => void, waitTime: number) {
  const funcQueue: Args[] = [];
  let isWaiting = false;

  function executeFunc(...params: Args) {
    isWaiting = true;
    func(...params);
    setTimeout(play, waitTime);
  };

  function play() {
    isWaiting = false;
    const params = funcQueue.shift();
    if (params !== undefined) {
      executeFunc(...params);
    }
  };

  return function (...params: Args) {
    if (isWaiting) {
      funcQueue.push(params);
    } else {
      executeFunc(...params);
    }
  }
};
