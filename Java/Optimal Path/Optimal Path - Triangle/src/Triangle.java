/** Description of Triangle: This class serves to conduct a optimal path to find the maximum
 *  number possible from provided numbers in a triangle. This algorithm uses the bottom top
 *  approach for maximum efficiency. 
 * 
 *  @author Luis Guerrero
 *  @version Final Version: June 11th, 2015
*/


import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Scanner;


public class Triangle {
	private int[][] array;
	private Scanner text;
	private Scanner l;
	private Scanner w;
	private int row;
	private int col;
	
	public Triangle(String doc){
		row = row(doc);
		col = col(doc);
		array = new int[row][col];
		
		try {
			text = new Scanner(new FileReader(doc));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		//Fill the 2-D array with the text document values
		populate();	
		//Conduct 'Maximum' search
		search();
		//check(); //uncomment to check the actual matrix
	}
	
	/**
	 * Private helper method to fill the two-dimensional array with a text document provided
	 * @param N/A
	 * @return N/A
	 * @author Luis Guerrero
	 */
	private void populate(){
		int i = 0;
		int j = 0;
		//Loop as long as there exists another line
		while(text.hasNextLine()){
			Scanner temp = new Scanner(text.nextLine());
			j = 0;
			//Loop through each iteration of the line
			//and add to array
			while(temp.hasNext()){
				array[i][j] = temp.nextInt(); 
				j++;
			}
			i++;		
		}			
	}
	
	/**
	 * Private helper method to conduct the search algorithm on 
	 * the two-dimensional array and find the largest number possible
	 * @param N/A
	 * @return N/A
	 * @author Luis Guerrero
	 */
	private void search(){
		int call = row -2;		//Get the row
		
		//Loop until 'call' reaches the top
		while (call >= 0){
			for(int i = 0; i <= call; i++){
				//check one row below current and find largest number
				array[call][i] += Math.max(array[call+1][i], array[call+1][i+1]);
			}
			call--;
		}
		
		System.out.println("The maximum path's sum is: " + array[0][0]);
	}

	/**
	 * Private method to print out the two-dimensional array
	 * @param N/A
	 * @return N/A
	 * @author Luis Guerrero
	 */
	private void check(){
		for (int i =0; i<row;i++){
			for(int j =1; j<=col;j++){
				//At the end of the column skip a line
				if(j%col == 0){
					System.out.println(array[i][j-1]);
				}
				else{
					System.out.print(array[i][j-1] + " ");
				}
			}
		}
	}
	
	/**
	 * Public helper method to find the total rows of the document
	 * @param String FileName
	 * @return int Columns
	 * @author Luis Guerrero
	 */
	public int row(String file){
		int i = 0;

		try {
			l = new Scanner(new FileReader(file));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		while(l.hasNextLine()){
			i++;
			l.nextLine();
		}
		return i;	
	}
	
	/**
	 * Public helper method to find the total columns of the document
	 * @param String FileName
	 * @return int Rows
	 * @author Luis Guerrero
	 */
	public int col(String file){
		int i = 0;
		int high = 0;
		try {
			w = new Scanner(new FileReader(file));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		while (w.hasNextLine()){
			Scanner temp = new Scanner(w.nextLine());

			i = 0;
			while(temp.hasNext()){
				i++;
				temp.next();
				if(i > high){
					high = i;
				}
			}
			
		}
		return high;
	}
	
	public static void main (String[] args){
		Triangle tri = new Triangle("triangle.txt");
	}
}
