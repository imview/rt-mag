<%@ page import="com.rt.mag.property.AppProperty" %>
<%@ page import="com.rt.mag.util.SpringContextUtil" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%><%
	AppProperty appProperty = (AppProperty) SpringContextUtil.getBean(AppProperty.class);
	request.setAttribute("__version", appProperty.getVersion());
	request.setAttribute("__basePath", request.getContextPath());
%><%@ taglib prefix="t" tagdir="/WEB-INF/tags"%><!DOCTYPE html>
<html lang="zh">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-UA-Compatible" content="" ie="EmulateIE7">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta charset="utf-8" />

<t:css url="/lib/css/bootstrap-cerulean.css"></t:css>
<t:css url="/lib/css/easyui.css"></t:css>
<!-- The styles -->
<style type="text/css">
body, input, select, textera, h1, h2, h3, h4, h5, h6, a, ul, ol, li, i {
	font-family: Microsoft YaHei, '����', Tahoma, Helvetica, "\5b8b\4f53",
		sans-serif;
}
body {
	min-width: 1200px;
	/*width: expression((documentElement.clientWidth > 1200px) ? "1200px" : "auto" );*/
}
a {
	cursor: pointer;
}
</style>
<t:css url="/lib/css/bootstrap-responsive.css"></t:css>
<t:css url="/lib/css/charisma-app.css"></t:css>
<t:css url="/lib/css/jquery-ui-1.8.21.custom.css"></t:css>
<t:css url="/lib/css/chosen.css"></t:css>
<t:css url="/lib/css/uniform.default.css"></t:css>
<t:css url="/lib/css/jquery.dataTables.css"></t:css>
<t:css url="/lib/css/jquery.noty.css"></t:css>
<t:css url="/lib/css/noty_theme_default.css"></t:css>
<t:css url="/lib/css/jquery.iphone.toggle.css"></t:css>
<t:css url="/lib/css/opa-icons.css"></t:css>
<t:css url="/lib/css/jquery.wysiwyg.css"></t:css>
<t:css url="/lib/css/uploadify.css"></t:css>
<t:css url="/lib/css/scrollUp-labs.css"></t:css>
<t:css url="/lib/css/easyui.css"></t:css>
<title>${manager_title}</title>
</head>
<body style="overflow-y: hidden;">
	<jsp:include page="shared/index_top.jsp" flush="true" />
	<div class="container-fluid">
		<div class="row-fluid">
			<jsp:include page="shared/index_left.jsp" flush="true" />
			<div>
				<a class="icon-chevron-left" title="折叠" id="icon-chevron-left"><img
					src="${__basePath}/images/btnLeft.jpg" /></a> <a
					class="icon-chevron-right" title="展开" id="icon-chevron-right"
					style="display: none;"><img
					src="${__basePath}/images/btnRight.jpg" /></a>
			</div>
			<div id="divContent" style="margin-left: 10px;">
				<div id="menu-content" class="easyui-tabs " fit="true"
					style="height: 854px;"></div>
			</div>
		</div>
	</div>
	<t:js url="/js/module/include_header.js"></t:js>
	<t:js url="/lib/javascript/jquery-1.8.2.min.js"></t:js>
	<t:js url="/lib/javascript/jquery-ui-1.8.21.custom.min.js"></t:js>
	<t:js url="/lib/javascript/verification.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-transition.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-alert.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-modal.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-dropdown.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-scrollspy.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-tab.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-tooltip.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-popover.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-button.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-collapse.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-carousel.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/bootstrap-typeahead.js"></t:js>
	<t:js url="/lib/javascript/jquery.cookie.js"></t:js>
	<t:js url="/lib/javascript/jquery.dataTables.min.js"></t:js>
	<t:js url="/lib/javascript/jquery.chosen.min.js"></t:js>
	<t:js url="/lib/javascript/jquery.uniform.min.js"></t:js>
	<t:js url="/lib/javascript/jquery.noty.js"></t:js>
	<t:js url="/lib/javascript/jquery.iphone.toggle.js"></t:js>
	<t:js url="/lib/javascript/jquery.history.js"></t:js>
	<t:js url="/lib/javascript/jquery.scrollUp.min.js"></t:js>
	<t:js url="/lib/javascript/jquery.paging.js"></t:js>
	<t:js url="/lib/javascript/Jquery.Query.js"></t:js>
	<t:js url="/lib/javascript/ucs/ucs-all.dev.js"></t:js>
	<t:js url="/js/module/common_script.js"></t:js>
	<t:js url="/js/module/common_ajax.js"></t:js>
	<t:js url="/js/module/common.js"></t:js>
	<t:js url="/js/module/common_collapse.js"></t:js>
	<t:js url="/lib/javascript/jquery.easyui.min.js"></t:js>
	<t:js url="/lib/javascript/bootstrap/charisma.js"></t:js>
<script type="text/javascript">
var umGlobal={
	basePath:'${__basePath}',
	defaultModuleId:'${defaultModule.getId()}'
}
</script>
	<t:js url="/js/module/um/account/index.js"></t:js>
</body>
</html>

