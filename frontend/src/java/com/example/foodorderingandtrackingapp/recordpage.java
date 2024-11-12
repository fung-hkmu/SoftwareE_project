package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.myapplication.databinding.ActivityRecordpageBinding;

import java.util.ArrayList;

public class recordpage extends AppCompatActivity {
    ActivityRecordpageBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityRecordpageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        ArrayList<order> orderArrayList = new ArrayList<>();
        for(int i = 0; i < 3; i++){
            order o = new order("1", "11/11/2024", "compeleted");
            orderArrayList.add(o);
        }

        orderAdapter orderAdapter = new orderAdapter(recordpage.this, orderArrayList);

        binding.listview.setAdapter(orderAdapter);
        binding.listview.setClickable(true);
        binding.listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Intent intent = new Intent(recordpage.this, orderActivity.class);
                startActivity(intent);
            }
        });
    }

}