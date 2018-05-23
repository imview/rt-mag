package com.rt.dto.param.um;

import com.rt.dto.um.SysUserDTO;
import com.rt.util.Pagination;

public class SysUserPagination extends Pagination<SysUserCondition,SysUserDTO> {

    private String curUserId;
    private Integer isSuperAdmin;

    public String getCurUserId() {
        return curUserId;
    }

    public void setCurUserId(String curUserId) {
        this.curUserId = curUserId;
    }

    public Integer getIsSuperAdmin() {
        return isSuperAdmin;
    }

    public void setIsSuperAdmin(Integer isSuperAdmin) {
        this.isSuperAdmin = isSuperAdmin;
    }
}
