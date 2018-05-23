////////////////////////////////Extend

    (function ($) {

        $.fn.serializeJson = function () {
            var serializeObj = {};
            var array = this.serializeArray();
            var str = this.serialize();
            $(array).each(function () {
                if (serializeObj[this.name]) {
                    if ($.isArray(serializeObj[this.name])) {
                        serializeObj[this.name].push(this.value);
                    } else {
                        serializeObj[this.name] = [serializeObj[this.name], this.value];
                    }
                } else {
                    serializeObj[this.name] = this.value;
                }
            });
            return serializeObj;
        };
        jQuery.fn.getOuterHTML = function (s) {
            return $("<p></p>").append(this.clone(true)).html();
        };

    })(jQuery);



    Date.prototype.format = function (format) {
    if (format) { } else { format = "yyyy-MM-dd"; }
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

Date.prototype.formatDate = function (format) {
    if (format) { } else { format = "yyyy-MM-dd"; }
    var o = {
        "M+": this.getMonth(), //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

////////////////////////////////helper
function ToJson(obj) {
    return JSON.stringify(obj);
}
function ToObject(strJson) {
    return JSON.parse(strJson);
}
function GetGUID() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}
function CreateFormObj(key) {
    var formObj = {};
    var formItems = $("[" + key + "]");
    for (i = 0; i < formItems.length; i++) {
        formObj[$(formItems[i]).attr(key)] = $(formItems[i]).val();
    }
    return formObj;
}
function StrToDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
    function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
    //return new Date(Date.parse(strDate));
}
function ToDateTime(strDateTime) {
    return new Date(Date.parse(strDateTime));
}
function AddDays(curDate, step) {
    //可以加上错误处理
    var a = StrToDate(curDate);
    a = a.valueOf();
    a = a + step * 24 * 60 * 60 * 1000;
    a = new Date(a);
    //alert(a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日")
    return a;
}
function AddMonths(curDate, step) {
    var tempDate = new Date(curDate);
    tempDate.setMonth(tempDate.getMonth() + step);
    return tempDate;
}
function DateCompare(startdate, enddate) {
    var arr = startdate.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();
    var arrs = enddate.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();
    if (starttimes >= lktimes) {
        return false;
    }
    else
        return true;
}

function TimeCompare(startdate, enddate) {

    var s = startdate.split(" ");
    var s1 = s[0].split("-");
    var s2 = s[1].split(":");

    var e = enddate.split(" ");
    var e1 = e[0].split("-");
    var e2 = e[1].split(":");

    var sDate = Date.parse(new Date(s1[0], s1[1] - 1, s1[2], s2[0], s2[1], s2[2]));
    var eDate = Date.parse(new Date(e1[0], e1[1] - 1, e1[2], e2[0], e2[1], e2[2]));
    
   // var sDate = new Date(Date.parse(startdate.replace("-", "/"))).getTime();
  //  var eDate = new Date(Date.parse(enddate.replace("-", "/"))).getTime();

    if(eDate>sDate)
    {
        // 结束时间大于开始时间
        return true;        
    }
    else
    {
        // 结束时间小于等于开始时间
        return false
    }
}


function FillCtl(ctlFilterStr, ctlVal) {
    $(ctlFilterStr).each(function () {
        try {
            $(this).val(ctlVal);
            $(this).html(ctlVal);
        }
        catch (e) {
        }
    });
}
function ResultDeal(jsonResult, fnConfig) {
    var result = JSON.parse(jsonResult);
    if (result.IsDone == true) {
        if (result.Message.indexOf("Fn_") > -1) {
            if (fnConfig) {
                if (fnConfig[result.Message])
                    fnConfig[result.Message]();
                else
                    alert("未指定fn:" + result.Message)
            } else {
                eval(result.Message + "();");
            }
        }
        else {
            alert(result.Message);
        }
    }
    else {
        alert(result.Message);
    }
}
function UcsResultDeal(jsonResult, fnConfig) {
    var r = JSON.parse(jsonResult);
    if (r.IsSysError) {
        alert(r.Message); return;
    }
    if (fnConfig) {
        var fnName = r.IsSuccess ? "OnSuccess" : r.ResultCode;
        if (fnConfig[fnName]) {
            fnConfig[fnName](); return;
        }
    }
    alert(r.Message);
}
function GetSelText(selFilter) {
    if ($(selFilter)[0].options.length <= 0)
        return "";
    return $(selFilter)[0].options[$(selFilter)[0].selectedIndex].text;
}
function HasChecked(cbkName) {
    var cbks = document.getElementsByName(cbkName);
    for (var i = 0; i < cbks.length; i++) {
        if (cbks[i].checked == true)
            return true;
    }
    return false;
}
function SetRadio(rdoName, val) {
    var rdos = document.getElementsByName(rdoName);
    for (var i = 0; i < rdos.length; i++) {
        if (rdos[i].value == val) {
            rdos[i].checked = true;
            break;
        }
    }
}
function GetRadio(rdoName) {
    var rdos = document.getElementsByName(rdoName);
    for (var i = 0; i < rdos.length; i++) {
        if (rdos[i].checked == true)
            return rdos[i].value;
    }
}
function GetDayCount(pBegin, pEnd) {
    var begin = StrToDate(pBegin);
    var end = StrToDate(pEnd);
    var days = end.getTime() - begin.getTime();
    return parseInt(days / (1000 * 60 * 60 * 24));
}
//利息计算
function CalculateInterest(amount, rate, daysCount) {
    var interest = (amount * rate / 360) * daysCount;
    return ToDigits2(interest);
}
function ToDigits2(floatVal) {
    var strResult = parseFloat(floatVal).toFixed(4).toString();
    return parseFloat(strResult.substr(0, strResult.length - 2));
}
function ToDigits(floatVal, fixCount) {
    var strResult = parseFloat(floatVal).toFixed(fixCount + 2).toString();
    return parseFloat(strResult.substr(0, strResult.length - 2));
}
function ToDigitsString(floatVal, fixCount) {
    var strResult = parseFloat(floatVal).toFixed(fixCount + 2).toString();
    return strResult.substr(0, strResult.length - 2);
}
//字符串纯数字验证
function IsNumber(obj) {
    var str = $.trim($(obj).val());
    var s = /^[0-9]*$/;
    if (!s.test(str))
        $(obj).val("");
}
function SetUrlParameter(sourceUrl, key, val) {
    return $.query.load(sourceUrl).set(key, val).toString();
}
//金额格式化，如100,000.00
function MoneyShow(str) {
    var str = $.trim(str);
    var newStr = "";
    var count = 0;
    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            }
            else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + ".00";
    }
    else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            }
            else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    }
    return str;
}
function BlankGoto(url) {
    if ($.browser.safari) {
        window.open(url);
    } else {
        var alinkId = "_aLinkBlank_";
        var $aLink = $("#" + alinkId);
        if ($aLink.length < 1) {
            $('<a id="' + alinkId + '" target="_blank" style="display:none">_aLinkBlank_</a>').prependTo($(document.body));
            $aLink = $("#" + alinkId);
        }
        $aLink.attr("href", url)[0].click();
    }
}
//,替换的字符，gapnumb替换长度
function GapBy(sourceStr, gapLen, gapStr, gaptxt, gapnumb) {
    if (sourceStr == null || sourceStr == undefined)
        return "";
    var len = sourceStr.length;
    if (len <= gapLen)
        return sourceStr;
    if (gaptxt != null || gaptxt != undefined) {
        if (len <= gapnumb)
            return sourceStr;
        var newsourcestr = "";
        for (var i = 0; i < gapnumb; i++) {
            newsourcestr = newsourcestr + gaptxt;
        }
        sourceStr = newsourcestr + sourceStr.substring(gapnumb, sourceStr.length);
    }
    var result = "";
    var remainStr = sourceStr;
    while (remainStr.length > 0) {
        if (remainStr.length <= gapLen) {
            result += remainStr;
            remainStr = "";
        } else {
            result += (remainStr.substr(0, gapLen) + gapStr);
            remainStr = remainStr.substr(gapLen, remainStr.length - gapLen);
        }
    }
    return result;
}
function GotoBLink(url, title) {
    if (parent.opentab) {
        parent.opentab({ nav: url, title: title, navid: GetGUID() })
    } else {
        window.open(url);
    }
}
function UCSRoundUp(n, f) {
    n = n * Math.pow(10, f);
    n = Math.ceil(n) / Math.pow(10, f);
    return n;
}
function UCSRoundDown(floatVal, fixCount) {
    var strResult = parseFloat(floatVal).toFixed(fixCount + 2).toString();
    return parseFloat(strResult.substr(0, strResult.length - 2));
}
function DisableEvent(el) {
    el.css("visibility", "hidden");
}
function EnableEvent(el) {
    el.css("visibility", "visible");
}
function TryGetByAppend(uid, html) {
    var $obj = $("#" + uid);
    if ($obj.length < 1) {
        $(document.body).append(html);
    }
    return $("#" + uid);
}
function UcsOpenWin(url, w, h) {
    var pre = url.indexOf('?') > -1 ? '&' : '?';
    url += (pre + "v=" + GetGUID());
    var ifr = TryGetByAppend('_iframe_UcsWin_', '<iframe scrolling="no" id="_iframe_UcsWin_" frameborder="0" width="400px" height="400px" style="display: none;"></iframe>');
    ifr.attr("src", url).css("width", w).css("height", h).OpenDiv();
    return ifr;
}
function UcsCloseWin() {
    $("#_iframe_UcsWin_").CloseDiv();
}
function RMBCNStr(numberValue) {
    var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
    var chineseValue = ""; // 转换后的汉字金额
    var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
    var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
    var len = numberValue.length; // numberValue 的字符串长度
    var Ch1; // 数字的汉语读法
    var Ch2; // 数字位的汉字读法
    var nZero = 0; // 用来计算连续的零值的个数
    var String3; // 指定位置的数值
    if (len > 15) {
        alert("超出计算范围");
        return "";
    }
    if (numberValue == 0) {
        chineseValue = "零元整";
        return chineseValue;
    }
    String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
    for (var i = 0; i < len; i++) {
        String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
        if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15)) {
            if (String3 == 0) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
        }
        else { // 该位是万亿，亿，万，元位等关键位
            if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else if (String3 != 0 && nZero == 0) {
                Ch1 = String1.substr(String3, 1);
                Ch2 = String2.substr(i, 1);
                nZero = 0;
            }
            else if (String3 == 0 && nZero >= 3) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else {
                Ch1 = "";
                Ch2 = String2.substr(i, 1);
                nZero = nZero + 1;
            }
            if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
                Ch2 = String2.substr(i, 1);
            }
        }
        chineseValue = chineseValue + Ch1 + Ch2;
    }
    if (String3 == 0) { // 最后一位（分）为0时，加上“整”
        chineseValue = chineseValue + "整";
    }
    return chineseValue;
}
function IsFloatNum(c) {
    var r = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
    return r.test(c);
}
function UcsInitHideFrame(url) {
    var pre = url.indexOf('?') > -1 ? '&' : '?';
    url += (pre + "v=" + GetGUID());
    var ifr = TryGetByAppend('_iframe_UcsHid_', '<iframe scrolling="no" id="_iframe_UcsHid_" frameborder="0" width="0px" height="0px" style="display: none;"></iframe>');
    ifr.attr("src", url);
    return ifr;
}
function InitListOrderBy() {
    var targetList = $("[listorderby]");
    targetList.css("cursor", "pointer").css("background", "green");
    targetList.click(function () {
        var btn = $(this);
        var orderby = btn.attr("listorderby");
        ListOrderby(orderby);
    });
    var orderby = $.trim($.query.get("orderby"));
    var direct = $.trim($.query.get("direct"));
    if (orderby == "")
        return;
    var targetDiv = $("[listorderby=" + orderby + "]");
    if (direct == "asc") {
        targetDiv.html(targetDiv.text() + "<span style='color:red'>↑</span>");
    } else {
        targetDiv.html(targetDiv.text() + "<span style='color:red'>↓</span>");
    }
    function ListOrderby(field) {
        var orderby = $.trim($.query.get("orderby"));
        var direct = $.trim($.query.get("direct"));
        if (orderby == "") {//第一次
            direct = "asc";
        } else {
            if (orderby == field) {//第二次，相同排序
                direct = (direct == "asc" ? "desc" : "asc");
            } else {//第二次，不同排序
                direct = "asc";
            }
        }
        window.location.href = $.query.set("orderby", field).set("direct", direct).toString();
    }
}
function RegGo(goUrl) {
    var goUrl = TrySetUrlParam(goUrl, "BackUrl", window.location.href);
    window.location.href = goUrl;
}
function TrySetUrlParam(url, key, val) {
    var targetUrl = url;
    var urlQuery = $.query.load(targetUrl);
    urlQuery = urlQuery.set(key, val);
    var idx = targetUrl.indexOf('?');
    if (idx > 0) {
        targetUrl = targetUrl.substring(0, idx);
    }
    targetUrl += urlQuery.toString();
    return targetUrl;
}
function InitRTip() {
    $("input[rtip]").each(function () {
        var rTip = $(this).attr("rtip");
        if (rTip == null || rTip == '')
            return;
        if ($(this).val() == '') {
            $(this).val(rTip);
        }
        $(this).focus(function () {
            var tip = rTip;
            if (this.value == rTip)
                this.value = '';
        });
        $(this).blur(function () {
            var tip = rTip;
            if (this.value == '')
                this.value = rTip;
        });
    });
}
function CheckRTip() {
    $("input[rtip]").each(function () {
        var rTip = $(this).attr("rtip");
        if ($(this).val() == rTip) {
            $(this).val("");
        }
    });
}
function DoQuery() {
    var tempObj = {};
    $(".search [search]").each(function () {
        if ($(this).val())
            tempObj[$(this).attr("search")] = $(this).val();
    });
    var urlParamPart = $.param(tempObj);
    if (urlParamPart)
        urlParamPart = "?" + urlParamPart;
    var url = window.location.pathname + urlParamPart;
    window.location.href = url;
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
function InitSearch() {
    var params = UrlParamsToObject();
    $(".search [search]").each(function () {
        $(this).val(params[$(this).attr("search")]);
    });
    InitRTip();
}
function ValidateForm() {
    var notEmptyList = $("[notempty]");
    if (notEmptyList.length > 0) {
        for (var i = 0; i < notEmptyList.length; i++) {
            if ($(notEmptyList[i]).val() == "") {
                alert($(notEmptyList[i]).attr("notempty") + "不能为空");
                notEmptyList[i].focus();
                return false;
            }
        }
    }
    return true;
}
function CreateFormObject(formItemName) {
    var tempObj = {};
    $("[" + formItemName + "]").each(function () {
        var el = $(this);
        var vt = el.attr("valuetype");
        if (vt == "text") {
            tempObj[el.attr(formItemName)] = el.text();
        } else {
            tempObj[el.attr(formItemName)] = el.val();
        }
    });
    return tempObj;
}
function SubmitConfirm(cfg) {
    var defaultConfig = {
        Msg: "确定要执行此操作？",
        ConfirmFn: null,
        MaskArea: "body"
    };
    var cfg = $.extend(defaultConfig, cfg);
    var isSubmit = false;
    if (cfg.ConfirmFn != null) {
        isSubmit = cfg.ConfirmFn();
    } else {
        isSubmit = confirm(cfg.Msg);
    }
    if (isSubmit == false)
        return false;
    $(cfg.MaskArea).mask("正在处理...");
    return true;
}
function AppCall(cfg) {
    var defaultConfig = {
        Action: "/App/Test/Connect",
        async: true,
        Data: { Render: "1" },
        MaskArea: "body",
        MaskMsg: "正在处理...",
        FormTarget: "",
        CallBack: function (jr) {
            alert(jr.message);
        }
    };
    if (cfg.FormTarget) {
        defaultConfig.Data = $.extend(defaultConfig.Data, $(cfg.FormTarget).serializeJson());
    }
    cfg.Data = $.extend(defaultConfig.Data, cfg.Data);
    cfg = $.extend(defaultConfig, cfg);
    if (cfg.MaskArea) {
        $(cfg.MaskArea).mask(cfg.MaskMsg);
    }
    $.ajax({
        url: cfg.Action,
        type: 'post',
        async: cfg.async,
        data: cfg.Data,
        dataType: 'text',
        error: function (err) {
            alert("脚本执行异常，请刷新页面重试(ajax error)：" + err.statusText);
            if (cfg.MaskArea) {
                $(cfg.MaskArea).unmask();
            }
        },
        success: function (result) {
            try {
                var jr = ToObject(result);
                cfg.CallBack(jr);
            } catch (e) {
                alert(e.Message);
            }
            if (cfg.MaskArea) {
                $(cfg.MaskArea).unmask();
            }
        }
    });
}
function TryElseDo(tryDoFn, elseFn) {
    try {
        tryDoFn();
    } catch (e) {
        if (elseFn)
            elseFn();
    }
}
function ShowTimeCounter(config) {
    var defaultConfig = {
        isShowDay: true,
        isShowSecond: true,
        endText: null,
        endFn: null,
        targetHolder: ".clock",
        totalIntervalAttribute: "totalinterval",
        //beginTime: new Date().getTime(),
        dayUnit: "天", hourUnit: "小时", minUnit: "分"
    };
    var config = $.extend(defaultConfig, config);
    //window.PageBeginTime = window.PageBeginTime || config.beginTime;
    var now = new Date().getTime();
    var clocklist = $(config.targetHolder);
    var liveCount = 0;
    for (var i = 0; i < clocklist.length; i++) {
        var totalinterval = $(clocklist[i]).attr(config.totalIntervalAttribute);
        var remainInterval = totalinterval - 1;
        $(clocklist[i]).attr(config.totalIntervalAttribute, remainInterval);
        //var remainInterval = Math.round(totalinterval - (now - window.PageBeginTime) / 1000);
        if (remainInterval < 1) {
            if (config.endFn) {
                config.endFn();
            } else {
                if (config.endText) {
                    $(clocklist[i]).html(config.endText);
                }
            }
            continue;
        }
        liveCount++;
        var day, hour, min, sec;
        if (config.isShowDay) {
            day = remainInterval / (24 * 60 * 60)
            day = Math.floor(day); //相差的总天数
            remainInterval = remainInterval - day * 24 * 60 * 60; //抛去相差天数后的秒数
        }
        hour = (remainInterval / (60 * 60));
        hour = Math.floor(hour); //相差的小时数
        remainInterval = remainInterval - hour * 60 * 60; //抛去相差小时后的秒数
        min = remainInterval / 60;
        min = Math.floor(min); //相差的分钟数
        remainInterval = remainInterval - min * 60; //抛去相差分钟后的秒数
        sec = remainInterval;
        day = (day + "").length == 1 ? "0" + day : day;
        hour = (hour + "").length == 1 ? "0" + hour : hour;
        min = (min + "").length == 1 ? "0" + min : min;
        sec = (sec + "").length == 1 ? "0" + sec : sec;
        if (config.isShowDay == true) { day += config.dayUnit } else { day = ""; }
        if (config.isShowSecond == true) { sec += "秒" } else { sec = ""; }
        $(clocklist[i]).html(day + hour + config.hourUnit + min + config.minUnit + sec);
    }
    if (liveCount > 0) {
        setTimeout(function () { ShowTimeCounter(config); }, 1000);
    }
}
function FocusTop(dom) {
    var txtId = "_txtFocus_" + GetGUID() + "_";
    var $txt = $("#" + txtId);
    if ($txt.length < 1) {
        var d = dom || $(document.body);
        $('<div style="padding:0px;margin:0px;width:0px;height:0px;"><input id="' + txtId + '" type="text" style="width: 0px; border: 0px;" /></div>').prependTo(d);
        $txt = $("#" + txtId);
    }
    $txt[0].focus()
    setTimeout(function () { $txt[0].blur(); $txt.hide(); }, 1);
}
////////////////////////////////////pager
function CreateIntArr(min, max) {
    var arr = [];
    for (var i = min; i <= max; i++)
        arr[arr.length] = i;
    return arr;
}
function GetPagerHtml(options) {
    var pindex = options.index;
    var psize = options.size;
    var total = options.total;
    var fnName = options.fnName;
    var totalPage = 0; //总页数
    var pageSize = psize; //每页显示行数
    totalPage = parseInt((total - 1) / pageSize);
    if (psize * totalPage < total)
        totalPage += 1;
    var tempHtml = "";
    if (pindex > 1) {
        tempHtml += "<span><a href=\"javascript:" + fnName + "(" + 1 + "," + psize + ")\">首页</a></span>";
    } else {
        tempHtml += "<span>首页</span>";
    }
    if (pindex > 1) {
        tempHtml += "<span><a href=\"javascript:" + fnName + "(" + (pindex - 1) + "," + psize + ")\">上一页</a></span>"
    } else {
        tempHtml += "<span>上一页</span>";
    }
    var linkArr = [];
    if (totalPage > 2) {
        if (totalPage < 9) {
            linkArr = CreateIntArr(1, totalPage);
        } else {
            if (pindex < 6) {
                linkArr = CreateIntArr(1, 9);
            }
            else {
                var min = pindex - 4;
                var max = pindex + 4;
                var overNum = max - totalPage;
                if (overNum > 0) {
                    min = totalPage - 8;
                    max = totalPage;
                }
                linkArr = CreateIntArr(min, max);
            }
        }
    }
    if (linkArr.length > 0) {
        for (var i = 0; i < linkArr.length; i++) {
            var index = linkArr[i];
            if (index == pindex) {
                tempHtml += "<span>" + index + "</span>";
                continue;
            }
            tempHtml += "<span><a style=\"text-decoration:underline; width=\"10px\" href=\"javascript:" + fnName + "(" + index + "," + psize + ")\">" + index + "</a></span>";
        }
    }
    if (pindex < totalPage) {
        tempHtml += "<span><a href=\"javascript:" + fnName + "(" + (pindex + 1) + "," + psize + ")\">下一页</a></span>";
    } else {
        tempHtml += "<span>下一页</span>";
    }
    if (pindex < totalPage) {
        tempHtml += "<span><a href=\"javascript:" + fnName + "(" + (totalPage) + "," + psize + ")\">尾页</a></span>";
    } else {
        tempHtml += "<span>尾页</span>";
    }
    return tempHtml;
}
function GetPagerHtml2(options) {
    var pindex = options.index;
    var psize = options.size;
    var total = options.total;
    var fnName = options.fnName;
    var totalPage = 0; //总页数
    var pageSize = psize; //每页显示行数
    totalPage = parseInt((total - 1) / pageSize);
    if (psize * totalPage < total)
        totalPage += 1;
    var tempHtml = "";
    if (pindex > 1) {
        tempHtml += "<a class=\"home\" href=\"javascript:" + fnName + "(" + 1 + "," + psize + ")\">&lt;&lt;</a>";
    } else {
        tempHtml += "<span class=\"home\">&lt;&lt;</span>";
    }
    if (pindex > 1) {
        tempHtml += "<a class=\"prev\" href=\"javascript:" + fnName + "(" + (pindex - 1) + "," + psize + ")\">&lt;</a>"
    } else {
        tempHtml += "<span class=\"prev\">&lt;</span>";
    }
    var linkArr = [];
    if (totalPage > 2) {
        if (totalPage < 9) {
            linkArr = CreateIntArr(1, totalPage);
        } else {
            if (pindex < 6) {
                linkArr = CreateIntArr(1, 9);
            }
            else {
                var min = pindex - 4;
                var max = pindex + 4;
                var overNum = max - totalPage;
                if (overNum > 0) {
                    min = totalPage - 8;
                    max = totalPage;
                }
                linkArr = CreateIntArr(min, max);
            }
        }
    }
    if (linkArr.length > 0) {
        for (var i = 0; i < linkArr.length; i++) {
            var index = linkArr[i];
            if (index == pindex) {
                tempHtml += "<span class=\"num current\">" + index + "</span>";
                continue;
            }
            tempHtml += "<a class=\"num\" style=\"text-decoration:underline; width=\"10px\" href=\"javascript:" + fnName + "(" + index + "," + psize + ")\">" + index + "</a>";
        }
    }
    if (pindex < totalPage) {
        tempHtml += "<a class=\"next\" href=\"javascript:" + fnName + "(" + (pindex + 1) + "," + psize + ")\">&gt;</a>";
    } else {
        tempHtml += "<span class=\"next\" >&gt;</span>";
    }
    if (pindex < totalPage) {
        tempHtml += "<a class=\"end\" href=\"javascript:" + fnName + "(" + (totalPage) + "," + psize + ")\">&gt;&gt;</a>";
    } else {
        tempHtml += "<span class=\"end\">&gt;&gt;</span>";
    }
    return tempHtml;
}
function InitEnterEvent(enterTarget, eventFn) {
    enterTarget.keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            eventFn();
            return false;
        }
    });
}
////////////////////////////////////Fix
function FormAmount(str) {
    return MoneyShow(str);
}
//字符串纯数字验证
function IsNumber(obj) {
    var str = $.trim($(obj).val());
    var s = /^[0-9]*$/;
    if (!s.test(str))
        $(obj).val("");
}
////////////////////////////////init
//列表行操作样式
$(function () {
    $(".tableBD tr").click(function () {
        $(".tableBD tr").removeClass("clickTR");
        $(".tableBD tr").css("background", "none");
        $(this).css("background", "#D6D6D8");
        $(this).addClass("clickTR");
    }).mouseover(function () {
        if (!$(this).hasClass("clickTR")) {
            $(this).css("background", "#EEE");
        }
    }).mouseout(function () {
        if (!$(this).hasClass("clickTR")) {
            $(this).css("background", "none");
        }
    })
});
//搜索框回车默认为执行查询按钮
$(function () {
    $(".search input").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            $(".searchBtn").click();
            return false;
        }
    });
});

function niceScrollMoveTop(obj) {
    //最后一页，当数量小于(页数-2)条时，滚动至顶部
    try {
        debugger;
        if (obj.PageIndex == Math.ceil(obj.TotalCount / obj.PageSize)
            && obj.TotalCount - (obj.PageIndex - 1) * obj.PageSize <= obj.PageSize - 3) {

            //            var $easyscroll = $("#easyscroll");
            //            var viewHeight = $(window).height();
            //            if ($easyscroll.length > 0) {
            //                $easyscroll.height(viewHeight).niceScroll("#scroll", { cursorcolor: "#415091" });

            //                $("#easyscroll").getNiceScroll(0).doScrollTop(0, 1000);
            //            }
            $("#easyscroll").getNiceScroll(0).doScrollTop(0, 1000);
        } else {
            $("#easyscroll").getNiceScroll(0).doScrollTop(100, 10000);
        }
    } catch (e) {
    }
}