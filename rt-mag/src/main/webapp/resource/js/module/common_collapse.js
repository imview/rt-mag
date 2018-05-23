$(function () {
    var browser = navigator.appName
    var b_version = navigator.appVersion
    var version = b_version.split(";");
    var trim_Version = "";
    if (version && version.length > 1) {
        
        trim_Version =version[1]?"":version[1].replace(/[ ]/g, "");
    }
    
    //读cookie

    var menuCollapse = getCookie("MenuCollapse");
    if (menuCollapse == "Hide")
        collapseHide();
    else {
        collapseShow();
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
            $("#leftMenu").css("width", "195px");
            $("#icon-chevron-left").css("left", "215px");
        }
    }
    $("#icon-chevron-left").bind('click', collapseHide);
    $("#icon-chevron-right").bind('click', collapseShow);
});

function collapseHide() {
    $(".main-menu-span").css("display", "none");
    $("#icon-chevron-left").css("display", "none");
    $("#icon-chevron-right").css("display", "block");
    $("#divContent").attr("class", "span12");
    var time = 200000 * 10000 * 100;
    //写入cookie
    setCookie("MenuCollapse", "Hide", time);

    var contentWidth = $(".row-fluid").width();
    $("#menu-content").css("width", contentWidth);
    var sumWeight = 0;
    $.each($("#menu-content ul li"), function (item) {
        sumWeight += $(this).width()
    });
    var menuWidth = $("#menu-content").width() - $("#tabs-scroller-left").width() - $("#tabs-scroller-left").width() - $("#btnCloseAll").width();
    if (sumWeight > menuWidth) {
        $("#menu-content .tabs-wrap").css("width", menuWidth - 42).css("left", "20px");
        $(".tabs-scroller-right").css("display", "block");
    } else {
        $("#menu-content .tabs-wrap").css("width", menuWidth - 22).css("left","0px");
        $(".tabs-scroller-right").css("display", "none");

    }
}

function collapseShow() {
    $(".main-menu-span").css("display", "block");
    $("#icon-chevron-left").css("display", "block");
    //$("#icon-chevron-left").css("left", "230px!important");
    $("#icon-chevron-right").css("display", "none");
    $("#divContent").attr("class", "span10");
    var contentWidth = $(".row-fluid").width() - $("#leftMenu").width() - 10;
    $("#menu-content").css("width", contentWidth);
    var sumWeight = 0;
    $.each($("#menu-content ul li"), function (item) {
        sumWeight += $(this).width()
    });
    var menuWidth = $("#menu-content").width() - $("#tabs-scroller-left").width() - $("#tabs-scroller-left").width() - $("#btnCloseAll").width();
    if (sumWeight > menuWidth) {
        $("#menu-content .tabs-wrap").css("width", menuWidth - 42).css("left", "20px");
        $(".tabs-scroller-right").css("display", "block");
    } else {
        $("#menu-content .tabs-wrap").css("width", menuWidth - 22).css("left", "0px");
        $(".tabs-scroller-right").css("display", "none");
    }
    var time = 200000 * 10000 * 100;
    //写入cookie
    setCookie("MenuCollapse", "Show", time);
}

/*cookies 操作*/
function getCookie(sKey) {
    if (!sKey)
        return "";
    if (window.document.cookie.length > 0) {
        var startIndex = window.document.cookie.indexOf(sKey + "=")
        if (startIndex != -1) {
            startIndex = startIndex + sKey.length + 1
            var endIndex = window.document.cookie.indexOf(";", startIndex)
            if (endIndex == -1) {
                endIndex = window.document.cookie.length;
            }
            return decodeURIComponent(window.document.cookie.substring(startIndex, endIndex));
        }
    }
    return "";
}

function setCookie(sKey, sValue, iExpireSeconds) {
    if (!sKey)
        return;
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + iExpireSeconds * 1000);
    window.document.cookie = sKey + "=" + encodeURIComponent(sValue) + ";expires=" + expireDate.toGMTString() + ";path=/;";
}

function deleteCookie(sKey) {
    if (!sKey)
        return;
    window.document.cookie = sKey + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}