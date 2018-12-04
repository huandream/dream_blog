// <!--<div class="form-group">-->
// <!--<label for="forgetCode" class="sr-only">验证码：</label>-->
// <!--<div class="col-sm-9 col-xs-9">-->
// <!--<input type="text" class="form-control" id="forgetCode" placeholder="请输入验证码" maxlength="4" describedby="code">-->
// <!--<span class="form-control-feedback" aria-hidden="true"></span>-->
//     <!--<span id="code" class="sr-only">(error)</span>-->
//     <!--</div>-->
//     <!--<div class="col-sm-3 col-xs-2 Btncode">获取验证码</div>-->
//     <!--</div>-->

// 验证码判断
function reg(){
    if(txtCode==''|| txtCode != srCode){
        $("#txtCode").parent().parent().addClass("has-error");
        $("#txtCode").siblings(".form-control-feedback").text("验证码错误");
        return false;
    }else{
        $("#txtCode").parent().parent().removeClass("has-error");
        $("#txtCode").siblings(".form-control-feedback").text("");
    }
}

// 页面完成时
$(function(){
        // 初次生成验证码
        srCode = code(".btnCode");
        $(".Btncode").on('click',function(){
            srCode = code();
            console.log(srCode);
        });

})
// // 生成验证码
function code(){
    var color = "#";
    var str = "";
    var result ="";
    var RanColor = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'];
    for(var i=0;i<4;i++){
        var randomNum = Math.floor(Math.random()*10);
        str += randomNum;
    }
    for(var j =0;j<str.length;j++){
        for(var i = 0;i<6;i++){
            var Num = Math.floor(Math.random()*RanColor.length);
            color +=RanColor[Num];
        }
        // console.log(str.charAt(j));
        var code = str.charAt(j);
        code = code.fontsize(Math.random()*4+1+"px");
        code = code.fontcolor(color);
        result +=  code;
    }
    $(".Btncode").html(result);
    return str;
}