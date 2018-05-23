<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<jsp:include page="../../../shared/includeCSS.jsp"></jsp:include>
	<title>用户列表</title>
</head>
<body>
    <div class="form-horizontal msk">
        <div class="row-fluid">
            <div class="box span12">
                <div id="dQuery" class="breadcrumb form-horizontal">
                    <form id="searchForm">
						<div class="control-group" id="divLoginName"> </div>
						<div class="control-group" id="divUserName">  </div>
						<div class="control-group" id="divMobile" >    </div>
						<div class="control-group" id="divEmail" >  </div>
						<div class="control-group"  id="divRoleId"> </div>
						<div class="control-group" id="divStatus"></div>

                    <div style="clear: both;">
                    </div>
                    <div>
                        <a href="#" id="btnQuery"></a>
                        <a href="#" id="btnReset"></a>
                    </div>
                    </form>
                </div>
                <div class="breadcrumb">
                    <a href="#" id="btnAddM"></a>
					<a href="#" id="btnDelM"></a>
                </div>
                <div class="box-content" id='divlist'> 
					<div style="overflow-x: scroll">
						<table class="table table-bordered table-striped table-condensed">
							<thead>
								<tr>
									<th style="width: 30px;text-align: center;">选择</th>
									<th style="width: 30px;text-align: center;">序号</th>
									<th style="width: 150px;">后台账号</th>
									<th style="width: 150px;">用户名称</th>
									<th style="width: 100px;">手机号码</th>
									<th style="width: 65px;">邮箱地址</th>
									<th style="width: 65px;">是否启用</th>
									<th style="width: 280px;">拥有角色</th>
									<th style="width: 480px;">操作</th>
								</tr>
							</thead>
							<tbody id="container">

							</tbody>
						</table>
					</div>
                </div>
            </div>
        </div>
    </div>
	<%--  弹窗层 --%>
    <div class="alert hide" id="myalert"></div>

	<jsp:include page="../../../shared/includeOperation.jsp"></jsp:include>
	<jsp:include page="../../../shared/includeJS.jsp">
		<jsp:param value="/js/module/um/user/userList.js" name="curJSUrl"/>
	</jsp:include>
  
 </body>
</html>
