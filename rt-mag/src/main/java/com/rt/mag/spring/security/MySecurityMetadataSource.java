package com.rt.mag.spring.security;

import com.rt.dto.um.SysOperationActionWithLevelDTO;
import com.rt.mag.property.AppProperty;
import com.rt.mag.util.SpringContextUtil;
import com.rt.mag.vo.um.OperationActionVO;
import com.rt.service.um.SysUserService;
import com.rt.util.BeanMapperUtil;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;


public class MySecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	private static final String LOGIN_SESSION_KEY = "user"; // 默认保存用户登陆session的key，可根据实际情况修改

	public MySecurityMetadataSource(SysUserService userService) throws Exception {
		this.userService = userService;
		loadResourceDefine();
	}

	private SysUserService userService;

	public void setMenuService(SysUserService userService) {
		this.userService = userService;
	}

	private static ConcurrentHashMap<String, Collection<OperationActionVO>> resourceMap = new ConcurrentHashMap<String, Collection<OperationActionVO>>();

	public Collection<ConfigAttribute> getAllConfigAttributes() {
		return new ArrayList<ConfigAttribute>();
	}

	public boolean supports(Class<?> clazz) {
		return true;
	}

	// 加载所有资源
	private void loadResourceDefine() throws Exception {
		resourceMap.clear();
		List<SysOperationActionWithLevelDTO> paList = this.userService.getAllOperationAction();

		if (null != paList && !paList.isEmpty()) {
			List<OperationActionVO> pvList = BeanMapperUtil.mapList(paList, OperationActionVO.class);

			for (OperationActionVO pvEntity : pvList) {
				String url = pvEntity.getUrl();
				String actionUrl = pvEntity.getActionUrl();
				if (StringUtils.isEmpty(url) && StringUtils.isEmpty(actionUrl)) {
					continue;
				}
				if (!StringUtils.isEmpty(url) && pvEntity.getType() == PermissionType.Menu.getValue()) {
					if (resourceMap.containsKey(url)) {
						resourceMap.get(url).add(pvEntity);
					} else {
						Collection<OperationActionVO> pvCollection = new ArrayList<OperationActionVO>();
						pvCollection.add(pvEntity);
						resourceMap.put(url, pvCollection);
					}
				}
				if (!StringUtils.isEmpty(actionUrl) && (pvEntity.getType() == PermissionType.Menu.getValue()|| pvEntity.getType() == PermissionType.Operation.getValue())) {
					if (resourceMap.containsKey(actionUrl)) {
						resourceMap.get(actionUrl).add(pvEntity);
					} else {
						Collection<OperationActionVO> pvCollection = new ArrayList<OperationActionVO>();
						pvCollection.add(pvEntity);
						resourceMap.put(actionUrl, pvCollection);
					}
				}
			}
		}
	}

	// 返回所请求资源所需要的权限

	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
		FilterInvocation invation = (FilterInvocation) object;
		HttpServletRequest request = invation.getRequest();
		String requestUrl = invation.getRequestUrl().substring(1);
		int flag = requestUrl.indexOf("?");
		if (flag > 0) {
			requestUrl = requestUrl.substring(0, flag);
		}
		if (StringUtils.isEmpty(requestUrl)) {
			return null;
		}
		if (MapUtils.isEmpty(resourceMap)) {
			refresh();
		}
		Collection<OperationActionVO> list = resourceMap.get(requestUrl);

		if (null == list || list.isEmpty()) {
			if (!requestUrl.startsWith("/")) {
				requestUrl = "/" + requestUrl;
			}
			list = resourceMap.get(requestUrl);
			if (null == list || list.isEmpty()) {
				throw new AccessDeniedException("资源" + requestUrl + "未定义");
			}
		}
		Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
		for (OperationActionVO pvEntity : list) {
			if (hasLogin(request)) {
				ConfigAttribute configAttribute = new SecurityConfig(pvEntity.getId());
				configAttributes.add(configAttribute);
			} else {
				throw new OffLineException("资源" + requestUrl + "需要登陆且授权才能访问");
			}
		}
		if (configAttributes.isEmpty()) {
			throw new AccessDeniedException("资源" + requestUrl + "没有权限访问");
		}

		List<OperationActionVO> OperationVO = (List<OperationActionVO>) request.getSession()
				.getAttribute("operation");
		OperationActionVO currentVO = new OperationActionVO();

		for (OperationActionVO pv : OperationVO) {
			if (request.getServletPath().equals(pv.getUrl())
					|| request.getServletPath().substring(1).equals(pv.getUrl())
					|| request.getServletPath().equals(pv.getActionUrl())
					|| request.getServletPath().substring(1).equals(pv.getActionUrl())) {
				currentVO = pv;
				break;
			}
		}
		OperationActionVO menuVO = currentVO;
		while (menuVO.getLevel() > 3) {// 找到menuVO
			for (OperationActionVO pv : OperationVO) {
				if (pv.getId().equals(currentVO.getParentId())) {
					menuVO = pv;
					break;
				}
			}
		}
		List<String> oplist = new ArrayList<String>();
		this.addChildPermission(OperationVO, oplist, menuVO.getId());

		AppProperty appProperty = (AppProperty) SpringContextUtil.getBean(AppProperty.class);
		request.setAttribute("__version", appProperty.getVersion());
		request.setAttribute("__basePath", request.getContextPath());
		request.setAttribute("__rightsKey", StringUtils.join(oplist, ","));
		return configAttributes;
	}

	public void addChildPermission(List<OperationActionVO> OperationVO,
			List<String> list, String id) {
		for (OperationActionVO pv : OperationVO) {
			if (pv.getParentId().equals(id)) {
				list.add(pv.getCode());
				addChildPermission(OperationVO, list, pv.getId());
			}
		}
	}

	public void refresh() {
		try {
			loadResourceDefine();
		} catch (Exception e) {
			logger.error("加载权限资源异常", e);
		}
	}

	private boolean hasLogin(HttpServletRequest request) {
		return null != request.getSession().getAttribute(LOGIN_SESSION_KEY);
	}

	private static enum PermissionType {

		Menu(1), // 模块/菜单/栏目
		Operation(2); // 操作

		private int value;

		private PermissionType(int value) {
			this.value = value;
		}

		public int getValue() {
			return value;
		}
	}
}
