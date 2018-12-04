var ue = UE.getEditor('Atitle',{
    toolbars:[
        ['forecolor']
    ],
    maximumWords:16,
    elementPathEnabled:false
});
var ue1 = UE.getEditor('Azhaiyao',{
    toolbars:[
        ['bold','italic']
    ],
    maximumWords:260,
    elementPathEnabled:false
});
var Acont = UE.getEditor('Acont');

function tiajia(){
    if(!ue.hasContents()){
        $('.alertCont').show(300).text('请输入标题').delay(3000).hide(300);
        return false;
    }
    if(!ue1.hasContents()){
        $('.alertCont').show(300).text('请输入摘要').delay(3000).hide(300);
        return false;
    }
    if(!Acont.hasContents()){
        $('.alertCont').show(300).text('请输入内容').delay(3000).hide(300);
        return false;
    }

    if($('#leixing').val()==0){
        $('.alertCont').show(300).text('请选择类型').delay(3000).hide(300);
        return false;
    }

    var lxTxt = $('#leixing  option:selected').val();
    var url = "http://192.168.0.1";
    $.ajax({
        type:"POST",
        url:url,
        data:{
            title:ue.getContentTxt(),
            zhaiyao:ue1.getContentTxt(),
            cont:Acont.getContent(),
            leixing:lxTxt
        },
        dateType:"JSON",
        success:function(wenzhang){

        },
        error:function(wzerroe){

        }
    })

}
