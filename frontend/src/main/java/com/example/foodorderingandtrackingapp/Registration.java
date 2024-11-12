package com.example.foodorderingandtrackingapp;

import android.content.ContentValues;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class Registration extends AppCompatActivity {

    EditText phoneNum, userpwd, userpwd2, username, email, address;
    RadioGroup genderRadioGroup;
    RadioButton maleRadioButton, femaleRadioButton;
    Button submit;
    Sql sqlHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        phoneNum = findViewById(R.id.phoneNum);
        userpwd = findViewById(R.id.userpwd);
        userpwd2 = findViewById(R.id.userpwd2);
        username = findViewById(R.id.username);
        email = findViewById(R.id.email);
        address = findViewById(R.id.address);

        genderRadioGroup = findViewById(R.id.genderRadioGroup);
        maleRadioButton = findViewById(R.id.male);
        femaleRadioButton = findViewById(R.id.female);

        submit = findViewById(R.id.submit); // Register button

        sqlHelper = new Sql(this); // Initialize the Sql class

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String name = phoneNum.getText().toString();
                String pwd01 = userpwd.getText().toString();
                String pwd02 = userpwd2.getText().toString();
                String user = username.getText().toString();
                String userEmail = email.getText().toString();
                String userAddress = address.getText().toString();

                int selectedGenderId = genderRadioGroup.getCheckedRadioButtonId();
                RadioButton selectedGenderRadioButton = findViewById(selectedGenderId);
                String gender = selectedGenderRadioButton.getText().toString();

                if (name.equals("") || pwd01.equals("") || pwd02.equals("")) {
                    Toast.makeText(Registration.this, "Phone number or password cannot be empty!", Toast.LENGTH_LONG).show();
                } else {
                    if (pwd01.equals(pwd02)) {
                        sqlHelper.addUser(name, pwd01); // Call addUser method to insert user data
                        // Additional logic if needed
                        Intent intent = new Intent(Registration.this, MainActivity.class);
                        startActivity(intent);
                        Toast.makeText(Registration.this, "Registration successful", Toast.LENGTH_LONG).show();
                    } else {
                        Toast.makeText(Registration.this, "Passwords do not match", Toast.LENGTH_LONG).show();
                    }
                }
            }
        });
    }
}