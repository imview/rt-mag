<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
 <jsp:include page="../../../shared/includeCSS.jsp" flush="true" /> 
<title>操作列表</title>
</head>
<body>
	<div class="form-horizontal msk">
		<div class="row-fluid">
			<div class="box span12">
				<div id="dQuery" class="breadcrumb form-horizontal">
					<form id="searchForm">

						<div class="control-group" id="divModule"></div>
						<div class="control-group" id="divCategory"></div>
						<div class="control-group" id="divMenu"></div>

						<div class="control-group" id="divOperationName"></div>
						<div style="clear: both;"></div>
						<div>
							<a href="#" id="btnQuery"></a>
							<a href="#" id="btnReset"></a>
						</div>
					</form>
				</div>

				<div class="breadcrumb">
					<a href="javascript:void(0);" id="btnAddM"></a>
					<a href="javascript:void(0);" id="btnDelM"></a>
				</div>
				<div class="box-content" id='divlist'>
					<table class="table table-bordered table-striped table-condensed ">
						<thead>
							<tr class="">
								<th style="width: 50px; text-align: center;">选择</th>
								<th style="width: 30px; text-align: center;">序号</th>
								<th>模块名称</th>
								<th>栏目名称</th>
								<th>菜单名称</th>
								<th>操作名称</th>
								<th>操作编码</th>
								<th style="width: 200px;">操作</th>
							</tr>
						</thead>
						<tbody id="container">
							<jsp:include page="operationListPage.jsp"></jsp:include>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div id="myModal"></div>
	<div id="myActionSetModal"></div>
	<div class="alert hide" id="myalert"></div>
	<jsp:include page="../../../shared/includeOperation.jsp"></jsp:include>
    <%--<jsp:include page="../../../shared/includeJS.jsp"></jsp:include>--%>
    <%--<t:js url="/resource/js/module/um/operation/operationList.js"></t:js>--%>
	<jsp:include page="../../../shared/includeJS.jsp" flush="true" >
		<jsp:param value="/js/module/um/operation/operationList.js" name="curJSUrl"/>
	</jsp:include>
</body>
</html>