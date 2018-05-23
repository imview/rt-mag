/* File Created: 二月 5, 2015 */
$(document).ready(function () {
    pageReady();

    $('#divlist').getUcspager().setConfig({
        params:  $($("#searchForm")[0]).serialize()
    });
    $('#divlist').getUcspager().moveFirst();

    $(".msk").ucsunmask();
});

function pageReady() {
	
    $('#divlist').ucspager({
        params: $($("#searchForm")[0]).serialize(),
        url: "moduleListPage",
        id:"divlist",
        callback: initCheckbox
    });


    //注册弹出窗体控件
    $('#myModal').ucswindow({
        title: "",
        url: "editModule",
        async: true,
        size: "default",
        data: "",
        buttons: [{ id: "btnSave", text: "保存", isHighlight: true, handler:SaveClick , icon: "" },
        { id: "btnCancel", text: "取消",  handler: function () { colseUcswindow('myModal') }}]
    });

    //新增模块
    $("#btnAddM").ucsbutton({
        icon: "edit",
        text: "新增",
        size: "small",
        isHighlight: false,
        handler: function() {
            var value = "";
            $('#myModal').getUcswindow().setConfig({
               title:"新增模块",
               url: "editModule", //editModule
               async: true,
               size: "default",
                data: "ra=" + Math.random() + "&operationId=" + value
            });
            $('#myModal').getUcswindow().show();
        },
        rightskey:"module_addmodule"
    });
    
    //删除模块
    $("#btnDelM").ucsbutton({
        icon: "delete",
        text: "删除",
        size: "small",
        isHighlight: false,
        handler: DelClick,
        rightskey:"module_deletemodule"
    });
   
}

function initCheckbox() {
    $("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();
    ShowView();
}

function ShowView() {
 
    //修改
    $("a[id^='btnModi_']").ucsbutton({
        icon: "edit",
        text: "修改",
        isHighlight: true,
        handler:function() {
             var value = $(this).attr('value');
            $('#myModal').getUcswindow().setConfig({
                title: '修改模块',
                url: 'editModule',
                data: "ra=" + Math.random() + "&operationId=" + value
           });
           $('#myModal').getUcswindow().show();
        },
        rightskey:"module_modifymodule"
    });
}

//保存
function SaveClick() {
   
    if (submitClick($(".help-inline").lenght) == false) {
        return false;
    }
 
    // var url = "";
    // if ($("#id").val() == "" || $("#id").val() == null){
    	// url = "addSave";
	// }else{
    	// url = "modifySave";
	// }
    var module = $("#editForm").serializeObject();
    if(module.name == null||module.name==""){
        alert("模块名称不能为空");
        return ;
    }


    $.ajax({
        url: "editModuleInfo" ,// url,
        type: 'post',
        data: JSON.stringify(module),//$("#editForm").serialize(),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result.isSuccess) {
                $.ucsalert(result.message);
               $('#divlist').getUcspager().refresh();
               $('#myModal').modal('hide');
            } else {
                $.ucsalert(result.message);
            }
        },
        error: function (result) {
             $.ucsalert("操作异常，请重试");
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
        return alert("请先勾选模块记录");
    }
    if (confirm("是否确定删除？")) {
        $.ajax({
            type: "post",
            url: "deleteModule",
            data: "ids=" + ids,
            success: function (msg) {
                if (msg.isSuccess) {
                    $.ucsalert(msg.message);
                    $('#divlist').getUcspager().setConfig({
                    	params: "&" + $($("#searchForm")[0]).serialize()
                    });
                    $('#divlist').getUcspager().refresh();
                }
                else {
                    $.ucsalert(msg.message);
                }
            }
        });
    }
}
