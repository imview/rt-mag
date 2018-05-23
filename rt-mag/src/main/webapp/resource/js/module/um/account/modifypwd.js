$(document).ready(function () {

    //修改密码功能
    $("#btnModifyPwd").live("click", function () {
        if ($.trim($("#NewPwd").val()) != $("#EndNewPwd").val()) {
            return alert("两次输入新密码不一致");
        }
        if (submitClick($(".help-inline").length) == false || $(".help-inline").length != 0) {
            return alert("输入信息有误,请仔细检查");
        };
        var token = $("#ModifyLoginPwdToken").val();
        var oldPassWord = new Base64().encode(hex_md5($("#origPwd").val()) + token);
        var newPassWord = new Base64().encode(hex_md5($("#NewPwd").val()) + token);
        $.ajax({
            type: "post",
            url: umGlobal.basePath+"/account/modifyPwd",
            data: "ra=" + RandomNumber() + "&userName=" + $("#userName").val() + "&oldPassword=" + oldPassWord + "&newPassword=" + newPassWord+"&token="+token,
            success: function (msg) {
                if (msg.isSuccess) {
                    alert("修改密码成功，请重新登录");
                    window.parent.location = umGlobal.basePath+"/login/index";
                } else {
                    $('#ModifyLoginPwdToken').val(msg.dicData.securityToken);
                    var options = $.parseJSON('{"text":"' + msg.message + '","layout":"center","type":"error"}');
                    return noty(options);
                }
            }
        })
    })
});
