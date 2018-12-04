function Reguser() {
    var loginName = $("#Reguser-name").val();
    var txtPassword = $("#Reguser-pwd").val();
    var txtRePassword = $("#Reguser-repwd").val();
    var phone = $("#txtTel").val();
    var txtCode = $("#txtCode").val();


    // 用户名判断
    if (loginName == '') {
        $("#Reguser-name").parent().parent().addClass("has-error");
        $("#Reguser-name").siblings(".form-control-feedback").text("用户名不能为空");
        $("#Reguser-name").siblings(".form-control-feedback").css("width", "120px");
        return false;
    } else if ($.trim(loginName).length < 2 || $.trim(loginName).length > 18) {
        $("#Reguser-name").parent().parent().addClass("has-error");
        $("#Reguser-name").siblings(".form-control-feedback").text("用户名长度不正确,请输入2-18长度的会员名");
        $("#Reguser-name").siblings(".form-control-feedback").css("width", "300px");
    } else {
        $("#Reguser-name").parent().parent().removeClass("has-error");
        $("#Reguser-name").siblings(".form-control-feedback").text("");
    }

    // 密码判断
    if (txtPassword == '') {
        $("#Reguser-pwd").parent().parent().addClass("has-error");
        $("#Reguser-pwd").siblings(".form-control-feedback").text("密码不能为空");
        $("#Reguser-pwd").siblings(".form-control-feedback").css("width", "120px");
        return false;
    } else if ($.trim(txtPassword).length < 8 || $.trim(txtPassword).length > 18) {
        $("#Reguser-pwd").parent().parent().addClass("has-error");
        $("#Reguser-pwd").siblings(".form-control-feedback").text("登录密码长度为8-18");
        $("#Reguser-pwd").siblings(".form-control-feedback").css("width", "150px");
        return false;
    } else if (passwordLevel($.trim(txtPassword)) == 1) {
        $("#Reguser-pwd").parent().parent().addClass("has-error");
        $("#Reguser-pwd").siblings(".form-control-feedback").text("由字母、数字和符号至少包含两种组成");
        $("#Reguser-pwd").siblings(".form-control-feedback").css("width", "260px");
        return false;
    } else {
        $("#Reguser-pwd").parent().parent().removeClass("has-error");
        $("#Reguser-pwd").siblings(".form-control-feedback").text("");
    }

    // 二次密码判断
    if (txtRePassword == '') {
        $("#Reguser-repwd").parent().parent().addClass("has-error");
        $("#Reguser-repwd").siblings(".form-control-feedback").text("请再次输入密码");
        $("#Reguser-repwd").siblings(".form-control-feedback").css("width", "120px");
        return false;
    } else if (txtRePassword != txtPassword) {
        $("#Reguser-repwd").parent().parent().addClass("has-error");
        $("#Reguser-repwd").siblings(".form-control-feedback").text("输入密码不相符");
        $("#Reguser-repwd").siblings(".form-control-feedback").css("width", "120px");
        return false;
    } else {
        $("#Reguser-repwd").parent().parent().removeClass("has-error");
        $("#Reguser-repwd").siblings(".form-control-feedback").text("");
    }

    // 手机号码判断
    if (phone == ''){
        $("#txtTel").parent().parent().addClass("has-error");
        $("#txtTel").siblings(".form-control-feedback").text("手机号码不能为空");
        return false;
    } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test($.trim(phone)))) {
        $("#txtTel").parent().parent().addClass("has-error");
        $("#txtTel").siblings(".form-control-feedback").text("手机号码格式有误");
        return false;
    } else {
        $("#txtTel").parent().parent().removeClass("has-error");
        $("#txtTel").siblings(".form-control-feedback").text("");

    }

    // 获取动态验证码
    if (txtCode == '') {
        $("#txtCode").parent().parent().addClass("has-error");
        $("#txtCode").siblings(".form-control-feedback").text("验证码不能为空");
        return false;
    } else if (txtCode.length != 6) {
        $("#txtCode").parent().parent().addClass("has-error");
        $("#txtCode").siblings(".form-control-feedback").text("验证码长度不对");
        return false;
    } else {
        $("#txtCode").parent().parent().removeClass("has-error");
        $("#txtCode").siblings(".form-control-feedback").text("");
    }

    var url = "http://192.168.10.1";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            name: loginName,
            reguser_repwd: txtRePassword,
            phone: phone,
            code: txtCode
        },
        dataType: "json",
        success: function (respMsg) {

        },
        error: function (error) {

        }
    })
}

//页面加载完成时
$(function () {

    // 手机号码先验证
    $("#txtTel").focusin(function () {
    }).focusout(function () {
        if ($("#txtTel").val() != '' && !(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test($.trim($("#txtTel").val())))) {
            $("#txtTel").parent().parent().addClass("has-error");
            $("#txtTel").siblings(".form-control-feedback").text("手机号码格式有误");
            $(".Btncode").attr("disabled","ture");
            $(".Btncode").removeClass("on");
            return false;
        } else {
            if ($("#txtTel").val() != '') {
                $("#txtTel").parent().parent().removeClass("has-error");
                $("#txtTel").siblings(".form-control-feedback").text("");
                $(".Btncode").removeAttr("disabled").addClass("on");
            }
        }
    });
});

var Cont = 60; //时间
var codeCont = 0;

function sendMessage() {
    if (codeCont > 0) {
        return false;
    }
    codeCont = Cont;
    // 获取动态码按钮
    $(".Btncode").attr("disabled","true");
    $(".Btncode").removeClass("on");
    // 执行倒计时
    //设置button效果，开始计时
    $(".Btncode").val(+codeCont + "秒后重新获取");
    InterValObj = window.setInterval(setTime, 1000); //启动计时器，1秒执行一次

}

function setTime() {
    if (codeCont == 0) {
        window.clearInterval(InterValObj); //停止计时器
        $(".Btncode").removeAttr("disabled"); //启用按钮
        $(".Btncode").addClass("on");
        $(".Btncode").val("重新发送验证码");
        $(".Btncode").removeClass("input-butto111").addClass("input-butto110");
    } else {
        if (codeCont > 0) {
            codeCont--;
            if (codeCont < 10) {
                codeCont = "0" + codeCont;
            }
            $(".Btncode").val(+codeCont + "秒再获取");
        } else {
            codeCont = 0;
        }
    }
}

// 验证密码是否包含两种类型
function passwordLevel(password) {
    var Modes = 0;
    for (i = 0; i < password.length; i++) {
        Modes |= CharMode(password.charCodeAt(i));
    }
    return bitTotal(Modes);

    //CharMode函数
    function CharMode(iN) {
        if (iN >= 48 && iN <= 57) //数字
            return 1;
        if (iN >= 65 && iN <= 90) //大写字母
            return 2;
        if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90)) //大小写
            return 4;
        else
            return 8; //特殊字符
    }

    //bitTotal函数
    function bitTotal(num) {
        modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) modes++;
            num >>>= 1;
        }
        return modes;
    }
}

