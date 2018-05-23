 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="form-horizontal">
    <form id="editForm">
    <div class="control-group" id="divCategoryAddView">  </div>
    <div class="control-group" id="divIconView"> </div>
    <div class="control-group" id="divModuleAddView">  </div> 
    <div class="control-group" id="divIsShowAndView"> </div> 
    <input type="hidden"   name="id" value="${category.id}"/>
    <input type="hidden"   name="sequence" value="${category.sequence}"/>

    </form>
   
</div>
 <%--<t:js url="/js/module/um/operation/editView.js" ></t:js>--%>
<script type="text/javascript">
    var entity = ${category};
</script>
 <t:js url="/js/module/um/category/editView.js" ></t:js>
 <%--<jsp:include page="../../../shared/includeJS.jsp" flush="true">--%>
     <%--<jsp:param value="/js/module/um/operation/editView.js" name="curJSUrl_add"/>--%>
 <%--</jsp:include>--%>