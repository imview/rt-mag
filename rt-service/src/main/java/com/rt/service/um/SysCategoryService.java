package com.rt.service.um;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.rt.dao.entity.um.SysOperation;
import com.rt.dao.mapper.um.SysCategoryMapper;
import com.rt.dto.um.SysOperationActionDTO;
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
public class SysCategoryService extends ServiceImpl<SysCategoryMapper, SysOperation> {


    public Pagination getCategoryList(Pagination pagination)throws Exception{
        pagination.setRecords(baseMapper.getCategoryPageList(pagination));
        pagination.setTotalCount(baseMapper.getCategoryPageListCount(pagination));
        return pagination;
    }


    @Transactional("um")
    public ServiceResult addCategory(SysOperationDTO dto)throws Exception{
        ServiceResult result = new ServiceResult();
        SysOperation operation = BeanMapperUtil.map(dto, SysOperation.class);
        Integer maxSequence = baseMapper.getMaxSequenceByModuleId(operation.getParentId());
        if (maxSequence == null || 0 >= maxSequence.intValue()) {
            maxSequence = 1;
        }else {
            maxSequence ++;
        }
        operation.setSequence(maxSequence);
        operation.setIsDelete(0);
        operation.setType(1);

        Integer rows = baseMapper.insert(operation);
        if(rows > 0){
            result.succeed("新增成功");
        }else {
            result.failed("新增失败");
        }
        return result;
    }

    @Transactional("um")
    public ServiceResult deleteCategory(List<String> idList,String curUserId,String curUserName)throws Exception{
        ServiceResult result = new ServiceResult();
        Map<String, Object> map = new HashMap<>();
        map.put("idList", idList);
        map.put("curUserId", curUserId);
        map.put("curUserName", curUserName);
        Integer rows = baseMapper.deleteCategory(map);
        if(rows > 0){
            result.succeed("删除成功");
        }else {
            result.failed("删除失败");
        }
        return result;
    }

    @Transactional("um")
    public ServiceResult updateCategory(SysOperationDTO dto)throws Exception {
        ServiceResult result = new ServiceResult();
        int rows = baseMapper.updateCategory(dto);
        if(rows > 0){
            result.succeed("更新成功");
        }else {
            result.failed("更新失败");
        }
        return result;
    }

    @Transactional("um")
    public ServiceResult moveUpCategory(String categoryId)throws Exception{
        ServiceResult result = new ServiceResult();
        try {
            SysOperationDTO curCategory = baseMapper.getCategoryById(categoryId);
            Integer curSequence = curCategory.getSequence();
            String moduleId = curCategory.getParentId();

            Integer minSequence = baseMapper.getMinSequenceByModuleId(moduleId);
            if (curSequence > minSequence) {
                Map<String, Object> map = new HashMap<>();
                map.put("moduleId", moduleId);
                map.put("moveType", true);
                map.put("curSequence", curSequence);
                SysOperationDTO nextCategory = baseMapper.getNextSequenceCategory(map);

                //交换两个栏目列表的sequence更新
                //更新 curCategory
                map.clear();
                map.put("sequence", nextCategory.getSequence());
                map.put("categoryId", curCategory.getId());
                Integer rows =  baseMapper.updateCategorySequence(map);
                //更新 nextCategory
                map.clear();
                map.put("sequence",curSequence);
                map.put("categoryId", nextCategory.getId());
                Integer rows2 = baseMapper.updateCategorySequence(map);
                result.succeed("上移成功");
            }else{
                result.failed("嘿，到顶了，无法继续上移了！");
            }

        } catch (Exception e) {
            result.failed("操作失败");
            e.printStackTrace();
            throw e;
        }
        return result;
    }

    @Transactional("um")
    public ServiceResult moveDownCategory(String categoryId)throws Exception{
        ServiceResult result = new ServiceResult();
        try {
            SysOperationDTO curCategory = baseMapper.getCategoryById(categoryId);
            Integer curSequence = curCategory.getSequence();
            String moduleId = curCategory.getParentId();

            Integer maxSequence = baseMapper.getMaxSequenceByModuleId(moduleId);
            if (curSequence < maxSequence) {
                Map<String, Object> map = new HashMap<>();
                map.put("moduleId", moduleId);
                map.put("moveType", false);
                map.put("curSequence", curSequence);
                SysOperationDTO nextCategory = baseMapper.getNextSequenceCategory(map);

                //交换两个栏目列表的sequence更新
                //更新 curCategory
                map.clear();
                map.put("sequence", nextCategory.getSequence());
                map.put("categoryId", curCategory.getId());
                Integer rows =  baseMapper.updateCategorySequence(map);
                //更新 nextCategory
                map.clear();
                map.put("sequence",curSequence);
                map.put("categoryId", nextCategory.getId());
                Integer rows2 = baseMapper.updateCategorySequence(map);
                result.succeed("下移成功");
            }else{
                result.failed("嘿，到底了，无法继续下移了！");
            }

        } catch (Exception e) {
            result.failed("操作失败");
            e.printStackTrace();
            throw e;
        }
        return result;
    }

    public SysOperationDTO getCategoryById(String categoryId)throws Exception{
        SysOperationDTO category = baseMapper.getCategoryById(categoryId);
        return category;
    }

    public Integer getCountMenuOrCategoryByIds(List<String> idList)throws Exception{
        Integer rows = baseMapper.getCountMenuOrCategoryByIds(idList);
        return rows;
    }


    /**********************    menu    *****************************/

    public List<SysOperationDTO> getMenuList(String categoryId)throws Exception{
        List<SysOperationDTO> menuList = baseMapper.getMenuPageList(categoryId);
        return menuList;
    }

    public List<NameValue> getCategorys(String moduleId)throws Exception{
        List<NameValue> list = baseMapper.getCategorys(moduleId);
        return list;
    }

    public List<NameValue> getAllAction()throws Exception{
        List<NameValue> actionList = baseMapper.getAllAction();
        return actionList;
    }

    public List<NameValue> getOperationActionList(String operationId)throws Exception{
        List<NameValue> operationActionList = baseMapper.getOperationActionList(operationId);
        return operationActionList;
    }

    public ServiceResult insertOperationAction(List<SysOperationActionDTO> sourceList,String operationId,
                                 String curUserId,String curUserName)throws Exception {

        ServiceResult result = new ServiceResult();
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("operationId", operationId);
            map.put("curUserId", curUserId);
            map.put("curUserName", curUserName);
            Integer rows = baseMapper.deleteOperationAction(map);

            if (sourceList.size() > 0) {
                for (SysOperationActionDTO dto : sourceList) {
                    baseMapper.insertOperationAction(dto);
                }
            }


            result.succeed("动作配置成功");
        } catch (Exception e) {
            result.failed("动作配置失败");
            e.printStackTrace();
            throw e;
        }
        return result;

    }





}
