package com.bcpstockerapp.bcp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class UsersTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fname;
    private String lname;
    private Integer permissions;
    private boolean isActive;
    private Date dateActive;

    //Constructors
    public UsersTable(){}
    public UsersTable(Long id, String fname, String lname, Integer permissions, boolean isActive, Date dateActive){
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.permissions = permissions;
        this.isActive = isActive;
        this.dateActive = dateActive;
    }

    //Getters
    public Long getId(){return this.id;}
    public String getFname(){return this.fname;}
    public String getLname(){return this.lname;}
    public Integer getPermissions(){return this.permissions;}
    public boolean getIsActive(){return this.isActive;}
    public Date getDateActive(){return this.dateActive;}

    //Setters
    public void setId(Long id){this.id = id;}
    public void setFname(String fname){this.fname = fname;}
    public void setLname(String lname){this.lname = lname;}
    public void setPermissions(Integer permissions){this.permissions = permissions;}
    public void setIsActive(boolean isActive){this.isActive = isActive;}
    public void setDateActive(Date dateActive){this.dateActive = dateActive;}


}
