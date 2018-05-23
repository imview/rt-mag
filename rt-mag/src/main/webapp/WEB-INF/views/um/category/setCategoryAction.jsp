 <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="form-horizontal">
    <form id="setCategoryAction">
    <input type="hidden" name="operationId" id="txtOperationId" value="${operationId}"/>
    <div class="control-group" id="divActionView">  </div>
    <div class="control-group" > 
	    <table id="tbActionList">
	    <c:forEach  var="item" items="${data}"  varStatus="status">
	      <c:if test="${status.count >0 }">
	       <tr><td>${item.text }</td></tr>
	    </c:if>
	    </c:forEach>
	    </table>
    </div> 
    </form>
   
</div>
<script type="text/javascript">
	var defaultIds = '${defaultIds}';
</script>
 <t:js url="/js/module/um/category/categoryAction.js" ></t:js>