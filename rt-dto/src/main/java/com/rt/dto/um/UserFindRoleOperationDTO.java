package com.rt.dto.um;

public class UserFindRoleOperationDTO {

    private String rows;
	
	private String id;
	
	private String name;
	
	private String parentId;
	
	private Integer sequence;
	
	private String hasrole;
	
	
	public String getRows() {
		return rows;
	}
	public void setRows(String rows) {
		this.rows = rows;
	}
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
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getHasrole() {
		return hasrole;
	}
	public void setHasrole(String hasrole) {
		this.hasrole = hasrole;
	}
	public Integer getSequence() {
		return sequence;
	}
	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}
	

}
