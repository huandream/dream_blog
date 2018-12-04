function login(){
    var loginName = $("#Login-name").val();
    var loginpwd = $("#Login-pwd").val();
    if($.trim(loginName)=='') {
        $("#Login-name").parent().parent().addClass("has-error");
        $("#Login-name").siblings(".form-control-feedback").text("用户名不能为空");
        return false;
    }

    if(loginName.length < 2 || loginName.length >18){
        $("#Login-name").parent().parent().addClass("has-error");
        $("#Login-name").siblings(".form-control-feedback").text("用户名长度为2~18");
        return false;
    }else{
        $("#Login-name").parent().parent().removeClass("has-error");
        $("#Login-name").siblings(".form-control-feedback").text("");
    }

    if($.trim(loginpwd)==''){
        $("#Login-pwd").parent().parent().addClass("has-error");
        $("#Login-pwd").siblings(".form-control-feedback").text("密码不能为空");
        return false;
    }else {
        $("#Login-pwd").parent().parent().removeClass("has-error");
        $("#Login-pwd").siblings(".form-control-feedback").text("");
    }


    var url ="http://192.168.10.1";
    $.ajax({
        type:"POST",
        url:url,
        data:{
            name:loginName,
            login_pwd:loginpwd
        },
        dataType:"json",
        success: function(respMsg){

        },
        error: function(error){

        }
    })
}