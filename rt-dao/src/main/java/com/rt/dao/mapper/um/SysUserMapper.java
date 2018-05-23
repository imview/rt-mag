package com.rt.dao.mapper.um;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.rt.dao.entity.um.SysUser;
import com.rt.dto.um.SysOperationActionWithLevelDTO;
import com.rt.dto.um.SysUserDTO;
import com.rt.dto.um.SysUserExtDTO;
import com.rt.dto.um.UserFindRoleOperationDTO;
import com.rt.util.Pagination;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SysUserMapper extends BaseMapper<SysUser> {

    SysUser getUserByLoginName(String loginName);

    Integer updateUserPwd(SysUserDTO user)throws Exception;

    List<SysOperationActionWithLevelDTO> getAllOperationAction()throws Exception;

    List<SysOperationActionWithLevelDTO> getOperationActionByUserId(@Param("userId") String userId) throws Exception;

    Integer updateUserErrorCount(SysUserDTO user)throws Exception;

    Integer updateUserStatus(Map<String, Object> map)throws Exception;

    Integer updateUser(SysUserDTO userDTO) throws Exception;

    //void insertUser(SystemUserDTO userDTO)throws Exception;
    //使用Mybaitis插入
    Integer addUser(SysUserDTO userDTO)throws Exception;

    SysUserDTO getUserByUserId(String UserId)throws Exception;

    //Integer updateUser(SystemUserDTO userDTO,String curUserId,String curUserName)throws Exception;

    Integer getUserListCount(Pagination pagin)throws Exception;

    List<SysUserExtDTO> getUserList(Pagination pagin) throws Exception;

    List<UserFindRoleOperationDTO> selectRoleOperationListByUserId(String userId) throws Exception;

    Integer deleteUser(Map<String, Object> map) throws Exception;

}
