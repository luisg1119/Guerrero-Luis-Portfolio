package model;

public class Reverse {
	String num;
	char[] array;
	
	public Reverse(String nums){
		this.num = nums;
		array = new char[num.length()];
	}
	
	/**
	 * Reverse the order of the integer String
	 * @param 
	 * @return String
	 * @author Luis Guerrero
	**/
	public String reversedOrder(){
		String hold ="";
		
		for (int i = num.length()-1; i>=0;i--){
			hold += num.charAt(i) + " ";
		}
		return hold;	
	}
	
	/**
	 * Uses a number regex to check if String is composed of only numbers
	 * @param 
	 * @return Boolean
	 * @author Luis Guerrero
	**/
	public Boolean check(){
		String regex = "[0-9]+";
		if (num.substring(0,(num.length()-1)).matches(regex)){
			return true;
		}
		return false;
		
	}
	
	public static void main(String[] args){
		String test = "123456789";
		Reverse hold = new Reverse(test);
		System.out.println(hold.check());
		System.out.println(hold.reversedOrder());
	}
}
