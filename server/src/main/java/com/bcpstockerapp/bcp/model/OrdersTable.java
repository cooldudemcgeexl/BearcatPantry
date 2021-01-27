package com.bcpstockerapp.bcp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class OrdersTable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderID;

    private Date orderDate;
    private boolean delOrPickUp;
    private Date delDate;
    private String deliveryTime;
    //Order status -1 decline, 0 pending, 1 confirmed, 2 completed
    private Integer orderStatus;
    private String mNumber;
    private String address;
    private String address2;
    private String email;
    private String phoneNumber;



    //Constructors
    public OrdersTable(){}
    public OrdersTable(Long orderID, Date orderDate, boolean delOrPickUp, Date delDate, String deliveryTime, Integer orderStatus, String mNumber, String address, String address2, String email, String phoneNumber){
        this.orderID = orderID;
        this.orderDate = orderDate;
        this.delOrPickUp = delOrPickUp;
        this.delDate = delDate;
        this.deliveryTime = deliveryTime;
        this.orderStatus = orderStatus;
        this.mNumber = mNumber;
        this.address = address;
        this.address2 = address2;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    //Getters
    public Long getOrderId(){ return this.orderID; }
    public Date getOrderDate(){ return this.orderDate; }
    public boolean getDelOrPickUp(){ return this.delOrPickUp; }
    public Date getDelDate(){ return this.delDate; }
    public String getDeliveryTime(){return this.deliveryTime;}
    public Integer getOrderStatus(){ return this.orderStatus; }
    public String getMNumber(){ return this.mNumber; }
    public String getAddress(){ return this.address; }
    public String getAddress2(){return this.address2;}
    public String getEmail(){ return this.email; }
    public String getPhoneNumber(){ return this.phoneNumber; }


    //Setters
    public void setOrderDate(Date orderDate){ this.orderDate = orderDate; }
    public void setDelOrPickUp(boolean delOrPickUp){ this.delOrPickUp = delOrPickUp; }
    public void setDelDate(Date delDate){ this.delDate = delDate; }
    public void setDeliveryTime(String deliveryTime){this.deliveryTime = deliveryTime;}
    public void setOrderStatus(Integer orderStatus){ this.orderStatus = orderStatus; }
    public void setMNumber(String mNumber){ this.mNumber = mNumber; }
    public void setAddress(String address){ this.address = address; }
    public void setAddress2(String address2){this.address2 = address2;}
    public void setEmail(String email){ this.email = email; }
    public void setPhoneNumber(String phoneNumber){ this.phoneNumber = phoneNumber; }
}

