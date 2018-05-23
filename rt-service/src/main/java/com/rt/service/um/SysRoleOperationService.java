package com.rt.service.um;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.rt.dao.entity.um.SysRoleOperation;
import com.rt.dao.mapper.um.SysRoleOperationMapper;
import com.rt.dto.um.SysOperationDTO;
import com.rt.dto.um.SysRoleOperationDTO;
import com.rt.dto.um.UserFindRoleOperationDTO;
import com.rt.util.BeanMapperUtil;
import com.rt.util.ServiceResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SysRoleOperationService extends ServiceImpl<SysRoleOperationMapper, SysRoleOperation> {

    public List<SysOperationDTO> getAllOperation() throws Exception {
        List<SysOperationDTO> operationDTOList = baseMapper.getAllOperationList();
        return operationDTOList;
    }

    public List<SysOperationDTO> getOperationListByRole(String roleId) throws Exception {
        List<SysOperationDTO> operationDTOList = baseMapper.getOperationListByRole(roleId);
        return operationDTOList;
    }

    public ServiceResult addRoleOperation(SysRoleOperationDTO roleOperationDTO) throws Exception {
        ServiceResult result = new ServiceResult();
        Integer rows = baseMapper.addRoleOperation(roleOperationDTO);
        if (rows > 0) {
            result.succeed("新增成功");
        } else {
            result.failed("新增失败");
        }
        return result;
    }

    //mybatisPlus
    public ServiceResult addRoleOperationPO(SysRoleOperationDTO roleOperationDTO) throws Exception {
        ServiceResult result = new ServiceResult();
        SysRoleOperation roleOperationPO = BeanMapperUtil.map(roleOperationDTO, SysRoleOperation.class);
        Integer rows = baseMapper.insert(roleOperationPO);
        if (rows > 0) {
            result.succeed("新增成功");
        } else {
            result.failed("新增失败");
        }
        return result;
    }

    public List<Map<String, String>> getRoleOperationListByRoleId(String roleId) throws Exception {

        List<Map<String, String>> listMap = new ArrayList<Map<String, String>>();
        List<UserFindRoleOperationDTO> dtoList = baseMapper.selectOperationListByRoleId(roleId);

        if (dtoList.size() > 0) {
            for (UserFindRoleOperationDTO dto : dtoList) {
                Map<String, String> _mMap = new HashMap<>();
                _mMap.put("rows", dto.getRows().toString());
                _mMap.put("id", dto.getId());
                _mMap.put("name", dto.getName());
                _mMap.put("parentId", dto.getParentId());
                _mMap.put("gSequence", dto.getSequence().toString());
                _mMap.put("hasrole", dto.getHasrole());

                listMap.add(_mMap);
            }
        }
        return listMap;
    }

    /**
     * 更新角色菜单
     * @param roleId
     * @param curUserName
     * @param operationIds
     * @return
     * @throws Exception
     */
    @Transactional("um")
    public ServiceResult updateRoleOperation(String roleId, String curUserId, String curUserName, String... operationIds) throws Exception {
        ServiceResult result = new ServiceResult();
        Map<String,Object> map = new HashMap<String,Object>();

        try {
            List<SysOperationDTO> operationDTOList = baseMapper.getOperationListByRole(roleId);

            String[] ids = new String[operationDTOList.size()];
            for(int i=0;i<operationDTOList.size();i++) {
                ids[i] = operationDTOList.get(i).getId();
            }

            for(int j=0;j<operationIds.length;j++) {
                if (!isInList(ids, operationIds[j])) {
                    //选择的菜单在数据库中不包含的时候，插入数据库
                    String uid = UUID.randomUUID().toString();
                    SysRoleOperationDTO roleOperationDTO = new SysRoleOperationDTO();
                    roleOperationDTO.setRoleId(roleId);
                    roleOperationDTO.setOperationId(operationIds[j]);
                    roleOperationDTO.setIsDelete(0);
                    roleOperationDTO.setCreateUserId(curUserId);
                    roleOperationDTO.setCreateTime(new Date());
                    roleOperationDTO.setId(uid);
                    roleOperationDTO.setCreateUserName(curUserName);
                    //插入数据
                    baseMapper.addRoleOperation(roleOperationDTO);
                }
            }
            //全部设置为不可用
            map.put("roleId", roleId);
            map.put("curUserId", curUserId);
            map.put("curUserName", curUserName);
            baseMapper.deleteRoleOperationByRoleId(map);

            //按选择的设置为可用
            List<String> idList = new ArrayList<>();
            for (String id : operationIds) {
                idList.add(id);
            }
            map.put("idList", idList);
            Integer rows = baseMapper.updateRoleOperationByIdList(map);
            if (rows > 0) {
                result.succeed("操作成功");
            } else {
                result.failed("操作失败");
            }
        } catch (Exception e) {
            result.failed("操作异常");
            e.printStackTrace();
            throw e;
        }
        return result;
    }

    private static boolean isInList(String[] arr, String targetValue) {
        return Arrays.asList(arr).contains(targetValue);
    }


}
