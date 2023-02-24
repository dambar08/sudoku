package sudoku;
public class NotEmptyPositionException extends Exception {
  public NotEmptyPositionException() {
      super("The position is not empty");
  }

  public NotEmptyPositionException(String msg) {
      super(msg);
  }
}


