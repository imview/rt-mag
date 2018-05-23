<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="form-horizontal">
    <%--<div class="control-group">--%>
    <%--<label class="control-label">--%>
    <%--角色名称：</label>--%>
    <%--<div class="controls">--%>
    <%--<input type="text" id="txtName" MsgName="角色名称" value="${name}" Class = "IsError IsRequired IsMaxLength IsMinLength"  MaxLength = "15"  MinLength = "1" />--%>
    <%--</div>--%>
    <%--</div>--%>
    <div class="control-group" id="divRoleName"></div>
    <div class="control-group">
        <label class="control-label">
            备注：
        </label>
        <div class="controls">
            <textarea type="text" id="txtRemark" MsgName="备注" >${remark}</textarea>
        </div>
    </div>
    <%--<div class="control-group" id="divRemark"></div>--%>

    <input id="hRoleID" type="hidden" value="${id}" />
</div>
<script type="text/javascript">
   var roleName = '${name}';
</script>
    <t:js url="/js/module/um/role/editRole.js"></t:js>