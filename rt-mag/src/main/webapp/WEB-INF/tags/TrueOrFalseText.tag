<%@ tag pageEncoding="utf-8"%><%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ attribute name="value"  required="true" rtexprvalue="true"%>

 <c:choose>
   <c:when test="${value == 1}">是</c:when>
   <c:otherwise>否</c:otherwise>
 </c:choose>