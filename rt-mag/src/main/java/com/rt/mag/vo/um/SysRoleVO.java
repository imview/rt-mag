package com.rt.mag.vo.um;

import java.io.Serializable;
import java.sql.Date;

public class SysRoleVO implements Serializable {


	private static final long serialVersionUID = -1904317748266939890L;

	private String id;

    private String name;

    private String remark;

    private Integer isDelete;

    private String createUserId;
    
    private String createUserName;

    private Date createTime;

    private String lastUpdateUserId;
    
    private String lastUpdateUserName;

    private Date lastUpdateTime;

    public String getId() {
        return id;
    }

    public void setId(String uid) {
        this.id = uid;
    }

   
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }


    public void setRemark(String remark) {
        this.remark = remark;
    }

    
    public Integer getIsDelete() {
        return isDelete;
    }

  
    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    
    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUser(String createUserName) {
        this.createUserName = createUserName;
    }

    public Date getCreateTime() {
        return createTime;
    }

  
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

 
    public String getLastUpdateUserId() {
        return lastUpdateUserId;
    }

    public void setLastUpdateUser(String lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
    }

    public Date getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(Date lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getLastUpdateUserName() {
		return lastUpdateUserName;
	}

	public void setLastUpdateUserName(String lastUpdateUserName) {
		this.lastUpdateUserName = lastUpdateUserName;
	}
    
}
