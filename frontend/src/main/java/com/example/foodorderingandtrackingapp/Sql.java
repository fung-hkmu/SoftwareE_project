package com.example.foodorderingandtrackingapp;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class Sql extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "LoginDatabase";
    private static final int DATABASE_VERSION = 1;

    public Sql(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String createTableQuery = "CREATE TABLE logins (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "usname TEXT," +
                "uspwd TEXT" +
                ")";
        db.execSQL(createTableQuery);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS logins");
        onCreate(db);
    }

    public void addUser(String username, String password) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("usname", username);
        values.put("uspwd", password);
        db.insert("logins", null, values);
        db.close();
    }
}