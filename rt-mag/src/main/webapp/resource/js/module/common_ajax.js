//<summary> ajax 绑定 obj 传输 </summary>
//<para>
//  url : ajax 连接的 action
//  obj : object
//  successfun : 成功函数
//  errorfun : 失败函数
//</para>
function bindAjax(url, obj, successfun, errorfun) {
    var jsonSerialized = JSON.stringify(obj);
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: jsonSerialized,
        contentType: 'application/json; charset=utf-8',
        success: successfun,
        error: errorfun
    });
}

//<summary> ajax 绑定 data 传输 </summary>
//<para>
//  url : ajax 连接的 action
//  data : data  ==>  格式: { loginaccount: $('#spUser').html() };
//  successfun : 成功函数
//  errorfun : 失败函数
//</para>
function bindAjaxWithData(url, senddata, successfun, errorfun) {
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'text',
        data: senddata,
        //contentType: 'application/json',
        success: successfun,
        error: errorfun
    });
}

//<summary> ajax 绑定 data 传输 </summary>
//<para>
//  url : ajax 连接的 action
//  data : data
//  successfun : 成功函数
//  errorfun : 失败函数
//</para>
function bindAjaxUpload(url, obj, successfun, errorfun) {
    var jsonSerialized = JSON.stringify(obj);
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: jsonSerialized,
        cache: false,
        timeout: 1200000,
        async: false,
        //contentType: 'application/json; charset=utf-8',
        success: successfun,
        error: errorfun
    });
}

//form 表单对象转成object
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
//<summary> ajax 绑定 obj 传输 </summary>
//<para>
//  url : ajax 连接的 action
//  obj : json 
// autoShow: func 自定义方法提示 null不提示
//</para>
function bindPost(url, obj,autoShow) {
    if (null == autoShow) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data:obj,
            contentType: 'application/json; charset=utf-8',
            success: function (jsonResult) {
                if (jsonResult.IsSuccess) {
                    alert(jsonResult.Message);
                } else {
                    alert("失败了！");
                }
            }
        });
    } else {
        $.ajax({
            url: url,
            type:'post',
            dataType: 'json',
            data: obj,
            contentType: 'application/json; charset=utf-8',
            success: autoShow
        });
    }
}





