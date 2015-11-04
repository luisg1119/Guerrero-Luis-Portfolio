<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width" />
	<meta charset="UTF-8">
	<title>Create a new Login Account</title>
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
	<div class="inner-container">
		<div class="vertical-align">
			<div class="row text-center">
				<div class="row text-center">
					<h1 class="">Fill Out Each Field</h1>
				</div>
				<form action="CreateServlet" method="post">
					<div class="form-group col-sm-12">
						<label for="userId">Desired User ID:</label>
						<input type="text" class="form-control" id="userId" name="userId" placeholder="User ID">
					</div>
					<div class="form-group col-sm-12">
						<label for="password">Password:</label>
						<input type="password" class="form-control" id="password" name="password" placeholder="Password">
					</div>
					<div class="form-group col-sm-6">
						<label for="firstName">First Name:</label>
						<input type="text" class="form-control" id="firstName" name="firstName" placeholder="Ex: Jane">
					</div>
					<div class="form-group col-sm-6">
						 <label for="lastName">Last Name / Family Name:</label>
						 <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Ex: Doe">
					</div>
		
					<div class="form-group col-sm-6">
						 <label for="email">Email Address:</label>
						 <input type="email" class="form-control" id="email" name="email" placeholder="Ex: example@email.com">
					</div>
					<div class="form-group col-sm-6">
						 <label for="phone">Phone Number (Do not enter '-' or '()'):</label>
						 <input type="text" class="form-control" id="phone" name="phone" placeholder="Ex: 1234567890">
					</div>
					<div class="form-group col-sm-6">
						 <label for="date">Date of Birth:</label>
						 <input type="text" class="form-control" id="date" name="date" placeholder="Ex: MM-DD-YYYY">
					</div>
					<div class="form-group col-sm-6">
						 <label for="employer">Employer:</label>
						 <input type="text" class="form-control" id="employer" name="employer" placeholder="Ex: Google">
					</div>
					<div class="col-sm-12">
				  		<button type="submit" class="btn btn-default">Create Account</button>
					</div>
				</form>
				<div class="text-left">
					<ul class="help-links help-links-padding">
						<li><a href="create.jsp">Create New Account</a></li>
						<li><a href="forgot.jsp">Forgot Password</a></li>
						<br>
			 			<li><a href="login.jsp">Back to Home</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

</body>
</html>