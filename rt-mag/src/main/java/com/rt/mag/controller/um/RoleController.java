package com.rt.mag.controller.um;

import com.rt.dto.param.um.SysRolePagination;
import com.rt.dto.um.SysRoleDTO;
import com.rt.mag.controller.base.BaseController;
import com.rt.mag.util.Authentication;
import com.rt.mag.vo.um.JsonRoleVO;
import com.rt.mag.vo.um.SysRoleVO;
import com.rt.mag.vo.um.UserDetailVO;
import com.rt.service.um.SysRoleOperationService;
import com.rt.service.um.SysRoleService;
import com.rt.service.um.SysUserRoleService;
import com.rt.util.BeanMapperUtil;
import com.rt.util.ServiceResult;
import com.rt.util.StringUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "role")
public class RoleController extends BaseController{

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    SysRoleService roleService;

    @Autowired
    SysUserRoleService userRoleService;

    @Autowired
    SysRoleOperationService roleOperationService;


    @RequestMapping(value = "roleList", method = RequestMethod.GET)
    public String userList(HttpServletRequest request, Model model) {

        return "/um/role/roleList";
    }

    /**
     *
     * @param model
     * @param pagination
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "roleListPage", method = RequestMethod.POST)
    public String roleListPage(Model model, SysRolePagination pagination) throws Exception {

        UserDetailVO curUser = Authentication.getCurrentUser();
//        CurrentUserDTO curUserDTO = BeanMapperUtil.map(curUser, CurrentUserDTO.class);

        pagination.setCurUserId(curUser.getId());
        pagination.setIsSuperAdmin(curUser.getIsSuperAdmin());


        roleService.getRoleList(pagination);


//        if (!StringUtil.isBlank(name))
//            conditions.put("name", name);
//
//        conditions.put("curUserId", curUser.getId());
//        conditions.put("isSuperAdmin", 1); //curUser.getIsSuperAdmin() 角色列表不给行方开放，所以默认是超级管理员
//        queryPgn.setCurPageNO(pPageIndex);
//        queryPgn.setPageSize(pPageSize);
//        queryPgn.toBePage();
//        queryPgn.setConditions(conditions);
//
//        List<SysRoleDTO> list = roleService.getRoleList(queryPgn);
//        int totalCount = roleService.getRoleListCount(queryPgn);

        List<SysRoleVO> listvo = BeanMapperUtil.mapList(pagination.getRecords(), SysRoleVO.class);

        model.addAttribute("data", listvo);
        addPaginationAttribute(model, pagination);
        return "/um/role/roleListPage";
    }


    /**
     * 新增角色/修改角色
     *
     * @param request
     * @param param
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "editRoleInfo", method = RequestMethod.POST)
    public ServiceResult editRoleInfo(HttpServletRequest request,
                                    @RequestBody String param) throws Exception {

        ServiceResult result = new ServiceResult();
        UserDetailVO curUser = Authentication.getCurrentUser();
        if (curUser == null) {
            return result.failed("登陆已失效，请重新登录");
        }
        //参数
        JSONObject jsonObject = JSONObject.fromObject(param);
        Map map = jsonObject;
        String id = map.get("id").toString();
        String name = map.get("name").toString();
        String remark = map.get("remark").toString();
        if (StringUtil.isBlank(name)) {
            return result.failed("角色名不能为空");
        }

        if(StringUtil.isBlank(id)){
            //id 为空时，新增角色
            result = roleService.addRole(name,remark,curUser.getId(),curUser.getUserName());
        }else{
            //id 不为空时，修改角色
            result = roleService.updateRoleInfo(id, name, remark, curUser.getId(), curUser.getUserName());
        }
        return result;
    }

    /**
     * 新增、编辑角色（页面）
     *
     * @param model
     * @param id
     * @return
     */
    @RequestMapping(value = "editRole", method = RequestMethod.GET)
    public String editPage(Model model, String id) throws Exception {

        if (StringUtil.isNotBlank(id)) {
            SysRoleDTO roleBO = roleService.getRoleByRoleId(id);
            model.addAttribute("name", roleBO.getName());
            model.addAttribute("remark", roleBO.getRemark());
            model.addAttribute("id", id);
        }

        return "/um/role/editRole";
    }



    /** 删除角色，如果还有用户在使用此角色，不能删除
     * deleteRole
     * @param request
     * @param ids
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "deleteRole", method = RequestMethod.POST)
    public ServiceResult deleteRole(HttpServletRequest request, String... ids)throws Exception{
        ServiceResult result = new ServiceResult();
        if (ids == null || ids.length == 0) {
            return result.failed("请选择需要删除的角色");
        }
        UserDetailVO curUser = Authentication.getCurrentUser();

        List<String> idList = new ArrayList<String>();
        for (String id : ids) {
            idList.add(id);
        }
        Integer userCount = userRoleService.getUserCountByRoleIds(idList);
        if (userCount > 0) {
            return result.failed("选择的角色中目前有用户在使用，请先配置用户取消该角色");
        }

        result = roleService.deleteRole(idList, curUser.getId(), curUser.getUserName());

        return result;
    }


    /**
     * 角色菜单设置--列表展示
     *
     * @param model
     * @param id
     * @return
     */
    @RequestMapping(value = "configuration", method = RequestMethod.GET)
    public String configuration(Model model, String id) throws Exception {

        List<Map<String, String>> list = roleOperationService.getRoleOperationListByRoleId(id);
        List<Map<String, String>> listVO = new ArrayList<Map<String, String>>();
        for (Map<String, String> map : list) {
            Map<String, String> _map = new HashMap<String, String>();
            _map.put("id", map.get("id").toString());
            String pId = "0";
            if (map.get("parentId") != null && !("".equals(map.get("parentId"))))
                pId = map.get("parentId").toString();

            _map.put("pId", pId);
            _map.put("name", map.get("name").toString());
            _map.put("open", map.get("hasrole") != null ? "true" : "false");
            _map.put("checked", map.get("hasrole") != null ? "true" : "false");
            listVO.add(_map);
        }

        JSONArray array = JSONArray.fromObject(listVO);

        model.addAttribute("treeJson", array.toString());
        model.addAttribute("id", id);

        return "/um/role/configuration";
    }

    /**
     * 保存菜单
     *
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "saveConfiguration", method = RequestMethod.POST)
    public ServiceResult saveConfiguration(HttpServletRequest request,
                                           @RequestBody JsonRoleVO role) throws Exception {

        ServiceResult result = new ServiceResult();
        UserDetailVO user = Authentication.getCurrentUser();
        String[] operationIds = role.getVmodulID().split("\\|");  //\\u007C
        String roleId = role.getRoleId();
        if (StringUtil.isBlank(roleId)) {
            result.setIsSuccess(false);
            result.setMessage("操作失败");
            return result;
        }
        try {
            result = roleOperationService.updateRoleOperation(roleId, user.getId(), user.getUserName(), operationIds);

        } catch (Exception e) {
            result.setIsSuccess(false);
            result.setMessage("操作失败");
            throw e;
        } finally {

        }

        return result;
    }




}
