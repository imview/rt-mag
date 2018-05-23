<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="../../../shared/includeCSS.jsp" flush="true" />
    <title>角色管理</title>
</head>
<body>
    <div class="form-horizontal msk">
        <div class="row-fluid">
            <div class="box span12">
                <div id="dQuery" class="breadcrumb form-horizontal">
                    <form id="searchForm">
                        <div class="control-group" id="divName"></div>

                        <div style="clear: both;"></div>
                        <div>
                            <a href="javascript:void(0);" id="btnQuery"></a>
                            <a href="javascript:void(0);" id="btnReset"></a>
                        </div>
                    </form>
                </div>
                <div class="breadcrumb">
                    <a href="#" id="btnAddM"></a>
                    <a href="#" id="btnDelM"></a>
                </div>
                <div class="box-content" id='divlist'>
                    <table class="table table-bordered table-striped table-condensed">
                        <thead>
                            <tr>
                                <th style="width: 30px;text-align: center;">选择</th>
                                <th style="width: 30px;text-align: center;">序号</th>
                                <th style="width: 250px;">角色名称</th>
                                <th style="width: 80px;text-align: center;">启用状态</th>
                                <th style="width: 450px;">备注</th>
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
    <div class=" alert hide" id="myalert"></div>

    <jsp:include page="../../../shared/includeOperation.jsp"></jsp:include>
    <jsp:include page="../../../shared/includeJS.jsp" flush="true" >
        <jsp:param value="/js/module/um/role/roleList.js" name="curJSUrl"/>
    </jsp:include>

</body>
</html>