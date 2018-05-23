package com.rt.mag.controller.um;

import com.rt.dto.param.um.CategoryEditParam;
import com.rt.dto.param.um.MenuEditParam;
import com.rt.dto.param.um.SysCategoryCondition;
import com.rt.dto.param.um.SysCategoryPagination;
import com.rt.dto.um.SysOperationActionDTO;
import com.rt.dto.um.SysOperationDTO;
import com.rt.mag.controller.base.BaseController;
import com.rt.mag.util.Authentication;
import com.rt.mag.vo.um.CategoryVO;
import com.rt.mag.vo.um.UserDetailVO;
import com.rt.service.um.SysCategoryService;
import com.rt.util.BeanMapperUtil;
import com.rt.util.NameValue;
import com.rt.util.ServiceResult;
import com.rt.util.StringUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping(value = "category")
public class CategoryController extends BaseController{

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    SysCategoryService categoryService;

    @RequestMapping(value = "categoryList", method = RequestMethod.GET)  //list
    public String categoryList(Model model, HttpServletRequest request) throws Exception {
        return "/um/category/categoryList";
    }

    @RequestMapping(value = "categoryListPage", method = RequestMethod.POST)
    public String getCategoryList(Model model, SysCategoryPagination pagination) throws Exception {
        SysCategoryCondition conditions = pagination.getConditions();
        if (conditions.getCategoryName() != null) {
            conditions.setCategoryName(conditions.getCategoryName().trim());
        }
        if (null == conditions.getModuleId() || "-1".equals(conditions.getModuleId())) {
            conditions.setModuleId("");
        }

        categoryService.getCategoryList(pagination);
//        Map<String,Object> returnResult=categoryService.getCategoryPageList(queryPgn);
//        List<SysOperationDTO> categoryList = categoryService.getCategoryPageList(queryPgn);
//        Integer totalCount = categoryService.getCategoryPageListCount(queryPgn);

        List<CategoryVO> lsVo = BeanMapperUtil.mapList(pagination.getRecords(), CategoryVO.class);

        model.addAttribute("data", lsVo);
//        model.addAttribute("pager", pagination.getTotalCount());
        addPaginationAttribute(model, pagination);

        return "/um/category/categoryListPage";
    }

    @RequestMapping(value = "editCategory", method = RequestMethod.GET)
    public String viewCategoryAdd(Model model, String id, HttpServletRequest request) throws Exception {
        CategoryVO categoryVO = new CategoryVO();
        categoryVO.setEnabled(1);
        if (!StringUtils.isBlank(id)) {
            SysOperationDTO categoryBo = categoryService.getCategoryById(id);
            categoryVO = BeanMapperUtil.map(categoryBo, CategoryVO.class);
        }
        model.addAttribute("category", JSONObject.fromObject(categoryVO));

        return "/um/category/editCategory";
    }

    //新增栏目
    @RequestMapping(value = "editCategoryInfo", method = RequestMethod.POST)
    public @ResponseBody
    ServiceResult addSaveWithValidated(CategoryEditParam categoryVo, BindingResult bindingResult, HttpServletRequest request) throws Exception {
        ServiceResult result = new ServiceResult();
        SysOperationDTO categoryBo = new SysOperationDTO();
        categoryBo.setCreateTime(new Date());
        //获取用户信息
        UserDetailVO user = Authentication.getCurrentUser();

        categoryBo.setEnabled(categoryVo.getEnabled());
        categoryBo.setIcon(categoryVo.getIcon());
        categoryBo.setName(categoryVo.getName());
        categoryBo.setParentId(categoryVo.getModuleId());

        if (categoryVo.getId() == null || categoryVo.getId().isEmpty()) {
            categoryBo.setId(UUID.randomUUID().toString());
            categoryBo.setLevel(2);
            categoryBo.setCreateUserName(user.getUserName());
            categoryBo.setCreateUserId(user.getId());
            categoryBo.setLastUpdateUserName(user.getUserName());
            categoryBo.setLastUpdateUserId(user.getId());
            categoryBo.setLastUpdateTime(new Date());
            result = categoryService.addCategory(categoryBo);
        } else {
            categoryBo.setSequence(categoryVo.getSequence());
            categoryBo.setId(categoryVo.getId());
            categoryBo.setLastUpdateUserName(user.getUserName());
            categoryBo.setLastUpdateUserId(user.getId());
            categoryBo.setLastUpdateTime(new Date());
            result = categoryService.updateCategory(categoryBo);
        }

        return result;
    }

    @RequestMapping(value = "deleteCategory", method = RequestMethod.POST)
    public @ResponseBody
    ServiceResult deleteCategory(String categoryIds, HttpServletRequest request) throws Exception {
        ServiceResult result = new ServiceResult();
        if (StringUtils.isBlank(categoryIds)) {
            return result.failed("请先选择要删除的栏目");
        }

        String[] arr = categoryIds.split("\\|");
        if (ArrayUtils.isEmpty(arr)) {
            return result.failed("请先选择要删除的栏目");
        }

        List<String> ls = Arrays.asList(arr);
        UserDetailVO user = Authentication.getCurrentUser();
        Integer rows = categoryService.getCountMenuOrCategoryByIds(ls);
        if(rows > 0){
            return result.failed("您所选的栏目中包含着正在使用的菜单，请先进行菜单管理的调整。");
        }
        result = categoryService.deleteCategory(ls, user.getUserName(), user.getId());

        return result;
    }

    @RequestMapping(value = "moveDown", method = RequestMethod.POST)
    public @ResponseBody
    ServiceResult moveDownCategory(String id) throws Exception {
        ServiceResult result = new ServiceResult();
        result = categoryService.moveDownCategory(id);
        return result;
    }

    @RequestMapping(value = "moveUp", method = RequestMethod.POST)
    public @ResponseBody
    ServiceResult moveUpCategory(String id) throws Exception {
        ServiceResult result = new ServiceResult();
        result = categoryService.moveUpCategory(id);
        return result;
    }


    /***********************     menu      ************************************/

    //菜单管理
    @RequestMapping(value = "menuList", method = RequestMethod.GET)
    public String getMenuList(Model model, String categoryName, String categoryId, String moduleId) throws Exception {
        List<SysOperationDTO> lsBo = categoryService.getMenuList(categoryId);
        List<CategoryVO> lsVo = BeanMapperUtil.mapList(lsBo, CategoryVO.class);
        model.addAttribute("data", lsVo);
        model.addAttribute("categoryName", categoryName);//new String(categoryName.getBytes("iso-8859-1"),"UTF-8")
        model.addAttribute("categoryId", categoryId);
        model.addAttribute("moduleId", moduleId);
        return "/um/category/menuList";
    }

    @RequestMapping(value = "editMenu", method = RequestMethod.GET)
    public String addMenuView(Model model, String id, String moduleId, String categoryId) throws Exception {
        CategoryVO categoryVO = new CategoryVO();
        categoryVO.setEnabled(1);
        if (!StringUtils.isBlank(id)) {
            SysOperationDTO categoryBo = categoryService.getCategoryById(id);
            categoryVO = BeanMapperUtil.map(categoryBo, CategoryVO.class);
        }
        model.addAttribute("menu", JSONObject.fromObject(categoryVO));
        model.addAttribute("moduleId", moduleId);
        model.addAttribute("categoryId", categoryId);
        return "/um/category/editMenu";
    }

    /**
     * 新增菜单
     *
     * @param menu
     * @param bindingResult
     * @param request
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "editMenuInfo", method = RequestMethod.POST)
    public ServiceResult addMenuWithValidated(MenuEditParam menu, BindingResult bindingResult, HttpServletRequest request) throws Exception {
        ServiceResult result = new ServiceResult();

        SysOperationDTO categoryBo = new SysOperationDTO();
        categoryBo.setCreateTime(new Date());
        //获取用户信息
        UserDetailVO user = Authentication.getCurrentUser();

        categoryBo.setEnabled(menu.getEnabled());
        categoryBo.setIcon(menu.getIcon());
        categoryBo.setName(menu.getName());
        categoryBo.setUrl(menu.getUrl());
        categoryBo.setParentId(menu.getParentId());
        if (menu.getId() == null || menu.getId().isEmpty()) {
            categoryBo.setId(UUID.randomUUID().toString());
            categoryBo.setLevel(3);
            categoryBo.setCreateUserName(user.getUserName());
            categoryBo.setCreateUserId(user.getId());
            categoryBo.setLastUpdateUserName(user.getUserName());
            categoryBo.setLastUpdateUserId(user.getId());
            categoryBo.setLastUpdateTime(new Date());
            result = categoryService.addCategory(categoryBo);
        } else {
            categoryBo.setSequence(menu.getSequence());
            categoryBo.setId(menu.getId());
            categoryBo.setLastUpdateUserName(user.getUserName());
            categoryBo.setLastUpdateUserId(user.getId());
            categoryBo.setLastUpdateTime(new Date());
            result = categoryService.updateCategory(categoryBo);
        }

        return result;
    }

    /**
     * 查看栏目信息
     *
     * @param moduleId
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "getCategorys", method = RequestMethod.POST)
    public @ResponseBody
    JSONArray getMudule(String moduleId, HttpServletRequest request) throws Exception {

        List<NameValue> data = categoryService.getCategorys(moduleId);
        JSONArray jsonObject = JSONArray.fromObject(data);
        return jsonObject;
    }


    /*************    Action配置    ****************/

    @RequestMapping(value = "getAllAction", method = RequestMethod.POST)
    @ResponseBody
    public JSONArray getAllAction() throws Exception {
        List<NameValue> list = categoryService.getAllAction();
        JSONArray jsonArray = JSONArray.fromObject(list);
        return jsonArray;
    }

    @RequestMapping(value = "getOperationActionList", method = RequestMethod.GET)
    public String getOperationActionList(Model model,String id)throws Exception{
        List<NameValue> list = categoryService.getOperationActionList(id);
        String defaultIds = "";
        for (NameValue item : list) {
            defaultIds += "," + item.getValue();
        }

        if (defaultIds.length() > 0)
            defaultIds = defaultIds.substring(1);
        model.addAttribute("data", JSONArray.fromObject(list));
        model.addAttribute("defaultIds", defaultIds);
        model.addAttribute("operationId", id);
        return "/um/category/setCategoryAction";
    }

    @ResponseBody
    @RequestMapping(value = "addOperationAction",method = RequestMethod.POST)
    public ServiceResult addOperationAction(String operationId,String actionIds,HttpServletRequest request)throws Exception{
        ServiceResult result = new ServiceResult();
        UserDetailVO curUser = Authentication.getCurrentUser();
        if (StringUtil.isBlank(operationId)) {
            return result.failed("参数不正确，请刷新后重试");
        }
        List<SysOperationActionDTO> operationActionList = new ArrayList<>();
        if (StringUtil.isNotBlank(actionIds)) {
            String[] arrActionId = actionIds.split(",");
            for (String actionId : arrActionId) {
                if (StringUtils.isBlank(actionId))
                    continue;
                SysOperationActionDTO bo = new SysOperationActionDTO();
                bo.setId(UUID.randomUUID().toString());
                bo.setActionId(actionId);
                bo.setOperationId(operationId);

                bo.setCreateTime(new Date());
                bo.setCreateUserName(curUser.getUserName());
                bo.setCreateUserId(curUser.getId());
                bo.setIsDelete(0);
                operationActionList.add(bo);
            }
        }
        result = categoryService.insertOperationAction(operationActionList, operationId, curUser.getId(), curUser.getUserName());
        return result;
    }


}
