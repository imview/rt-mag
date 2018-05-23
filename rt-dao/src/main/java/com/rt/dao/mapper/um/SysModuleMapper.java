package com.rt.dao.mapper.um;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.rt.dao.entity.um.SysOperation;
import com.rt.dto.um.SysOperationDTO;
import com.rt.util.NameValue;
import com.rt.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SysModuleMapper extends BaseMapper<SysOperation>{

    List<SysOperationDTO> getModuleList(Pagination pagination)throws Exception;

    Integer getModuleListCount(Pagination pagination)throws Exception;

    SysOperationDTO getModuleById(String operationId)throws Exception;

    Integer addModule(SysOperationDTO operationDTO)throws Exception;

    Integer updateModule(SysOperationDTO operationDTO)throws Exception;

    Integer deleteModule(Map<String, Object> map)throws Exception;

    List<NameValue> getModule()throws Exception;


}
