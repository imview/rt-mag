

$(function(){
    $("#divMenuAddView").ucsfield("ucsfield.text", {
        id: "txtMenuName",
        name:"name",
        labelText: "菜单名称" ,
        value:  menu.name,//"${menu.name}",
        layout:"div-v",
        size:"large"
    });
    $("#divMenuUrlView").ucsfield("ucsfield.text", {
        id: "txtUrl",
        name:"url",
        labelText: "URL" ,
        value:  menu.url,//"${menu.url}",
        layout:"div-v",
        size:"large"
    });
    $("#divMenuIconView").ucsfield("ucsfield.text", {
        id: "txtMenuIconView",
        name:"icon",
        labelText: "图标地址" ,
        value:  menu.icon, //"${menu.icon}",
        layout:"div-v",
        size:"large"
    });
    $("#divModuleMenuView").ucsfield("ucsfield.combobox", {
        id: "txtModuleId",
        labelText: "所属模块",
        name:"moduleId",
        url:"../module/getModule",
        value: moduleId, //"${moduleId}",
        layout:"div-v",
        size:"large",
        ignoreValue:"-1"
    });
    $("#divCategoryMenuView").ucsfield("ucsfield.combobox", {
        id: "txtCategoryId",
        labelText: "所属栏目",
        name:"parentId",
        url:"../category/getCategorys?moduleId="+moduleId,//${moduleId}",
        value: categoryId , //"${categoryId}",
        layout:"div-v",
        size:"large",
        ignoreValue:"-1"
    });

    $("#divMenuIsShowAndView").ucsfield("ucsfield.combobox", {
        id: "txtMenuEnabled",
        labelText: "是否启用",
        name:"enabled",
        data:[{text:"否",value:0},{text:"是",value:1}],
        value:  menu.enabled,  //"${menu.enabled}",
        layout:"div-v",
        size:"large",
        ignoreValue:"-1"
    });

});