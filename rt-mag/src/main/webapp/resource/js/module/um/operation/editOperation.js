

$(function(){

    $("#divModuleId").ucsfield("ucsfield.combobox", {
        id: "add_moduleId",
        labelText: "所属模块",
        name:"moduleId",
        // data:moduleList,
        value: operation.moduleId, //"${operation.moduleId}",
        layout:"div-v",
        url:"../module/getModule",
//            size:"large",
//            ignoreValue:"-1"
    });

    $("#divCategoryId").ucsfield("ucsfield.combobox", {
        id: "add_categoryId",
        labelText: "所属栏目",
        name: "categoryId",
        data:[{'text':"--请选择--",'value':-1}],
        value:operation.categoryId,   //"${categoryId}",
        layout:"div-v",
//            size:"large",
        ignoreValue:"-1"
    });

    $("#divMenuId").ucsfield("ucsfield.combobox", {
        id: "add_menuId",
        labelText: "所属菜单",
        name:"parentId",
        data:[{'text':"--请选择--",'value':-1}],
        value:operation.menuId,  //"${menuId}",
        layout:"div-v",
//            size:"large",
        ignoreValue:"-1"
    });

    $("#divName").ucsfield("ucsfield.text", {
        id: "name",
        name:"name",
        labelText: "模块名称" ,
        value: operation.name, // "${module.name}",
        layout:"div-v",
//            size:"large"
    });

    $("#divOpCode").ucsfield("ucsfield.text", {
        id: "opCode",
        name:"code",
        labelText: "操作编码" ,
        value: operation.code, //"${module.code}",
        layout:"div-v",
//            size:"large"
    });


});