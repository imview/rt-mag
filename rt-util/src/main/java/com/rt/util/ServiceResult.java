/**
 *  Copyright (c) 2017 ucsmy.com, All rights reserved.
 */
package com.rt.util;

import java.util.HashMap;
import java.util.Map;

public class ServiceResult {
	private String message="请求成功";
	private Boolean isSuccess=true;
	private Map<String, Object> dicData=new HashMap<String, Object>();

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
	
	public ServiceResult succeed() {
		this.isSuccess = true;
		return this;
	}
	
	public ServiceResult succeed(String message) {
		this.isSuccess = true;
		this.message = message;
		return this;
	}
	
	public ServiceResult failed() {
		this.isSuccess = false;
		return this;
	}
	public ServiceResult failed(String message) {
		this.message = message;
		this.isSuccess = false;
		return this;
	}

	public Map<String, Object> getDicData() {
		return dicData;
	}

	public void setDicData(Map<String, Object> dicData) {
		this.dicData = dicData;
	}

}
