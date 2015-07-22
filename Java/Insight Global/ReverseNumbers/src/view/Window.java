package view;

import javax.swing.JPanel;

import java.awt.BorderLayout;

import javax.swing.JButton;
import javax.swing.JTextField;

import java.awt.FlowLayout;

import javax.swing.BoxLayout;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

import javax.swing.JLayeredPane;

import java.awt.Color;
import java.awt.GridLayout;
import java.awt.GridBagLayout;

import javax.swing.JTextPane;
import javax.swing.JLabel;
import model.Reverse;

import java.awt.Font;

public class Window extends JPanel {
	private JTextField inputText;

	/**
	 * Create the panel.
	 */
	public Window() {
		setLayout(null);
		
		//Creates the Label for input
		JLabel enterLabel = new JLabel("Enter numbers to reverse their order:");
		enterLabel.setFont(new Font("Lucida Grande", Font.PLAIN, 11));
		enterLabel.setBounds(6, 56, 211, 16);
		add(enterLabel);
		
		//Creates the input field
		inputText = new JTextField();
		inputText.setBounds(6, 72, 438, 28);
		add(inputText);
		inputText.setColumns(10);
		
		//Jlabel for Order pane
		JLabel revLabel = new JLabel("Reversed Order:");
		revLabel.setFont(new Font("Lucida Grande", Font.PLAIN, 11));
		revLabel.setBounds(6, 6, 95, 16);
		add(revLabel);
		
		//Embedded container
		JPanel panelContainer = new JPanel();
		panelContainer.setBounds(6, 22, 438, 28);
		add(panelContainer);
		panelContainer.setLayout(new BorderLayout(0, 0));
		
		//add textPane that cannot be modified
		JTextPane outputText = new JTextPane();
		outputText.setEditable(false);
		panelContainer.add(outputText, BorderLayout.CENTER);
		
		//Button to click
		JButton reverse = new JButton("Reverse Order!");
		reverse.setBounds(6, 102, 438, 54);
		add(reverse);
		
		//Event Listener
		reverse.addActionListener(new ActionListener(){
			@Override
			public void actionPerformed(ActionEvent arg) {
			String text = inputText.getText();
			//Check if there is less than 7 characters
			if(text.length() > 7){
				enterLabel.setText("Please Only Enter at Most 7 Characters");
				enterLabel.setForeground(Color.red);
			}
			else{
				Reverse order = new Reverse(text);
			
				//Check if only numbers are inputed
				if(order.check() == false){
					enterLabel.setText("Please Only Enter Numbers (Ex:0-9)");
					enterLabel.setForeground(Color.red);
				}
			
				//Run reverse method
				else{
					enterLabel.setText("Enter numbers to reverse their order:");
					enterLabel.setForeground(Color.black);
					text = order.reversedOrder();
					outputText.setText(text);
				}
			}
		   }
			
		});

	}
}
