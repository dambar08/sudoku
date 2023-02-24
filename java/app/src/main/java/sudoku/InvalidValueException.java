package sudoku;
public class InvalidValueException extends Exception {
    public InvalidValueException(String msg) {
        super(msg);
    }

    public InvalidValueException() {
        super(String.format("The board value must be between %d and %d"+SudokuBoard.MIN_VALUE,SudokuBoard.MAX_VALUE));
    }
}
