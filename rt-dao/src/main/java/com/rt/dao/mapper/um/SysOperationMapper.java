package com.rt.dao.mapper.um;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.rt.dao.entity.um.SysOperation;
import com.rt.dto.um.SysOperationDTO;
import com.rt.dto.um.SysOperationListDTO;
import com.rt.util.NameValue;
import com.rt.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SysOperationMapper extends BaseMapper<SysOperation>{

    List<SysOperationListDTO> getOperationList(Pagination pagination) throws Exception;

    Integer getOperationListCount(Pagination pagination) throws Exception;

    Integer addOperation(SysOperationDTO operationDTO)throws Exception;

    Integer updateOperation(SysOperationDTO operationDTO)throws Exception;

    Integer deleteOperation(Map<String, Object> map)throws Exception;

    List<NameValue> getChildren(String parentId) throws Exception;

    Integer checkOpCode(Map<String, Object> map)throws Exception;

    List<NameValue> getModuleList()throws Exception;

    SysOperationDTO getOperationById(String id)throws Exception;


}
