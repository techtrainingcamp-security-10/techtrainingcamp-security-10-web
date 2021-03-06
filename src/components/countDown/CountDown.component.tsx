import * as R from 'ramda';
import React, { useEffect, useState } from 'react';

import * as Styled from './countDown.styled';

const defaultFormatter = (ms: number) => {
  return Math.round(ms / 1000);
};

type CountDownProps = {
  total: any
  counterRef?: any
  onFinished: any
  formatter: any
  interval?: any
  children?: any
}

const CountDown: React.FC<CountDownProps> = ({ total, counterRef, onFinished, formatter = defaultFormatter, interval = 1000, children }) => {
  const [time, setTime] = useState(0);
  const [resetVersion, setResetVersion] = useState(0);

  if (counterRef && 'current' in counterRef) {
    counterRef.current = {
      reset: () => {
        setResetVersion(resetVersion + 1);
      },
    };
  }

  useEffect(() => {
    setTime(total);
    const handle = setInterval(() => {
      setTime((time: number) => {
        if (time >= interval) {
          return time - interval;
        } else {
          clearInterval(handle);
          onFinished && onFinished();
          return 0;
        }
      });
    }, interval);
    return () => {
      clearInterval(handle);
    };
  }, [total, interval, resetVersion, onFinished]);

  return R.is(Function, children) ? children(formatter(time)) : <Styled.Text>{formatter(time)}</Styled.Text>
};

export default CountDown;
