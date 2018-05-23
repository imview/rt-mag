

$(function(){

    $("#divActionView").ucsfield("ucsfield.combobox", {
        id: "txtAction",
        name:"actionIds",
        labelText: "所属模块",
        multiSelect:true,
        isSearch:true,
        url:"../category/getAllAction",
        layout:"div-v",
        size:"large",
        ignoreValue:"-1",
        value:defaultIds,
        callback:function(){
            $("#txtAction_1").css("width","300px");
            $("#txtAction_search").css("width","280px");
            $("div.list").css("width","300px");
            //checkbox样式
            //$("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();

            var $table= $("#tbActionList");
            $("#divActionView .list ul.main li,#divActionView .list ul.main li input").click(function(){
                $table.html("");
                $("input[class!='selectAll']:checked", $("#divActionView .list ul.main")).each(function (index) {
                    var name=$(this).next().text();
                    $table.append("<tr><td >"+name+"</td></tr>");
                });
            });


        }
    });



});