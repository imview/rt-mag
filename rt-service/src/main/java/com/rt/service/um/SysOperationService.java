package com.rt.service.um;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.rt.dao.entity.um.SysOperation;
import com.rt.dao.mapper.um.SysOperationMapper;
import com.rt.dto.um.SysOperationDTO;
import com.rt.util.BeanMapperUtil;
import com.rt.util.NameValue;
import com.rt.util.Pagination;
import com.rt.util.ServiceResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysOperationService extends ServiceImpl<SysOperationMapper, SysOperation> {

//    public List<SysOperationListDTO> getOperationList(Map<String,Object> map)throws Exception{
//        List<SysOperationListDTO> operationListDTOS = new ArrayList<>();
//        operationListDTOS = baseMapper.getOperationList(map);
//        return operationListDTOS;
//    }
//
//    public Integer getOperationListCount(Map<String,Object> map)throws Exception {
//        Integer totalCount = baseMapper.getOperationListCount(map);
//        return totalCount;
//    }
    public Pagination getOperationList(Pagination pagination)throws Exception{
        pagination.setRecords(baseMapper.getOperationList(pagination));
        pagination.setTotalCount(baseMapper.getOperationListCount(pagination));
        return pagination;
    }

    @Transactional("um")
    public ServiceResult insertOperation(SysOperationDTO dto)throws Exception{
        ServiceResult result = new ServiceResult();
        SysOperation operationPO = BeanMapperUtil.map(dto, SysOperation.class);
        Integer rows =  baseMapper.insert(operationPO);
        if(rows > 0)
            result.succeed("新增操作成功");
        else
            result.failed("新增操作失败");
        return result;
    }

    @Transactional("um")
    public ServiceResult updateOperation(SysOperationDTO dto) throws Exception {
        ServiceResult result = new ServiceResult();

        Integer rows = baseMapper.updateOperation(dto);
        if(rows > 0)
            result.succeed("更新操作成功");
        else
            result.failed("更新操作失败");
        return result;
    }

    @Transactional("um")
    public ServiceResult deleteOperation(List<String> idList, String curUserId, String curUserName)throws Exception {
        ServiceResult result = new ServiceResult();
        Map<String, Object> map = new HashMap<>();
        map.put("curUserId", curUserId);
        map.put("curUserName", curUserName);
        map.put("idList", idList);

        Integer rows = baseMapper.deleteOperation(map);
        if(rows > 0)
            result.succeed("删除操作成功");
        else
            result.failed("删除操作失败");
        return result;
    }

    public List<NameValue> getChildren(String parentId)throws Exception{
        List<NameValue> moduleList = baseMapper.getChildren(parentId);
        return moduleList;
    }

//    public Boolean checkOpCode(String opCode,String id)throws Exception{
//        Map<String, Object> map = new HashMap<>();
//        map.put("opCode", opCode);
//        map.put("id", id);
//
//        Integer rows = baseMapper.checkOpCode(map);
//        return rows > 0 ? true : false;
//    }

    public List<NameValue> getModuleList()throws Exception{
        List<NameValue> moduleList = baseMapper.getModuleList();
        return moduleList;
    }

    public SysOperationDTO getOperationById(String id) throws Exception{
        SysOperationDTO dto = baseMapper.getOperationById(id);
        return dto;
    }



}
