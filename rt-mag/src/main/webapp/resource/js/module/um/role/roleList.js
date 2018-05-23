
$(document).ready(function () {
    pageReady();
    
    $('#divlist').getUcspager().setConfig({
        params: $($("#searchForm")[0]).serialize() //+"&IsOpen=true"
    });
    $('#divlist').getUcspager().moveFirst();
});

function pageReady() {

    $("#divName").ucsfield("ucsfield.text", {
        id: "txtName",
        name:"conditions.name",
        labelText: "角色名称"
    });

    $('#divlist').ucspager({
    	params: $($("#searchForm")[0]).serialize(), //+"&IsOpen=true",
        url: "roleListPage",
        id: "divlist",
        callback: initShowView
    });

    //条件查询
    $("#btnQuery").ucsbutton({
        icon: "search",
        handler: function () {
        	debugger
            $("#divlist").getUcspager().setConfig({
                params: "&" + $($("#searchForm")[0]).serialize()//  +"&IsOpen=true"
            });
            $("#divlist").getUcspager().moveFirst();
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

    //注册弹出窗体控件
    $('#myModal').ucswindow({
        title: "",
        url: "editRole",
        async: true,
        size: "default",
        data: "",
        buttons: [
            { id: "btnSave", text: "保存", isHighlight: true, handler: function () { saveRoleInfo(); }, icon: "" },
            { id: "btnCancel", text: "取消", handler: function () { colseUcswindow('myModal') } }
        ]
    });

    //注册弹出窗体控件
    $('#mySetRightModal').ucswindow({
        title: "",
        url: "configuration",
        async: true,
        size: "default",
        data: "",
        buttons: [
            { id: "btnSetRightSave", text: "保存", isHighlight: true, handler: function () { saveSetRightInfo(); }, icon: "" },
            { id: "btnSetRightCancel", text: "取消", handler: function () { colseUcswindow('mySetRightModal') } }
        ]
    });

    //新增模块
    $("#btnAddM").ucsbutton({
        icon: "edit",
        text: "新增",
        size: "small",
        rightskey:'role_addrole',
        isHighlight: false,
        handler: function () {
            $('#myModal').getUcswindow().setConfig({
                title: "新增角色",
                url: "editRole",
                async: true,
                size: "default",
                data: "ra=" + RandomNumber() + "&ActionType=Add"
            });
            $('#myModal').getUcswindow().show();
        }
    });

    //删除角色
    $("#btnDelM").ucsbutton({
        icon: "delete",
        text: "删除",
        size: "small",
        isHighlight: false,
        handler: DelClick,
        rightskey:"role_deleteRole"
    });
}

function initShowView() {
    //checkbox样式
    $("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();

    //修改名称
    $("a[id^='Update_']").ucsbutton({
        icon: "edit",
        text: "修改",
        size: "small",
        rightskey:'role_modifyrole',
        isHighlight: true,
        handler: function () {
            var value = $(this).attr('value');
            $('#myModal').getUcswindow().setConfig({
                title: "修改角色",
                url: "editRole",
                async: true,
                size: "default",
                data: "ra=" + RandomNumber() + "&id=" + value
            });
            $('#btnSave').show();
            $('#myModal').getUcswindow().show();
        }
    });

    //配置权限
    $("a[id^='config_']").ucsbutton({
        icon: "",
        text: "配置权限",
        size: "small",
        rightskey:'role_authconfig',
        isHighlight: true,
        handler: function () {
            var value = $(this).attr('value');
            $('#mySetRightModal').getUcswindow().setConfig({
                title: "" + $(this).attr('names') + "->配置权限",
                url: "configuration",
                async: true,
                size: "default",
                data: "ra=" + RandomNumber() + "&id=" + value,
                height: "400px",
                callback: initialWindownHeight
            });
            $('#mySetRightModal').getUcswindow().show();
        }
    });
}

//保存
function saveRoleInfo() {

    if (submitClick($(".help-inline").lenght) == false) {
        return false;
    }

    var role = new Object();
    role.name = $("#roleName").val();
    role.id = $("#hRoleID").val();
    role.remark = $("#txtRemark").val();

    var url = "editRoleInfo";
    // if (role.id == "")
    //     url = "addRoleObj";
    // else
    //     url = "updateRoleObj";
    $("#btnSave").getUcsbutton().unbind('click');
    $("#btnSave").getUcsbutton().setText('保存中...');
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(role),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result.isSuccess) {
                $.ucsalert(result.message);
                $('#divlist').getUcspager().refresh();
                $("#btnSave").getUcsbutton().bind('click', saveRoleInfo);
                $("#btnSave").getUcsbutton().setText('保存');
                $('#myModal').getUcswindow().close();

            } else {
                $.ucsalert(result.message);
                $("#btnSave").getUcsbutton().bind('click', saveRoleInfo);
                $("#btnSave").getUcsbutton().setText('保存');

            }
        },
        error: function (msg) {
            $.ucsalert(msg.message);
            $("#btnSave").getUcsbutton().bind('click', saveRoleInfo);
            $("#btnSave").getUcsbutton().setText('保存');
        }
    });
}

//配置权限
function saveSetRightInfo() {
    if (submitClick($(".help-inline").lenght) == false) {
        return false;
    }
    if ($("#vmodulID").val() == "") {
    	$.ucsalert("本次配置没有进行新的勾选,保存无效");
        return false;//$.ucsalert("本次配置没有进行新的勾选,保存无效");
    }
    var role = new Object();
    role.roleId = $("#CRoleID").val();
    role.vmodulID = $("#vmodulID").val(); ;
    $("#btnSetRightSave").getUcsbutton().unbind('click');
    $("#btnSetRightSave").getUcsbutton().setText('保存中...');

    $.ajax({
        url: 'saveConfiguration',
        type: 'post',
        data: JSON.stringify(role),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (msg) {
            if (msg.isSuccess) {
            	$.ucsalert(msg.message);
            	//alert(msg.message);
                $('#divlist').getUcspager().refresh();
                $("#btnSetRightSave").getUcsbutton().bind('click', saveSetRightInfo);
                $("#btnSetRightSave").getUcsbutton().setText('确定');
                $('#mySetRightModal').getUcswindow().close();

            } else {
                $.ucsalert(msg.message);
                $("#btnSetRightSave").getUcsbutton().bind('click', saveSetRightInfo);
                $("#btnSetRightSave").getUcsbutton().setText('确定');

            }
        },
        error: function (msg) {
            $.ucsalert(msg.message);
            $("#btnSetRightSave").getUcsbutton().bind('click', saveSetRightInfo);
            $("#btnSetRightSave").getUcsbutton().setText('确定');
        }
    });
}

//设置窗体高度
function initialWindownHeight() {
    $("#mySetRightModal .modal-body").css("height", "400px");
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
    if (confirm("是否确定删除角色？")) {
        $.ajax({
            type: "post",
            url: "deleteRole",
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


//function checkRoleName() {
//    var flag = true;
//    $.ajax({
//        url: "isAdmin",
//        data: "ra=" + RandomNumber(),
//        async: false,
//        success: function (msg) {
//            if (msg.isSuccess) {
//                $.ucsalert(msg.message);
//                flag = false;
//            }
//        }
//    })
//    return flag;
//}