<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ page import="com.rt.mag.property.AppProperty" %><%@ page import="com.rt.mag.util.SpringContextUtil" %><%
	AppProperty appProperty = (AppProperty) SpringContextUtil.getBean(AppProperty.class);
	request.setAttribute("__version", appProperty.getVersion());
	request.setAttribute("__basePath", request.getContextPath());
%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<t:css url="/lib/css/bootstrap-cerulean.css"></t:css>
<t:css url="/lib/css/bootstrap-responsive.css"></t:css>
<t:css url="/lib/css/charisma-app.css"></t:css>
<title>${managerTitle}</title>
</head>
<body>
	<form>
		<div class="container-fluid">
			<div class="row-fluid">
				<div class="row-fluid">
					<div class="span12 center login-header"></div>
					<!--/span-->
				</div>
				<!--/row-->
				<div class="row-fluid">
					<div class="well span5 center login-box"
						style="background-color: White;">
						<img alt="" src="${__basePath}/images/mlogo.png"
							style="padding: 15px 20px 0px 20px; margin: 0 0 25px 0;" />
						<div style='text-align: center;'>
							<table style='margin: 0px auto;'>
								<tbody>
									<tr>
										<td colspan="2">
<span class="add-on"><i class="icon-user"></i></span>
<input autocomplete="off" id="UserName" name="UserName" type="text" value="" />
</td>
									</tr>
									<tr>
										<td colspan="2">
<span class="add-on"><i class="icon-lock"></i></span>
<input id="Password" name="Password" type="password" />
</td>
									</tr>
									<tr>
										<td colspan="2">
<span class="add-on"><i class="icon-qrcode"></i></span>
<input style="width:130px;" id="VCode" name="VCode" type="text" value="" />
<a href="javascript:;"> <img alt="验证码" id="imgCode" title="看不清?请点击" style="margin-top: -9px;width:75px;" /></a>
</td>
									</tr>
									<tr>
										<td colspan="2">
											<p class="center span10">
												<a href="javascript:void(0)" class="btn btn-primary" id="btnLogin">登 录</a>
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!--/span-->
				</div>
				<!--/row-->
			</div>
			<!--/fluid-row-->
		</div>

	</form>
<script type="text/javascript">
var umGlobal={
	basePath:'${__basePath}',
	loginToken:'${loginToken}'
}
</script>
<script type="text/javascript">
	//子窗口时，外框跳到登录页面
	if (window.top != window.self) {
		window.top.location = umGlobal.basePath+"/login/index";
	}
</script>
<t:js url="/lib/javascript/jquery-1.7.2.min.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-tooltip.js"></t:js>
<t:js url="/lib/javascript/jquery.cookie.js"></t:js>
<t:js url="/lib/javascript/securityEncode.js"></t:js>
<t:js url="/lib/javascript/base64.js"></t:js>
<t:js url="/lib/javascript/jquery.backstretch.min.js"></t:js>
<t:js url="/js/module/include_header.js"></t:js>
<t:js url="/js/module/um/account/login.js"></t:js>
</body>
</html>
