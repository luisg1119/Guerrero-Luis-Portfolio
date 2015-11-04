package org.LoginProject.database;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.LoginProject.dto.User;



public class Database {
	private static Map<String, User> userLogin = new HashMap<>();


	public static Map<String,User> getData(){
		return userLogin;
	}

}