/**
 *  Copyright (c) 2017 ucsmy.com, All rights reserved.
 */
package com.rt.util;

/**
 * @Description: 
 * @Author: huangliangwo
 * @Created Date: 2017年7月12日
 * @LastModifyDate: 
 * @LastModifyBy: 
 * @Version: 
 */
public class NameValue {

    private String value;
    private String name;
    private String text;
   public NameValue(){};
   public NameValue(String value, String text){
    	this.value=value;
    	this.text=text;
    }
    /**
     * @return the value
     */
    public String getValue() {
        return value;
    }
    /**
     * @param value the value to set
     */
    public void setValue(String value) {
        this.value = value;
    }
    /**
     * @return the name
     */
    public String getName() {
        return name;
    }
    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
  
    
    
}
