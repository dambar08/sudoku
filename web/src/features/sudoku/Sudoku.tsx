import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectBoard } from "./sudokuSlice";

export function Counter() {
  const count = useAppSelector(selectBoard);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>

    </div>
  );
}
