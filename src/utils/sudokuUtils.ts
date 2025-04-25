export const createEmptyBoard = (): (number | null)[][] => {
    return Array(9).fill(null).map(() => Array(9).fill(null));
  };
  
  export const isValidMove = (
    board: (number | null)[][],
    row: number,
    col: number,
    num: number
  ): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
  
    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }
  
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }
  
    return true;
  };
  
  export const solveSudoku = (board: (number | null)[][]): boolean => {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) return true;
  
    const [row, col] = emptyCell;
  
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(board, row, col, num)) {
        board[row][col] = num;
        if (solveSudoku(board)) return true;
        board[row][col] = null;
      }
    }
  
    return false;
  };
  
  const findEmptyCell = (board: (number | null)[][]): [number, number] | false => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) return [row, col];
      }
    }
    return false;
  };
  
  export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';
  
  export const generatePuzzle = (difficulty: Difficulty): (number | null)[][] => {
    const board = createEmptyBoard();
    
    // Fill diagonal boxes first (which are independent of each other)
    fillDiagonalBoxes(board);
    
    // Solve the rest of the board
    solveSudoku(board);
    
    // Remove numbers based on difficulty
    const cellsToRemove = {
      easy: 40,      // ~45 numbers remain
      medium: 50,    // ~35 numbers remain
      hard: 55,      // ~30 numbers remain
      extreme: 60    // ~25 numbers remain
    }[difficulty];
    
    return removeNumbers(board, cellsToRemove);
  };
  
  const fillDiagonalBoxes = (board: (number | null)[][]): void => {
    for (let box = 0; box < 9; box += 3) {
      const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      let index = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          board[box + i][box + j] = numbers[index++];
        }
      }
    }
  };
  
  const shuffle = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  const removeNumbers = (board: (number | null)[][], count: number): (number | null)[][] => {
    const newBoard = board.map(row => [...row]);
    const positions = shuffle(
      Array.from({ length: 81 }, (_, i) => ({ row: Math.floor(i / 9), col: i % 9 }))
    );
  
    for (let i = 0; i < count; i++) {
      const { row, col } = positions[i];
      newBoard[row][col] = null;
    }
  
    return newBoard;
  };
