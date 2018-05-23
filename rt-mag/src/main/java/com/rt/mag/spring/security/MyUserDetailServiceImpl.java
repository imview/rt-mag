package com.rt.mag.spring.security;

import com.rt.dto.um.SysOperationActionWithLevelDTO;
import com.rt.dto.um.SysUserDTO;
import com.rt.mag.vo.um.OperationActionVO;
import com.rt.mag.vo.um.UserDetailVO;
import com.rt.service.um.SysUserService;
import com.rt.util.BeanMapperUtil;
import com.rt.util.TrueFalse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.*;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;


public class MyUserDetailServiceImpl implements UserDetailsService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private SysUserService userService;

    public SysUserService getUserService() {
        return userService;
    }

    public void setUserService(SysUserService userService) {
        this.userService = userService;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SysUserDTO userBO;
        UserDetailVO userdetail = null;
        try {
        	userBO = this.userService.getUserByLoginName(username);
            Collection<GrantedAuthority> grantedAuths = obtionGrantedAuthorities(userBO);
            boolean enables = true;
            boolean accountNonExpired = true;
            boolean credentialsNonExpired = true;
            boolean accountNonLocked = true;
            // 封装成spring security的user
            //PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            //String pwd=encoder.encode(userBO.getPassword());

            userdetail = new UserDetailVO(userBO.getLoginName(), userBO.getPassword(), enables, accountNonExpired, credentialsNonExpired,
                    accountNonLocked,
                    grantedAuths);
            userdetail.setId(userBO.getId());
            userdetail.setEmail(userBO.getEmail());
            userdetail.setMobile(userBO.getMobile());
            userdetail.setUserName(userBO.getUserName());
            userdetail.setIsSuperAdmin(userBO.getIsSuperAdmin());

        } catch (Exception e) {
            logger.error("加载UserDetails异常", e);
        }
        return userdetail;
    }

    // 取得用户的权限
    private Set<GrantedAuthority> obtionGrantedAuthorities(SysUserDTO user) {
        Set<GrantedAuthority> authSet = new HashSet<GrantedAuthority>();
        List<OperationActionVO> resouces = new ArrayList<OperationActionVO>();
        try {
        	List<SysOperationActionWithLevelDTO> paList=null;
            if (user.getIsSuperAdmin() == TrueFalse.True.getValue()) {
                paList = userService.getAllOperationAction();
            } else {
                paList = userService.getOperationActionByUserId(user.getId());
            }
            resouces = BeanMapperUtil.mapList(paList, OperationActionVO.class);
        } catch (Exception e) {
            logger.error("获取用户权限异常", e);
        }
        if (null != resouces && !resouces.isEmpty()) {
            for (OperationActionVO pav : resouces) {
                authSet.add(new SimpleGrantedAuthority(pav.getId()));
            }
        }
        return authSet;
    }

}
