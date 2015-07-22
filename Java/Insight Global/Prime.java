import java.util.LinkedList;
import java.util.List;


public class Prime {
	List<Integer> prime;
	
	public Prime(){
		prime = new LinkedList<Integer>();
	}
	
	/**
	 * Private helper method to see if input is prime or not
	 * @param 
	 * @return Boolean
	 * @author Luis Guerrero
	**/
	private Boolean isPrime(int num){
		for(int i=2; i<=Math.sqrt(num);i++){
			if(num % i == 0){
				return false;
			}
		}
		return true;
	}
	
	/**
	 * Method that finds primes between 1 and input
	 * @param 
	 * @return N/A
	 * @author Luis Guerrero
	**/
	public void findPrimes(int max){
		if (max <= 0){
			return;
		}
		else{
			if(isPrime(max) == true){
				prime.add(max);
			}
			
			//Recursive call
			findPrimes(max-1);
		}
	}

	/**
	 * Method to print out primes in LinkedList between 1 and input 
	 * @param 
	 * @return N/A
	 * @author Luis Guerrero
	**/
	public void printPrimes(){
		for(int i = prime.size()-1; i>=0; i--){
			System.out.println(prime.get(i));
		}

	}
	
	public static void main(String[] args){
		int max=100; 
		Prime run = new Prime();
		run.findPrimes(max);
		run.printPrimes();
		
		
	}
}
