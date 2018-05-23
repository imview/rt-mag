<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="form-horizontal">
    <form id="editForm">
        <div class="control-group" id="txtLoginName"></div>
        <div class="control-group" id="txtUserName"></div>
        <div class="control-group">
            <label class="control-label">
                用户密码：</label>
            <div class="controls">
                <input type="password" id="password" name="password" Class = "IsError IsRequired
                IsMaxLength IsMinLength"  MaxLength = "16"  MinLength = "6"  MsgName = "密码" style="width: 200px;"/>
            </div>
        </div>

        <div class="control-group" id="divEidtRoleIDs"></div>
        <div class="control-group" id="txtMobile"></div>
        <div class="control-group" id="txtEmail"></div>

        <input type="hidden" id="userId" name="userId" value="${userId}"/>
    </form>
    <input type="hidden" id="userModel" value="${userModel}"/>
</div>

<script type="text/javascript">
    var entity = ${entity};
    var hasRoleIds = '${hasRoleIds}';

</script>
<t:js url="/js/module/um/user/editUser.js"></t:js>
