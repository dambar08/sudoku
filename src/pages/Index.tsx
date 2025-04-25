import React, { useState, useEffect } from 'react';
import SudokuBoard from '@/components/SudokuBoard';
import NumberPad from '@/components/NumberPad';
import { Button } from '@/components/ui/button';
import DifficultySelector from '@/components/DifficultySelector';
import BackgroundMusic from '@/components/BackgroundMusic';
import { createEmptyBoard, generatePuzzle, solveSudoku, type Difficulty } from '@/utils/sudokuUtils';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [board, setBoard] = useState<(number | null)[][]>(createEmptyBoard());
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!selectedCell) return;
      
      const number = parseInt(event.key);
      if (!isNaN(number) && number >= 1 && number <= 9) {
        handleCellChange(selectedCell.row, selectedCell.col, number);
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        handleCellChange(selectedCell.row, selectedCell.col, null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell]);

  const handleCellChange = (row: number, col: number, value: number | null) => {
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  const handleClear = () => {
    setBoard(createEmptyBoard());
    setSelectedCell(null);
  };

  const handleSolve = () => {
    const boardCopy = board.map(row => [...row]);
    if (solveSudoku(boardCopy)) {
      setBoard(boardCopy);
      toast({
        title: "Puzzle Solved!",
        description: "Here's the solution to your Sudoku puzzle.",
      });
    } else {
      toast({
        title: "No Solution",
        description: "This puzzle cannot be solved. Please check your inputs.",
        variant: "destructive",
      });
    }
  };

  const generateNewPuzzle = () => {
    const newPuzzle = generatePuzzle(difficulty);
    setBoard(newPuzzle);
    setSelectedCell(null);
    toast({
      title: "New Puzzle Generated",
      description: `Created a new ${difficulty} puzzle for you to solve.`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-primary text-center animate-scale-in">
          Sudoku Puzzle
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <DifficultySelector value={difficulty} onSelect={setDifficulty} />
          <Button 
            onClick={generateNewPuzzle}
            className="w-full sm:w-auto hover:scale-105 transition-transform"
          >
            Generate New Puzzle
          </Button>
        </div>

        <div className="space-y-6">
          <SudokuBoard
            board={board}
            onCellChange={handleCellChange}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
          />
          <NumberPad
            onNumberSelect={(num) => selectedCell && handleCellChange(selectedCell.row, selectedCell.col, num)}
            onClear={handleClear}
          />
          <Button 
            onClick={handleSolve}
            className="w-full hover:scale-105 transition-transform"
            variant="outline"
          >
            Solve Puzzle
          </Button>
        </div>
      </div>
      <BackgroundMusic />
    </div>
  );
};

export default Index;
