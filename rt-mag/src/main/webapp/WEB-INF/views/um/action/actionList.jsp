<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<head>
<jsp:include page="../../../shared/includeCSS.jsp"></jsp:include>
<title>功能列表</title>
</head>
<body>
    <div class="form-horizontal msk">
        <div class="row-fluid">
            <div class="box span12">
                <div id="dQuery" class="breadcrumb form-horizontal">
                    <form id="searchForm">
                        <div class="control-group" id="divName"></div>
                        <div class="control-group" id="divUrl"></div>
                        <div class="control-group" id="divNamespace"></div>
                        <div class="control-group" id="divControllerName"></div>
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
					            <th style="width: 50px;">选择</th>
					            <th style="width: 45px;">序号</th>
					            <th>名称</th>
					            <th>标题</th>
					            <th>路由地址</th>
					            <th>控制器包名</th>
					            <th>控制器名称</th>
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
    <jsp:include page="../../../shared/includeJS.jsp">
        <jsp:param value="/resource/js/module/um/action/actionList.js" name="curJSUrl"/>
    </jsp:include>
</body>
</html>