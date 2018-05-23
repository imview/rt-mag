package com.rt.mag.spring.security;

import com.rt.dto.um.SysOperationActionWithLevelDTO;
import com.rt.dto.um.SysUserDTO;
import com.rt.mag.property.AppProperty;
import com.rt.mag.util.ConstKey;
import com.rt.mag.util.SpringContextUtil;
import com.rt.mag.vo.um.OperationActionVO;
import com.rt.mag.vo.um.OperationVO;
import com.rt.mag.vo.um.UserDetailVO;
import com.rt.service.um.SysUserService;
import com.rt.util.*;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;

public class MyUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	public static final String VALIDATE_CODE = "code";// 登录提交的验证码
	public static final String SESSION_VALIDATE_CODE = "SVER_CD";// session中的验证码
	public static final String USERNAME = "loginName";// 登录名
	public static final String PASSWORD = "password";// 密码

	private SysUserService userService;

	public SysUserService getUserService() {
		return userService;
	}

	public void setUserService(SysUserService userService) {
		this.userService = userService;
	}

	/**
	 * 处理登录的方法
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		if (!request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
		}
		ServiceResult result = new ServiceResult();
		String newtoken = UUID.randomUUID().toString();

		String loginName = obtainUsername(request).trim();
		String password = obtainPassword(request);
		String loginToken = request.getParameter("loginToken");

		SysUserDTO user = new SysUserDTO();
		AppProperty appConfig = (AppProperty) SpringContextUtil.getBean(AppProperty.class);
		HttpSession session = request.getSession();
		session.setMaxInactiveInterval(appConfig.getSessionTimeOut());
		try {
			Object token = session.getAttribute("loginToken");
			session.removeAttribute("loginToken");
			session.setAttribute("loginToken", newtoken);

			if (loginToken == null || !token.toString().equals(loginToken)) {
				this.flushError("登陆凭证失效，请重试",newtoken,response);
				return null;
			}
			if (!checkValidateCode(request)) {
				this.flushError("验证码不正确",newtoken,response);
				return null;
			}

			password = Base64Util.decode(password).replace(loginToken, "");

			user = userService.getUserByLoginName(loginName);
			if (user == null) {
				this.flushError("用户名或者密码不正确",newtoken,response);
				return null;
			}
			if (user.getStatus() == 1)// 0启用
			{
				this.flushError("该用户被禁用",newtoken,response);
				return null;
			}

			int maxErrorCount = appConfig.getMaxPwdErrorCount();
			Calendar cal = Calendar.getInstance();
			if (user.getErrorCount() >= maxErrorCount && user.getLastErrorTime() != null && user.getLastErrorTime().getDate() != cal.get(Calendar.DATE)) {
				user.setLastErrorTime(null);
				user.setErrorCount(0);
				userService.updateUserErrorCount(user);
			} else if (user.getErrorCount() >= maxErrorCount) {
				this.flushError("您当天连续登录失败超过" + maxErrorCount + "次，已被锁定，账号将于第二天自动解锁。",newtoken,response);
				return null;
			}

			if (!MD5Util.MD5(password + loginName).toLowerCase().equals(user.getPassword().toLowerCase())) {
				user.setErrorCount(user.getErrorCount() + 1);
				Date utilDate = new Date();
				java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
				user.setLastErrorTime(sqlDate);
				userService.updateUserErrorCount(user);
				String errorMsg = new String("用户名或密码错误，请核对后重新登录");
				if (user.getErrorCount() >= maxErrorCount)
					errorMsg = "您当天连续登录失败超过" + maxErrorCount + "次，已被锁定，账号将于第二天自动解锁。";
				else if (user.getErrorCount() >= 3)
					errorMsg = "您当天已连续登录失败" + user.getErrorCount() + "次，连续登录失败" + maxErrorCount + "次后，账号将被锁定。";

				this.flushError(errorMsg,newtoken,response);
				return null;
			}
			user.setLastErrorTime(null);
			user.setErrorCount(0);
			userService.updateUserErrorCount(user);

			/*
			SysLoginLogBO log = new SysLoginLogBO();
			log.setCreateTime(new Date());
			log.setType(0);
			log.setUserId(user.getId());
			log.setUserName(user.getUserName());
			userService.insertLoginLog(log);
			*/
			List<SysOperationActionWithLevelDTO> permissionAction = null;
			if (user.getIsSuperAdmin() == TrueFalse.True.getValue()) {
				permissionAction = userService.getAllOperationAction();
			} else {
				permissionAction = userService.getOperationActionByUserId(user.getId());
			}

			// 这里因为不想把 actionUrl暴露到前台,moduleVO、MVMVO都会输出到前台html，所以这里将他们三个区分开来
			List<OperationActionVO> permissionActionVO = BeanMapperUtil.mapList(permissionAction,
					OperationActionVO.class);
			List<OperationVO> moduleVO = new ArrayList<OperationVO>();
			List<OperationVO> MCMVO = new ArrayList<OperationVO>();// module、 category、 menu
			List<OperationActionVO> OperationVO = new ArrayList<OperationActionVO>();
			for (OperationActionVO pavo : permissionActionVO) {
				OperationVO pvo = BeanMapperUtil.map(pavo, OperationVO.class);

				if (pvo.getLevel() == 1) {
					if (!existInPermissionList(moduleVO, pvo)) {
						moduleVO.add(pvo);
					}
					if (!existInPermissionList(MCMVO, pvo)) {
						MCMVO.add(pvo);
					}
				} else if (pvo.getLevel() == 2) {
					if (!existInPermissionList(MCMVO, pvo)) {
						MCMVO.add(pvo);
					}
				} else if (pvo.getLevel() == 3) {
					if (!existInPermissionList(MCMVO, pvo)) {
						MCMVO.add(pvo);
					}
					if (!existInPermissionActionList(OperationVO, pavo)) {
						OperationVO.add(pavo);
					}
				} else if (pvo.getLevel() >= 4) {
					if (!existInPermissionActionList(OperationVO, pavo)) {
						OperationVO.add(pavo);
					}
				}
			}

			session.setAttribute("module", moduleVO);
			session.setAttribute("mcm", MCMVO);
			session.setAttribute("operation", OperationVO);

			result.succeed("登陆成功");
			//response.getWriter().write(net.sf.json.JSONObject.fromObject(result).toString());
			//response.getWriter().flush();
		} catch (Exception e) {
			logger.error("登录异常：" + e.getMessage());

			result.failed("登陆异常;" + e.getMessage());
			result.getDicData().put("loginToken", newtoken);

			try {
				response.getWriter().write(net.sf.json.JSONObject.fromObject(result).toString());
				response.getWriter().flush();
				return null;
			} catch (IOException e1) {
				logger.error("登陆异常");
			}
		}

		// 验证用户账号与密码是否对应
		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(user.getLoginName(),
				user.getPassword());

		// 允许子类设置详细属性
		setDetails(request, authRequest);
		Authentication auth= this.getAuthenticationManager().authenticate(authRequest);
		UserDetailVO userVO= (UserDetailVO)auth.getPrincipal();

		SecurityContextHolder.getContext().setAuthentication(auth);
		Object vv=SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		request.getSession().setAttribute(ConstKey.MAG_USER,userVO);
		request.getSession().setAttribute(ConstKey.MAG_USER_ID, userVO.getId());
		request.getSession().setAttribute(ConstKey.MAG_LOGIN_NAME, userVO.getLoginName());

		return auth;
	}

	private void flushError(String msg, String newtoken, HttpServletResponse response) throws IOException {
		ServiceResult result = new ServiceResult();
		result.failed(msg);
		result.getDicData().put("loginToken", newtoken);
		response.getWriter().write(net.sf.json.JSONObject.fromObject(result).toString());
		response.getWriter().flush();
	}

	private Boolean existInPermissionList(List<OperationVO> list, OperationVO pvo) {
		Boolean isExist = false;
		for (OperationVO pv : list) {
			if (pv.getId().equals(pvo.getId())) {
				isExist = true;
				break;
			}
		}
		return isExist;
	}

	// 后面再改为泛型方法
	private Boolean existInPermissionActionList(List<OperationActionVO> list, OperationActionVO pvo) {
		Boolean isExist = false;
		for (OperationActionVO pv : list) {
			if (pv.getId().equals(pvo.getId())) {
				isExist = true;
				break;
			}
		}
		return isExist;
	}

	protected boolean checkValidateCode(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String sessionValidateCode = obtainSessionValidateCode(session);
		// 让上一次的验证码失效
		session.setAttribute(SESSION_VALIDATE_CODE, null);
		String validateCodeParameter = obtainValidateCodeParameter(request);
		if (StringUtils.isEmpty(validateCodeParameter)
				|| !sessionValidateCode.equalsIgnoreCase(validateCodeParameter)) {
			return false;
		}
		return true;
	}

	/**
	 * 获取登录用户输入的验证码
	 *
	 * @param request
	 * @return
	 */
	private String obtainValidateCodeParameter(HttpServletRequest request) {
		Object obj = request.getParameter(VALIDATE_CODE);
		return null == obj ? "" : obj.toString();
	}

	/**
	 * 验证验证码是否一致
	 *
	 * @param session
	 * @return
	 */
	@SuppressWarnings("unchecked")
	protected String obtainSessionValidateCode(HttpSession session) {
		HashMap<String, String> obj = (HashMap<String, String>) session.getAttribute(SESSION_VALIDATE_CODE);
		return null == obj ? "" : obj.get(VALIDATE_CODE);
	}

	@Override
	protected String obtainUsername(HttpServletRequest request) {
		Object obj = request.getParameter(USERNAME);
		return null == obj ? "" : obj.toString();
	}

	/**
	 * (non-Javadoc) 获取登陆密码
	 */
	@Override
	protected String obtainPassword(HttpServletRequest request) {
		Object obj = request.getParameter(PASSWORD);
		return null == obj ? "" : obj.toString();
	}


}
