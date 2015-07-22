package controller;

import java.awt.BorderLayout;
import java.awt.EventQueue;
//import java.awt.Window;


import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import view.Window;

public class Run extends JFrame {

	private JPanel contentPane;

	/**
	 * Create the frame.
	 */
	public Run() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 462, 197);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		contentPane.setLayout(new BorderLayout(0, 0));
		setContentPane(contentPane);
	}

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Run frame = new Run();
					frame.setVisible(true);
					Window panel = new Window();
					frame.getContentPane().add(panel);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
}
