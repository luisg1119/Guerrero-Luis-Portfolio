package org.LoginProject.servlet;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.LoginProject.database.Database;
import org.LoginProject.dto.User;
import org.LoginProject.service.LoginService;

/**
 * Servlet implementation class CreateServlet
 */
@WebServlet("/CreateServlet")
public class CreateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String phone,dob,employer, email, lastName, firstName,userName, password;
		
		userName = request.getParameter("userId");
		password = request.getParameter("password");
		firstName = request.getParameter("firstName");
		lastName = request.getParameter("lastName");
		email = request.getParameter("email");
		employer = request.getParameter("employer");
		dob = request.getParameter("date");
		phone = request.getParameter("phone");

		User user = new User(userName, password, firstName, lastName, email, employer, phone, dob);
		LoginService service = new LoginService();
		service.addUser(user);
		
		ServletContext context = request.getServletContext();
		context.setAttribute("data", service);
//		request.getSession().setAttribute("data", Database.getData());
		response.sendRedirect("login.jsp");
	}

}
