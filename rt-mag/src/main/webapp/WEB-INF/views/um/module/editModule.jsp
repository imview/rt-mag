<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="form-horizontal">
    <form id="editForm">

        <div class="control-group" id="divModuleName"></div>
        <div class="control-group" id="divSequence"></div>
        <div class="control-group" id="divIsEnable"></div>

        <input type="hidden" id="id" name="id" value="${module.id}">
    </form>
</div>
<script type="text/javascript">
    var entity = ${module};

</script>
<t:js url="/js/module/um/module/editModule.js" ></t:js>