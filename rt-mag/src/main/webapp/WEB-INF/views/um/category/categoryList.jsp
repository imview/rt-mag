<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head> 
 <jsp:include page="../../../shared/includeCSS.jsp" flush="true" /> 
</head> 
<body>
      <div class="form-horizontal msk">
        <div class="row-fluid">
            <div class="box span12">

                <div id="dQuery" class="breadcrumb form-horizontal">
                    <form id="searchForm">
                        <div class="control-group"  id="divModule"> </div>
                        <div class="control-group" id="divCategoryName"> </div>
                        <div style="clear: both;"></div>
                        <div>
                            <a href="#" id="btnQuery"></a>
                            <a href="#" id="btnReset"></a>
                        </div>
                    </form>
                </div>
                <div class="breadcrumb">
                     <a id="btnAddM"></a><a id="btnDelM"></a>
                </div>
                <div class="box-content" id="divlist">
                    <table class="table table-bordered table-striped table-condensed">
					    <thead>
					        <tr>
					            <th style="width: 30px; text-align: center;">
						            <div class="checker" id="uniform-undefined">
						           		 <span><input type="checkbox" id="cbxAll"  class="cbxItem" value="96c4a334-e93c-4c5c-b58f-620013cd59aa" style="opacity: 0;"></span>
						            </div> 
					            </th>
					            <th style="width: 80px;">栏目名称</th>
					            <th style="width: 80px;">所属模块</th>  
					            <th style="width: 100px;">菜单图标地址</th>
								<th style="width: 60px;">是否启用</th>
								<th style="width: 70px;">操作人</th>
								<th style="width: 120px;">操作时间</th>
								<th style="width: 380px;">操作</th>
					        </tr>
					    </thead>     
					    <tbody id="container">

					    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <jsp:include page="../../../shared/includeOperation.jsp"></jsp:include>
    <jsp:include page="../../../shared/includeJS.jsp" flush="true" >
        <jsp:param value="/js/module/um/category/categoryList.js" name="curJSUrl"/>
    </jsp:include>

</body>
</html>