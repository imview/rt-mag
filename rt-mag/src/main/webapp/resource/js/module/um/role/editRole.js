
$(function () {

    $("#divRoleName").ucsfield("ucsfield.text", {
        id: "roleName",
        name:"name",
        labelText: "角色名称" ,
        value:roleName,
        layout:"div-v",
        size:"large"
    });

    // $("#divRemark").ucsfield("ucsfield.textarea", {
    //     id: "txtRemark",
    //     name:"remark",
    //     labelText: "备注" ,
    //     value:"${remark}",
    //     layout:"div-v",
    //     size:"large"
    // });

});
$("#roleName").addClass("IsError IsRequired");
$("#roleName").width("210px");


// //保存
// function saveRoleInfo() {
//
//     if (submitClick($(".help-inline").lenght) == false) {
//         return false;
//     }
//
//     var role = new Object();
//     role.name = $("#txtName").val();
//     role.id = $("#hRoleID").val();
//     role.remark = $("#txtRemark").val();
//
//     var url = "editRoleInfo";
//     // if (role.id == "")
//     //     url = "addRoleObj";
//     // else
//     //     url = "updateRoleObj";
//     $("#btnSave").getUcsbutton().unbind('click');
//     $("#btnSave").getUcsbutton().setText('保存中...');
//     $.ajax({
//         url: url,
//         type: 'post',
//         data: JSON.stringify(role),
//         dataType: 'json',
//         contentType: 'application/json; charset=utf-8',
//         success: function (result) {
//             if (result.isSuccess) {
//                 $.ucsalert(result.message);
//                 $('#divlist').getUcspager().refresh();
//                 $("#btnSave").getUcsbutton().bind('click', saveRoleInfo);
//                 $("#btnSave").getUcsbutton().setText('保存');
//                 $('#myModal').getUcswindow().close();
//
//             } else {
//                 $.ucsalert(result.message);
//                 $("#btnSave").getUcsbutton().bind('click', saveRoleInfo);
//                 $("#btnSave").getUcsbutton().setText('保存');
//
//             }
//         },
//         error: function (msg) {
//             $.ucsalert(msg.message);
//             $("#btnSave").getUcsbutton().bind('click', saveRoleInfo);
//             $("#btnSave").getUcsbutton().setText('保存');
//         }
//     });
// }