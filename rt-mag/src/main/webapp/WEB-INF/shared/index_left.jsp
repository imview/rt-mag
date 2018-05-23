<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- left menu starts -->
<style>
    .nav > .main> a:hover {background-color: #369bd7;}
    .nav > .sub > a:hover {background-color: #fff;}
</style>
<input type="hidden" id="menuleft" value='${mcm}' />
<div class="span2-menu-span main-menu-span" id="leftMenu" style="margin-left: 10px;width: 200px;">
    <div class="well nav-collapse sidebar-nav">
        <ul class="nav nav-tabs nav-stacked main-menu" id="showMenu"></ul>
    </div>
    <!--/.well -->
</div>
<!--/span-->
<!-- left menu ends -->