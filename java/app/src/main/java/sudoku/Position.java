package sudoku;

public class Position {
  public final int x;
  public final int y;

  public Position(int x, int y)throws InvalidPositionException {
      if(x < SudokuBoard.MIN_INDEX || y > SudokuBoard.MAX_INDEX) {
          throw new InvalidPositionException();
      }
      this.x = x;
      this.y = y;
  }
}
