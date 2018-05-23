/**
 *  Copyright (c) 2017 ucsmy.com, All rights reserved.
 */
package com.rt.util;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class ServiceResultT<T> implements Serializable{   
	private static final long serialVersionUID = 1L;
	private String message="请求成功";
	private Boolean isSuccess=true;
	private Map<String, T> dicData=new HashMap<String, T>();

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Boolean getIsSuccess() {
		return isSuccess;
	}

	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}
	
	public ServiceResultT<T> succeed() {
		this.isSuccess = true;
		return this;
	}
	
	public ServiceResultT<T> succeed(String message) {
		this.isSuccess = true;
		this.message = message;
		return this;
	}
	
	public ServiceResultT<T> failed() {
		this.isSuccess = false;
		return this;
	}
	public ServiceResultT<T> failed(String message) {
		this.message = message;
		this.isSuccess = false;
		return this;
	}

	public Map<String, T> getDicData() {
		return dicData;
	}

	public void setDicData(Map<String, T> dicData) {
		this.dicData = dicData;
	}

}
