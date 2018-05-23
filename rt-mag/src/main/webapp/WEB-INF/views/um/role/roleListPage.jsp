 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:forEach var="m" items="${data}" varStatus="status"> 
    <tr>
        <td style="text-align: center;">
            <input type="checkbox" value="${m.id}" />
        </td>
        <td style="text-align: center;">${ status.index + 1}</td>
        <td title="${m.name}">${m.getName()}</td>
        <td>${m.getIsDelete() eq 1 ? '删除':'启用'  }</td>
        <td title="${m.getRemark()}">${m.getRemark()}</td>
        <td>
            <a  href="#"  value="${m.getId()}" id="Update_${m.getId()}" >修改 </a>
            <a  href="#" value="${m.getId()}" names="${m.getName()}" id="config_${m.getId()}">配置权限</a>
        </td>
    </tr>
 </c:forEach>

 <input type="hidden" id="iCount" value="${iCount}" />
 <input type="hidden" id="iSize" value="${iSize}" />
 <input type="hidden" id="iIndex" value="${iIndex}" />