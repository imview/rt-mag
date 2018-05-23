<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:forEach var="m" items="${data}" varStatus="status">

    <tr>
        <td style="text-align: center;">
            <c:if test="${m.isSuperAdmin eq 0}">
                <input type="checkbox" value="${m.id}" />
            </c:if>
        </td>
        <td style="text-align: center;">${ status.index + 1}</td>
        <td title="${m.loginName}">${m.loginName}</td>
        <td title="${m.userName}">${m.userName}</td>
        <td title="${m.mobile}">${m.mobile}</td>
        <td title="${m.email}">${m.email}</td>
        <td>${m.status  eq 0 ? '启用' :'禁用'}</td>
        <td title="@user.OwnRoles">${m.roleName}</td>
        <td>
            <a href="#" value="${m.id}" id="Reset_${m.id}">重置密码 </a>
            <a href="#" value="${m.id}" names="${m.userName}" id="Edit_Role_${m.id}">配置角色 </a>
            <a href="#" value="${m.id}" names="${m.userName}" id="Module_${m.id}">查看权限 </a>
            <a href="#" value="${m.id}" names="${m.userName}" id="Modify_${m.id}" >修改</a>
            <a href="#" value="${m.id}" names="${m.userName}" id="ResetLock_${m.id}"></a>
            <c:if test="${m.isSuperAdmin eq 0}">
                <a href="#" value="${m.id}" names=""
                   upStatus="${m.status==0?1:0}" id="IsEnabled_${m.id}">${m.status==0?"禁用":"启用"}</a>
            </c:if>

        </td>
    </tr>
</c:forEach>

<input type="hidden" id="iCount" value="${iCount}" />
<input type="hidden" id="iSize" value="${iSize}" />
<input type="hidden" id="iIndex" value="${iIndex}" />
