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
public class SysLog implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String userId;
    private String userName;
    /**
     * 1-登录2-退出
     */
    private String source;
    private String summary;
    private String remark;
    private Date createTime;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "SysLog{" +
        ", id=" + id +
        ", userId=" + userId +
        ", userName=" + userName +
        ", source=" + source +
        ", summary=" + summary +
        ", remark=" + remark +
        ", createTime=" + createTime +
        "}";
    }
}
