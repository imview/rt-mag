package com.rt.service.um;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.rt.dao.entity.um.SysOperation;
import com.rt.dao.mapper.um.SysModuleMapper;
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
public class SysModuleService extends ServiceImpl<SysModuleMapper,SysOperation>{

//    public List<SysOperationDTO> getModuleList(int pageIndex,int pageSize)throws Exception{
//        Map<String, Object> map = new HashMap<>();
//        map.put("fromRecord",(pageIndex - 1) * pageSize);
//        map.put("pageSize", pageSize);
//        List<SysOperationDTO> moduleList = baseMapper.getModuleList(map);
//        return moduleList;
//    }
//
//    public Integer getModuleListCount()throws Exception {
//        Integer totalCount = baseMapper.getModuleListCount();
//        return totalCount;
//    }

    public Pagination getModuleList(Pagination pagination)throws Exception{
        pagination.setRecords(baseMapper.getModuleList(pagination));
        pagination.setTotalCount(baseMapper.getModuleListCount(pagination));
        return pagination;
    }

    public SysOperationDTO getModuleById(String operationId) throws Exception {
        return baseMapper.getModuleById(operationId);
    }

    /**
     * MybatisPlus
     * @param operationId
     * @return
     * @throws Exception
     */
    public SysOperationDTO getModuleByID(String operationId)throws Exception{
        SysOperation module =  baseMapper.selectById(operationId);
        SysOperationDTO moduleDTO = BeanMapperUtil.map(module, SysOperationDTO.class);
        return moduleDTO;
    }

    @Transactional("um")
    public ServiceResult addModule(SysOperationDTO module) throws Exception{
        ServiceResult result = new ServiceResult();
        Integer rows = baseMapper.addModule(module);
        if(rows > 0)
            result.succeed("新增模块成功");
        else
            result.failed("新增模块失败");
        return result;
    }

    /**
     * MybatisPlus
     * @param module
     * @return
     * @throws Exception
     */
    @Transactional("um")
    public ServiceResult insertModule(SysOperationDTO module)throws Exception{
        ServiceResult result = new ServiceResult();
        SysOperation modulePO = BeanMapperUtil.map(module, SysOperation.class);
        Integer rows = baseMapper.insert(modulePO);
        if(rows > 0)
            result.succeed("新增模块成功");
        else
            result.failed("新增模块失败");
        return result;
    }

    @Transactional("um")
    public ServiceResult updateModule(SysOperationDTO module)throws Exception{
        ServiceResult result = new ServiceResult();
        Integer rows = baseMapper.updateModule(module);
        if(rows > 0)
            result.succeed("更新模块成功");
        else
            result.failed("更新模块失败");
        return result;
    }

    /**
     * MybatisPlus
     * @param module
     * @return
     * @throws Exception
     */
    @Transactional("um")
    public ServiceResult updateModulePO(SysOperationDTO module)throws Exception{
        ServiceResult result = new ServiceResult();
        SysOperation modulePO = BeanMapperUtil.map(module, SysOperation.class);
        Integer rows = baseMapper.updateById(modulePO);
        if(rows > 0)
            result.succeed("更新模块成功");
        else
            result.failed("更新模块失败");
        return result;
    }

    @Transactional("um")
    public ServiceResult deleteModule(String curUserId,String curUserName,List<String> idList)throws Exception {
        ServiceResult result = new ServiceResult();
        Map<String, Object> map = new HashMap<>();
        map.put("curUserId", curUserId);
        map.put("curUserName", curUserName);
        map.put("idList", idList);

        Integer rows = baseMapper.deleteModule(map);
        if(rows > 0)
            result.succeed("删除模块成功");
        else
            result.failed("删除模块失败");
        return result;
    }

//    /**
//     * mybatisPlus
//     * @param curUserId
//     * @param curUserName
//     * @param idList
//     * @return
//     * @throws Exception
//     */
//    public ServiceResult delete(String curUserId,String curUserName,List<String> idList)throws Exception{
//        ServiceResult result = new ServiceResult();
//        Map<String, Object> map = new HashMap<>();
//        map.put("curUserId", curUserId);
//        map.put("curUserName", curUserName);
//        map.put("idList", idList);
//
//
//    }

    public List<NameValue> getModule()throws Exception{
        List<NameValue> moduleList = baseMapper.getModule();
        return moduleList;
    }





}
