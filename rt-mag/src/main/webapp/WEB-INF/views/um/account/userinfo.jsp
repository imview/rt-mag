<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ page import="demo.mag.property.AppProperty" %>
<%@ page import="demo.mag.util.SpringContextUtil" %><%
    AppProperty appProperty = (AppProperty) SpringContextUtil.getBean(AppProperty.class);
    request.setAttribute("__version", appProperty.getVersion());
    request.setAttribute("__basePath", request.getContextPath());
%>
<!DOCTYPE html>
<html lang="zh">
<head>
<jsp:include page="../../../shared/includeCSS.jsp"></jsp:include>
</head>
<body>
  <div class="box-content">
            <table class="table table-bordered table-condensed" style="margin-top: 10px;">
                <tbody id="container">
                    <tr>
                        <td width="15%" style="text-align:right;height:30px;">
                            登录账号：
                        </td>
                        <td>
                            ${loginName}
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:right;height:30px;">
                            用户名：
                        </td>
                        <td>
                            ${userName}
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:right;height:30px;">
                            手机号：
                        </td>
                        <td>${mobile}
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:right;height:30px;">
                            邮  箱：
                        </td>
                        <td>${email}
                        </td>
                    </tr>
                    </tbody>
            </table>
        </div>
<jsp:include page="../../../shared/includeJS.jsp"></jsp:include>
</body>
</html>