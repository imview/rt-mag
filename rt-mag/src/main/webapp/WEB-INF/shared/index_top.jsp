<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- topbar starts -->
<div class="navbar"  >
    <div class="navbar-inner">
        <div>
            <img alt="ProxySys Logo" src="${__basePath}/images/admin_logo.png" style="float: left" />
            <div class="" style="margin-top: 3px;">
                <a id="localtime" style="font-size: 15px; width: 250px; margin-left: 50px;" class="brand">
                    Loading......
                </a>
            </div>
            <!-- user dropdown starts -->
            <div class="btn-group pull-right">
                <a class="btn dropdown-toggle" data-toggle="dropdown">
                    <span style="vertical-align: middle;">
                        <i class="icon-user"></i>
                    </span><span class="hidden-phone">${username}</span>
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li> <a onclick="RedirectWithIfr('个人资料','account/userInfo')">个人资料</a></li>
                    <li class="divider"></li>
                    <li><a href="${__basePath}/login/logout">更改用户</a></li>
                    <li class="divider"></li>
                    <li><a onclick="RedirectWithIfr('修改密码','account/modifyPwdView')">修改密码</a>  </li>
                    <li class="divider"></li>
                    <li><a href="${__basePath}/login/logout">退出</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- topbar ends -->
<!-- topbar starts -->
<div class="navbar">
    <div style="border-bottom: 2px solid #369bd7;">
        <div class="container-fluid" style="margin-top:5px;">
            <!-- user dropdown starts -->
            <div class="top-nav ">
                <ul class="nav" style="margin-left: 5px;">
                    <li style="cursor: pointer; margin-left: -130px; margin-top: 10px; display: none;">
                    </li>
<c:forEach var="modu" items="${module}">
<li onclick="showGetHtml('${modu.id}')" style="cursor: pointer; margin-left: 3px;"><a id="Top_${modu.id}" class="nav-btn">${modu.name}</a></li>
</c:forEach>
</ul>
            </div>
        </div>
    </div>
</div>
<!-- topbar ends -->
