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
	<div class="box-content" style="margin-top: 10px;">
                <table class="table">
                    <tbody id="container">
                        <tr>
                            <td width="15%" style="text-align: right;">
                                登录账号：
                            </td>
                            <td>
                                ${loginName}
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right;">
                                原始密码：
                            </td>
                            <td>
                                <input Class="IsError IsRequired" MsgName="原始密码" id="origPwd" name="origPwd" placeholder="请输入原始密码" type="password" value="" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right;">
                                新密码：
                            </td>
                            <td>
                                <input Class="IsError IsRequired IsMaxLength IsMinLength" MaxLength="16" MinLength="6" MsgName="新密码" id="NewPwd" name="NewPwd" placeholder="请输入新密码" type="password" value="" />
                                <span>(提示:输入新密码长度在6~16位之间)</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: right;">
                                确认新密码：
                            </td>
                            <td>
                            <input Class="IsError IsRequired IsMaxLength IsMinLength" MaxLength="16" MinLength="6" MsgName="新密码" id="EndNewPwd" name="EndNewPwd" placeholder="请再次输入新密码" type="password" value="" />
                            </td>
                        </tr>
                        <tr>
                        <td style="text-align: right;">
                            </td>
                            <td class="center">
                                <a href="#" class="btn btn-primary" id="btnModifyPwd"><i class="icon-ok-sign icon-white">
                                </i>确定修改</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

    <input type="hidden" id="ModifyLoginPwdToken" value="${securityToken}" />
<jsp:include page="../../../shared/includeJS.jsp"></jsp:include>
<t:js url="/lib/javascript/securityEncode.js"></t:js>
<t:js url="/lib/javascript/base64.js"></t:js>
<t:js url="/js/module/um/account/modifypwd.js"></t:js>
</body>
</html>