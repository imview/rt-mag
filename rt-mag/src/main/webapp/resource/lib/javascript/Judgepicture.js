function checkImgType(ths){  
    if (ths.value == "") {  
        alert("请上传图片");  
        return false;  
    } else {  
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(ths.value)) {  
            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");  
            ths.value = "";  
            return false;  
        }  
    }  
    return true;  
}  
