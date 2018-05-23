$(function(){
    $("#hideId").val(editEntity.id);

    $("#divEidtName").ucsfield("ucsfield.text", {
        id: "txtEidtName",
        name:"name",
        labelText: "名称" ,
        value:editEntity.name,
        layout:"div-v",
        size:"large"
    });
    $("#divEidtTitle").ucsfield("ucsfield.text", {
        id: "txtEidtTitle",
        name:"title",
        labelText: "标题" ,
        value:editEntity.title,
        layout:"div-v",
        size:"large"
    });
    $("#divEidtUrl").ucsfield("ucsfield.text", {
        id: "txtEidtUrl",
        name:"url",
        labelText: "路由地址" ,
        value:editEntity.url,
        layout:"div-v",
        size:"large"
    });
    $("#divEidtNamespace").ucsfield("ucsfield.text", {
        id: "txtEidtNamespace",
        name:"namespace",
        labelText: "控制器包名" ,
        value:editEntity.namespace,
        layout:"div-v",
        size:"large"
    });
    $("#divEidtControllerName").ucsfield("ucsfield.text", {
        id: "txtEidtControllerName",
        name:"controllerName",
        labelText: "控制器名称" ,
        value:editEntity.controllerName,
        layout:"div-v",
        size:"large"
    });
    $("#divEidtRemark").ucsfield("ucsfield.text", {
        id: "txtEidtRemark",
        name:"remark",
        labelText: "说明" ,
        value:editEntity.remark,
        layout:"div-v",
        size:"large"
    });
});