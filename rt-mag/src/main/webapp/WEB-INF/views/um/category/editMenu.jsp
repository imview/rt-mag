 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 
<div class="form-horizontal">
 
    <form id="MenuEditForm">
    <div class="control-group" id="divMenuAddView">  </div>
     <div class="control-group" id="divMenuUrlView"> </div>
    <div class="control-group" id="divMenuIconView"> </div>
    <div class="control-group" id="divModuleMenuView">  </div> 
    <div class="control-group" id="divCategoryMenuView">  </div> 
    <div class="control-group" id="divMenuIsShowAndView"> </div> 
    <input type="hidden"   name="id" value="${menu.id}"/>
    <input type="hidden"   name="sequence" value="${menu.sequence}"/>

    </form>
   
</div>
<script>
    var menu = ${menu};
    var categoryId = '${categoryId}';
    var moduleId = '${moduleId}';

</script>
 <t:js url="/js/module/um/category/editMenu.js" ></t:js>