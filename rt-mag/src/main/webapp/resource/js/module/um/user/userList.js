/* File Created: 二月 6, 2015 */
$(document).ready(function () {
    pageReady();

    $('#divlist').getUcspager().setConfig({
        params: $($("#searchForm")[0]).serialize() //+"&IsOpen=true"
    });
    $('#divlist').getUcspager().moveFirst();
});

function pageReady() {


    $("#divLoginName").ucsfield("ucsfield.text", {
        id: "tbLoginName",
        name:"conditions.loginName",
        labelText: "后台帐号"
    });

    $("#divUserName").ucsfield("ucsfield.text", {
        id: "tbUserName",
        name:"conditions.userName",
        labelText: "用户名称"
    });


    $("#divMobile").ucsfield("ucsfield.text", {
        id: "tbMobile",
        name:"conditions.mobile",
        labelText: "手机号码"
    });

    $("#divEmail").ucsfield("ucsfield.text", {
        id: "tbEmail",
        name:"conditions.email",
        labelText: "邮箱地址"
    });

    $('#divlist').ucspager({
        params: $($("#searchForm")[0]).serialize(),
        url: "userListPage",
        id: "divlist",
        callback: initShowView
    });

    $("#divRoleId").ucsfield("ucsfield.combobox", {
        id: "cbRoleId",
        name:"conditions.roleId",
        labelText: "角色属性",
        url:"getRoles",
    });

    $("#divStatus").ucsfield("ucsfield.combobox", {
        id: "cbStatus",
        labelText: "是否禁用",
        name:"conditions.status",
        data:[{'text':"启用",'value':0},{'text':"禁用",'value':1}],
        ignoreValue:"-1",
        value:0,

    });

    //注册弹出窗体控件
    $('#myModal').ucswindow({
        title: "",
        url: "editUser",
        async: true,
        size: "default",
        data: "",
        buttons: [
            { id: "btnSave", text: "保存", isHighlight: true, handler: function () { saveUserInfo(); }, icon: "" },
            { id: "btnCancel", text: "取消", handler: function () { colseUcswindow('myModal') } }
        ]
    });

    //注册弹出窗体控件
    $("#myEditRoleModal").ucswindow({
        title: "",
        url: "modifyUserRole",
        async: true,
        size: "default",
        data: "",
        buttons: [
            { id: "btnRoleSave", text: "保存", isHighlight: true, handler: function () { saveUserOwnRole(); }, icon: "" },
            { id: "btnRoleCancel", text: "取消", handler: function () { colseUcswindow("myEditRoleModal") } }
        ]
    });

    //注册弹出窗体控件
    $("#myModuleModal").ucswindow({
        title: "",
        url: "configurationByUser",
        async: true,
        size: "default",
        data: "",
        buttons: [{ id: "btnModuleCancel", text: "取消", handler: function () { colseUcswindow("myModuleModal") } }]
    });

    //条件查询
    $("#btnQuery").ucsbutton({
        icon: "search",
        handler: function () {
            $('#divlist').getUcspager().setConfig({
                params:  $($("#searchForm")[0]).serialize()
            });
            $('#divlist').getUcspager().moveFirst();
        },
        text: "查询",
        size: "small",
        isHighlight: true
    });

    //重置
    $("#btnReset").ucsbutton({
        icon: "reset",
        handler: function () {
            $("#searchForm")[0].reset();
        },
        text: "重置",
        size: "small",
        isHighlight: false,
        hidden: false
    });

    //新增
    $("#btnAddM").ucsbutton({
        icon: "edit",
        text: "新增",
        size: "small",
        isHighlight: false,
        rightskey:'user_add',
        handler: function () {
            $('#myModal').getUcswindow().setConfig({
                title: "新增用户",
                url: "editUser",
                async: true,
                size: "default",
                data: "id=&ra=" + RandomNumber() + "&ActionType=Add"
            });
            $('#btnSave').show();
            $('#myModal').getUcswindow().show();
        }
    });

    //删除用户
    $("#btnDelM").ucsbutton({
        icon: "delete",
        text: "删除",
        size: "small",
        isHighlight: false,
        handler: DelClick,
         rightskey:"user_delete"
    });



    // //禁用启用
    // $("a[id^='IsShow_']").live("click", function (e) {
    //     $.ajax({
    //         url: "modifyIsEnable",
    //         data: "ra=" + RandomNumber() + "&userId=" + $(this).attr('value') + "&status=" + $(this).attr('isShow'),
    //         success: function (msg) {
    //             $.ucsalert(msg.message);
    //             pageRefresh();
    //         }
    //     });
    // });

}

//显示操作按钮
function initShowView() {
    //checkbox样式
    $("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();

    //重置密码
    $("a[id^='Reset_']").ucsbutton({
        icon: "",
        text: "重置密码",
        rightskey:'user_reset',
        isHighlight: true,
        handler: ResetPwd
    });

    //修改用户
    $("a[id^='Modify_']").ucsbutton({
        icon: "edit",
        text: "修改",
        isHighlight: true,
        rightskey:'user_modifyuser',
        handler: function () {
            var value = $(this).attr('value');
            $('#myModal').getUcswindow().setConfig({
                title: "修改用户【" + $(this).attr('names') + "】信息",
                url: 'editUser',
                data: "ra=" + RandomNumber() + "&id=" + value,
                size: "default"
            });
            $('#myModal').getUcswindow().show();
        }
    });

    //配置角色
    $("a[id^='Edit_Role_']").ucsbutton({
        icon: "edit",
        text: "配置角色",
        rightskey:'user_roleconfig',
        isHighlight: true,
        handler: function () {
            var userId = $(this).attr('value');
            $('#myEditRoleModal').getUcswindow().setConfig({
                title: "配置用户【" + $(this).attr('names') + "】角色",
                url: "modifyUserRole",
                data: "ra=" + RandomNumber() + "&userId=" + userId,
                size: "default"
            });
            $('#myEditRoleModal').getUcswindow().show();
        }
    });

    //查看权限
    $("a[id^='Module_']").ucsbutton({
        icon: "edit",
        text: "查看权限",
        rightskey:'user_viewauthconfig',
        isHighlight: true,
        handler: function () {
            var userId = $(this).attr('value');
            $('#myModuleModal').getUcswindow().setConfig({
                title: "查看用户【" + $(this).attr('names') + "】权限",
                url: "configurationByUser",
                data: "ra=" + RandomNumber() + "&pUserId=" + userId,
                size: "default"
            });
            $('#myModuleModal').getUcswindow().show();
        }
    });

    $("a[id^='ResetLock_']").ucsbutton({
        icon: "ok",
        text: "解锁",
        rightskey:'user_unlock',
        isHighlight: true,
        handler: function()
        {
            $.ajax({
                url: "resetLock",
                data: "ra=" + RandomNumber() + "&userId=" + $(this).attr('value'),
                success: function (msg) {
                    $.ucsalert(msg.message);
                    pageRefresh();
                }
            });
        }
    });

    $("a[id^='IsEnabled_']").each(function(index,e){
        $(e).ucsbutton({
            icon: "ok",
            text: $(this).text(),
            rightskey: 'user_enable',
            isHighlight: true,
            handler: function () {
                $.ajax({
                    url: "modifyIsEnable",
                    data: "ra=" + RandomNumber() + "&userId=" + $(this).attr('value') + "&status=" + $(this).attr('upStatus'),
                    success: function (msg) {
                        $.ucsalert(msg.message);
                        pageRefresh();
                    }
                });
            }
        })
    });

}

//保存
function saveUserInfo() {
    if (submitClick($(".help-inline").lenght) == false) {
        return false;
    }
    var model = $("#editForm").serializeObject();
    if (model.roleIDs == null ||model.roleIDs ==""){
        alert("请选择角色属性");
        return false;
    }
    //var oldModel = JSON.parse($("#userModel").val());
    //model = $.extend(oldModel, model);
    // var url = "";
    //
    // if (model.userId == "" || model.userId == null)
    // { url = "addUserInfo"; }
    // else
    // { url = "updateUserInfo"; }

    $("#btnSave").getUcsbutton().unbind('click');
    $("#btnSave").getUcsbutton().setText('保存中...');

    $.ajax({
        url: "editUserInfo",
        type: 'post',
        data: JSON.stringify(model),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result.isSuccess) {
                $('#divlist').getUcspager().setConfig({
                    params: "&" + $($("#searchForm")[0]).serialize()
                });
                $("#btnSave").getUcsbutton().unbind('click');
                $("#btnSave").getUcsbutton().bind('click', saveUserInfo);
                $("#btnSave").getUcsbutton().setText('保存');
                $('#myModal').getUcswindow().close();
                $.ucsalert(
                    result.message,
                    0,
                    function () { //callback
                        pageRefresh();
                    },
                    function () { //complete
                        pageRefresh();
                    }
                )
            } else {
                $.ucsalert(result.message);
                $("#btnSave").getUcsbutton().unbind('click');
                $("#btnSave").getUcsbutton().bind('click', saveUserInfo);
                $("#btnSave").getUcsbutton().setText('保存');
                //pageRefresh();
            }
        },
        error: function (result) {
            $.ucsalert(result.message);
            $("#btnSave").getUcsbutton().unbind('click');
            $("#btnSave").getUcsbutton().bind('click', saveUserInfo);
            $("#btnSave").getUcsbutton().setText('保存');
            $('#myModal').getUcswindow().close();
            //  pageRefresh();
        }
    });
}

//保存用户拥有的角色
function saveUserOwnRole() {
    var userId = $("#mUserID").val();
    var ownRoles = $(".userIsOwnRole:checked");
    if(ownRoles.length==0) {
        alert("配置角色不能为空");
        return;
    }
    var ownRoleIds = "";
    $.each(ownRoles, function (i, value) {
        ownRoleIds += ("," + value.value);
    });
    var model={}
    model.pUserId = userId;
    model.pRoleIds = ownRoleIds;
    $.ucsajax({
        maskArea: "#myEditRoleModal",
        maskMsg: "请稍后...",
        befText: "保存",
        url: "saveUserRole",
        data: JSON.stringify(model), //可选选项，默认为空
        success: function () {//可选选项，默认弹出提示信息
            $("#myEditRoleModal").getUcswindow().close();
            $('#divlist').getUcspager().refresh();
        },
        fail: function (msg) {//可选选项，默认弹出提示信息
            $.ucsalert(msg);
        },
        error: function (msg) {//可选选项，默认弹出提示信息
            $.ucsalert("提交异常:" + msg);
        }

    });
}

//重置密码
function ResetPwd() {
    $.ajax({
        url: "resetPassword",
        data: "ra=" + RandomNumber() + "&userID=" + $(this).attr('value'),
        success: function (msg) {
            $.ucsalert(msg.message);
            pageRefresh();
        }
    });
}

//删除
function DelClick() {
    var ids = "";
    for (var i = 0; i < $("input:checkbox:checked").length; i++) {
        if (ids.length>0) {
            ids += ",";
        }
        ids = ids + $("input:checkbox:checked")[i].value;
    }
    if ($("input:checkbox:checked").length == 0) {
        return alert("请先勾选需要删除的角色");
    }
    if (confirm("是否确定删除用户？")) {
        $.ajax({
            type: "post",
            url: "deleteUser",
            data: "ids=" + ids,
            success: function (result) {
                if (result.isSuccess) {
                    $.ucsalert(result.message);
                    $('#divlist').getUcspager().setConfig({
                        params: "&" + $($("#searchForm")[0]).serialize()
                    });
                    $('#divlist').getUcspager().refresh();
                }else {
                    $.ucsalert(result.message);
                }
            }
        });
    }
}



//刷新列表
function pageRefresh() {

    $('#divlist').getUcspager().setConfig({
        params: "&" + $($("#searchForm")[0]).serialize()
    });
    $('#divlist').getUcspager().refresh();
}