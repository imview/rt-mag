package com.rt.mag.config;

import com.rt.mag.spring.security.*;
import com.rt.service.um.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    SysUserService sysUserService;

    @Bean
    public MySecurityMetadataSource mySecurityMetadataSource() throws Exception {
        MySecurityMetadataSource msms = new MySecurityMetadataSource(sysUserService);
        return msms;
    }

    @Bean
    MyAccessDecisionManager myAccessDecisionManager() {
        return new MyAccessDecisionManager();
    }

    MySecurityFilter securityFilter() throws Exception {
        MySecurityFilter msf = new MySecurityFilter();
        msf.setAuthenticationManager(this.myAuthenticationManager());
        msf.setAccessDecisionManager(this.myAccessDecisionManager());
        msf.setSecurityMetadataSource(this.mySecurityMetadataSource());
        return msf;
    }

    @Bean
    SimpleUrlAuthenticationFailureHandler simpleUrlAuthenticationFailureHandler() {
        SimpleUrlAuthenticationFailureHandler su = new SimpleUrlAuthenticationFailureHandler();
        su.setDefaultFailureUrl("/login/logout");
        return su;
    }

    @Bean
    SavedRequestAwareAuthenticationSuccessHandler loginAuthenticationSuccessHandler() {
        SavedRequestAwareAuthenticationSuccessHandler sr = new SavedRequestAwareAuthenticationSuccessHandler();
        sr.setDefaultTargetUrl("/login/loginSucceed");
        return sr;
    }

    @Bean
    MyUserDetailServiceImpl myUserDetailServiceImpl() {
        MyUserDetailServiceImpl md = new MyUserDetailServiceImpl();
        md.setUserService(sysUserService);
        return md;
    }

    @Bean
    public AuthenticationManager myAuthenticationManager() throws Exception {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(this.myUserDetailServiceImpl());
        ProviderManager authenticationManager = new ProviderManager(Arrays.asList((AuthenticationProvider) authenticationProvider));
        return authenticationManager;
    }

    MyUsernamePasswordAuthenticationFilter loginFilter() throws Exception {
        MyUsernamePasswordAuthenticationFilter mu = new MyUsernamePasswordAuthenticationFilter();
        mu.setFilterProcessesUrl("/login/login");
        mu.setAuthenticationManager(this.myAuthenticationManager());
        mu.setUserService(sysUserService);
        mu.setAuthenticationSuccessHandler(this.loginAuthenticationSuccessHandler());
        mu.setAuthenticationFailureHandler(this.simpleUrlAuthenticationFailureHandler());
        return mu;
    }

    @Bean
    LoginUrlAuthenticationEntryPoint authenticationProcessingFilterEntryPoint() {
        return new LoginUrlAuthenticationEntryPoint("/login/index");
    }



    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().logout().
                and().addFilterAt(loginFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(securityFilter(), FilterSecurityInterceptor.class)
                .headers().frameOptions().sameOrigin()
                .and().httpBasic().authenticationEntryPoint(authenticationProcessingFilterEntryPoint());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
                "/common/**",
                "/resource/**",
                "/css/**",
                "/js/**",
                "/images/**",
                "/lib/**",
                "/login/index",
                "/login/logout",
                "/login/loginSucceed",
                "/account/userInfo",
                "/account/modifyPwdView",
                "/account/modifyPwd",
                "/home/index",
                "/welcome.jsp",
                "/",
                "/favicon.ico",
                "/error");
    }

}