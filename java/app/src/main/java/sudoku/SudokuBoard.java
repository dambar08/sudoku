
package sudoku;

import java.util.Map;
import java.util.Hashtable;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Stack;
import java.util.Queue;

/**
 * Write a description of class SudokuBoard here.
 *
 * @author (Dambar Pun)
 * @version (1.0.0)
 */
public final class SudokuBoard {
    public static final int MIN_INDEX = 0;
    public static final int MAX_INDEX = 8;
    // constants
    public static final int SIZE = 9;
    public static final int ROW_SIZE = 9;
    public static final int COLUMN_SIZE = 9;
    public static final int MIN_VALUE = 1;
    public static final int MAX_VALUE = 9;

    // the position and its value
    private Map<Position, Integer> initialState;
    private Map<Position, Integer> emptyState; //
    private Map<Position, Integer> nonEmptyState;

    private Stack<Position> toBeFilledPositions; // the positions that must be filled
    private Queue<Position> filledPositions; // the positions that was filled

    private int[][] board;

    public SudokuBoard(int[][] board) throws InvalidSizeException {
        if (board.length != COLUMN_SIZE) {
            throw new InvalidSizeException(String.format("The column size must be equal to %d", COLUMN_SIZE));
        }
        for (int i = 0; i < COLUMN_SIZE; i++) {
            if (board[i].length != ROW_SIZE) {
                throw new InvalidSizeException(String.format("The row size must be equal to %d", ROW_SIZE));
            }
        }
        this.board = board;
        initialState = mapBoardPosition(this.board); // for functional style
        // for object oriented style
    }

    /*
     * Functional style(NOT PURE FUNCTIONAL STYLE)
     */
    /**
     * This method is responsible for mapping the initial state of the the board.
     */
    private Map<Position, Integer> mapBoardPosition(int[][] board) {
        Map<Position, Integer> initialState = new Hashtable<>();
        try {
            for (int i = 0; i < board.length; i++) {
                for (int j = 0; j < board[i].length; j++) {
                    initialState.put(new Position(i, j), board[i][j]);
                }
            }
        } catch (InvalidPositionException e) {
            e.printStackTrace();
        }
        return initialState;
    }

    /*
     * Functional style(NOT PURE FUNCTIONAL STYLE)
     */
    /**
     *
     * This method is responsible for mapping the empty positions of the board
     */
    // todo do not use this
    private Map<Position, Integer> mapEmptyBoardPosition(int[][] board) {
        Map<Position, Integer> emptyState = new Hashtable<>();
        try {
            for (int i = 0; i < board.length; i++) {
                for (int j = 0; j < board[i].length; j++) {
                    if (board[i][j] == 0) {
                        emptyState.put(new Position(i, j), board[i][j]);
                    }
                }
            }
        } catch (InvalidPositionException e) {
            e.printStackTrace();
        }
        return emptyState;
    }

    /*
     * Functional style(NOT PURE FUNCTIONAL STYLE)
     */
    /**
     *
     * This method is responsible for mapping the non-empty positions of the board
     */
    // todo do not use this
    private Map<Position, Integer> mapNonEmptyBoardPosition(int[][] board) {
        Map<Position, Integer> nonEmptyState = new Hashtable<>();
        try {
            for (int i = 0; i < board.length; i++) {
                for (int j = 0; j < board[i].length; j++) {
                    if (board[i][j] != 0) {
                        nonEmptyState.put(new Position(i, j), board[i][j]);
                    }
                }
            }
        } catch (InvalidPositionException e) {
            e.printStackTrace();
        }
        return nonEmptyState;
    }

    /*
     * Object oriented style
     */
    /**
     *
     * This method is responsible for mapping the initail state of the the board.
     */
    private void mapBoard() {
        try {
            for (int i = 0; i < COLUMN_SIZE; i++) {
                for (int j = 0; j < ROW_SIZE; j++) {
                    if (board[i][j] == 0) {
                        this.emptyState.put(new Position(i, j), board[i][j]);
                        this.toBeFilledPositions.push(new Position(i, j));
                    } else {
                        this.nonEmptyState.put(new Position(i, j), board[i][j]);
                    }
                    this.initialState.put(new Position(i, j), board[i][j]);
                }
            }
        } catch (InvalidPositionException e) {
            e.printStackTrace();
        }
    }

    private boolean isHorizontallyValid(final Position p) {
        return true;
    }

    private boolean isValidWithinItsArea(Position p, int value) {
        int upperLimitRow, lowerLimitRow, upperLimitCol, lowerLimitCol = 0;
        Point px = getUpperLimit(p.x);
        upperLimitRow = px.upper;
        lowerLimitRow = px.lower;

        Point py = getLowerLimit(p.y);
        upperLimitCol = py.upper;
        lowerLimitCol = py.lower;

        for (int k = lowerLimitRow; k <= upperLimitRow; k++) {
            for (int l = lowerLimitCol; l <= upperLimitCol; l++) {
                if ((k == p.x) && (l == p.y)) {
                    continue;
                } else {
                    if (this.board[k][l] == value) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private void getValidArea(Position p) {

    }

    private Point getUpperLimit(int x) {
        if (x < 3) {
            return new Point(2, 0);
        } else if (x < 6) {
            return new Point(5, 3);
        } else {
            return new Point(8, 6);
        }
    }

    private Point getLowerLimit(int y) {
        if (y < 3) {
            return new Point(2, 0);
        } else if (y < 6) {
            return new Point(5, 3);
        } else {
            return new Point(8, 6);
        }
    }

    private boolean isHorizontallyValid(final Position p, final int value) throws InvalidValueException {
        if (isValueValid(value)) {
            for (int i = 0; i < ROW_SIZE; i++) {
                if (i == p.y) {
                    continue;
                } else {
                    if (this.board[p.x][i] == value) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private boolean isVerticallyValid(final Position p) {
        return true;
    }

    private boolean isVerticallyValid(final Position p, final int value) throws InvalidValueException {
        if (isValueValid(value)) {
            for (int i = 0; i < COLUMN_SIZE; i++) {
                if (i == p.x) {
                    continue;
                } else {
                    if (this.board[i][p.y] == value) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private boolean isValueValid(int value) throws InvalidValueException {
        if (value >= MIN_VALUE && value <= MAX_VALUE) {
            throw new InvalidValueException();
        }
        return true;
    }

    private Position getNextPosition(int i, int j) throws InvalidPositionException {
        for (; i < this.COLUMN_SIZE; i++) {
            for (; j < this.ROW_SIZE; j++) {
                if (this.board[i][j] == 0) {
                    return new Position(i, j);
                }
            }
        }
        return new Position(-1, -1);
    }

    public boolean insert(Position p, int value) {
        try {
            if(!isValueValid(value)) return false;
            return true;
        }catch(InvalidValueException e) {
            return false;
        }

    }

    public boolean delete(Position p) {
        return false;
    }

}
