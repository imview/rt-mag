package com.rt.dao.mapper.um;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.rt.dao.entity.um.SysOperation;
import com.rt.dto.um.SysOperationActionDTO;
import com.rt.dto.um.SysOperationDTO;
import com.rt.util.NameValue;
import com.rt.util.Pagination;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SysCategoryMapper extends BaseMapper<SysOperation> {

    List<SysOperationDTO> getCategoryPageList(Pagination pagin)throws Exception;

    Integer getCategoryPageListCount(Pagination pagin) throws Exception;

    Integer insertCategory(SysOperationDTO dto) throws Exception;

    Integer updateCategory(SysOperationDTO dto)throws Exception;

    Integer deleteCategory(Map<String, Object> map)throws Exception;

    SysOperationDTO getCategoryById(String categoryId)throws Exception;

    Integer updateCategorySequence(Map<String, Object> map)throws Exception;

    Integer getMaxSequenceByModuleId(String moduleId)throws Exception;

    Integer getMinSequenceByModuleId(String moduleId)throws Exception;
    // parameter: moduleId , curSequence , moveType(Boolean: true => moveUp, fale=>moveDown)
    SysOperationDTO getNextSequenceCategory(Map<String, Object> map)throws Exception;

    Integer getCountMenuOrCategoryByIds(@Param("idList") List<String> idList) throws Exception;


    /************** Menu ********************/

    List<SysOperationDTO> getMenuPageList(String categoryId)throws Exception;

    List<NameValue> getCategorys(String moduleId)throws Exception;

    List<NameValue> getAllAction()throws Exception;

    List<NameValue> getOperationActionList(String operationId)throws Exception;

    Integer insertOperationAction(SysOperationActionDTO operationAction) throws Exception;

    Integer deleteOperationAction(Map<String, Object> map) throws Exception;


}
