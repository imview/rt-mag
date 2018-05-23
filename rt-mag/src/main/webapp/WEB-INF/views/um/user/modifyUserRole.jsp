 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
 <t:js url="/lib/javascript/Ztree/jquery.ztree.core-3.5.min.js"></t:js>
 <t:js url="/lib/javascript/Ztree/jquery.ztree.core-3.5.min.js"></t:js>
 <t:css url="/lib/css/zTreeStyle.css"></t:css> 

  
<input type="hidden" id="mUserID" value="${userId}" />
<div class="content_wrap">
    <div class="zTreeDemoBackground left">
        <ul id="ztrees" class="ztree">
         <c:forEach var="m" items="${data}" varStatus="status"> 
                <li class="level" tabindex="0" hidefocus="true" treenode="">
                    
                    <input type="checkbox" class="userIsOwnRole" value="${m.id}" ${m.userId != null ? 'checked="checked"' : ''}  />
                  
                    <a class="level" treenode_a="" onclick="" target="_blank" style="" title="${m.name}">
                        <span title="" treenode_ico="" class="button ico_docu" style=""></span>
                        <span >${m.name}</span>
                    </a>
                </li>
       </c:forEach>
        </ul>
    </div>
</div>