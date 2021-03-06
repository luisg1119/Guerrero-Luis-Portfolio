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
 * Servlet implementation class ForgotServlet
 */
@WebServlet("/ForgotServlet")
public class ForgotServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userName = request.getParameter("userId");
		String password = request.getParameter("password");
		
		if (request.getServletContext().getAttribute("data") != null){
			ServletContext  context = request.getServletContext();
			LoginService service = (LoginService)context.getAttribute("data");
			
			
			if(service.changePassword(userName, password)){
				response.sendRedirect("login.jsp");
			}
			else{
				response.sendRedirect("invalidForgot.jsp");
			}
		}
		else{
			response.sendRedirect("invalidForgot.jsp");
		}
	}

}
