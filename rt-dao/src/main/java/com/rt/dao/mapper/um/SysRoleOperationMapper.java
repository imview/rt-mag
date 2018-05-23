package com.rt.dao.mapper.um;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.rt.dao.entity.um.SysRoleOperation;
import com.rt.dto.um.SysOperationDTO;
import com.rt.dto.um.SysRoleOperationDTO;
import com.rt.dto.um.UserFindRoleOperationDTO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * RoleOperation =》 角色权限配置
 */
@Repository
public interface SysRoleOperationMapper extends BaseMapper<SysRoleOperation> {


    List<SysOperationDTO> getAllOperationList() throws Exception;

    List<SysOperationDTO> getOperationListByRole(String roleId) throws Exception;

    Integer addRoleOperation(SysRoleOperationDTO roleOperationDTO)throws Exception;

    Integer updateRoleOperation(SysRoleOperationDTO roleOperationDTO)throws Exception;

    Integer updateRoleOperationByIdList(Map<String, Object> map) throws Exception;

    Integer deleteRoleOperationByRoleId(Map<String, Object> map) throws Exception;

    List<UserFindRoleOperationDTO> selectOperationListByRoleId(String roleId)throws Exception;

}
