<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="../../../shared/includeCSS.jsp"></jsp:include>
<title>模块列表</title>
</head>
<body>
    <div class="form-horizontal msk">
        <div class="row-fluid">
            <div class="box span12">
                <div class="breadcrumb">
                            <a href="javascript:void(0);" id="btnAddM"></a>
                            <a href="javascript:void(0);" id="btnDelM"></a>
                </div>
                <div class="box-content" id='divlist'>
                    <table class="table table-bordered table-striped table-condensed ">
					    <thead>
					        <tr class="">
					            <th style="width: 50px;">选择</th>
					            <th style="width: 45px;">序号</th>
					            <th>模块名称</th>
					            <th>排序</th>
					            <th>启用/禁用</th>
					            <th>操作</th>
					        </tr>
					    </thead>
					    <tbody id="container">

					    </tbody>
					</table>
                </div>
            </div>
        </div>
    </div>
    <div id="myModal"></div>
    <div class="alert hide" id="myalert"></div>
    <jsp:include page="../../../shared/includeOperation.jsp"></jsp:include>
    <jsp:include page="../../../shared/includeJS.jsp"></jsp:include>
	<t:js url="/js/module/um/module/moduleList.js"></t:js>
</body>
</html>