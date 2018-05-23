package com.rt.service.um;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.rt.dao.entity.um.SysRole;
import com.rt.dao.mapper.um.SysRoleMapper;
import com.rt.dto.um.SysRoleDTO;
import com.rt.util.Pagination;
import com.rt.util.ServiceResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class SysRoleService extends ServiceImpl<SysRoleMapper,SysRole> {

//    @Transactional("um")
//    public Integer getRoleListCount(Pagination pagin)throws Exception{
//        Integer totalCount = baseMapper.getRoleListCount(pagin);
//        return totalCount;
//    }
//
//    @Transactional("um")
//    public List<SysRoleDTO> getRoleList(Pagination pagin)throws Exception {
//        List<SysRoleDTO> roleDTOList = baseMapper.getRoleList(pagin);
//        return roleDTOList;
//    }

    public Pagination getRoleList(Pagination pagination)throws Exception{
        pagination.setRecords(baseMapper.getRoleList(pagination));
        pagination.setTotalCount(baseMapper.getRoleListCount(pagination));
        return pagination;
    }

    @Transactional("um")
    public SysRoleDTO getRoleByRoleId(String roleId) throws Exception{
        SysRoleDTO roleDTO = baseMapper.selectRoleByRoleId(roleId);
        return roleDTO;
    }

    @Transactional("um")
    public ServiceResult updateRoleInfo(String roleId,String name,String remark,String curUserId,String curUserName)throws Exception{
        ServiceResult result = new ServiceResult();

        SysRoleDTO roleDTO = baseMapper.selectRoleByRoleId(roleId);
        if (roleDTO == null) {
            return result.failed("未找到正确的角色");
        }
        roleDTO.setName(name);
        roleDTO.setRemark(remark);
        roleDTO.setLastUpdateUserId(curUserId);
        roleDTO.setLastUpdateUserName(curUserName);
        Integer rows = baseMapper.updateRoleInfo(roleDTO);
        if (rows > 0) {
            return result.succeed("更新成功");
        }else{
            return result.failed("更新失败");
        }
    }

    @Transactional("um")
    public ServiceResult addRole(String name,String remark,String curUserId,String curUserName) throws Exception {
        ServiceResult result = new ServiceResult();

        SysRoleDTO roleDTO = new SysRoleDTO();
        UUID uuid = UUID.randomUUID();

        roleDTO.setId(uuid.toString());
        roleDTO.setName(name);
        roleDTO.setRemark(remark);
        roleDTO.setIsDelete(0);
        roleDTO.setCreateUserId(curUserId);
        roleDTO.setCreateUserName(curUserName);

        Integer rows = baseMapper.addRole(roleDTO);

        return result.succeed("新增角色成功");
    }

    @Transactional("um")
    public ServiceResult deleteRole(List<String> idList, String curUserId, String curUserName)throws Exception {
        ServiceResult result = new ServiceResult();
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("idList", idList);
        map.put("curUserId", curUserId);
        map.put("curUserName", curUserName);

        Integer rows = baseMapper.deleteRole(map);
        if(rows > 0){
            result.succeed("删除成功");
        }else {
            result.failed("删除失败");
        }
        return result;
    }



}
