package org.LoginProject.dto;
/*
<servlet>
<servlet-name>login</servlet-name>
<jsp-file>/login.jsp</jsp-file>
</servlet>
<servlet-mapping>
<servlet-name>login</servlet-name>
<url-pattern>/login.jsp</url-pattern>
</servlet-mapping>
*/

public class User {
	private String userName;
	private String firstName;
	private String lastName;
	private String password;
	private String email;
	private String employer;
	private String phone;
	private String dob;
	private long id;
	private String def = "No Name Specified";

	public User(String userName,String password, String firstName, String lastName, String email, String employer, String phone, String dob) {
		this.userName = userName;
		setFirstName(firstName);
		setLastName(lastName);
		this.password = password;
		this.email = email;
		this.employer = employer;
		setPhone(phone);
		this.dob = dob;
		this.id = (long) (Math.random()*100000);
	}
	
	public User(){
		
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		if(firstName.isEmpty()){
			this.firstName = def;
			return;
		}
		else{
			String temp = firstName;
			temp = temp.substring(0,1).toUpperCase() + temp.substring(1, temp.length()).toLowerCase();
			this.firstName = temp;
		}
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		if(lastName.isEmpty()){
			this.lastName = "";
			return;
		}
		else{
			String temp = lastName;
			temp = temp.substring(0,1).toUpperCase() + temp.substring(1, temp.length()).toLowerCase();
			this.lastName = temp;
		}
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getEmployer() {
		return employer;
	}
	public void setEmployer(String employer) {
		this.employer = employer;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		String temp ="";
		if(phone.length() != 10){
			this.phone = phone;
			return;
		}
		for (int i = 0; i<10;i++){
			if (i==3){
				temp += "-";
				temp += phone.charAt(i);
				continue;
			}
			else if (i == 6){
				temp += "-";
				temp += phone.charAt(i);
			}
			else{
				temp += phone.charAt(i);
			}
		}
		this.phone = temp;
	}
		
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public static void main(String[] args){
		User user = new User("lag","pass", "lUis","guERRero", "l@l.com", "google", "1234567890", "11/11/11");
		System.out.println(user.getFirstName());
		System.out.println(user.getLastName());
		System.out.println(user.getPhone());
	}
	
}
