package com.rt.dao.mapper.um;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.rt.dao.entity.um.SysUserRole;
import com.rt.dto.um.SysUserRoleDTO;
import com.rt.dto.um.SysUserRoleMapDTO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SysUserRoleMapper extends BaseMapper<SysUserRole> {

    /**
     *
     * @param map =》String userId,String curUserId,Integer isSuperAdmin
     * @return
     * @throws Exception
     */
    List<SysUserRoleMapDTO> selectRoleByUserId(Map<String, Object> map)throws  Exception;

    /**
     *
     * @param map =》String userId,String curUserId,String curUserName
     * @return
     * @throws Exception
     */
    Integer deleteUserRoleByUserId(Map<String, Object> map)throws Exception;

    //add one
    Integer addUserRole(SysUserRoleDTO userRoleDTO)throws Exception;

    //add list
    Integer addUserRoleList(List<SysUserRoleDTO> userRoleList)throws Exception;

    //rename => selectByPagination
    List<SysUserRoleDTO> selectByUserIdOrRoleId(Map<String, String> map)throws Exception;

    Integer getUserCountByRoIds(Map<String, Object> map)throws Exception;

}
