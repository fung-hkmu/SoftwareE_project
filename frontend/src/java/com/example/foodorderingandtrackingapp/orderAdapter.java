package com.example.myapplication;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.content.Context;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;

public class orderAdapter extends ArrayAdapter<order> {

    public orderAdapter(Context context, ArrayList<order> orderArrayList){
        super(context, R.layout.orderlist,orderArrayList);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup partent) {
        order o = getItem(position);

        if (convertView == null){
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.orderlist, partent, false);
        }

        TextView id = convertView.findViewById(R.id.id);
        TextView date = convertView.findViewById(R.id.date);
        TextView status = convertView.findViewById(R.id.status);

        return convertView;
    }
}
