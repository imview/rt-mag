<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<div class="form-horizontal">
	<form id="editForm">
		<div class="control-group" id="divEidtName"></div>
		<div class="control-group" id="divEidtTitle"></div>
		<div class="control-group" id="divEidtUrl"></div>
		<div class="control-group" id="divEidtNamespace"></div>
		<div class="control-group" id="divEidtControllerName"></div>
		<div class="control-group" id="divEidtRemark"></div>
		<input type="hidden" id="hideId" name="id" value=""/>
	</form>

</div>
<script type="text/javascript">
    var editEntity = ${model};
</script>
<t:js url="/js/module/um/action/editAction.js" ></t:js>