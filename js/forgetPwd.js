function forget() {
    var forgetTel = $("#forgetTel").val();
    var fotgetCode = $("#fotgetCode").val();

    // 手机号码判断
    if (forgetTel == '') {
        $("#forgetTel").parent().parent().addClass("has-error");
        $("#forgetTel").siblings(".form-control-feedback").text("手机号码不能为空");
        return false;
    } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test($.trim(forgetTel)))) {
        $("#forgetTel").parent().parent().addClass("has-error");
        $("#forgetTel").siblings(".form-control-feedback").text("手机号码格式有误");
        return false;
    } else {
        $("#forgetTel").parent().parent().removeClass("has-error");
        $("#forgetTel").siblings(".form-control-feedback").text("");
    }

    // 获取动态验证码
    if (fotgetCode == '') {
        $("#fotgetCode").parent().parent().addClass("has-error");
        $("#fotgetCode").siblings(".form-control-feedback").text("验证码不能为空");
        return false;
    } else if (fotgetCode.length != 6) {
        $("#fotgetCode").parent().parent().addClass("has-error");
        $("#fotgetCode").siblings(".form-control-feedback").text("验证码长度不对");
        return false;
    } else {
        $("#fotgetCode").parent().parent().removeClass("has-error");
        $("#fotgetCode").siblings(".form-control-feedback").text("");
    }

    var url = "http://192.168.10.11";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            forgetPhone: forgetTel,
            forgetCode: fotgetCode
        },
        dateType: "JSON",
        success: function (forget) {
            $(".maxWidth div:nth-child(1)").removeClass("on");
            $(".maxWidth div:nth-child(2)").addClass("on");
            $("#forgetOne").hide();
            $("#forgetTwo").show();

        },
        error: function (error) {
            $(".maxWidth div:nth-child(1)").removeClass("on");
            $(".maxWidth div:nth-child(2)").addClass("on");
            $("#forgetOne").hide();
            $("#forgetTwo").show();
        }
    })

}

function ok() {
    var forgotPwd = $("#forget-pwd").val();
    var forgotrePwd = $("#forget-repwd").val();
    // 密码判断
    if (forgotPwd == '') {
        $("#forget-pwd").parent().parent().addClass("has-error");
        $("#forget-pwd").siblings(".form-control-feedback").text("密码不能为空");
        $("#forget-pwd").siblings(".form-control-feedback").css("width", "120px");
        return false;
    } else if ($.trim(forgotPwd).length < 8 || $.trim(forgotPwd).length > 18) {
        $("#forget-pwd").parent().parent().addClass("has-error");
        $("#forget-pwd").siblings(".form-control-feedback").text("登录密码长度为8-18");
        $("#forget-pwd").siblings(".form-control-feedback").css("width", "150px");
        return false;
    } else if (passwordLevel($.trim(forgotPwd)) == 1) {
        $("#forget-pwd").parent().parent().addClass("has-error");
        $("#forget-pwd").siblings(".form-control-feedback").text("由字母、数字和符号至少包含两种组成");
        $("#forget-pwd").siblings(".form-control-feedback").css("width", "260px");
        return false;
    } else {
        $("#forget-pwd").parent().parent().removeClass("has-error");
        $("#forget-pwd").siblings(".form-control-feedback").text("");
    }

    // 二次密码判断
    if (forgotrePwd == '') {
        $("#forget-repwd").parent().parent().addClass("has-error");
        $("#forget-repwd").siblings(".form-control-feedback").text("请再次输入密码");
        $("#forget-repwd").siblings(".form-control-feedback").css("width", "120px");
        return false;
    } else if (forgotrePwd != forgotPwd) {
        $("#forget-repwd").parent().parent().addClass("has-error");
        $("#forget-repwd").siblings(".form-control-feedback").text("输入密码不相符");
        $("#forget-repwd").siblings(".form-control-feedback").css("width", "120px");
        return false;
    } else {
        $("#forget-repwd").parent().parent().removeClass("has-error");
        $("#forget-repwd").siblings(".form-control-feedback").text("");
    }

    var url = "http://192.168.10.1";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            forgetRepwd: forgotrePwd
        },
        dateType: "JSON",
        success: function (forget) {
            var s = confirm("修改密码成功,是否跳转到登录页");
            console.log(s);
            if (s) {
                window, location.href = "Index.html";
            } else {
                window, location.href = "ForgetPwd.html";
            }
        },
        error: function (error) {
            var s = confirm("修改密码成功,是否跳转到登录页");
            console.log(s);
            if (s) {
                window, location.href = "Index.html";
            } else {
                window, location.href = "ForgetPwd.html";
            }
        }
    })
}

$(function () {
    $("#forgetOne").show();
    // 手机号码先验证
    $("#forgetTel").focusin(function () {

    }).focusout(function () {
        if ($("#forgetTel").val() != '' && !(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test($.trim($("#forgetTel").val())))) {
            $("#forgetTel").parent().parent().addClass("has-error");
            $("#forgetTel").siblings(".form-control-feedback").text("手机号码格式有误");
            return false;
        } else {
            if ($("#forgetTel").val() != '') {
                $("#forgetTel").parent().parent().removeClass("has-error");
                $("#forgetTel").siblings(".form-control-feedback").text("");
                $(".Btncode").removeAttr("disabled").addClass("on");
            }
        }
    });
})

var Cont = 60; //时间
var codeCont = 0;

function forSend() {
    if (codeCont > 0) {
        return false;
    }
    codeCont = Cont;
    // 获取动态码按钮
    $(".Btncode").attr("disabled");
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