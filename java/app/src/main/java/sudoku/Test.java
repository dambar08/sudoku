package sudoku;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
/**
 * Do not delete this test
 */
public class Test
{
    public static void main(String[] args) {
        Position p0 = new Position(0,0);
        Position p1 = new Position(1,1);
        Position p2 = new Position(2,2);
        Position p3 = new Position(3,3);
        Position p4 = new Position(4,4);
        Position p5 = new Position(5,5);
        Position p6 =new Position(6,6);
        Position p7 =new Position(7,7);
        Position p8 =new Position(8,8);
        Position p9 =new Position(9,9);

        List<Position> pos1 = new ArrayList<Position>(Arrays.asList
                (
                    p0,
                    p1,
                    p2,
                    p3,
                    p4,
                    p5,
                    p6,
                    p7,
                    p8,
                    p9
                ));

        List<Position> pos2 = new ArrayList<Position>(Arrays.asList
                (
                    p0,
                    p1,
                    p2,
                    p3,
                    p4,
                    p5,
                    p6,
                    p7,
                    p8,
                    p9
                ));

        System.out.println("POSITION 1");
        for(Position x:pos1) {
            System.out.println("x = "+x.x+", y = "+x.y);
        }
        
        System.out.println("POSITION 2");
        for(Position x:pos2) {
            System.out.println("x = "+x.x+", y = "+x.y);
        }
        
        p0.x = 9999;
        p0.y = 9999;
        p1.x = 9999;
        p1.y = 9999;
        p2.x = 9999;
        p2.y = 9999;
        
        System.out.println(pos1.get(3).x = 100);
        System.out.println(pos1.get(3).y = 100);
        System.out.println(pos1.get(4).x = 100);
        System.out.println(pos1.get(4).y = 100);
        
        System.out.println("---------------------------------");
        System.out.println("POSITION 1");
        for(Position x:pos1) {
            System.out.println("x = "+x.x+", y = "+x.y);
        }
        
        System.out.println("POSITION 2");
        for(Position x:pos2) {
            System.out.println("x = "+x.x+", y = "+x.y);
        }
    }

}
class Position
{
    public int x;
    public int y;
    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }
}