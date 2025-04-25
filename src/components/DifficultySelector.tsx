import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Difficulty } from '@/utils/sudokuUtils';

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
  value: Difficulty;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect, value }) => {
  return (
    <div className="w-[200px]">
      <Select value={value} onValueChange={(val) => onSelect(val as Difficulty)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
          <SelectItem value="extreme">Extreme</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DifficultySelector;
