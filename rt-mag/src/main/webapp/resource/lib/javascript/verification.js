/* -----------------------------------
*该JS用来验证表单且基于jquery 
*向表单中添加默认灰色文字   <input type='text' class = 'IsError' ShowValue = '文字' MsgName='表单名'>
*验证是否能为空 <input type='text' class = 'IsError IsRequired' MsgName='表单名'>  验证表单为空时可以添加一个匿名属性 DefaultValue 是为了在特殊情况的判断空
*验证表单最大长度<input type='text' class = 'IsError IsMaxLength' MaxLength = '20' MsgName='表单名'>
*验证表单最小长度<input type='text' class = 'IsError IsMinLength' MinLength = '20' MsgName='表单名'>
*验证数字       <input type='text' class = 'IsError IsNumber' MsgName='表单名'>
*验证最大数     <input type='text' class = 'IsError IsMaxNumber' MaxNumber ='2000' MsgName='表单名'>
*验证最小数     <input type='text' class = 'IsError IsMinNumber' MinNumber= '0' MsgName='表单名'>
*验证浮点数     <input type='text' class = 'IsError IsFloat' MsgName='表单名'>
*验证最大浮点数 <input type='text' class = 'IsError IsMaxFloat' MaxFloat ='9999.99' MsgName='表单名'>
*验证最小浮点数 <input type='text' class = 'IsError IsMinFloat' MinFloat= '10.12' MsgName='表单名'>
*验证手机号       <input type='text' class = 'IsError IsMobile' MsgName='表单名'>
*验证邮箱       <input type='text' class = 'IsError IsMail' MsgName='表单名'>
*验证字符       <input type='text' class = 'IsError IsChar' MsgName='表单名'>
*验证汉字       <input type='text' class = 'IsError IsChinese' MsgName='表单名'>
*验证座机 传真  <input type='text' class = 'IsError IsTelephone' MsgName='表单名'>
*验证网址       <input type='text' class = 'IsError IsUrl' MsgName='表单名'>
*验证特定规则文本<input type='text' class = 'IsError IsText' MsgName='表单名'>
*提交表单前只需判断$(".help-inline").lenght==0 即表单验证通过
* -------------------------------------
*/

var timeout = 120;

var errorImg;

var DefaultBorderColor = "#cacaca";


$(function () {
    errorImg = FormatBaseUrl("/resource/lib/css/imgs/cancel-on.png");

    //初始化验证框中的初始值
    $(".IsError").each(function () {
        if ($(this).attr("ShowValue") != undefined && $(this).attr("ShowValue") != "" && $(this).val() == "") {
            $(this).val($(this).attr("ShowValue")).css({ "color": "#ccc" });
        }
        $(this).wrap("<div style = 'display:inline'></div>");
    });

    $(".IsError").live("blur",function () {
        if ($(this).attr("ShowValue") != undefined && $(this).attr("ShowValue") != "" && $(this).val() == "") {
            $(this).val($(this).attr("ShowValue")).css("color", "#ccc");
        }
        var textBox = $(this);

        if (timeout > 0) {
            setTimeout(function () {
                verification(textBox);
            }, timeout);
        } else {
            verification(textBox);
        }


    }).live("focus",function () {
        //得到焦点后并框中的值和初始值相同就制空
        if ($(this).attr("ShowValue") != undefined && $(this).attr("ShowValue") != "" && $(this).val() == $(this).attr("ShowValue")) {
            $(this).val("").css("color", "black");
        }

        if ($(this).attr("type") == "text" || $(this).attr("type") == "password" || $(this).attr("type") == "file" || $(this).get(0).tagName == "TEXTAREA" || $(this).get(0).tagName == "SELECT") {
            $(this).next(".help-inline").remove();
            $(this).css({ "background-color": "#ffffff", "border-color":($(this).attr("DefaultBorderColor") == undefined || $(this).attr("DefaultBorderColor") == "")?DefaultBorderColor:$(this).attr("DefaultBorderColor")});
            // $(this).closest("div .control-group").removeClass("error");
        }
    });
});

function verification(textBox) {
    if (textBox.attr("type") == "text" || textBox.attr("type") == "password" || textBox.attr("type") == "file" || textBox.get(0).tagName == "TEXTAREA" || textBox.get(0).tagName == "SELECT") {
        textBox.next(".help-inline").remove();
        $(this).css({ "background-color": "#ffffff", "border-color": ($(this).attr("DefaultBorderColor") == undefined || $(this).attr("DefaultBorderColor") == "") ? DefaultBorderColor : $(this).attr("DefaultBorderColor") });

        //验证空字符串
        if (textBox.hasClass("IsRequired") && ($.trim(textBox.val()) == "" || textBox.val() == undefined || textBox.val() == textBox.attr("ShowValue") || textBox.val() == textBox.attr("DefaultValue"))) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });

            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px; text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "不能为空' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证最大长度
        if (textBox.hasClass("IsMaxLength") && $.trim(textBox.val()).length > 0 && getStrLen($.trim(textBox.val())) > parseInt(textBox.attr("MaxLength"))) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px ;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "的长度不能大于" + textBox.attr("MaxLength") + "字节' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证最小长度
        if (textBox.hasClass("IsMinLength") && $.trim(textBox.val()).length > 0 && getStrLen($.trim(textBox.val())) < parseInt(textBox.attr("MinLength"))) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "的长度不能小于" + textBox.attr("MinLength") + "字节' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证数字
        if (textBox.hasClass("IsNumber") && $.trim(textBox.val()).length > 0 && !/^(-)?[0-9]*$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "必须为整数' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证最大数
        if (textBox.hasClass("IsMaxNumber") && parseInt(textBox.val()) > parseInt(textBox.attr("MaxNumber"))) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "不能大于" + textBox.attr("MaxNumber") + "' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证最小数
        if (textBox.hasClass("IsMinNumber") && parseInt(textBox.val()) < parseInt(textBox.attr("MinNumber"))) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "不能小于" + textBox.attr("MinNumber") + "' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证浮点数
        if (textBox.hasClass("IsFloat") && $.trim(textBox.val()).length > 0 && !/^-?([1-9]\d*\.?\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "必须为数字' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证最大浮点数
        if (textBox.hasClass("IsMaxFloat") && parseFloat(textBox.val()) > parseFloat(textBox.attr("MaxFloat"))) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "不能大于" + textBox.attr("MaxFloat") + "' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证最小浮点数
        if (textBox.hasClass("IsMinFloat") && parseFloat(textBox.val()) < parseFloat(textBox.attr("MinFloat"))) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "不能小于" + textBox.attr("MinFloat") + "' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile)
        //验证手机号
        if (textBox.hasClass("IsMobile") && $.trim(textBox.val()).length > 0 && $.trim(textBox.val()) != "" && !/^1[3|4|5|8][0-9]\d{4,8}$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='手机号码格式不正确' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证邮箱
        if (textBox.hasClass("IsMail") && $.trim(textBox.val()).length > 0 && $.trim(textBox.val()) != "" && !/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='邮件格式不正确，如：lisi@gtadate.com' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证字符
        if (textBox.hasClass("IsChar") && $.trim(textBox.val()).length > 0 && !/^[a-z\_\-A-Z]*$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='请输入a-z或A-Z之间的字母' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证汉字
        if (textBox.hasClass("IsChinese") && $.trim(textBox.val()).length > 0 && !/^[\u4e00-\u9fff]*$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='请输入汉字' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证网址
        if (textBox.hasClass("IsUrl") && $.trim(textBox.val()).length > 0 && !/^(http(s)?:\/\/)(\w+\.){2,3}\w+$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='网址格式不正确，如：http://www.ucsmy.net 或 https://www.wefax.cn' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证特定的文本规则   中英文、数字及“_”\"、-()（）
        if (textBox.hasClass("IsText") && $.trim(textBox.val()).length > 0 && !/^[a-zA-Z0-9\u4e00-\u9fff_\-“”""''（）()、]*$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title =输入格式不正确,可由中英文、数字及'\"”“、-()（）组成 src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证特定的文本规则   中英文、数字及“_”\"、-()（）
        if (textBox.hasClass("IsName") && $.trim(textBox.val()).length > 0 && !/^[a-zA-Z\u4e00-\u9fff ]*$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title =输入格式不正确,可由中文、英文及空格组成 src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证特定的文本规则   中英文、数字及“_”\"、-()（）
        if (textBox.hasClass("IsPwd") && $.trim(textBox.val()).length > 0 && !/^[a-zA-Z0-9_]{6,20}$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "输入格式不正确,可由6到20位英文、数字及下划线组成' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证是否中英文、数字及下划线
        if (textBox.hasClass("IsRegularText") && $.trim(textBox.val()).length > 0 && !/^[a-zA-Z0-9_]*$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='输入格式不正确，可由英文、数字及下划线_组成' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证是不包含特殊字符
        if (textBox.hasClass("IsSpecialText") && $.trim(textBox.val()).length > 0 && !/^[^\/'']*$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title =输入格式不正确，不允许输入特殊字符\'/  src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证传真、座机
        if (textBox.hasClass("IsTelephone") && $.trim(textBox.val()).length > 0 && !/^[0-9-()]{8,20}$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='输入格式不正确,可由8-20位的数字及()-组成' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证邮政编码
        if (textBox.hasClass("IsPostCode") && $.trim(textBox.val()).length > 0 && !/^[0-9]{6}$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='邮政编码格式不正确，可由6位数字组成' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证身份证
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        if (textBox.hasClass("IsIdentityId") && $jQ.trim(textBox.val()).length > 0 && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;width:50%;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='身份证号码不正确，可由15位数字或17位数字加校验位，校验位可为数字或字符X' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证IP
        if (textBox.hasClass("IsIP") && $.trim(textBox.val()).length > 0 && !/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='IP地址格式不正确，如192.168.100.5' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证正则表达式
        if (textBox.hasClass("IsReg") && $.trim(textBox.val()).length > 0 && !new RegExp("^" + textBox.attr("Reg") + "$").test(textBox.val())) {
            textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
            textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgReg") + "' src = '" + errorImg + "'/></span>");
            textBox.closest("div").css("position", "relative");
            return;
        }

        //验证多个文本框的内容是否相等
        if (textBox.hasClass("IsTextCompare")) {
            var msgs = $(".IsTextCompare");
            var msg1 = msgs[0];
            if ($(msg1).val() != textBox.val() && $(msg1).attr("id") != textBox.attr("id")) {
                textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
                textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + $(msg1).outerHeight(true) + "px;text-align: initial'>" +
                    "<img style ='position: relative; top: 2px; left: 3px' title ='" + textBox.attr("MsgName") + "填写不一致，请重新输入' src = '" + errorImg + "'/></span>");
                textBox.closest("div").css("position", "relative");
                return;
            }
        }

        //判断上传文件的格式  列:filetype ="jpg/png/gif"
        if (textBox.attr("type") == "file" && textBox.attr("FileType") != undefined && textBox.attr("FileType") != "") {
            var fileType = textBox.val().substr(textBox.val().lastIndexOf('.') + 1);
            if (textBox.attr("FileType").indexOf(fileType.toLowerCase()) == -1) {
                textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });
                textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px;text-align: initial'>" +
                    "<img style ='position: relative; top: 2px; left: 3px' title ='文件格式不正确，请选择格式为" + textBox.attr("FileType") + "的文件' src = '" + errorImg + "'/></span>");
                textBox.closest("div").css("position", "relative");
            }
        }

        if (textBox.attr("IsAsync") != "" && textBox.attr('IsAsync') != "undefined")
        {
            var funName = textBox.attr("IsAsync");
            var errorMsg = textBox.attr("ErrorMsg");
            if (typeof(funName) == "undefined") {
                return;
            }
            var reqResult = eval(funName + '()');
            if (reqResult == false) {
                textBox.css({ "background-color": "#fff2f2", "border-color": "#ff8080" });

                textBox.after("<span class='help-inline' style = 'position:absolute; z-index:101;line-height:" + textBox.outerHeight(true) + "px; text-align: initial'>" +
                    "<img style ='position: relative; top: 2px; left: 3px' title ='" + errorMsg + "' src = '" + errorImg + "'/></span>");
                textBox.closest("div").css("position", "relative");
                return;
            };
        }
    }
}



//获取字符串长度
function getStrLen(strSrc) {
    return strSrc.replace(/[^\x00-\xff]/g, 'xx').length;
}

function submitClick(content) {
    timeout = 0;
    if (content == "" || content == undefined) {
        $(".IsError").blur();
        if ($(".help-inline").length > 0) {
            timeout = 120;
            return false;
        }

    } else {
        $(".IsError", "#" + content).blur();
        if ($(".help-inline", "#" + content).length > 0) {
            timeout = 120;
            return false;
        }
    }
    return true;
}

function getRootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    // webSite里有虚拟目录，WebApplication里没虚拟目录
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath + postPath);
    //return prePath;
}

function FormatBaseUrl(Url) {
    //var basePath = getRootPath();
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var basePath = strFullPath.substring(0, pos);
    var baseUrl = basePath + Url;
    return baseUrl;
}