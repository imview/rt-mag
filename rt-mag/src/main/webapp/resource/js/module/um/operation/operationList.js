/* File Created: 二月 5, 2015 */
$(document).ready(function() {
	pageReady();
    $('#divlist').getUcspager().setConfig({
        params: $($("#searchForm")[0]).serialize()
    });
    $('#divlist').getUcspager().moveFirst();
	$(".msk").ucsunmask();
});

function pageReady() {

    $("#divModule").ucsfield("ucsfield.combobox", {
        id: "moduleId",
        name:"conditions.moduleId",
        labelText: "所属模块",
        // data:moduleList,
        //layout:"div-v",
        url:"../module/getModule",
		size:"small",
//            ignoreValue:"-1"
    });
    $("#divCategory").ucsfield("ucsfield.combobox", {
        id: "categoryId",
        name:"conditions.categoryId",
        labelText: "所属栏目",
        data:[{'text':"全部",'value':-1}],
        size:"small",
        ignoreValue:"-1"
    });
    $("#divMenu").ucsfield("ucsfield.combobox", {
        id: "menuId",
        name:"conditions.menuId",
        labelText: "所属菜单",
        data:[{'text':"全部",'value':-1}],
        size:"small",
        ignoreValue:"-1"
    });

    $("#divOperationName").ucsfield("ucsfield.text", {
        id : "operationName",
		name:"conditions.operationName",
        labelText : "操作名称"
    });

	$('#divlist').ucspager({
		url : "operationListPage",
		id : "divlist",
		callback : initCheckbox
	});

	// 注册弹出窗体控件
	$('#myModal').ucswindow({
		title : "",
		url : "addOperation",
		async : true,
		size : "default",
		data : "",
		buttons : [ {
			id : "btnSave",
			text : "保存",
			isHighlight : true,
			handler : SaveClick,
			icon : ""
		}, {
			id : "btnCancel",
			text : "取消",
			handler : function() {
				colseUcswindow('myModal');
			}
		} ]

	});

	// 注册弹出窗体控件
	// $('#myModal_action').ucswindow({
	// 	title : "",
	// 	url : "selectAction",
	// 	async : true,
	// 	size : "large",
	// 	data : "",
	// 	buttons : [ {
	// 		id : "btnSave_action",
	// 		text : "保存",
	// 		isHighlight : true,
	// 		handler : SaveActionClick,
	// 		icon : ""
	// 	}, {
	// 		id : "btnCancel_action",
	// 		text : "取消",
	// 		handler : function() {
	// 			colseUcswindow('myModal_action')
	// 		}
	// 	} ]
	// });

    $('#myActionSetModal').ucswindow({
        title: "Ation配置",
        url: "../category/getOperationActionList",
        async: true,
        size: "default",
        data: "",
        height:"300px",
        buttons: [{ id: "btnActionSetSave", text: "保存", isHighlight: true, handler: function () { saveAction(); }, icon: "" },
            { id: "btnActionSetSaveCancel", text: "取消", handler: function () { colseUcswindow('myActionSetModal') } }]
    });

	// 新增操作
	$("#btnAddM").ucsbutton({
		icon : "edit",
		text : "新增",
		size : "small",
		isHighlight : false,
		handler : function() {
			var operationId = "";
			$('#myModal').getUcswindow().setConfig({
				title : "新增操作",
				url : "editOperation",  //addOperation
				async : true,
				size : "default",
				data : "ra=" + Math.random()+"&operationId=" + operationId,
				callback : function() {
					;
					$("#add_moduleId").change(function() {
						if ($(this).val() == "" ||$(this).val() =="-1") {
							$("#add_categoryId").empty();
							$("<option></option>").val("").text("--请选择--").appendTo($("#add_categoryId"));
							$("#add_menuId").empty();
							$("<option selected='selected'></option>").val("").text("--请选择--")
								.appendTo($("#add_menuId"));return;
						}
						getChildModule("#add_moduleId","#add_categoryId","#add_menuId");
						$("<option></option>").val("").text("--请选择--").appendTo($("#add_categoryId"));
						$("<option></option>").val("").text("--请选择--").appendTo($("#add_menuId"));
					});

					$("#add_categoryId").change(function() {
						if (!$(this).val()) {
							$("#add_menuId").empty();
							$("<option selected='selected'></option>").val("").text("--请选择--")
								.appendTo($("#add_menuId"));
							return;
						}
						getLastChildModule("#add_categoryId","#add_menuId");
						$("<option selected='selected' ></option>").val("").text("--请选择--")
							.appendTo($("#add_menuId"));
					});

                    if($("#id").val()==""||$("#id").val()== null){
                        $($("#add_moduleId option")[0]).text('--请选择--');
                        $("#add_categoryId").empty();
                        $("<option></option>").val("").text("--请选择--").appendTo($("#add_categoryId"));
                        $("#add_menuId").empty();
                        $("<option selected='selected'></option>").val("").text("--请选择--").appendTo($("#add_menuId"));
                    }
                    ;
					var addmoduleid = $.cookie("operation_moduleid");
					var addcategoryeid = $.cookie("operation_categoryid");
					var addmenuid = $.cookie("operation_menuid");

					if (addmoduleid != null && addmoduleid != ""&& $("#add_moduleId").val() == "") {
						$("#add_moduleId").val(addmoduleid);
							// 初始化并赋默认值
						getChildModule("#add_moduleId", "#add_categoryId","#add_menuId",addcategoryeid, addmenuid);
					}
				}
			});
			$('#myModal').getUcswindow().show();
		}
	});

	// 删除操作
	$("#btnDelM").ucsbutton({
		icon : "delete",
		text : "删除",
		size : "small",
		isHighlight : false,
		handler : DelClick
	});



	// 绑定查询条件

	// getRootModule("#moduleId", "#categoryId", "#menuId");
	$("#moduleId").change(
		function() {
			$("#categoryId").empty();
			$("#menuId").empty();
			if ($(this).val() == "") {
				$("#categoryId").empty();
				$("<option></option>").val("").text("全部").appendTo($("#categoryId"));
				$("#menuId").empty();
				$("<option selected='selected'></option>").val("").text("全部").appendTo($("#menuId"));
				return;
			}
			getChildModule("#moduleId", "#categoryId", "#menuId");
			$("<option></option>").val("").text("全部").appendTo($("#categoryId"));
			$("<option selected='selected'></option>").val("").text("全部").appendTo($("#menuId"));
		}
	);

	$("#categoryId").change(
		function() {
			if (!$(this).val()) {
				$("#menuId").empty();
				$("<option selected='selected'></option>").val("").text("全部").appendTo($("#menuId"));
				return;
			}
			getLastChildModule("#categoryId", "#menuId");
			$("<option selected='selected'></option>").val("").text("全部").appendTo($("#menuId"));
		}
	);

	// 查询
	$("#btnQuery").ucsbutton({
		icon : "search",
		handler : function() {
			$('#divlist').getUcspager().setConfig({
				params : "&" + $($("#searchForm")[0]).serialize() + "&isLayer=1"
			});
			$('#divlist').getUcspager().moveFirst();
		},
		text : "查询",
		size : "small",
		isHighlight : true
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

}

function initCheckbox() {
	$("input:checkbox, input:radio, input:file").not(
			'[data-no-uniform="true"],#uniform-is-ajax').uniform();
	ShowView();
}

function ShowView() {

	// 修改
	$("a[id^='btnModi_']").ucsbutton({
		icon : "edit",
		text : "修改",
		isHighlight : true,
		handler : function() {
			var value = $(this).attr('value');
			$('#myModal').getUcswindow().setConfig({
				title : '修改操作',
				url : 'editOperation',
				data : "ra=" + Math.random() + "&operationId=" + value,
				callback : function() {
					// 模块设置选中值
                    $($("#add_moduleId option")[0]).text('--请选择--');;
					$("#add_moduleId").val($("#hedit_moduleid").val());
					$("#add_moduleId").change(function() {
						$("#add_categoryId").empty();
						$("#add_menuId").empty();
						if ($(this).val() == "") {
							$("#add_categoryId").empty();
							$("<option></option>").val("").text("--请选择--").appendTo($("#add_categoryId"));
							$("#add_menuId").empty();
							$("<option selected='selected'></option>").val("").text("--请选择--")
								.appendTo($("#add_menuId"));
							return;
						}
						getChildModule("#add_moduleId", "#add_categoryId", "#add_menuId");
						$("<option></option>").val("").text("--请选择--").appendTo($("#add_categoryId"));
						$("<option></option>").val("").text("--请选择--").appendTo($("#add_menuId"));

					});
					;
					// 初始化并赋默认值
					getChildModule("#add_moduleId", "#add_categoryId", "#add_menuId",
						$("#hedit_categoryid").val(), $("#hedit_menuid").val());
						$("#add_categoryId").change(function() {
							if (!$(this).val() || $(this).val() == "") {
								$("#add_menuId").empty();
								$("<option ></option>").val("").text("--请选择--").appendTo($("#add_menuId"));
								return;
							}
							getLastChildModule("#add_categoryId", "#add_menuId");
							$("<option  ></option>").val("").text("--请选择--").appendTo($("#add_menuId"));
						});
				}
			});
			$('#myModal').getUcswindow().show();
		}
	});

	// 动作配置
	$("a[id^='btnAction_']").ucsbutton({
		icon : "edit",
		text : "动作配置",
		isHighlight : true,
		rightskey:"action_setting",
		handler : function() {
            var value = $(this).attr('value');
            $('#myActionSetModal').getUcswindow().setConfig({
                title: '动作配置',
                url: '../category/getOperationActionList',
                data: "ra=" + RandomNumber() +"&id="+value
            });
            $('#myActionSetModal').getUcswindow().show();
		}
	});


	//editOperation
    $("#add_moduleId").change(
        function() {
            $("#add_categoryId").empty();
            $("#add_menuId").empty();
            if (!$(this).val()) {
                $("#add_categoryId").empty();
                $("<option></option>").val("").text("--请选择--").appendTo($("#add_categoryId"));
                $("#add_menuId").empty();
                $("<option selected='selected'></option>").val("").text("--请选择--").appendTo($("#add_menuId"));
                return;
            }
            getChildModule("#add_moduleId", "#add_categoryId", "#add_menuId");
            $("<option></option>").val("").text("--请选择--").appendTo($("#add_categoryId"));
            $("<option selected='selected'></option>").val("").text("--请选择--").appendTo($("#add_menuId"));
        }
    );

    $("#add_categoryId").change(
        function() {
            if (!$(this).val()) {
                $("#add_menuId").empty();
                $("<option selected='selected'></option>").val("").text("--请选择--").appendTo($("#add_menuId"));
                return;
            }
            getLastChildModule("#add_categoryId", "#add_menuId");
            $("<option selected='selected'></option>").val("").text("--请选择--").appendTo($("#add_menuId"));
        }
    );

}

// 保存
function SaveClick() {

	if (submitClick($(".help-inline").lenght) == false) {
		return false;
	}

	var data = {};

	var parentid = $("#add_menuId").val();

	if (parentid == "" || parentid == null) {
		alert("请选择菜单");
		return false;
	}
	data.parentId = parentid;

	var name = $("#name").val();
	if (name == "" || name == null) {
		alert("操作名称不能为空");
		return false;
	}
	data.name = name;

	var opCode = $("#opCode").val();
	if (opCode == "" || opCode == null) {
		alert("操作编码不能为空");
		return false;
	}
	data.opCode = opCode;

	//var url = "";
	// if ($("#id").val() == "" || $("#id").val() == null) {
	// 	url = "addSave";
	// 	// 设置cookie
	// 	$.cookie("operation_moduleid", $("#add_moduleId").val());
	// 	$.cookie("operation_categoryid", $("#add_categoryId").val());
	// 	$.cookie("operation_menuid", parentid);
	// } else {
	// 	url = "editSave";
	// 	data.id = $("#id").val();
	// }
    data.id = $("#id").val();
	$.cookie("operation_moduleid", $("#add_moduleId").val());
	$.cookie("operation_categoryid", $("#add_categoryId").val());
	$.cookie("operation_menuid", parentid);

	$("#btnSave").getUcsbutton().unbind('click');
	$("#btnSave").getUcsbutton().setText('保存中...');

	$.ajax({
		url : 'editOperationInfo',
		type : 'post',
		data : $("#editForm").serialize(),
		dataType : 'json',
		success : function(msg) {
			if (msg.isSuccess) {
				$("#btnSave").getUcsbutton().bind('click', SaveClick);
				$("#btnSave").getUcsbutton().setText('保存');
				$("#myModal").getUcswindow().close();
				$("#divlist").getUcspager().refresh();
				$.ucsalert(msg.message);
			} else {
				$("#btnSave").getUcsbutton().bind('click', SaveClick);
				$("#btnSave").getUcsbutton().setText('保存');
				$.ucsalert(msg.message);
			}
		},
		error : function(msg) {
			$("#btnSave").getUcsbutton().bind('click', SaveClick);
			$("#btnSave").getUcsbutton().setText('保存');
			$.ucsalert("操作异常，请重试");
		}
	});
}

// 删除
function DelClick() {
	var ids = "";
	for (var i = 0; i < $("input:checkbox:checked").length; i++) {
		if (ids.length > 0) {
			ids += ",";
		}
		ids = ids + $("input:checkbox:checked")[i].value;
	}
	if ($("input:checkbox:checked").length == 0) {
		return alert("请先勾选操作记录");
	}
	if (confirm("确认要删除选中的记录吗？")) {
		$.ajax({
			type : "post",
			url : "deleteOperation",
			data : "ids=" + ids,
			success : function(msg) {
				if (msg.isSuccess) {
					$.ucsalert(msg.message);
					$('#divlist').getUcspager().setConfig({
						params : "&" + $($("#searchForm")[0]).serialize()
					});
					$('#divlist').getUcspager().refresh();
				} else {
					$.ucsalert(msg.message);
				}
			}
		});
	}
}

// 新增获取Module
function getRootModule(moduleName, categoryName, menuName) {
	// $(moduleName).empty();
	var url = "getChildren";
	$.getJSON(url, {
		"parentid" : ""
	}, function(data) {
		$.each(data, function(i, item) {
			$("<option></option>").val(item["value"]).text(item["text"])
					.appendTo($(moduleName));
		});
		if ($(moduleName).val()) {
			getChildModule(moduleName, categoryName, menuName);
		}
	});
}

function getChildModule(moduleName, categoryName, menuName, defaultCategory,
		defaultMenu) {
	$(categoryName).empty();
	var parentid = $(moduleName).val();
	var url = "getChildren";
	
	$.getJSON(url, {
		"parentid" : parentid
	}, function(data) {

		$.each(data, function(i, item) {
			if (defaultCategory != "" && defaultCategory == item["value"]) {
				$("<option selected></option>").val(item["value"]).text(
						item["text"]).appendTo($(categoryName));
			} else {
				$("<option></option>").val(item["value"]).text(item["text"])
						.appendTo($(categoryName));
			}
		});
		if ($(categoryName).val() && $(categoryName).val() != "") {
			getLastChildModule(categoryName, menuName, defaultMenu);
		}
	});
}

function getLastChildModule(categoryName, menuName, defaultMenu) {
	$(menuName).empty();
	var parentid = $(categoryName).val();
	var url = "getChildren";
	$.getJSON(url, {
		"parentid" : parentid
	}, function(data) {
		$.each(data, function(i, item) {
			if (defaultMenu != "" && defaultMenu == item["value"]) {
				$("<option selected></option>").val(item["value"]).text(
						item["text"]).appendTo($(menuName));
			} else {
				$("<option></option>").val(item["value"]).text(item["text"])
						.appendTo($(menuName));
			}
		});
	});
}

function removeactionjs(trid) {
	$("#" + trid).remove();
	setSelectCount();
}

// 重置
function reset() {
	var trList = $("#tbSelected").children("tbody").children("tr");
	for (var i = 0; i < trList.length; i++) {

		var id = trList[i].id;

		if (id == null || id == "") {
			continue;
		} else {
			$("#" + id).remove();
		}
	}

	setSelectCount();
}

// 设置选中的数目
function setSelectCount() {
	var index = 0;
	var trList = $("#tbSelected").children("tbody").children("tr");
	for (var i = 0; i < trList.length; i++) {

		var id = trList[i].id;

		if (id == null || id == "") {
			continue;
		} else {
			index = index + 1;
		}
	}
	$("#selCount").text(index);
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

                $("#btnActionSetSave").getUcsbutton().bind('click', saveAction);
                $("#btnActionSetSave").getUcsbutton().setText('保存');
                $('#myActionSetModal').getUcswindow().close();
                $.ucsalert("设置成功！");
            } else {
                $.ucsalert(msg.message);
                $("#btnActionSetSave").getUcsbutton().bind('click', saveAction);
                $("#btnActionSetSave").getUcsbutton().setText('保存');
            }
        },
        error: function (msg) {
            $.ucsalert("系统异常，错误代码"+msg.status);
            $("#btnActionSetSave").getUcsbutton().bind('click', saveAction);
            $("#btnActionSetSave").getUcsbutton().setText('保存');
        }
    });
}
