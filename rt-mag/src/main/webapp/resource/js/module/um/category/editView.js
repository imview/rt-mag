
/****************    addView   *******************************/
var category = entity;
$(function(){
    $("#divCategoryAddView").ucsfield("ucsfield.text", {
        id: "txtCategoryName",
        name:"name",
        labelText: "栏目名称" ,
        value:category.name,
        layout:"div-v",
        size:"large"
    });
    $("#divIconView").ucsfield("ucsfield.text", {
        id: "txtIconView",
        name:"icon",
        labelText: "图标地址" ,
        value:category.icon,
        layout:"div-v",
        size:"large"
    });
    $("#divModuleAddView").ucsfield("ucsfield.combobox", {
        id: "txtModuleId",
        labelText: "所属模块",
        name:"moduleId",
        url:"../module/getModule",
        value:category.parentId,
        layout:"div-v",
        size:"large",
        ignoreValue:"-1"
    });


    $("#divIsShowAndView").ucsfield("ucsfield.combobox", {
        id: "txtEnabled",
        labelText: "是否启用",
        name:"enabled",
        data:[{text:"否",value:0},{text:"是",value:1}],
        value:category.enabled,
        layout:"div-v",
        size:"large",
        ignoreValue:"-1"
    });
});