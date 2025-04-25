import React from 'react';
import { Button } from "@/components/ui/button";

interface NumberPadProps {
  onNumberSelect: (num: number) => void;
  onClear: () => void;
}

const NumberPad: React.FC<NumberPadProps> = ({ onNumberSelect, onClear }) => {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4 animate-fade-in">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            onClick={() => onNumberSelect(num)}
            variant="outline"
            className="h-12 text-lg font-medium hover:scale-105 transition-transform"
          >
            {num}
          </Button>
        ))}
      </div>
      <Button
        onClick={onClear}
        variant="destructive"
        className="w-full hover:scale-105 transition-transform"
      >
        Clear Board
      </Button>
    </div>
  );
};

export default NumberPad;
