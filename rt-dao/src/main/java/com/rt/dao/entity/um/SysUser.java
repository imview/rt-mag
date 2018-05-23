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
public class SysUser implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String loginName;
    private String userName;
    private String password;
    private String mobile;
    private String email;
    /**
     * 0-启用 1-禁用
     */
    private Integer status;
    /**
     * 0-否1-是
     */
    private Integer isSuperAdmin;
    private Integer errorCount;
    private Date lastErrorTime;
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

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getIsSuperAdmin() {
        return isSuperAdmin;
    }

    public void setIsSuperAdmin(Integer isSuperAdmin) {
        this.isSuperAdmin = isSuperAdmin;
    }

    public Integer getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(Integer errorCount) {
        this.errorCount = errorCount;
    }

    public Date getLastErrorTime() {
        return lastErrorTime;
    }

    public void setLastErrorTime(Date lastErrorTime) {
        this.lastErrorTime = lastErrorTime;
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
        return "SysUser{" +
        ", id=" + id +
        ", loginName=" + loginName +
        ", userName=" + userName +
        ", password=" + password +
        ", mobile=" + mobile +
        ", email=" + email +
        ", status=" + status +
        ", isSuperAdmin=" + isSuperAdmin +
        ", errorCount=" + errorCount +
        ", lastErrorTime=" + lastErrorTime +
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
