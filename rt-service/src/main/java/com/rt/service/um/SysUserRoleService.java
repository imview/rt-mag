package com.rt.service.um;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.rt.dao.entity.um.SysUserRole;
import com.rt.dao.mapper.um.SysUserRoleMapper;
import com.rt.dto.um.SysUserRoleDTO;
import com.rt.dto.um.SysUserRoleMapDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysUserRoleService extends ServiceImpl<SysUserRoleMapper,SysUserRole> {

    public List<SysUserRoleDTO> getUserRoleByUserId(String userId)throws Exception{
        Map<String, String> map = new HashMap<>();
        map.put("userId", userId);

        List<SysUserRoleDTO> userRoleDTOList = baseMapper.selectByUserIdOrRoleId(map);
        return userRoleDTOList;
    }

    public List<Map<String,String>> getUserRoleMap(String userId,String curUserId,Integer isSuperAdmin)throws Exception{

        Map<String,Object> map = new HashMap<>();
        map.put("userId",userId);
        map.put("curUserId",curUserId);
        map.put("isSuperAdmin", isSuperAdmin);

        List<SysUserRoleMapDTO> userRoleMap = baseMapper.selectRoleByUserId(map);
        List<Map<String, String>> listMap = new ArrayList<>();

        if(userRoleMap.size()>0) {
            for (SysUserRoleMapDTO po : userRoleMap) {
                Map<String, String> _mMap = new HashMap<String, String>();
                _mMap.put("rows", po.getRows().toString());
                _mMap.put("id", po.getId());
                _mMap.put("name", po.getName());
                _mMap.put("userId", po.getUserId());
                //@SuppressWarnings("unchecked")
                //Map<String,String> _mMap = (Map<String,String>)po;
                listMap.add(_mMap);
            }
        }
        return listMap;
    }

//    // useless
//    public List<SysUserRoleDTO> getUserRoleList(Map<String,String> map)throws Exception {
//        List<SysUserRoleDTO> userRoleDTOList = baseMapper.selectByUserIdOrRoleId(map);
//        return userRoleDTOList;
//    }

    public List<SysUserRoleDTO> getUserRoleByUserIdOrRoleId(String userId,String roleId)throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("userId", userId);
        map.put("roleId", roleId);
        List<SysUserRoleDTO> userRoleDTOList = baseMapper.selectByUserIdOrRoleId(map);
        return userRoleDTOList;
    }

    public Integer getUserCountByRoleIds(List<String> idList)throws Exception{
        Map<String, Object> map = new HashMap<>();
        map.put("idList", idList);
        return baseMapper.getUserCountByRoIds(map);
    }




}
