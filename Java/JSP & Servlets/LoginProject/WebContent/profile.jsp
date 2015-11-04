<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:useBean id="user" class="org.LoginProject.dto.User" scope="session"></jsp:useBean>
	<meta name="viewport" content="width=device-width" />
	<meta charset="UTF-8">
	<title><jsp:getProperty property="firstName" name="user"/> <jsp:getProperty property="lastName" name="user"/>'s Profile</title>
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<!-- jQuery library -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<!-- Latest compiled JavaScript -->
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="CSS/login.css">
	<link rel="stylesheet" type="text/css" href="CSS/media.css">
	
</head>
<body>
<div class="container">
	<div class="row col-sm-12">
		<h1 class="text-center"> Success, you have logged in 
		<jsp:getProperty property="firstName" name="user"/>
		<jsp:getProperty property="lastName" name="user"/>!</h1>
		<p class="text-left">Your profile is currently being set up, please update any information accordingly and/or check back in a few days once your profile is fully activated.</p>
	</div>
	<br><br>
	<div class="row col-sm-12 text-center text">
		<ul class="help-links text">
			<li><b>First Name:</b> <jsp:getProperty property="firstName" name="user"/></li>
			<li><b>Last Name:</b> <jsp:getProperty property="lastName" name="user"/></li>
			<li><b>Date of Birth:</b> <jsp:getProperty property="dob" name="user"/></li>
			<li><b>Email:</b>  <jsp:getProperty property="email" name="user"/></li>
			<li><b>Phone Number</b> : <jsp:getProperty property="phone" name="user"/></li>
			<li><b>Employer</b> : <jsp:getProperty property="employer" name="user"/></li>
		</ul>
			<br>
			<form  action="UpdateServlet" method="get">
					<div class="col-sm-12">
				  		<button type="submit" class="btn btn-default">Update Account</button>
					</div>
			</form>
			
				<ul class="help-links">
				<br><br>
					<li class="text"><a href="login.jsp">Logout</a></li>
				</ul>
		</div>
</div>
</body>
</html>