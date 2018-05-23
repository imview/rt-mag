/* File Created: 二月 5, 2015 */
$(document).ready(function () { 
    pageReady(); 
    $('#divlist').getUcspager().setConfig({
        params: $($("#searchForm")[0]).serialize()
    });
    $('#divlist').getUcspager().moveFirst();

});

function pageReady() {

    $('#divlist').ucspager({
        params: $($("#searchForm")[0]).serialize(), 
        url: "../category/categoryListPage",
        id: "divlist",
        callback: initCheckbox

    });

    //注册弹出窗体控件
    $('#myModal').ucswindow({
        title: "新增栏目",
        url: "../category/editCategory",
        async: true,
        size: "default",
        data: "",
        isbackdrop: true,   //其他区域不可关闭
        isdraggable:true,
        buttons: [
            { id: "btnSave", text: "保存", isHighlight: true, handler: function () { saveCategory(); }, icon: "" },
            { id: "btnCancel", text: "取消", handler: function () { colseUcswindow('myModal') } }
        ]
    });

    $("#divModule").ucsfield("ucsfield.combobox", {
        id: "moduleId",
        name:"conditions.moduleId",
        labelText: "所属模块",
        url:"../module/getModule"
    });

    $("#divCategoryName").ucsfield("ucsfield.text", {
        id: "txtCategoryName",
        name:"conditions.categoryName",
        labelText: "栏目名称" 
    });

    $('#myMenuModal').ucswindow({
        title: "",
        url: "../category/editMenu",
        async: true,
        size: "default",
        data: "",
        buttons: [{ id: "btnMenuSave", text: "保存", isHighlight: true, handler: function () {  }, icon: "" }, 
        	{ id: "btnMenuCancel", text: "取消", handler: function () { colseUcswindow('myMenuModal') } }]

    });

    $('#myEditMenuModal').ucswindow({
        title: "新增菜单",
        url: "../menu/editMenu",
        async: true,
        size: "default",
        data: "",
        buttons: [{ id: "btnEditMenuSave", text: "保存", isHighlight: true, handler: function () { saveMenu(); }, icon: "" }, 
        	{ id: "btnEditMenuSaveCancel", text: "取消", handler: function () { colseUcswindow('myEditMenuModal') } }]
    });
    
    //动作配置
    $('#myActionSetModal').ucswindow({
        title: "动作配置",
        url: "../category/getOperationActionList",
        async: true,
        size: "default",
        data: "",
        height:"300px",
        buttons: [{ id: "btnActionSetSave", text: "保存", isHighlight: true, handler: function () { saveAction(); }, icon: "" }, 
        	{ id: "btnActionSetSaveCancel", text: "取消", handler: function () { colseUcswindow('myActionSetModal') } }]
    });
    


    //查询
    $("#btnQuery").ucsbutton({
        icon: "search",
        handler: function () {
            $('#divlist').getUcspager().setConfig({
                params:  $($("#searchForm")[0]).serialize()  // + "&isLayer=1"
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

    //增加栏目
    $("#btnAddM").ucsbutton({
        icon: "edit",
        text: "新增",
        size: "small", 
        rightskey: "category_add",
        handler: function () {
            $('#myModal').getUcswindow().setConfig({
                title: "新增栏目",
                url: "../category/editCategory",
                async: true,
                size: "default",
                data: "ra=" + RandomNumber()
            });
            $('#btnSave').show();
            $('#myModal').getUcswindow().show();
        }
    });

    //删除栏目
    $("#btnDelM").ucsbutton({
        icon: "delete",
        text: "删除",
        size: "small",
        rightskey: "category_delete",
        isHighlight: false,
        handler: deleteCategory
    });

    $("#cbxAll").bind("click", function () {
        if ($(this).is(':checked')) {
            $.uniform.update($(".cbxItem").attr("checked", true));
        } else {
            $.uniform.update($(".cbxItem").attr("checked", false));
        }
    });

}

function initCheckbox() {
	if($("input:checkbox, input:radio, input:file").length){
		$("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax,#cbxAll').uniform();
	    $.uniform.update($("#cbxAll").attr("checked", false));
	}
    
    iniShowView();
}

function iniShowView() {

    //栏目上移
    $("a[id^='left_']").ucsbutton({
        icon: "moveLeft",
        text: "上移",
        rightskey: "category_moveup",
        isHighlight: true, 
        handler: moveLeftOne
    });

    //栏目下移
    $("a[id^='right_']").ucsbutton({
        icon: "moveRight",
        text: "下移",
        rightskey: "category_movedown",
        isHighlight: true, 
        handler: moveRightOne
    });

    //修改栏目
    $("a[id^='btnModi_']").ucsbutton({
        icon: "edit",
        text: "修改栏目",
        isHighlight: true, 
        rightskey: "category_edit",
        handler: function () {
            var value = $(this).attr('value');
            $('#myModal').getUcswindow().setConfig({
                title: '修改栏目',
                url: '../category/editCategory',
                data: "ra=" + RandomNumber() + "&id=" + value 
            });
            $('#myModal').getUcswindow().show();
        }
    });

    //查看菜单
    $("a[id^='btnSel_']").ucsbutton({
        icon: "view",
        text: "查看菜单",
        isHighlight: true, 
        handler: function () {
            var categoryId = $(this).attr('value');
            var categoryName =$(this).attr("categoryName");
            var moduleId=$(this).attr("moduleId");
            viewMenu(categoryId,categoryName,moduleId);
        }
    });

    //新增菜单 
    $("a[id^='btnAddT_']").ucsbutton({
        icon: "edit",
        text: "新增菜单",
        isHighlight: true, 
        rightskey: "menu_add",
        handler: function () { 
            var categoryId=$(this).attr("value");
            var moduleId=$(this).attr("moduleId");
            $('#myEditMenuModal').getUcswindow().setConfig({
                title: "新增菜单",
                url: "../category/editMenu",
                data: "ra=" + RandomNumber() + "&categoryId="+categoryId+"&moduleId="+moduleId,
                size: "default",
                callback: function () { 
                	  // $("#txtCategoryId").attr("disabled","disabled");
                	   //$("#txtModuleId").attr("disabled","disabled");  
                	  $("#txtModuleId").change(function () {
                    	  $("#divCategoryMenuView").getUcsfield().refresh("../category/getCategorys?moduleId="+$(this).val());
                      });
                }
            });
            $('#btnEditMenuSave').show();
            $('#myEditMenuModal').getUcswindow().show();
        }
    });
}

 
function viewMenu(categoryId,categoryName,moduleId) {
    $('#myMenuModal').getUcswindow().setConfig({
        title: '查看菜单',
        size: "large",
        url: '../category/menuList',
        data: "ra=" + RandomNumber() + "&categoryId=" + categoryId + "&categoryName="+categoryName+"&moduleId="+moduleId, 
        callback: showMenuList
    });

    $('#btnMenuSave').hide();
    //$('#btnSave').getUcsbutton().setVisible(true);
    $('#myMenuModal').getUcswindow().show();
}

function showMenuList() {
 
    //二级菜单上移
    $("a[id^='MenuTDow_']").ucsbutton({
        icon: "moveLeft",
        text: "上移",
        rightskey: "menu_moveup",
        isHighlight: true,
        handler: menuMoveLeft
    });
    //菜单下移
    $("a[id^='MenuTUp_']").ucsbutton({
        icon: "moveRight",
        text: "下移",
        rightskey: "menu_movedown",
        isHighlight: true,
        handler: menuMoveRight
    });

    //菜单修改
    $("a[id^='menu_Up_']").ucsbutton({
        icon: "edit",
        text: "修改",
        rightskey: "menu_edit",
        isHighlight: true,
        handler: function () {
            var menuId=$(this).attr("menuId");
            var categoryId=$(this).attr("categoryId");
            var moduleId=$(this).attr("moduleId");
            $('#myEditMenuModal').getUcswindow().setConfig({
                title: '菜单修改',
                url: '../category/editMenu',
                data: "ra=" + RandomNumber() + "&categoryId="+categoryId+"&moduleId="+moduleId+"&id="+menuId,
                size: "default",
                callback: function () {
                	 $("#txtModuleId").change(function () {
                   	  $("#divCategoryMenuView").getUcsfield().refresh("../category/getCategorys?moduleId="+$(this).val());
            });
        }
    });
            $('#btnEditMenuSave').show();
            $("#myEditMenuModal").css("z-index", "9999");
            $('#myEditMenuModal').getUcswindow().show();
}
    });
    $("a[id^='MenuActionSet_']").ucsbutton({
        icon: "edit",
        text: "动作配置",
        rightskey: "menu_action_setting",
        isHighlight: true,
        handler: function () {
            var menuId=$(this).attr("menuId"); 
            $('#myActionSetModal').getUcswindow().setConfig({
                title: '动作配置',
                url: '../category/getOperationActionList',
                data: "ra=" + RandomNumber() +"&id="+menuId 
            });
            $('#myActionSetModal').getUcswindow().show();
        }
    });
    
}

//栏目上移
function moveLeftOne() {
    $.ajax({
        url: "../category/moveUp",
        type:"post",
        data: "ra=" + RandomNumber() + "&id=" + $(this).attr('value'),
        success: function (re) {
            if (re.isSuccess) {
                $.ucsalert(re.message);
                $('#divlist').getUcspager().setConfig({
                    params: "&" + $($("#searchForm")[0]).serialize()
                });
                $('#divlist').getUcspager().refresh();
            } else {
                $.ucsalert(re.message);
            }
        }
    });
}

//栏目下移
function moveRightOne() {
    $.ajax({
        url: "../category/moveDown",
        type:"post",
        data: "ra=" + RandomNumber() + "&id=" + $(this).attr('value'),
        success: function (re) {
            if (re.isSuccess) {
                $.ucsalert(re.message);
                $('#divlist').getUcspager().setConfig({
                    params: "&" + $($("#searchForm")[0]).serialize()
                });
                $('#divlist').getUcspager().refresh();
            } else {
                parent.$.ucsalert(re.message);
            }
        }
    });
}

//保存
function saveCategory() {
    
    $("#btnSave").getUcsbutton().unbind('click');
    $("#btnSave").getUcsbutton().setText('保存中...');

    $.ajax({
        url: "../category/editCategoryInfo",
        type: 'post',
        data: $($("#editForm")[0]).serializeArray(),
        dataType: 'json', 
        success: function (msg) {
            if (msg.isSuccess) {
                $('#divlist').getUcspager().setConfig({
                    params: "&" + $($("#searchForm")[0]).serialize()
                });
                $('#divlist').getUcspager().refresh();
                $("#btnSave").getUcsbutton().bind('click', saveCategory);
                $("#btnSave").getUcsbutton().setText('保存');
                $('#myModal').getUcswindow().close();

            } else {
                $.ucsalert(msg.message);
                $("#btnSave").getUcsbutton().bind('click', saveCategory);
                $("#btnSave").getUcsbutton().setText('保存');
            }
        },
        error: function (msg) {
            $.ucsalert("访问异常，错误代码："+msg.status);
            $("#btnSave").getUcsbutton().bind('click', saveCategory);
            $("#btnSave").getUcsbutton().setText('保存');
        }
    });
}

//删除栏目
function deleteCategory() {

    var table = $("#divlist"); 
    var value = "";
    for (var i = 0; i < table.find("input:checkbox:checked").length; i++) {
        value = value + table.find("input:checkbox:checked")[i].value + "|";
    }
    if (table.find("input:checkbox:checked").length == 0) {
        return alert("请先勾选栏目信息");
    }

    if (confirm('是否要删除该栏目信息？') == false)
        return false;

    $.ajax({
        type: "post",
        url: "../category/deleteCategory",
        data: "ra=" + RandomNumber() + "&categoryIds=" + value,
        success: function (result) {
            // $('#divlist').getUcspager().setConfig({
            //     params: "&" + $($("#searchForm")[0]).serialize()
            // });
            // $('#divlist').getUcspager().refresh();
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

//新增菜单
function saveMenu() {
/*    if (!$("#txtMenuName").val()) return alert("菜单名称不能为空");
    if (!$("#txtUrl").val()) return alert("Url不能为空");
    if (!$("#txtMenuIconView").val()) return alert("菜单图标不能为空"); */
 
    var model = $("#MenuEditForm").serializeObject();  

    $("#btnEditMenuSave").getUcsbutton().unbind('click');
    $("#btnEditMenuSave").getUcsbutton().setText('保存中...');

    $.ajax({
        url: "../category/editMenuInfo",
        type: 'post',
        data: model,
        dataType: 'json', 
        success: function (msg) {
            if (msg.isSuccess) {
            	
            	viewMenu($("#txtCategoryId").val(),$("#txtCategoryId>option:selected").text(),$("#txtModuleId").val());
                
                $("#btnEditMenuSave").getUcsbutton().bind('click', saveMenu);
                $("#btnEditMenuSave").getUcsbutton().setText('保存');
                $('#myEditMenuModal').getUcswindow().close();

            } else {
                $.ucsalert(msg.message);
                $("#btnEditMenuSave").getUcsbutton().bind('click', saveMenu);
                $("#btnEditMenuSave").getUcsbutton().setText('保存');
            }
        },
        error: function (msg) {
            $.ucsalert("系统异常，错误代码"+msg.status);
            $("#btnEditMenuSave").getUcsbutton().bind('click', saveMenu);
            $("#btnEditMenuSave").getUcsbutton().setText('保存');
        }
    });
}

//菜单上移
function menuMoveLeft() { debugger;
	var categoryId=$(this).attr("categoryId");
	var categoryName=$(this).attr("categoryName");
	var moduleId=$(this).attr("moduleId");
    $.ajax({
    	  url: "../category/moveUp",
          type:"post",
          data: "ra=" + RandomNumber() + "&id=" + $(this).attr('menuId'),
          success: function (re) {
            if (re.isSuccess) {
                viewMenu(categoryId,categoryName,moduleId);

            } else {
                $.ucsalert(re.message);
            }
        }
    });
}

//菜单下移
function menuMoveRight() {debugger;
	var categoryId=$(this).attr("categoryId");
	var categoryName=$(this).attr("categoryName");
	var moduleId=$(this).attr("moduleId");
    $.ajax({
    	  url: "../category/moveDown",
          type:"post",
          data: "ra=" + RandomNumber() + "&id=" + $(this).attr('menuId'),
          success: function (re) {
            if (re.isSuccess) {
                viewMenu(categoryId,categoryName,moduleId);

            } else {
                $.ucsalert(re.message);
            } 
        }
    });
}
 
//保存action 配置
function saveAction(){
	 var model = $("#setCategoryAction").serializeArray();  

	    $("#btnActionSetSave").getUcsbutton().unbind('click');
	    $("#btnActionSetSave").getUcsbutton().setText('保存中...');

	    $.ajax({
	        url: "../category/addOperationAction",
	        type: 'post',
	        data: model,
	        dataType: 'json', 
	        success: function (msg) {
	            if (msg.isSuccess) {
	            	
	                $("#btnActionSetSave").getUcsbutton().bind('click', saveMenu);
	                $("#btnActionSetSave").getUcsbutton().setText('保存');
	                $('#myActionSetModal').getUcswindow().close();
	                $.ucsalert("设置成功！");
	            } else {
	                $.ucsalert(msg.message);
	                $("#btnActionSetSave").getUcsbutton().bind('click', saveMenu);
	                $("#btnActionSetSave").getUcsbutton().setText('保存');
	            }
	        },
	        error: function (msg) {
	            $.ucsalert("系统异常，错误代码"+msg.status);
	            $("#btnActionSetSave").getUcsbutton().bind('click', saveMenu);
	            $("#btnActionSetSave").getUcsbutton().setText('保存');
	        }
	    });
}
