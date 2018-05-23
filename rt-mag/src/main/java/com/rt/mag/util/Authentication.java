package com.rt.mag.util;

import com.rt.mag.vo.um.UserDetailVO;
import org.springframework.security.core.context.SecurityContextHolder;


//仅限有权限验证的页面使用 ,个人信息、修改密码等使用session获取(UserDetailVO) request.getSession().getAttribute(ConstKeys.MAG_USER);
public class Authentication {

	public static UserDetailVO getCurrentUser() {
		return (UserDetailVO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}
}