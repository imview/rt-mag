<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="form-horizontal">
    <form id="editForm">
        <div class ="control-group" id="divModuleId"></div>
        <div class ="control-group" id="divCategoryId"></div>
        <div class ="control-group" id="divMenuId"></div>
        <div class="control-group" id="divName"></div>
        <div class="control-group" id="divOpCode"></div>

        <input type="hidden" id="id" name="id" value="${operation.id}">
        <input type="hidden" id="hedit_menuid" name="menuid" value="${operation.menuId}">
        <input type="hidden" id="hedit_categoryid" name="categoryid" value="${operation.categoryId}">
        <input type="hidden" id="hedit_moduleid" name="moduleid" value="${operation.moduleId}">
    </form>
</div>
<script type="text/javascript">
    //var moduleList = ${moduleList};
    var operation = ${operation};
</script>

<t:js url="/js/module/um/operation/editOperation.js"></t:js>