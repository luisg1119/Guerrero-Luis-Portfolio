package org.LoginProject.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.LoginProject.database.Database;
import org.LoginProject.dto.User;

public class LoginService {
	Map<String,User> userData;

	public LoginService(){
		userData = Database.getData();
	}
	
	public void addUser(User user){
		userData.put(user.getUserName(), user);
	}
	
	public User returnUser(String userName, String password){
		if (userData.containsKey(userName)){
			User temp = userData.get(userName);
			String pass = temp.getPassword();
			if(pass.equals(password)){
				return userData.get(userName);
			}
			else{
				return null;
			}
		}
		else{
			return null;
		}
		
	}
	
	public Boolean authenticate(String userName, String password){
		if (userData.containsKey(userName)){
			User temp = userData.get(userName);
			String pass = temp.getPassword();
			if(pass.equals(password)){
				return true;
			}
			else{
				return false;
			}
		}
		else{
			return false;
		}
	}
	
	public boolean changePassword(String userName, String password){
		if(userData.containsKey(userName)){
			User temp = userData.get(userName);
			temp.setPassword(password);
			return true;
		}
		else{
			return false;
		}
	}
	
	public void updateInfo(String userName, String password, String phone,String dob,String employer, String email, String lastName, String firstName){
		if(userData.containsKey(userName) && userData.get(userName).getPassword().equals(password)){
			User user = userData.get(userName);
			
			user.setFirstName(firstName);
			user.setLastName(lastName);
			user.setPhone(phone);
			user.setEmail(email);
			user.setEmployer(employer);
			user.setPhone(phone);
			user.setDob(dob);
		}
		else{
			return;
		}
	}
	
	public String toString(){
		String toString = "";
		if(userData.isEmpty()){
			return "Does not contain anything";
		}
		else{
			for(Entry<String, User> x : userData.entrySet()){
				String key = x.getKey();
				User val = x.getValue();
				toString += "UserName: "+ key + " Password: " + val.getPassword() + " \n";
			}
		}
		return toString;
	}
		
}
