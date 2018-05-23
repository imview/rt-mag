//显示上一页
function prevpage(val) {
    val.addClass("current");
    $(val.attr('nav')).show();
    //document.getElementById(val.attr('nav').split("#")).style.display = "block";
}

function ischecked(obj) {
    var bool = false;
    $("#" + obj + " input[type='checkbox']").each(function () {
        if (this.checked) {
            bool = true;
        }
    })
    if (bool == false) {
        alert('您没有选中任何项!');
        bool = false;

    }
    return bool;
}

//全选开始
function checkAll(obj, tbId) {
    var bool = obj.checked;
    $("#" + tbId + " input[type='checkbox']").attr("checked", bool);

    //allinput[i].checked = obj.checked;
}

///格式化时间
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

//获得当前时间
function getNowTime() {

    //取得当前时间
    var now = new Date();
    var strnow = now.format("yyyy-MM-dd hh:mm");
    //    var year = now.getFullYear();
    //    var month = now.getMonth() + 1;
    //    var day = now.getDate();
    //    var hour = now.getHours();
    //    var minute = now.getMinutes();
    //var second = now.getSeconds();
    var week = now.getDay();
    var weekname = "星期" + "天一二三四五六".split('')[week];
    var nowdate = strnow + " " + weekname;
    $("#lbltime").text(nowdate);

}
//ifram自适应
function setifHeight(id) {
    var iframe = id;
    //document.domain = "cmbchinaucs.com";
    var hheight = iframe.contentWindow.document.documentElement.scrollHeight;
    hheight = iframe.contentWindow.document.body.scrollHeight;
    var iheight = iframe.contentDocument == undefined ? 0 : iframe.contentDocument.body.scrollHeight;
    //var hheight = iframe.contentWindow.document.documentElement.scrollHeight;
    var height = Math.max(hheight, iheight);
    if ((!/*@cc_on!@*/0) && height == 650) {
        height = 950;
    }
    //    if (height < 650) {
    //        height = 600;
    //    }
    //iframe.height = height;
    iframe.style.height = height + "px";
}
//打开选项卡
function opentab(menu) {

    $(".labelContent").hide();
    $("#Toggletitle ul").children("li").removeClass("current");
    //$("#mydeskshow").removeClass("current");
    var tabcount = $("#labelContent iframe").length;

    //alert(tabcount)

    var isopened = false;
    //判断是否重复打开
    $("#Toggletitle li").each(function () {
        if ($.trim($(this).find("span").text()) == $.trim(menu.title)) {
            $(this).addClass("current").siblings().removeClass("current");
            $(".labelContent").hide();
            $($(this).attr('nav')).find("iframe").attr('src', menu.nav);
            $($(this).attr('nav')).show();
            isopened = true;
        }
    });
    //限制任务栏
    if (tabcount > 9 && isopened == false) {
        alert('最多打开' + tabcount + '个选项卡!');
        return false;
    }
    if (isopened) {
        return true;
    }
    //动态标题
    var li = $(" <li value='" + menu.navid + "' navid='" + menu.navid + "' class='current' nav='#" + menu.navid + "'><span>" + menu.title + "</span><a class='btnClose' title='关闭' href='javascript:void(0);'></a></li>");
    $("#Toggletitle ul").append(li);
    //动态iframe添加
    var ifmain = $("<div style='display:block;'></div>");
    ifmain.attr('class', 'pageBody labelContent Content_1');
    ifmain.attr('id', menu.navid);
    ifmain.append("<div class='inner_2'><div class='rightContent'><iframe id='" + menu.navid + "' name='" + menu.navid + "' src='" + menu.nav + "'  width='100%' height='100%' frameborder='0'></iframe></div></div>");
    $("#labelContent").append(ifmain);

}
$(document).ready(function () {
    getNowTime();
    window.setInterval("getNowTime();", 60000);
    //菜单展示
    $("#menu_left_ucsmy li .yj").live("click", function () {
        $("#menu_left_ucsmy li .yj a").removeClass("current");
        $(this).children("a").addClass("current");
        $(this).next("ul").slideDown(300);
        $(this).parent().siblings().children("ul").slideUp(300);
    })
    $("#menu_left_ucsmy .two span").live("click", function () {
        var nav = $(this).parent().attr("nav");
        var navid = $(this).parent().attr("navid");
        var title = $(this).text();
        var menu = { nav: nav, title: title, navid: navid };
        opentab(menu);
    });
    //标签切换
    $(".labelBox .label li span").live("click", function () {
        $(this).parent().addClass("current").siblings("li").removeClass("current");
        //$(this).closest(".label").siblings(".labelContent").hide();
        $(".labelContent").hide();
        $($(this).parent().attr('nav')).show();

        $("#labelContent iframe").each(function () {
            SetHeightByIframe(this)
        });
    });

    function SetHeightByIframe(ifr) {
        if (ifr) {
            var h = parseInt(ifr.style.height);
            if (h < 600) {
                ifr.style.height = 600 + "px"
            }
        }
    }

    $(".btnClose").live("click", function () {
        //$(this).parent().prev().addClass("current");
        var prevobj = $(this).parent().prev();
        $($(this).parent().attr('nav')).remove();
        $(this).parent().remove();
        //显示上一页
        //prevpage(prevobj);
    });
});