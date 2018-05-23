package com.rt.dao.mapper.um;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.rt.dao.entity.um.SysAction;
import com.rt.dto.um.SysActionDTO;
import com.rt.util.Pagination;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SysActionMapper extends BaseMapper<SysAction> {
    List<SysActionDTO> getActionList(Pagination condition) throws Exception;

    Integer getActionListCount(Pagination condition) throws Exception;

    Integer deleteAction(Map<String, Object> map)throws Exception;
}
