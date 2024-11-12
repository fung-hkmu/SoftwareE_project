package com.example.myapplication;

import java.util.ArrayList;

public class order {
    String id, date, status;
    int total;
    ArrayList<item> items;

    public order(String id, String date, String status) {
        this.id = id;
        this.date = date;
        this.status = status;
    }

    public void additem(item i){
        items.add(i);
        total += i.quantity * i.price;
    }
}
