
import React, { useState, useRef, useEffect } from 'react';
import backtrack from './service/sudoku_backtrack';

const isDigitValid = (value: string) => {
  return parseInt(value) > 0 && parseInt(value) <= 9;
}

const App = () => {

  const [board, setBoard] = useState([...Array(9)].map(_ => [...Array(9)].fill("")));
  const ref = useRef();
  const mission = "970004000300700095000000002000900200100000400005006019006080000500400037000000100"
  const solution = "972654381314728695658319742867941253129835476435276819796183524581462937243597168"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBoard([...Array(9)].map(_ => [...Array(9)]).map((r, i) => r.map((_, j) => mission.split('')[(i + 1) * j] !== "0" ? mission.split('')[(i + 1) * j] : "")));
  }, []);

  const setValueAt = (i: number, j: number, value: string) => {
    if (loading) return;
    setBoard(prev => {
      if (mission.split('')[(i + 1) * j] === "0") {
        const newBoard = JSON.parse(JSON.stringify(prev));
        newBoard[i][j] = newBoard[i][j] === "" ? isDigitValid(value) ? value : "" : isDigitValid(value) ? value[1] : value[0];
        return newBoard;
      }
      return prev;
    })
  }

  const onAiMove = (i: number, j: number, value: string) => {
    setBoard(prev => {
      if (mission.split('')[(i + 1) * j] === "0") {
        const newBoard = JSON.parse(JSON.stringify(prev));
        newBoard[i][j] = newBoard[i][j] === "" ? isDigitValid(value) ? value : "" : isDigitValid(value) ? value[1] : value[0];
        return newBoard;
      }
      return prev;
    })
  }

  const onFinish = () => {
    setLoading(false);
  }

  const onClickSolve = () => {
    if (loading) return;
    setLoading(true);
    backtrack({
      board: board, onMove: onAiMove, onFinish
    })
  }

  return (
    <div className='bg-black min-h-screen text-white flex flex-col items-center justify-center'>
      <div className='border border-white shadow-lg shadow-white'>
        {board.map((r, i) => {
          return <div key={i} className='flex'>{r.map((c, j) => {
            return <input key={j} type='number' className='caret-transparent text-center appearance-none outline-none border m-0 border-blue-300 bg-blue-500 w-8 h-8 focus:border-2 focus:border-blue-100 focus:outline-none' value={c} onChange={(e) => setValueAt(i, j, e.target.value)} ></input>
          })}</div>
        })}
      </div>
      <div className='h-5'></div>
      <button className='shadow-lg shadow-white bg-blue-500 p-2 border flex gap-2 border-blue-200 px-8 active:bg-blue-800' disabled={loading} onClick={() => onClickSolve()}>
        {loading && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white animate-spin w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        }
        <span>Solve</span>
      </button>
      <div className='h-5'></div>
      <NumPad onClick={function (value: number): void {
      }} />
    </div >
  );
}

export type NumPadProps = {
  onClick: (value: number) => void;
}
const NumPad: React.FC<NumPadProps> = ({ onClick }) => {
  return <div className='flex gap-2'> {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => {
    return <button key={v} className='shadow-lg shadow-white bg-blue-500 border border-blue-300 text-center w-8 h-8 flex items-center justify-center' onClick={() => onClick(v)}>{v}</button>;
  })}
  </div >
}

export default App;
