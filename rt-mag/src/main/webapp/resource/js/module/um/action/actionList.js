$(document).ready(function () {
    pageReady();
    $('#divlist').getUcspager().setConfig({
        params: $($("#searchForm")[0]).serialize()
    });
    $('#divlist').getUcspager().moveFirst();
});

function pageReady() {
    $("#divName").ucsfield("ucsfield.text", {
        id: "txtName",
        name:"conditions.name",
        labelText: "名称"
    });
    $("#divUrl").ucsfield("ucsfield.text", {
        id: "txtUrl",
        name:"conditions.url",
        labelText: "地址"
    });
    $("#divNamespace").ucsfield("ucsfield.text", {
        id: "txtNamespace",
        name:"conditions.namespace",
        labelText: "命名空间"
    });
    $("#divControllerName").ucsfield("ucsfield.text", {
        id: "txtControllerName",
        name:"conditions.controllerName",
        labelText: "控制器名称"
    });

    $('#divlist').ucspager({
        url: "actionListPage",
        params: $($("#searchForm")[0]).serialize(),
        id:"divlist",
        callback: initCheckbox
    });

    //注册弹出窗体控件
    $('#myModal').ucswindow({
        title: "",
        url: "editAction",
        async: true,
        size: "default",
        data: "",
        callback:function(){
            var anamespace = $.cookie("action_namespace");
            var acontrollername = $.cookie("action_controllername");
            if (anamespace != null && anamespace !="" && $("#divEidtNamespace").getUcsfield().getValue()=="") {
                $("#divEidtNamespace").getUcsfield().setValue(anamespace);
			}
            if (acontrollername!=null && acontrollername !="" && $("#divEidtControllerName").getUcsfield().getValue() =="") {
                $("#divEidtControllerName").getUcsfield().setValue(acontrollername);
			}
        },
        buttons: [{ id: "btnSave", text: "保存", isHighlight: true, handler:save , icon: "" },
        { id: "btnCancel", text: "取消",  handler: function () { colseUcswindow('myModal') }}]
    });

    //新增模块
    $("#btnAddM").ucsbutton({
        icon: "edit",
        text: "新增",
        size: "small",
        isHighlight: false,
        handler: function() {
            $('#myModal').getUcswindow().setConfig({
               title:"新增功能",
               url: "editAction",
               async: true,
               size: "default",
               data: "ra=" + Math.random()
            });
            $('#myModal').getUcswindow().show();
        },
        rightskey:"action_addaction"
    });
    
    //删除模块
    $("#btnDelM").ucsbutton({
        icon: "delete",
        text: "删除",
        size: "small",
        isHighlight: false,
        handler: del,
        rightskey:"action_deleteaction"
    });
   
    
  //查询
    $("#btnQuery").ucsbutton({
        icon: "search",
        handler: function () {
            $('#divlist').getUcspager().setConfig({
                params: $($("#searchForm")[0]).serialize()
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
        size: "small"
    });

}

function initCheckbox() {
    $("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();
    showView();
}

function showView() {
    //修改
    $("a[id^='btnModi_']").ucsbutton({
        icon: "editAction",
        text: "修改",
        isHighlight: true,
        handler:function() {
             var value = $(this).attr('value');
            $('#myModal').getUcswindow().setConfig({
                title: '修改功能',
                url: 'editAction',
                data: "ra=" + Math.random() + "&id=" + value
           });
           $('#myModal').getUcswindow().show();
        },
        rightskey:"action_modifyaction"
    });
}

//保存
function save() {
    if ($.trim($("#divEidtName").getUcsfield().getValue()) == "") {
        $.ucsalert("名称不能为空");
        return;
    }
    if ($.trim($("#divEidtTitle").getUcsfield().getValue()) == "") {
        $.ucsalert("标题不能为空");
        return;
    }
    if ($.trim($("#divEidtUrl").getUcsfield().getValue()) == "") {
        $.ucsalert("路由地址不能为空");
        return;
    }
    if ($.trim($("#divEidtNamespace").getUcsfield().getValue()) == "") {
        $.ucsalert("控制器包名不能为空");
        return;
    }
    if ($.trim($("#divEidtControllerName").getUcsfield().getValue()) == "") {
        $.ucsalert("控制器名称不能为空");
        return;
    }
    $.cookie("action_namespace",$("#divEidtNamespace").getUcsfield().getValue());
    $.cookie("action_controllername",$("#divEidtControllerName").getUcsfield().getValue());

    $.ajax({
        url: "save",
        type: 'post',
        data: $("#editForm").serialize(),
        dataType: 'json',
        success: function (msg) {
            if (msg.isSuccess) {
                $.ucsalert(msg.message);
               $('#divlist').getUcspager().refresh();
               $('#myModal').modal('hide');
            } else {
                $.ucsalert(msg.message);
            }
        },
        error: function (msg) {
             $.ucsalert("操作异常，请重试");
        }
    });
}

//删除
function del() {
    var ids = "";
    for (var i = 0; i < $("input:checkbox:checked").length; i++) {
    	if (ids.length>0) {
    		ids += ",";
		}
    	ids = ids + $("input:checkbox:checked")[i].value;
    }
    if ($("input:checkbox:checked").length == 0) {
        return alert("请先勾选功能记录");
    }
    if (confirm("是否确定删除？")) {
        $.ajax({
            type: "post",
            url: "del",
            data: "ids=" + ids,
            success: function (msg) {
                if (msg.isSuccess) {
                    $.ucsalert(msg.message);
                    $('#divlist').getUcspager().setConfig({
                    	params: "&" + $($("#searchForm")[0]).serialize()
                    });
                    $('#divlist').getUcspager().refresh();
                }else {
                    $.ucsalert(msg.message);
                }
            }
        });
    }
}
