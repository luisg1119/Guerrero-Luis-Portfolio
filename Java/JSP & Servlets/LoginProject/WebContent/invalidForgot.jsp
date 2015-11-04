<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width" />
	<meta charset="UTF-8">
	<title>Reset Password</title>
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
			<div class="col-lg-12 text-center">
				<div class="row">
					<h1 class="head-text">
						Reset Your User ID Password:
					</h1>
					<p class="red">*Invalid User Name</p>
					<form action="ForgotServlet" method="post">
						<div class="form-group">
				    		<label for="userId">User ID:</label>
				    		<input type="text" class="form-control" id="userId" name="userId" placeholder="Enter your Login ID">
				  		</div>
				  		<div class="form-group">
				    		<label for="password">New Password:</label>
				   			<input type="text" class="form-control" id="password" name="password" placeholder="New Password">
				  		</div>
				  		<div>
				  			<button type="submit" class="btn btn-default">Submit</button>
				  		</div>
					</form>
					<div class="text-left">
				  		<ul class="help-links">
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
</div>

</body>
</html>