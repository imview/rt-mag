<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:set var="i" value="0"></c:set>
<c:forEach items="${actions}" var="a">
	<c:set var="i" value="${i+1}"></c:set>
	<tr>
		<td style="text-align: center;"><input type="checkbox"
			value="${a.id}" /></td>
		<td style="text-align: center;">${i}</td>
		<td style="text-align: left;" title="${a.name}">${a.name}</td>
		<td style="text-align: left;" title="${a.title}">${a.title}</td>
		<td style="text-align: left;" title="${a.url}">${a.url}</td>
		<td style="text-align: left;" title="${a.namespace}">${a.namespace}</td>
		<td style="text-align: left;" title="${a.controllerName}">${a.controllerName}</td>
		<td style="text-align: center;"><a href="javascript:void(0)"
			value="${a.id}" id="btnModi_${a.id}"></a></td>
	</tr>
</c:forEach>
<input type="hidden" id="iCount" value="${iCount}" />
<input type="hidden" id="iSize" value="${iSize}" />
<input type="hidden" id="iIndex" value="${iIndex}" />