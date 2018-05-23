/// <summary>
/// 动态加载 javascript 与 css
/// 说明:
///  DevelopMode = true  : 所有加载的javascript与css全都加上随机数避免缓存(無缓存)
///  DevelopMode = false : 所有加载的javascript与css全都加上版本号(日期)避免缓存(允许当天版本缓存)
/// Create by Franky 2012/04/22
/// </summary>

var DevelopMode = true;     //是否为开发模式
var Version = 1.0001;       //版本号(目前不用，因此可能会缓存)
var RightNow = new Date();  //取目前日期的天数

/// <summary>
/// 产生随机数时间
/// </summary>
function RandomNumber() {
    today = new Date();
    num = Math.abs(Math.sin(today.getTime()));
    return num;
};

/// <summary>
/// 取得标头tag
/// </summary>
var getHead = function () {
    return document.getElementsByTagName("head")[0];
};
/// <summary>
/// 动态载入js档
/// </summary>
var includeJavascriptFile = function (url) {
    if (DevelopMode) {
        url = url + "&ra=" + RandomNumber();
    } else {
        //url = url + "&ra=" + Version;
        url = url + "&ra=" + RightNow.getFullYear() + (RightNow.getMonth() + 1) + "-" + RightNow.getDate();
    }
    if (document.body == null) {
        document.write("<script src='" + url + "' type='text/javascript'></script>");
    } else {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.language = "JavaScript";
        script.src = url;
        getHead().appendChild(script);
    }
};
/// <summary>
/// 动态载入css文件
/// </summary>
var includeCssFile = function (url) {
    if (DevelopMode) {
        url = url + "&ra=" + RandomNumber();
    } else {
        url = url + "&ra=" + Version;
    }
    if (document.body == null) {
        document.write("<link rel='stylesheet' href='" + url + "' type='text/css'/>");
    } else {
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", url);
        getHead().appendChild(link);
    }
};