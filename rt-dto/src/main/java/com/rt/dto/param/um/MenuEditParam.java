package com.rt.dto.param.um;

import java.io.Serializable;


public class MenuEditParam implements  Serializable{
	 
	private static final long serialVersionUID = 5418836753699426021L;

	private String id; 
	//@NotBlank (message="{com.rt.demo.menu.name}")
	private String name; 
	//@NotBlank(message="{com.rt.demo.menu.categoryId}")
	private String parentId;
 
	private Integer sequence; 
//	@NotNull(message="com.rt.demo.menu.sequence")
	private Integer enabled; 
//	@NotBlank(message="{com.rt.demo.menu.url}")
	private String url;
 
	private String icon;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
 
	public Integer getSequence() {
		return sequence;
	}
	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}
	public Integer getEnabled() {
		return enabled;
	}
	public void setEnabled(Integer enabled) {
		this.enabled = enabled;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	} 
	  
	 
	
	 
}
