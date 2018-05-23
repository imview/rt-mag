<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:set var="i" value="0"></c:set>
<c:forEach items="${data}" var="m">
	<c:set var="i" value="${i+1}"></c:set>
	<tr>
		<td style="text-align: center;">
			<input type="checkbox" value="${m.id}" />
		</td>
		<td style="text-align: center;">${i}</td>
		<td style="text-align: center;" title="${m.moduleName}">${m.moduleName}</td>
		<td style="text-align: center;" title="${m.categoryName}">${m.categoryName}</td>
		<td style="text-align: center;" title="${m.menuName}">${m.menuName}</td>
		<td style="text-align: center;" title="${m.name}">${m.name}</td>
        <td style="text-align: center;" title="${m.code}">${m.code}</td>
		<td style="text-align: center;">
			<a href="javascript:void(0)"value="${m.id}" id="btnModi_${m.id}"></a>
			<a href="javascript:void(0)" value="${m.id}"id="btnAction_${m.id}"></a>
		</td>

	</tr>
</c:forEach>
<input type="hidden" id="iCount" value="${iCount}" />
<input type="hidden" id="iSize" value="${iSize}" />
<input type="hidden" id="iIndex" value="${iIndex}" />