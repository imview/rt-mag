

$(function () {

    $("#txtLoginName").ucsfield("ucsfield.text", {
        id: "eLoginName",
        name:"loginName",
        labelText: "后台账号" ,
        value:entity.loginName,  // "${loginName}"
        layout:"div-v",
        size:"large"
    });
    $("#txtUserName").ucsfield("ucsfield.text", {
        id: "eUserName",
        name:"userName",
        labelText: "用户名称" ,
        value:entity.userName,     // "${userName}"
        layout:"div-v",
        size:"large"
    });

    $("#txtPassword").ucsfield("ucsfield.text", {
        id: "ePassword",
        name:"password",
        labelText: "用户名称" ,
        value:"",
        layout:"div-v",
        size:"large"
    });

    $("#divEidtRoleIDs").ucsfield("ucsfield.combobox", {
        id: "editRoleIDs",
        name: "roleIDs",
        labelText: "角色属性",
        url: "getRoles",
        multiSelect: true,
        isSearch:false,
        ignoreValue:"-1",
        layout:"div-v",
        size:"big",
        value: hasRoleIds  //  "${hasRoleIds}"

    });

    $("#txtMobile").ucsfield("ucsfield.text", {
        id: "eMobile",
        name:"mobile",
        labelText: "手机号码" ,
        value:entity.mobile,//"${mobile}",
        layout:"div-v",
        size:"large"
    });

    $("#txtEmail").ucsfield("ucsfield.text", {
        id: "eMail",
        name:"email",
        labelText: "邮箱地址" ,
        value:entity.email, // "${email}",
        layout:"div-v",
        size:"large"
    });

});
//    $("#editRoleIDs_1").width ("200px");
$("#eLoginName").addClass("IsError IsRequired IsMinLength IsMaxLength");
$("#eLoginName").attr({"MinLength":"3","MaxLength":"15"});
$("#eUserName").addClass("IsError IsRequired IsMinLength IsMaxLength");
$("#eUserName").attr({"MinLength":"1","MaxLength":"15"});
//    $("#ePassword").addClass("IsError IsRequired IsMinLength IsMaxLength");
//    $("#ePassword").attr({"type":"password","MinLength":"6","MaxLength":"15"});
$("#editRoleIDs").addClass("IsError IsRequired");
//    $("#eMobile").addClass("IsError IsMobile");
$("#eMobile").addClass("IsError IsMobile");
$("#eMobile").attr({"maxLength":"11"});
$("#eMail").addClass("IsError IsMail");