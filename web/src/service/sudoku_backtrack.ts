export type BackTrack = {
  board: string[][];
  onMove?: (i: number, j: number, value: string) => void;
  onFinish?: () => void;
};

const backtrack = ({ board, onMove, onFinish }: BackTrack) => {
  const unsolvedBoard = JSON.parse(JSON.stringify(board)); // deep copy to keep track of previous values which cant be changed

  const verticalCheck = (
    board: string[][],
    i: number,
    j: number,
    value: string
  ) => {
    let col = j;
    for (let row = 0; row < 9; row++) {
      if (i === row) continue;
      if (board[i][col] === value) return false;
    }

    return true;
  };

  const horizontalCheck = (
    board: string[][],
    i: number,
    j: number,
    value: string
  ) => {
    let row = i;
    for (let col = 0; col < 9; col++) {
      if (j === col) continue;
      if (board[row][j] === value) return false;
    }

    return true;
  };

  const boxCheck = (board: string[][], i: number, j: number, value: string) => {
    let lowerRow = (i / 3) * 1;
    let upperRow = (i / 3) * 2;

    let lowerCol = (j / 3) * 1;
    let upperCol = (j / 3) * 2;
    for (let r = lowerRow; r < upperRow; r++) {
      for (let c = lowerCol; r < upperCol; c++) {
        if (i === r && j === c) continue;
        if (board[r][c] === value) {
          return false;
        }
      }
    }

    return true;
  };

  const isValidValueForPosition = (
    board: string[][],
    i: number,
    j: number,
    value: string
  ) => {
    return (
      verticalCheck(board, i, j, value) &&
      horizontalCheck(board, i, j, value) &&
      boxCheck(board, i, j, value)
    );
  };

  const getPreviousPosition = (board: string[][], i: number, j: number) => {
    for (let row = i; row >= 0; row--) {
      for (let col = j; col >= 0; col--) {
        if (i === row && j === col) continue;
        if (unsolvedBoard[row][col] === "") {
          return [row, col];
        }
      }
    }

    return [null, null];
  };

  const getNextPosition = (board: string[][], i: number, j: number) => {
    for (let row = i; row < 9; row++) {
      for (let col = j; col < 9; col++) {
        if (board[row][col] === "") {
          return [row, col];
        }
      }
    }
    console.log("NOT FOUND");
    return [null, null];
  };

  const getNextValueForPosition = (board: string[][], i: number, j: number) => {
    return Number(board[i][j]) + 1 > 9 ? "" : String(Number(board[i][j] + 1));
  };

  const solve = (board: string[][]) => {
    let r = 0;
    let c = 0;

    console.log(board);
    let [ni, nj] = getNextPosition(board, r, c);
    if (ni === null || nj === null) {
      const pp = getPreviousPosition(board, r, c);
      ni = pp[0];
      nj = pp[1];
    }
    if (ni === null || nj === null) throw new Error("Unsolvabled");
    if(getNextValueForPosition(board, ni, nj) === "") {
    }
    r = ni;
    c = nj;
  };
  try {
    solve(board);
  } catch (e) {
    if (onFinish) {
      onFinish();
    }
  }
};
export default backtrack;
