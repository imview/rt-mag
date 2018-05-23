package com.rt.mag.controller.um;

import com.rt.dao.entity.um.SysAction;
import com.rt.dto.common.CurrentUserDTO;
import com.rt.dto.param.um.SysActionPagination;
import com.rt.mag.controller.base.BaseController;
import com.rt.mag.util.Authentication;
import com.rt.mag.vo.um.ActionVO;
import com.rt.mag.vo.um.UserDetailVO;
import com.rt.service.um.SysActionService;
import com.rt.util.*;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Controller
@RequestMapping("action")
public class ActionController extends BaseController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    SysActionService service;

    @RequestMapping(value = "actionList", method = RequestMethod.GET)
    public String actionList(Model model, HttpServletRequest request) throws Exception {
        return "/um/action/actionList";
    }

    @RequestMapping(value = "actionListPage")
    public String actionListPage(SysActionPagination pagination, Model model) throws Exception {
        service.getActionList(pagination);
        model.addAttribute("actions", pagination.getRecords());
        addPaginationAttribute(model, pagination);
        return "/um/action/actionListPage";
    }

    @RequestMapping(value = "editAction")
    public String modifyAction(Model model, String id) throws Exception {
        ActionVO actionVO = new ActionVO();
        if (!StringUtils.isBlank(id)) {
            SysAction action = service.selectById(id);
            actionVO = BeanMapperUtil.map(action, ActionVO.class);
        }
        model.addAttribute("model", JSONObject.fromObject(actionVO));
        return "/um/action/editAction";
    }

    @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult save(SysAction entity) throws Exception {
        ServiceResult result = new ServiceResult();
        UserDetailVO user = Authentication.getCurrentUser();

        if(!StringUtil.isNotEmpty(entity.getId())){
            entity.setId(UUID.randomUUID().toString());
            entity.setCreateUserId(user.getId());
            entity.setCreateUserName(user.getUserName());
            entity.setCreateTime(new Date());
            entity.setIsDelete(TrueFalse.False.getValue());
        }else{
            entity.setLastUpdateTime(new Date());
            entity.setLastUpdateUserId(user.getId());
            entity.setLastUpdateUserName(user.getUserName());
        }
        Boolean isSuccess=service.insertOrUpdate(entity);
        result.setIsSuccess(isSuccess);
        return result;
    }

    @RequestMapping(value = "del", method = RequestMethod.POST)
    public @ResponseBody ServiceResult del(HttpServletRequest request, String... ids) throws Exception {
        ServiceResult result = new ServiceResult();
        if (ids == null || ids.length == 0) {
            result.setIsSuccess(false);
            result.setMessage("请选择Action");
            return result;
        }
        UserDetailVO user = Authentication.getCurrentUser();
        CurrentUserDTO currentUserDTO=new CurrentUserDTO();
        currentUserDTO = BeanMapperUtil.map(user, CurrentUserDTO.class);
        List<String> idList = new ArrayList<String>();
        for (String id : ids) {
            idList.add(id);
        }
        result = service.deleteAction(idList, currentUserDTO);
        return result;
    }

}
