package com.rt.mag.controller.um;

import com.rt.dto.param.um.SysRoleCondition;
import com.rt.dto.param.um.SysRolePagination;
import com.rt.dto.param.um.SysUserPagination;
import com.rt.dto.um.SysRoleDTO;
import com.rt.dto.um.SysUserDTO;
import com.rt.dto.um.SysUserRoleDTO;
import com.rt.mag.controller.base.BaseController;
import com.rt.mag.util.Authentication;
import com.rt.mag.vo.um.EditUserVO;
import com.rt.mag.vo.um.UserDetailVO;
import com.rt.service.um.SysRoleService;
import com.rt.service.um.SysUserRoleService;
import com.rt.service.um.SysUserService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "user")
public class UserController extends BaseController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    SysUserService userService;

    @Autowired
    SysRoleService roleService;

    @Autowired
    SysUserRoleService userRoleService;

    @RequestMapping(value = "userList", method = RequestMethod.GET)
    public String userList(HttpServletRequest request, Model model) {

        return "/um/user/userList";
    }

    /**
     * 分页查询
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "userListPage", method = RequestMethod.POST)
    public String userListPage(Model model, SysUserPagination pagination) throws Exception {

        UserDetailVO curUser = Authentication.getCurrentUser();
//        SysUserCondition userCondition = pagination.getConditions();
//        userCondition.setCurUserId(curUser.getId());
//        userCondition.setIsSuperAdmin(curUser.getIsSuperAdmin());
//        pagination.setConditions(userCondition);
        pagination.setCurUserId(curUser.getId());
        pagination.setIsSuperAdmin(curUser.getIsSuperAdmin());

        userService.getUserList(pagination);

        model.addAttribute("data", pagination.getRecords());
        addPaginationAttribute(model, pagination);

        return "/um/user/userListPage";
    }

    @RequestMapping(value = "getRoles",method= RequestMethod.POST)
    @ResponseBody
    public JSONArray getRoles()throws Exception{

        UserDetailVO curUser = Authentication.getCurrentUser();
        SysRolePagination pagination = new SysRolePagination();
        SysRoleCondition roleCondition = new SysRoleCondition();
        roleCondition.setName("");

        pagination.setCurUserId(curUser.getId());
        pagination.setIsSuperAdmin(curUser.getIsSuperAdmin());
        pagination.setPageIndex(1);
        pagination.setPageSize(Integer.MAX_VALUE);
        pagination.setConditions(roleCondition);


        roleService.getRoleList(pagination);
        List<SysRoleDTO> roleList = pagination.getRecords();
        List<Map<String, String>> roleListV = new ArrayList<Map<String, String>>();
        for (SysRoleDTO systemRoleDTO : roleList) {
            Map<String, String> roleListMap = new HashMap<String, String>();
            roleListMap.put("value", systemRoleDTO.getId());
            roleListMap.put("text", systemRoleDTO.getName());
            roleListMap.put("name", "");
            roleListV.add(roleListMap);
        }

        return JSONArray.fromObject(roleListV);

    }


    /**
     * 重置密码
     * @param userID
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "resetPassword", method = RequestMethod.GET)
    public ServiceResult resetPassword(String userID) throws Exception {
        ServiceResult result = new ServiceResult();
        UserDetailVO user = Authentication.getCurrentUser();
        result = userService.resetUserPassword(userID, user.getId(), user.getUserName());
        return result;
    }

    /**
     * 解锁用户
     * @param request
     * @param userId
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "resetLock", method = RequestMethod.GET)
    public ServiceResult resetLock(HttpServletRequest request, String userId) throws Exception {
        ServiceResult result = new ServiceResult();
        UserDetailVO user = Authentication.getCurrentUser();
        if (userId == null || userId.isEmpty()) {
            result.failed("参数不正确");
        }

        else {
            result = userService.unlockUser(userId, user.getId(), user.getUserName());
        }
        return result;
    }

    /**
     * 启用 / 禁用 (enable||disable)
     *
     * @param request
     * @param userId
     * @param status
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "modifyIsEnable", method = RequestMethod.GET)
    public ServiceResult modifyIsEnable(HttpServletRequest request, String userId, Integer status) throws Exception {

        ServiceResult result = new ServiceResult();
        UserDetailVO user = Authentication.getCurrentUser();

        if (StringUtil.isBlank(userId)||status == null) {
           return result.failed("参数不正确");
        }
        result = userService.updateUserStatus(userId, status, user.getId(), user.getUserName());

        return result;
    }

    /**
     * 新增&修改用户页面 (打开弹窗时)
     * getAddOrModifyUserPage
     *
     * @param model
     * @param id    => userId
     * @return
     */
    @RequestMapping(value = "editUser", method = RequestMethod.GET)
    public String editUser(Model model, String id) throws Exception {

        UserDetailVO curUser = Authentication.getCurrentUser();
        SysUserDTO userDTO = new SysUserDTO();
        String hasRoleIds = ""; //新增修改用户页的角色属性，默认
        //修改用户
        if (StringUtil.isNotBlank(id)) {
            userDTO = userService.getUserByUserId(id);
            if (userDTO != null) {
                //查询用户拥有的角色
                List<SysUserRoleDTO> userRoleBOs = userRoleService.getUserRoleByUserId(userDTO.getId());

                if (!userRoleBOs.isEmpty()) {
                   // roleId = userRoleBOs.get(0).getRoleId();
                    for (SysUserRoleDTO dto : userRoleBOs) {
                        hasRoleIds += "," + dto.getRoleId();
                    }
                }
            }
        } //end modify user

        SysRolePagination pagination = new SysRolePagination();
        SysRoleCondition roleCondition = new SysRoleCondition();
        roleCondition.setName("");

        pagination.setCurUserId(curUser.getId());
        pagination.setIsSuperAdmin(curUser.getIsSuperAdmin());
        pagination.setPageIndex(1);
        pagination.setPageSize(Integer.MAX_VALUE);
        pagination.setConditions(roleCondition);


        roleService.getRoleList(pagination);
        List<SysRoleDTO> roleList = pagination.getRecords();


        List<Map<String, String>> roleListV = new ArrayList<Map<String, String>>();

        for (SysRoleDTO systemRoleBO : roleList) {
            Map<String, String> roleListMap = new HashMap<String, String>();
            roleListMap.put("id", systemRoleBO.getId());
            roleListMap.put("name", systemRoleBO.getName());
            roleListV.add(roleListMap);
        }

        model.addAttribute("roleList", roleListV);
        model.addAttribute("hasRoleIds", hasRoleIds);
//		model.addAttribute("userModel", "{}");

        //以entity对象传回界面。
        EditUserVO userVO = BeanMapperUtil.map(userDTO, EditUserVO.class);
        model.addAttribute("entity", JSONObject.fromObject(userVO));

        return "/um/user/editUser";
    }


    /**
     * 新增 或 修改用户
     *
     * @param request
     * @param param
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "editUserInfo", method = RequestMethod.POST)
    public ServiceResult editUserInfo(HttpServletRequest request, @RequestBody String param) throws Exception {

        ServiceResult result = new ServiceResult();
        UserDetailVO curUser = Authentication.getCurrentUser();
        JSONObject jsonObject = JSONObject.fromObject(param);
        Map map = jsonObject;

        //参数
        String loginName = map.get("loginName").toString();
        String userId = map.get("userId").toString();
        String userName = map.get("userName").toString();
        String password = map.get("password").toString();
        String roleIDs = map.get("roleIDs").toString();
        String mobile = map.get("mobile").toString();
        String email = map.get("email").toString();
        //后台验证
        if (StringUtil.isBlank(loginName)) {
            return result.failed("后台账号不能为空");
        }
        if (StringUtil.isBlank(userName)) {
            return result.failed("用户名不能为空");
        }
        if (StringUtil.isBlank(password)) {
            return result.failed("密码不能为空");
        }
        if (StringUtil.isBlank(roleIDs)) {
            return result.failed("用户角色不能为空");
        }

        try {
           // 验证后台账号唯一
            SysUserDTO userDTO = userService.getUserByLoginName(loginName);
            if (userDTO != null && !userDTO.getId().equals(userId)) {
                return result.failed("已存在该后台账户的用户，请修改为其他账号");
            }
            //userId为空，添加用户
            if (StringUtil.isBlank(userId)) {
                result = userService.addUser(loginName, userName, password,
                        roleIDs, mobile, email, curUser.getUserName(), curUser.getId());

            } else { //更新用户
                result = userService.updateUser(userId, loginName, userName, password, roleIDs,
                        mobile, email, curUser.getUserName(), curUser.getId());
            }

        } catch (Exception e) {
            result.failed("更新用户失败");
            e.printStackTrace();
            throw e;
        }

        return result;
    }

    /**
     * 配置用户的角色
     *
     * @param request
     * @param param
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "saveUserRole", method = RequestMethod.POST)
    public ServiceResult saveUserRole(HttpServletRequest request,
                                              @RequestBody String param) throws Exception {
        ServiceResult result = new ServiceResult();

        JSONObject jsonObject = JSONObject.fromObject(param);
        Map map = jsonObject;
        String pUserId = map.get("pUserId").toString();
        String pRoleIds = map.get("pRoleIds").toString();
        if (pUserId == null || pUserId.length() <= 0) {
            return result.failed("用户ID不能为空");
        }

        if (pRoleIds != null && !pRoleIds.isEmpty()) {
            String[] roleIds = pRoleIds.split(",");
            if (roleIds.length <= 0) {
                return result.failed("角色ID不能为空");
            }
            UserDetailVO user = Authentication.getCurrentUser();
            result = userService.updateUserRoleByUserId(pUserId, user.getId(), user.getUserName(), roleIds);

        } else {
            result.failed("传入参数不对");
        }
        return result;
    }

    /**
     * 根据用户查询所拥有的角色类型及权限
     *
     * @param model
     * @param userId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "modifyUserRole", method = RequestMethod.GET)
    public String modifyUserRole(Model model, String userId) throws Exception {

        UserDetailVO curUser = Authentication.getCurrentUser();

        List<Map<String, String>> userRoleList = userRoleService.getUserRoleMap(userId, curUser.getId(), curUser.getIsSuperAdmin());
        model.addAttribute("data", userRoleList);
        model.addAttribute("userId", userId);

        return "/um/user/modifyUserRole";
    }

    /**
     * 获取用户权限树
     * @param request
     * @param model
     * @param pUserId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "configurationByUser", method = RequestMethod.GET)
    public String configurationByUser(HttpServletRequest request, Model model, String pUserId) throws Exception {

        List<Map<String, String>> userRoleList = userService.selectRoleMapByUserId(pUserId);
        List<Map<String, String>> listVO = new ArrayList<Map<String, String>>();
        for (Map<String, String> map : userRoleList) {
            Map<String, String> _map = new HashMap<String, String>();
            _map.put("id", map.get("id").toString());

            String pId = "0";
            if (map.get("parentId") != null)
                pId = map.get("parentId").toString();

            _map.put("pId", pId);
            _map.put("name", map.get("name").toString());
            _map.put("open", map.get("hasrole") != null ? "true" : "false");
            _map.put("checked", map.get("hasrole") != null ? "true" : "false");
            listVO.add(_map);
        }

        JSONArray array = JSONArray.fromObject(listVO);
        model.addAttribute("treeJson", array.toString());
        model.addAttribute("roleId", "");

        return "/um/user/configurationByUser";
    }


    /**
     * 删除用户
     * @param request
     * @param ids
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "deleteUser", method = RequestMethod.POST)
    public ServiceResult deleteUser(HttpServletRequest request,String ...ids)throws Exception{
        ServiceResult result = new ServiceResult();
        if (ids == null || ids.length == 0) {
            return result.failed("请选择需要删除的用户。");
        }
        UserDetailVO curUser = Authentication.getCurrentUser();

        List<String> idList = new ArrayList<String>();
        for (String id : ids) {
            idList.add(id);
        }

        result =  userService.deleteUser(idList, curUser.getId(), curUser.getUserName());

        return result;

    }


}
