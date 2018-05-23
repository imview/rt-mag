package com.rt.dao.mapper.um;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.rt.dao.entity.um.SysRole;
import com.rt.dto.um.SysRoleDTO;
import com.rt.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SysRoleMapper  extends BaseMapper<SysRole> {

    Integer deleteRole(Map<String, Object> map)throws Exception;

    Integer addRole(SysRoleDTO roleDTO)throws Exception;

    SysRoleDTO selectRoleByRoleId(String roleId)throws Exception;

    Integer updateRoleInfo(SysRoleDTO roleDTO) throws Exception;

    List<SysRoleDTO> getRoleList(Pagination pagin)throws Exception;

    Integer getRoleListCount(Pagination pagin)throws Exception;

}
