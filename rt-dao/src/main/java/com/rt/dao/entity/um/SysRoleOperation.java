package com.rt.dao.entity.um;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author code generate
 * @since 2018-04-28
 */
public class SysRoleOperation implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String roleId;
    private String operationId;
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

    public void setId(String id) {
        this.id = id;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getOperationId() {
        return operationId;
    }

    public void setOperationId(String operationId) {
        this.operationId = operationId;
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
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

    public void setLastUpdateUserId(String lastUpdateUserId) {
        this.lastUpdateUserId = lastUpdateUserId;
    }

    public String getLastUpdateUserName() {
        return lastUpdateUserName;
    }

    public void setLastUpdateUserName(String lastUpdateUserName) {
        this.lastUpdateUserName = lastUpdateUserName;
    }

    public Date getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(Date lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    @Override
    public String toString() {
        return "SysRoleOperation{" +
        ", id=" + id +
        ", roleId=" + roleId +
        ", operationId=" + operationId +
        ", isDelete=" + isDelete +
        ", createUserId=" + createUserId +
        ", createUserName=" + createUserName +
        ", createTime=" + createTime +
        ", lastUpdateUserId=" + lastUpdateUserId +
        ", lastUpdateUserName=" + lastUpdateUserName +
        ", lastUpdateTime=" + lastUpdateTime +
        "}";
    }
}
