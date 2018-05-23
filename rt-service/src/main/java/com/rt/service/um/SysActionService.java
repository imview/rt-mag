package com.rt.service.um;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.rt.dao.entity.um.SysAction;
import com.rt.dao.mapper.um.SysActionMapper;
import com.rt.dto.common.CurrentUserDTO;
import com.rt.util.Pagination;
import com.rt.util.ServiceResult;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysActionService extends ServiceImpl<SysActionMapper,SysAction> {
    public Pagination getActionList(Pagination pagination)throws Exception{
        pagination.setRecords(baseMapper.getActionList(pagination));
        pagination.setTotalCount(baseMapper.getActionListCount(pagination));
        return pagination;
    }

    public ServiceResult deleteAction(List<String> idList, CurrentUserDTO currentUser)throws Exception{
        ServiceResult result = new ServiceResult();
        Map<String, Object> map = new HashMap<>();
        map.put("curUserId", currentUser.getId());
        map.put("curUserName", currentUser.getUserName());
        map.put("idList", idList);
        Integer rows = baseMapper.deleteAction(map);
        if(rows > 0)
            result.succeed("删除成功");
        else
            result.failed("删除失败");
        return result;
    }
}
