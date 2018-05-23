package com.rt.mag.controller.um;

import com.rt.dto.enums.OperationType;
import com.rt.dto.um.SysOperationDTO;
import com.rt.mag.controller.base.BaseController;
import com.rt.mag.util.Authentication;
import com.rt.mag.vo.um.ModuleVO;
import com.rt.mag.vo.um.UserDetailVO;
import com.rt.service.um.SysCategoryService;
import com.rt.service.um.SysModuleService;
import com.rt.util.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping("module")
public class ModuleController extends BaseController{

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    SysModuleService moduleService;
    @Autowired
    SysCategoryService categoryService;

    @RequestMapping(value = "moduleList")
    public String moduleList(Model model, HttpServletRequest request) throws Exception {
        return "/um/module/moduleList";
    }

    @RequestMapping(value = "moduleListPage")
    public String moduleListPage(Model model,Pagination pagination) throws Exception {
        try {
//            List<SysOperationDTO> moduleList = moduleService.getModuleList(pageIndex, pageSize);
//            Integer totalCount = moduleService.getModuleListCount();
//
//            model.addAttribute("modules", moduleList);
//            model.addAttribute("iIndex", pageIndex);
//            model.addAttribute("iSize", pageSize);
//            model.addAttribute("iCount", totalCount);
            moduleService.getModuleList(pagination);
            model.addAttribute("modules", pagination.getRecords());
            addPaginationAttribute(model, pagination);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }

        return "/um/module/moduleListPage";
    }

    /**
     * 新增&修改模块合并
     *
     * @param model
     * @param operationId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "editModule", method = RequestMethod.GET)
    public String editModulePage(Model model, String operationId) throws Exception {
        SysOperationDTO module = new SysOperationDTO();

        //module = moduleService.getModuleByID(operationId);  // mybatisPlus
        if (StringUtil.isNotBlank(operationId))  //modify
            module = moduleService.getModuleById(operationId);
        else
            module.setEnabled(1);

        ModuleVO moduleVO = BeanMapperUtil.map(module, ModuleVO.class);
        model.addAttribute("module", JSONObject.fromObject(moduleVO));
        return "/um/module/editModule";
    }

    @ResponseBody
    @RequestMapping(value = "editModuleInfo", method = RequestMethod.POST)
    public ServiceResult editModuleInfo(HttpServletRequest request, @RequestBody String param) throws Exception {
        ServiceResult result = new ServiceResult();
        SysOperationDTO module = new SysOperationDTO();
        //参数
        JSONObject jsonObject = JSONObject.fromObject(param);
        Map map = jsonObject;
        String id = map.get("id").toString();
        String name = map.get("name").toString();
        Integer sequence = Integer.parseInt(map.get("sequence").toString());
        Integer enabled = Integer.parseInt(map.get("enabled").toString());
        try {
            if (StringUtil.isBlank(name)) {
                return result.failed("模块名称不能为空");
            }
            UserDetailVO curUser = Authentication.getCurrentUser();
            //addModule
            if (StringUtil.isBlank(id)) {
                module.setId(UUID.randomUUID().toString());
                module.setName(name);
                module.setSequence(sequence);
                module.setEnabled(enabled);
                module.setLevel(1);
                module.setType(OperationType.栏目.getValue());
                module.setIsDelete(TrueFalse.False.getValue());
                module.setCreateUserName(curUser.getLoginName());
                module.setCreateUserId(curUser.getId());
                module.setCreateTime(new Date());
                result =  moduleService.insertModule(module); //mybatisPlus
                //result = moduleService.addModule(module);
            } else {
                module = moduleService.getModuleById(id); //moduleService.getModuleByID(id);
                if (module == null) {
                    return result.failed("无效的模块");
                }
                module.setName(name);
                module.setSequence(sequence);
                module.setEnabled(enabled);
                module.setLastUpdateUserName(curUser.getUserName());
                module.setLastUpdateTime(new Date());
                module.setLastUpdateUserId(curUser.getId());

                result = moduleService.updateModulePO(module);//moduleService.updateModule(module);
            }
        } catch (Exception e) {
            result.failed("操作模块失败");
            e.printStackTrace();
            throw e;
        }
        return result;
    }

    /**
     * 删除模块
     * @param request
     * @param ids
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "deleteModule", method = RequestMethod.POST)
    public ServiceResult deleteModule(HttpServletRequest request,String ...ids)throws Exception{
        ServiceResult result = new ServiceResult();
        try{
            if (ids == null || ids.length <= 0) {
                return result.failed("参数不正确");
            }
            UserDetailVO curUser = Authentication.getCurrentUser();
            List<String> idList = new ArrayList<String>();
            for (String id : ids) {
                idList.add(id);
            }

            Integer rows = categoryService.getCountMenuOrCategoryByIds(idList);
            if(rows > 0){
                return result.failed("您所选的模块中包含着正在使用的栏目，请先进行栏目管理的调整。");
            }
            result = moduleService.deleteModule(curUser.getId(), curUser.getUserName(),idList );
        }catch (Exception e) {
            result.failed("删除模块失败");
            e.printStackTrace();
            throw e;
        }
        return result;
    }

    /**
     * 查看模块信息
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "getModule", method = RequestMethod.POST)
    public JSONArray getMudule() throws Exception{
        List<NameValue> data = moduleService.getModule();
        JSONArray jsonObject = JSONArray.fromObject(data);
        return jsonObject;
    }



}
