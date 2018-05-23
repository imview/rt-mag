package com.rt.dto.param.um;

import java.io.Serializable;

public class CategoryEditParam  implements  Serializable{
	 
	private static final long serialVersionUID = 5418836753699426021L;

	private String id; 
	
	//@NotBlank(message="{com.rt.demo.category.name}")
	private String name; 
	//@NotBlank(message="{com.rt.demo.category.moduleId}")
	private String moduleId;
 
	private Integer sequence; 
	//@NotNull(message="{com.rt.demo.category.sequence}")
	private Integer enabled;  
 
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
	public String getModuleId() {
		return moduleId;
	}
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
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
}
