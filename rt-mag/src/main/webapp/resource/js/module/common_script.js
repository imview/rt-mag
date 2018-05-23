
//javascript 取 url 参数
function querySt(ji) {
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            return ft[1];
        }
    }

    return '';
}

/// <summary>返回按鈕</summary>
function back() {
    window.history.back(1);
}

//解析目前的时间
function getDateAuto(obj) {
    var enabled = 0; today = new Date();
    var day; var date;
    if (today.getDay() == 0) day = "星期日 ";
    if (today.getDay() == 1) day = "星期一 ";
    if (today.getDay() == 2) day = "星期二 ";
    if (today.getDay() == 3) day = "星期三 ";
    if (today.getDay() == 4) day = "星期四 ";
    if (today.getDay() == 5) day = "星期五 ";
    if (today.getDay() == 6) day = "星期六 ";
    //date1 = (today.getFullYear()) + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 ";
    date1 =(today.getMonth() + 1) + "月" + today.getDate() + "日 ";
    date2 = day;
    var date = date1 + "/" + date2;
    showtime(date, obj);
}

//配合 getDateAuto 在 menu 显示时间
function showtime(date, obj) {
    var now, hours, minutes, seconds, timeValue;
    now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();
    timeValue = (hours >= 12) ? " " : " ";
    timeValue += hours + ":";
    timeValue += ((minutes < 10) ? "0" : "") + minutes + ":";
    timeValue += ((seconds < 10) ? "0" : "") + seconds + "";
    $("#" + obj).html(date + timeValue);
    setTimeout("showtime('" + date + "','" + obj + "')", 1000);
}

//asp.net日期格式 转 javascript日期 (yyyy/MM/dd)
function TransferDate(source) {
    if (typeof (source) == 'undefined' || source == null) {
        return "";
    }
    var dt = new Date(parseInt(source.substring(6, source.length - 2)));
    var year = dt.getFullYear() + "";
    var month = (dt.getMonth() + 1) + "";
    var day = dt.getDate() + "";
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    var dtString = year + "/" + month + "/" + day;
    return dtString;
}

//asp.net日期格式 转 javascript日期 (yyyy/MM/dd HH:mm:ss)
function TransferDateTime(source) {
    if (typeof (source) == 'undefined' || source == null) {
        return "";
    }
    var dt = new Date(parseInt(source.substring(6, source.length - 2)));
    if (dt.getFullYear() > 1900) {
        var year = dt.getFullYear() + "";
        var month = (dt.getMonth() + 1) + "";
        var day = dt.getDate() + "";
        var hour = dt.getHours();
        var mouth = dt.getMinutes();
        var second = dt.getSeconds();
        if (month.length == 1) { month = "0" + month; }
        if (day.length == 1) { day = "0" + day; }
        if (hour < 10) { hour = "0" + hour; }
        if (mouth < 10) { mouth = "0" + mouth; }
        if (second < 10) { second = "0" + second; }
        var dtString = year + "/" + month + "/" + day + " " + hour + ":" + mouth + ":" + second;
    }
    else {
        dtString = "";
    }
    return dtString;
}

//Extjs转換 microsoft 的时间格式
function ChangeDateFormat(d, type) {
    if (d != null) {
        var date = new Date(parseInt(d.replace("/Date(", "").replace(")/", ""), 10));
        var month = padLeft(date.getMonth() + 1, 10);
        var currentDate = padLeft(date.getDate(), 10);
        var hour = padLeft(date.getHours(), 10);
        var minute = padLeft(date.getMinutes(), 10);
        var second = padLeft(date.getSeconds(), 10);
        if (type == "datetime") {
            return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + second;
        }
        else if (type == "time") {
            return hour + ":" + minute + ":" + second;
        }
        else {
            return date.getFullYear() + "-" + month + "-" + currentDate;
        }
    } else {
        return "";
    }
}

//Extjs转换 microsoft 的時时间式呼叫函式
function padLeft(str, min) {
    if (str >= min)
        return str;
    else
        return "0" + str;
}

//取得 checkbox 的值(true/false)
function getCheckBoxCheckedStatus(objName) {
    var bchecked = false;

    if ($("input[name='" + objName + "']:checkbox:checked").val()) {
        bchecked = true;
    }

    return bchecked;
}

//点击文本框复制其内容到剪贴板上方法
function copyToClipboard(txt) {

    if (window.clipboardData) {

        window.clipboardData.clearData();

        window.clipboardData.setData("Text", txt);

        var options = $.parseJSON('{"text":"已经成功复制到剪帖板上","layout":"bottomRight","type":"success"}');

        noty(options);

    } else if (navigator.userAgent.indexOf("Opera") != -1) {

        window.location = txt;

    } else if (window.netscape) {

        try {

            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

        } catch (e) {

            var options = $.parseJSON('{"text":"被浏览器拒绝\n请在浏览器地址栏输入about:config并回车\n然后将signed.applets.codebase_principal_suppor设置为true","layout":"bottomRight","type":"error"}');

            noty(options);

        }

        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);

        if (!clip) return;

        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);

        if (!trans) return;

        trans.addDataFlavor('text/unicode');

        var str = new Object();

        var len = new Object();

        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);

        var copytext = txt;

        str.data = copytext;

        trans.setTransferData("text/unicode", str, copytext.length * 2);

        var clipid = Components.interfaces.nsIClipboard;

        if (!clip) return false;

        clip.setData(trans, null, clipid.kGlobalClipboard);

        var options = $.parseJSON('{"text":"已经成功复制到剪帖板上","layout":"bottomRight","type":"success"}');

        noty(options);
    } else {
        var options = $.parseJSON('{"text":"复制到剪帖板失敗,您可以手動複製","layout":"bottomRight","type":"error"}');

        noty(options);
    }
}

//是否已经被触发提交到后台
var isTrigger = false;
//滚动条滑动到底部时触发事件
function loadData(container, pageFunc) {
    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());//浏览器的高度加上滚动条的高度     
    if ($(document).height() <= totalheight && !isTrigger) {  //当文档的高度小于或者等于总的高度的时候，开始动态加载数据
        //加载新内容        
        $(".box-content").eq(0).append('<div id="loading" class="center">Loading...<div class="center"></div></div>');
        pageFunc();
        isTrigger = true;
    } 
} 
