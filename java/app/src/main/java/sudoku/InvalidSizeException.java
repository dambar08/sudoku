package sudoku;
public class InvalidSizeException extends RuntimeException {
    public InvalidSizeException(String msg) {
        super(msg);
    }

    public InvalidSizeException() {
        super(String.format("The sudoku board must have %d rows and $d columns.",SudokuBoard.ROW_SIZE,SudokuBoard.COLUMN_SIZE));
    }
}
