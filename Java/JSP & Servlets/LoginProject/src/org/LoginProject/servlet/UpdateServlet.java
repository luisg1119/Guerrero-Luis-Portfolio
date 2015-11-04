package org.LoginProject.servlet;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.LoginProject.service.LoginService;

/**
 * Servlet implementation class updateServlet
 */
@WebServlet("/UpdateServlet")
public class UpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect("updateProfile.jsp");
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userName,password,phone,dob,employer, email, lastName, firstName;
		
		userName = request.getParameter("userId");
		password = request.getParameter("password");
		firstName = request.getParameter("firstName");
		lastName = request.getParameter("lastName");
		email = request.getParameter("email");
		employer = request.getParameter("employer");
		dob = request.getParameter("date");
		phone = request.getParameter("phone");

		LoginService service = new LoginService();
		service.updateInfo(userName, password, phone, dob, employer, email, lastName, firstName);
		request.getSession().setAttribute("user", service.returnUser(userName, password));
		
		response.sendRedirect("profile.jsp");
	}

}
