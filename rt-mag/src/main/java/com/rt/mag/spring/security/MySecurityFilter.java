package com.rt.mag.spring.security;

import com.rt.mag.property.AppProperty;
import com.rt.mag.util.SpringContextUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.SecurityMetadataSource;
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;
import org.springframework.security.access.intercept.InterceptorStatusToken;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.AccessDeniedException;

public class MySecurityFilter extends AbstractSecurityInterceptor implements Filter {

    private static Logger logger = LoggerFactory.getLogger(MySecurityFilter.class);

    private FilterInvocationSecurityMetadataSource securityMetadataSource;

    @Override
    public SecurityMetadataSource obtainSecurityMetadataSource() {
        return this.securityMetadataSource;
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        FilterInvocation fi = new FilterInvocation(request, response, chain);
        invoke(fi,request, response);
    }

    private void invoke(FilterInvocation fi,ServletRequest request, ServletResponse response) throws IOException, ServletException {
        InterceptorStatusToken token = null;
        String reqUrl = fi.getRequestUrl().substring(1);
        try {
            token = super.beforeInvocation(fi);
            fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
        } catch (OffLineException e) {
            logger.error("会话已过期，请重新登陆:" + e.getMessage());
            if (isAjaxRequest(fi.getRequest())) {
                fi.getResponse().setHeader("sessionstatus", "timeout1");
            } else {

    			response.setContentType("text/html;charset=UTF-8");
    			PrintWriter out = response.getWriter();
    			
    			StringBuilder builder = new StringBuilder();
    			builder.append("<script type=\"text/javascript\" charset=\"UTF-8\">");
    			builder.append("alert(\"登录超时，请重新登录\");");
    			builder.append("window.top.location.href=\"");
                AppProperty appProperty = (AppProperty) SpringContextUtil.getBean(AppProperty.class);
    			builder.append(appProperty.getUrl() + "/login/index");
    			builder.append("\";</script>");
    			out.print(builder.toString());
    			out.close();
            }
        } catch (AccessDeniedException e) {
            logger.error("获取授权信息异常：" + e.getMessage());
            if (isAjaxRequest(fi.getRequest())) {
                fi.getResponse().setStatus(403);
            } else {
                throw e;
            }
        } catch (Exception e) {
            logger.error(reqUrl + "处理异常", e);
            throw new ServletException(e);
        } finally {
            super.afterInvocation(token, null);
        }
    }

    public void setSecurityMetadataSource(FilterInvocationSecurityMetadataSource securityMetadataSource) {
        this.securityMetadataSource = securityMetadataSource;
    }

    public void init(FilterConfig arg0) throws ServletException {

    }

    public void destroy() {

    }

    public Class<? extends Object> getSecureObjectClass() {
        return FilterInvocation.class;
    }

    private boolean isAjaxRequest(HttpServletRequest request) {
        return "XMLHttpRequest".equalsIgnoreCase(request.getHeader("x-requested-with"));
    }
}
