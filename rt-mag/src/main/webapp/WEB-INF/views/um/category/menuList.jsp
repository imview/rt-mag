<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<table class="table table-bordered table-striped table-condensed">
    <thead>
        <tr> 
            <th style="width: 100px;">菜单名称</th>
            <th style="width: 70px;">所属栏目</th>
              <th style="width: 100px;">URL</th>
            <th style="width: 100px;">菜单图标地址</th>
			<th style="width: 60px;">是否启用</th>
			<th style="width: 300px;">操作</th>
        </tr>
    </thead>     
    <tbody id="container">

    <c:forEach var="model" items="${data}" >
      <tr>
          <td>${model.name}</td>
          <td>${categoryName}</td>
          <td>${model.url }</td>
          <td>${model.icon }</td>
          <td>
             <t:TrueOrFalseText value="${model.enabled}"></t:TrueOrFalseText>
          </td>
          <td>
              <a href="#"  menuId="${model.id}"  categoryId="${categoryId}" moduleId="${moduleId}" id="menu_Up_${model.id}">修改</a>
              <a href="#" menuId="${model.id}" categoryId="${categoryId}" categoryName="${categoryName }" id="MenuTDow_${model.id}">上移</a>
              <a href="#" menuId="${model.id}"  categoryId="${categoryId }" categoryName="${categoryName }" id="MenuTUp_${model.id}">下移</a>
              <a href="#" menuId="${model.id}"    id="MenuActionSet_${model.id}">动作配置</a>
          </td>
      </tr>
    </c:forEach>

    </tbody>
</table>

<input type="hidden" id="iCount" value="${iCount}" />
<input type="hidden" id="iSize" value="${iSize}" />
<input type="hidden" id="iIndex" value="${iIndex}" />