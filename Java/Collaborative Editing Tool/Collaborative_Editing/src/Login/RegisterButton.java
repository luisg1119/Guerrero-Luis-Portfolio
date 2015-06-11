package Login;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

import GUI.MainGUI;

import java.awt.GridLayout;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;

import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JPasswordField;

/** Description of RegisterButton:
* This class is called RegisterButton and it creates the button for a user to create his or her given profile and it creates the button with input to do so.
* This class has 3 instance variables, one that represents the userName field and the passwordField as well as a string with username, password, port and host.
* It then creates a server for this Login.
*@author HCS Group: Siddharth Sharma, Luis Guerrero, Maverick Tudisco, Chintan Patel
*@version Final Version: May 6th, 2015
*/

public class RegisterButton extends JFrame {
	private JTextField usernameField;
	private JPasswordField passwordField;
	private String username, password, port, host;
	LoginServer server = LoginWindow.getLoginServ();

	public RegisterButton() {
		setTitle("Register User for HCS: Document Editor\n");
		setBounds(6, 118, 399, 193);
		getContentPane().setLayout(null);
		setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);

		
		JLabel lblUsername = new JLabel("Username:");
		lblUsername.setBounds(16, 39, 97, 16);
		getContentPane().add(lblUsername);

		JLabel passwordLabel = new JLabel("Password:");
		passwordLabel.setBounds(16, 73, 97, 16);
		getContentPane().add(passwordLabel);

		usernameField = new JTextField();
		usernameField.setText("a");
		usernameField.setBounds(93, 33, 274, 28);
		getContentPane().add(usernameField);
		usernameField.setColumns(10);

		JButton btnCreateUser = new JButton("Create User");

		btnCreateUser.setBounds(142, 107, 117, 29);
		getContentPane().add(btnCreateUser);

		passwordField = new JPasswordField();
		passwordField.setBounds(93, 67, 274, 28);
		getContentPane().add(passwordField);

		final JLabel messageLabel = new JLabel("Please enter a username and password");
		messageLabel.setBounds(16, 6, 371, 21);
		getContentPane().add(messageLabel);

		btnCreateUser.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String aUsername = usernameField.getText();
				String aPassword = String.valueOf(passwordField.getPassword());
				if (aUsername.equals("") || aPassword.equals("")) {
					JOptionPane.showMessageDialog(null, "Enter Valid data");
				}else {
					
					username = aUsername;
					password = aPassword;
					
					messageLabel.setText(server.createUser(aUsername, aPassword));
					if (messageLabel.getText().contains("Succesful")) {
						MainGUI.usernameRetrieval(username, password);
						
						try {
							FileWriter out = new FileWriter((System
									.getProperty("user.dir") + "/SavedDocuments/usernamesAndPasswords.txt"), true);
									
							out.write(username + "," + server.loginMap.get(password) + "\n");  
								
							out.close();
						}catch (IOException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						}
					}else{
						JOptionPane.showMessageDialog(null, "Username already exists. Please try again.");
					}

					System.out.println(server.loginMap.keySet());
					System.out.println(server.loginMap.get(username));
					dispose();
				}

				dispose();
			}
		});

	}

	public String retrievePort() {
		return port;
	}

	public String retrieveHost() {
		return host;
	}
}