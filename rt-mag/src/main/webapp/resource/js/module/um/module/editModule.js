
$(function () {


    $(function () {
        $("#divModuleName").ucsfield("ucsfield.text", {
            id: "txtName",
            name:"name",
            labelText: "模块名称" ,
            value:entity.name, //"${module.name}"
            layout:"div-v",
            size:"large"
        });

        $("#divSequence").ucsfield("ucsfield.text", {
            id: "txtSequence",
            name:"sequence",
            labelText: "排序" ,
            value:entity.sequence,  //"${module.sequence}"
            layout:"div-v",
            size:"large"
        });

        $("#divIsEnable").ucsfield("ucsfield.combobox", {
            id: "txtIsEnable",
            labelText: "是否启用",
            name:"enabled",
            data:[{'text':"否",'value':0},{'text':"是",'value':1}],
            value:entity.enabled,  //"${module.enabled}"
            layout:"div-v",
            size:"large",
            ignoreValue:"-1"
        });
    });

});
$("#txtName").addClass("IsError IsRequired");
$("#txtSequence").addClass("IsError IsRequired IsNumber");