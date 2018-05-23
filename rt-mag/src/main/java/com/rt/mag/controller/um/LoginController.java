package com.rt.mag.controller.um;

import com.rt.dto.um.SysUserDTO;
import com.rt.mag.property.AppProperty;
import com.rt.mag.util.ConstKey;
import com.rt.mag.vo.um.OperationVO;
import com.rt.mag.vo.um.UserDetailVO;
import com.rt.service.um.SysUserService;
import com.rt.util.Base64Util;
import com.rt.util.MD5Util;
import com.rt.util.ServiceResult;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import java.util.UUID;

// import org.springframework.security.core.Authentication;

@Controller
public class LoginController {

//	private final Logger logger = LoggerFactory.getLogger(this.getClass());
//
	@Autowired
    AppProperty appProperty;
	@Autowired
    SysUserService userService;
//
	@RequestMapping(value = "login/index")
	public ModelAndView login(Model model, HttpSession session) throws Exception {
		String token = UUID.randomUUID().toString();
		model.addAttribute("version", appProperty.getVersion());
		model.addAttribute("url", appProperty.getUrl());
		model.addAttribute("managerTitle", appProperty.getManagerTitle());
		model.addAttribute("loginToken", token);
		session.setAttribute("loginToken", token);

		return new ModelAndView("forward:/WEB-INF/login.jsp");
	}

	@RequestMapping(value = "/login/loginSucceed")
	@ResponseBody
	public String loginSucceed(Model model, String parentId, HttpServletRequest request) {
		ServiceResult result=new ServiceResult();
		result.succeed("登陆成功");
		return net.sf.json.JSONObject.fromObject(result).toString();
	}

	@RequestMapping(value = "login/logout", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView logout(HttpServletRequest request) {
		request.getSession().removeAttribute(ConstKey.MAG_USER);
		request.getSession().removeAttribute("permissionAction");

		return new ModelAndView("forward:/WEB-INF/login.jsp");
	}

	@RequestMapping(value = "home/index")
	public ModelAndView goIndex(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ModelAndView mv = new ModelAndView("forward:/WEB-INF/index.jsp");
		List<OperationVO> moduleVO = (List<OperationVO>) request.getSession().getAttribute("module");
		List<OperationVO> MCMVO = (List<OperationVO>) request.getSession().getAttribute("mcm");

		UserDetailVO user = (UserDetailVO) request.getSession().getAttribute(ConstKey.MAG_USER);
				// Authentication.getCurrentUser();

        if (user == null) {
        	// Sesson过期，则重新登录
        	if (request.getHeader("x-requested-with") != null
					&& request.getHeader("x-requested-with")
							.equalsIgnoreCase("XMLHttpRequest"))// 如果是ajax请求响应头会有，x-requested-with；
			{
				response.setHeader("sessionstatus", "timeout1");// 在响应头设置session状态
				return null;
			}
			response.setContentType("text/html;charset=UTF-8");
			PrintWriter out = response.getWriter();

			StringBuilder builder = new StringBuilder();
			builder
					.append("<script type=\"text/javascript\" charset=\"UTF-8\">");
			builder.append("alert(\"登录超时，请重新登录\");");
			builder.append("window.top.location.href=\"");
			builder.append( request.getContextPath() + "/login/index");
			builder.append("\";</script>");
			out.print(builder.toString());
			out.close();
			return null;
        }

		mv.addObject("username", user.getUserName());

		mv.addObject("module", JSONArray.fromObject(moduleVO));
		mv.addObject("defaultModule", moduleVO.size() > 0 ? moduleVO.get(0) : null);
		mv.addObject("mcm", JSONArray.fromObject(MCMVO));

		mv.addObject("version", appProperty.getVersion());
		mv.addObject("managerTitle", appProperty.getManagerTitle());
		return mv;
	}

	@RequestMapping(value = "/account/userInfo")
	public String userInfo(Model model, HttpServletRequest request) {
		UserDetailVO user = (UserDetailVO) request.getSession().getAttribute(ConstKey.MAG_USER);
		request.setAttribute("loginName", user.getLoginName());
		request.setAttribute("userName", user.getUserName());
		request.setAttribute("mobile", user.getMobile());
		request.setAttribute("email", user.getEmail());
		return "/um/account/userinfo";
	}

	@RequestMapping(value = "/account/modifyPwdView")
	public String modifyPwdView(Model model, HttpServletRequest request, HttpSession session) {
		String token = UUID.randomUUID().toString();

		session.setAttribute("securityToken", token);
		UserDetailVO user = (UserDetailVO) request.getSession().getAttribute(ConstKey.MAG_USER);
		model.addAttribute("loginName", user.getLoginName());
		model.addAttribute("securityToken", token);
		return "/um/account/modifypwd";
	}

	@RequestMapping(value = "/account/modifyPwd", method = RequestMethod.POST)
	public @ResponseBody ServiceResult modifyPWD(HttpServletRequest request, HttpSession session, String oldPassword,
			String newPassword, String token) throws Exception {
		ServiceResult result = new ServiceResult();
		String newToken = UUID.randomUUID().toString();
		session.setAttribute("securityToken", newToken);
		result.getDicData().put("securityToken", newToken);

		if (oldPassword.equals(newPassword)) {
			return result.failed("新旧密码相同，修改失败");
		}

		UserDetailVO uservo = (UserDetailVO) request.getSession().getAttribute(ConstKey.MAG_USER);
		oldPassword = Base64Util.decode(oldPassword).replace(token, "");
		try {

			SysUserDTO user = userService.getUserByLoginName(uservo.getLoginName());
			if (user == null || !MD5Util.MD5(oldPassword + user.getLoginName()).toLowerCase()
					.equals(user.getPassword().toLowerCase())) {
				return result.failed("密码更改出错,旧密码不正确!");
			}
			// md5加密
			newPassword = Base64Util.decode(newPassword).replace(token, "");
			String digestPassword = MD5Util.MD5(newPassword + user.getLoginName()).toLowerCase();
			user.setPassword(digestPassword);

			user.setLastUpdateUserId(user.getId());
			user.setLastUpdateUserName(user.getUserName());
			user.setLastUpdateTime(new Date());

			Integer rows = userService.updateUserPwd(user);
			if (rows > 0) {
				result.succeed("修改密码成功");
			}else{
				result.failed("修改密码失败");
			}
		} catch (Exception e) {
			result.failed("修改密码失败");
			e.printStackTrace();
			throw e;
		}

		return result;
	}


}
