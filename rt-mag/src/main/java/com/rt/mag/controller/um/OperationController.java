package com.rt.mag.controller.um;

import com.rt.dto.enums.OperationType;
import com.rt.dto.param.um.SysOperationPagination;
import com.rt.dto.um.SysOperationDTO;
import com.rt.mag.controller.base.BaseController;
import com.rt.mag.util.Authentication;
import com.rt.mag.vo.um.EditOperationVO;
import com.rt.mag.vo.um.UserDetailVO;
import com.rt.service.um.SysModuleService;
import com.rt.service.um.SysOperationService;
import com.rt.util.NameValue;
import com.rt.util.ServiceResult;
import com.rt.util.StringUtil;
import com.rt.util.TrueFalse;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
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
@RequestMapping("operation")
public class OperationController extends BaseController{

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    SysOperationService operationService;

    @Autowired
    SysModuleService moduleService;

    @RequestMapping("operationList")
    public String operationList(Model model, HttpServletRequest request) throws Exception {

        List<NameValue> moduleList = operationService.getModuleList();
        model.addAttribute("moduleList", moduleList);

        return "/um/operation/operationList";
    }

    @RequestMapping(value = "operationListPage")
    public String operationListPage(Model model, SysOperationPagination pagination) throws Exception {

        operationService.getOperationList(pagination);

        model.addAttribute("data", pagination.getRecords());
        addPaginationAttribute(model, pagination);

        // 所属模块
        List<NameValue> modulelist = operationService.getModuleList();
        model.addAttribute("moduleList", modulelist);

        return "/um/operation/operationListPage";
    }

    // 获取栏目、菜单数据
    @ResponseBody
    @RequestMapping(value = "getChildren", method = {RequestMethod.POST, RequestMethod.GET})
    public JSONArray getChildren(HttpServletRequest request, String parentid) throws Exception {
        if (StringUtil.isBlank(parentid)) {
            return null;
        } else {
            List<NameValue> data = operationService.getChildren(parentid);
            JSONArray jsonObject = JSONArray.fromObject(data);
            return jsonObject;
        }
    }

    @RequestMapping("editOperation")
    public String editOperation(Model model, String operationId) throws Exception {

        List<NameValue> moduleList = operationService.getModuleList();
        SysOperationDTO operationDTO = new SysOperationDTO();
        EditOperationVO operationVO = new EditOperationVO();
        if (StringUtil.isNotBlank(operationId)) {
            operationDTO = operationService.getOperationById(operationId);

            operationVO.setId(operationId);
            operationVO.setName(operationDTO.getName());
            operationVO.setCode(operationDTO.getCode());

            operationVO.setMenuId(operationDTO.getParentId());
            SysOperationDTO menuInfo = operationService.getOperationById(operationDTO.getParentId());
            operationVO.setCategoryId(menuInfo.getParentId());
            SysOperationDTO categoryInfo = operationService.getOperationById(menuInfo.getParentId());
            operationVO.setModuleId(categoryInfo.getParentId());
        }

        model.addAttribute("operation", JSONObject.fromObject(operationVO));
        model.addAttribute("moduleList", JSONArray.fromObject(moduleList));
        return "/um/operation/editOperation";

    }

    @ResponseBody
    @RequestMapping(value = "editOperationInfo", method = RequestMethod.POST)
    public ServiceResult editOperationInfo(SysOperationDTO model, HttpServletRequest request) throws Exception{
        ServiceResult result = new ServiceResult();
        UserDetailVO curUser = Authentication.getCurrentUser();
        try {
            if (StringUtil.isBlank(model.getParentId())) {
                return result.failed("请选择所属菜单");
            }
            if (StringUtil.isBlank(model.getName())) {
                return result.failed("操作名称不能为空");
            }
            if (StringUtil.isBlank(model.getCode())) {
                return result.failed("操作编码不能为空");
            }
            SysOperationDTO dto = new SysOperationDTO();
            if (StringUtil.isBlank(model.getId())) {
                //addOperation
                dto.setId(UUID.randomUUID().toString());
                dto.setName(model.getName());
                dto.setParentId(model.getParentId());
                dto.setUrl("");
                dto.setIcon("");
                dto.setSequence(1);
                dto.setEnabled(1);
                dto.setLevel(4);
                dto.setCode(model.getCode());
                dto.setType(OperationType.按钮.getValue());
                dto.setIsDelete(TrueFalse.False.getValue());
                dto.setCreateUserId(curUser.getId());
                dto.setCreateUserName(curUser.getUserName());
                dto.setCreateTime(new Date());
//                dto.setLastUpdateUserId(curUser.getId());
//                dto.setLastUpdateUserName(curUser.getUserName());
//                dto.setLastUpdateTime(new Date());
                result = operationService.insertOperation(dto);
            }else{
                //udpateOpearationInfo
                dto = operationService.getOperationById(model.getId());

                if (dto == null) {
                    return result.failed("更新失败，未找到对应的操作。");
                }
                dto.setName(model.getName());
                dto.setCode(model.getCode());
                dto.setParentId(model.getParentId());
                dto.setLastUpdateUserId(curUser.getId());
                dto.setLastUpdateUserName(curUser.getUserName());
                dto.setLastUpdateTime(new Date());

                result = operationService.updateOperation(dto);
            }

        } catch (Exception e) {
            result.failed("操作失败");
            e.printStackTrace();
            throw e;
        }
        return result;
    }

    // 删除操作
    @ResponseBody
    @RequestMapping(value = "deleteOperation")	// , method = RequestMethod.POST)
    public ServiceResult deleteOperation(HttpServletRequest request, String... ids) throws Exception {
        ServiceResult result = new ServiceResult();
        try {

            if (ids == null || ids.length == 0) {
                return result.failed("请选择要删除的操作");
            }
            UserDetailVO user = Authentication.getCurrentUser();
            List<String> idList = new ArrayList<String>();
            for (String id : ids) {
                idList.add(id);
            }

            result = operationService.deleteOperation(idList, user.getId(), user.getLoginName());
        } catch (Exception e) {
            result.failed("操作异常");
            e.printStackTrace();
            throw e;
        }
        return result;
    }



}
