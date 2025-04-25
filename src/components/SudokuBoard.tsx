import React from 'react';
import { cn } from "@/lib/utils";

interface SudokuBoardProps {
  board: (number | null)[][];
  onCellChange: (row: number, col: number, value: number | null) => void;
  selectedCell: { row: number; col: number } | null;
  setSelectedCell: (cell: { row: number; col: number } | null) => void;
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({
  board,
  onCellChange,
  selectedCell,
  setSelectedCell,
}) => {
  return (
    <div className="grid grid-cols-9 gap-0 border-2 border-primary w-fit mx-auto">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
          const isInSameBox =
            selectedCell &&
            Math.floor(rowIndex / 3) === Math.floor(selectedCell.row / 3) &&
            Math.floor(colIndex / 3) === Math.floor(selectedCell.col / 3);

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "w-12 h-12 flex items-center justify-center border border-gray-200 text-lg font-medium transition-colors",
                isSelected && "bg-primary text-white",
                isInSameBox && !isSelected && "bg-secondary/20",
                (rowIndex + 1) % 3 === 0 && "border-b-2 border-b-primary",
                (colIndex + 1) % 3 === 0 && "border-r-2 border-r-primary"
              )}
              onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
            >
              {cell || ""}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SudokuBoard;
