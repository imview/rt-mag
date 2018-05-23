<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:forEach var="model" items="${data}" >
    <tr>
        <td style="text-align: center; width: 30px;">
            <input type="checkbox"  class="cbxItem"  value="${model.id}" />
        </td>
        <td title="${model.name}">${model.name}</td>
        <td style="width:100px;" title="${model.parentName}">${model.parentName}</td>
        <td title="${model.icon}">${model.icon }</td>
        <td>
            <t:TrueOrFalseText value="${model.enabled}"></t:TrueOrFalseText>
        </td>
        <td title="${model.lastUpdateUserName}">${model.lastUpdateUserName}</td>
        <td><fmt:formatDate value="${model.lastUpdateTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>

        <td>
            <a  href="#"  value="${model.id}" id="left_${model.id}"></a>
            <a  href="#"  value="${model.id}"  id="right_${model.id}"></a>
            <a  href="#"  value="${model.id}"  id="btnModi_${model.id}">  </a>
            <a  href="#"  value="${model.id}" moduleId="${model.parentId }"  categoryName="${model.name}" id="btnSel_${model.id}">   </a>
            <a  href="#"  value="${model.id}" moduleId="${model.parentId }"  categoryName="${model.name}" id="btnAddT_${model.id}"> </a>
        </td>
    </tr>
</c:forEach>

<input type="hidden" id="iCount" value="${iCount}" />
<input type="hidden" id="iSize" value="${iSize}" />
<input type="hidden" id="iIndex" value="${iIndex}" />