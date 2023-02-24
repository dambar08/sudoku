package sudoku;

public class InvalidPositionException extends Exception {
  public InvalidPositionException() {
    super("Invalid Position");
  }

  public InvalidPositionException(String msg) {
    super(msg);
  }
}
