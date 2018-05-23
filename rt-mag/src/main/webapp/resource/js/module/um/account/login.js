$(document).ready(function () {
    //themes, change CSS with JS
    //default theme(CSS) is spacelab, change it if needed
    var current_theme = $.cookie('current_theme') == null ? 'cerulean' : $.cookie('current_theme');
    switch_theme(current_theme);
    //如果cookie存在样式缓存则取cookie的样式
    function switch_theme(theme_name) {
        $('#bs-css').attr('href', '/lib/css/bootstrap-' + theme_name + '.css');
    }
    ChangeIMG();

    $("#Password").bind('keyup', function (event) {
        if (event.keyCode == 13) {
            $("#Password").blur();
            $("#btnLogin").click();
        }
    });

    $("#VCode").bind('keyup', function (event) {
        if (event.keyCode == 13) {
            $("#VCode").blur();
            $("#btnLogin").click();
        }
    });

    //输入验证
    $("#btnLogin").bind('click', login);

    //disbaling some functions for Internet Explorer
    if ($.browser.msie) {
        $('.login-box').find('.input-large').removeClass('span10');
    }

    //other things to do on document ready, seperated for ajax calls
    DocReady();

    $("#imgCode").bind('click', function () {
        ChangeIMG();
    })
});

function login(){
	if ($("#UserName").val().replace(/^\s+|\s+$/g, "") == "") {
        $("#UserName").focus();
        return false;
    }
    if ($("#Password").val().replace(/^\s+|\s+$/g, "") == "") {
        $("#Password").focus();
        return false;
    }
    else {
        var url = UrlParamsToObject()["RequestUrl"];
        if (url == undefined) {
            url = "";
        }
        var password = new Base64().encode(hex_md5($("#Password").val()) + umGlobal.loginToken);
        var me=$(this);
        me.html("登录中...");
        me.unbind("click");
        $.ajax({
            url: umGlobal.basePath+"/login/login",
            type: "post",
            data: {
            	ra: RandomNumber(),
            	loginName:$("#UserName").val(),
            	password:password,
            	code:$("#VCode").val(),
            	loginToken:umGlobal.loginToken
            },
            dataType: "text",
            success: function (result) {
            	var msg = $.parseJSON(result);
                if (msg.isSuccess) {
                    window.location = umGlobal.basePath+"/home/index";
                }
                else {
                	umGlobal.loginToken=msg.dicData.loginToken;
                    alert(msg.message);
                    ChangeIMG();
                    
                    me.html("登 录");
                    me.bind("click",login);
                }
            },
            error : function(err) {
            	me.html("登 录");
                me.bind("click",login);
            }
        });
    }
}

var Lock = function () {
    return {
        //main function to initiate the module
        init: function () {
            $.backstretch([
               "../images/lock_bg/1.jpg",
               "../images/lock_bg/2.jpg",
               "../images/lock_bg/3.jpg",
               "../images/lock_bg/4.jpg"
            ], {
                fade: 1000,
                duration: 8000
            });
        }
    };
} ();

function DocReady() {
    //tooltip
    $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({ "placement": "bottom", delay: { show: 400, hide: 200} });
    //
    Lock.init();
}

function ChangeIMG() {
    $("#imgCode").attr("src", umGlobal.basePath+"/common/codeImage.jsp?" + Math.random(16));
}

function UrlParamsToObject() {
    var URLParams = {};
    var aParams = window.location.search.substr(1).split('&');
    for (i = 0; i < aParams.length; i++) {
        var p = aParams[i].split('=');
        URLParams[p[0]] = decodeURIComponent(p[1]);
    }
    return URLParams;
}