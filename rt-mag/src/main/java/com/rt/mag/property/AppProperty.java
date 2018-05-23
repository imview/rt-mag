package com.rt.mag.property;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppProperty {

    @Value("${url}")
    private String url;

    @Value("${version}")
    private String version;

    @Value("${manager_title}")
    private String managerTitle;

    @Value("${session.timeout}")
    private int sessionTimeOut;

    @Value("${web.jdbc.driverClassName}")
    private String webJdbcDriverClassName;

    @Value("${web.jdbc.url}")
    private String webJdbcUrl;

    @Value("${web.jdbc.username}")
    private String webJdbcUsername;

    @Value("${web.jdbc.password}")
    private String webJdbcPassword;

    @Value("${um.jdbc.driverClassName}")
    private String umJdbcDriverClassName;

    @Value("${um.jdbc.url}")
    private String umJdbcUrl;

    @Value("${um.jdbc.username}")
    private String umJdbcUsername;

    @Value("${um.jdbc.password}")
    private String umJdbcPassword;

    @Value("${max_pwd_error_count}")
    private Integer maxPwdErrorCount;

    public String getUrl() {
        return url;
    }

    public String getVersion() {
        return version;
    }

    public String getManagerTitle() {
        return managerTitle;
    }

    public int getSessionTimeOut() {
        return sessionTimeOut;
    }

    public String getWebJdbcDriverClassName() {
        return webJdbcDriverClassName;
    }

    public String getWebJdbcUrl() {
        return webJdbcUrl;
    }

    public String getWebJdbcUsername() {
        return webJdbcUsername;
    }

    public String getWebJdbcPassword() {
        return webJdbcPassword;
    }

    public String getUmJdbcDriverClassName() {
        return umJdbcDriverClassName;
    }

    public String getUmJdbcUrl() {
        return umJdbcUrl;
    }

    public String getUmJdbcUsername() {
        return umJdbcUsername;
    }

    public String getUmJdbcPassword() {
        return umJdbcPassword;
    }

    public Integer getMaxPwdErrorCount() {
        return maxPwdErrorCount;
    }
}
