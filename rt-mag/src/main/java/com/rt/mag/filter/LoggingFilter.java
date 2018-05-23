package com.rt.mag.filter;

import com.rt.mag.util.ConstKey;
import org.slf4j.MDC;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;

public class LoggingFilter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        boolean clear = false;
        if (MDC.get(ConstKey.TRACE_ID) == null) {
            clear = true;
            MDC.put(ConstKey.TRACE_ID, UUID.randomUUID().toString());

            HttpSession session = ((HttpServletRequest) request).getSession(false);
            if (session != null && session.getAttribute(ConstKey.MAG_USER_ID) != null
                    && session.getAttribute(ConstKey.MAG_LOGIN_NAME) != null) {
                MDC.put(ConstKey.MAG_USER_ID, (String) session.getAttribute(ConstKey.MAG_USER_ID));
                MDC.put(ConstKey.MAG_LOGIN_NAME, (String) session.getAttribute(ConstKey.MAG_LOGIN_NAME));
            }
        }

        try {
            chain.doFilter(request, response);

        } finally {
            if (clear)
                MDC.clear();
        }
    }

    public void destroy() {

    }

}