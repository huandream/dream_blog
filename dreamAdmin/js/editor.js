var ue = UE.getEditor('Atitle', {
    toolbars: [
        ['forecolor']
    ],
    maximumWords: 16,
    elementPathEnabled: false
});

var ue1 = UE.getEditor('Azhaiyao', {
    toolbars: [
        ['bold', 'italic']
    ],
    maximumWords: 260,
    elementPathEnabled: false
});

var Acont = UE.getEditor('Acont');

$(function () {
    ue.ready(function () {
        ue.setContent('我是标题');
    });
    ue1.ready(function () {
        ue1.setContent('我是摘要');
    });
    $('#leixing  option:selected').text("日记").val("日记");
    var host = location.href;
    var url = host + '/upload';
    $('#slt').fileupload({
        url: url,
        acceptFileTypes: /(gif|jpe?g|png)$/i,//验证图片格式
        maxNumberOfFiles: 1,//最大上传文件数目
        maxFileSize: 1000000, // 文件上限1MB
        minFileSize: 100,//文件下限  100b
        dataType: 'json',
        add: function (e, data) {
            // data.context = $('<p/>').text('Uploading...').appendTo(document.body);
            console.log(getObjectURL(data.files[0]));
            $('#preview img').attr('src', getObjectURL(data.files[0]));
            data.submit();
        },
        done: function (e, data) {
            var json = $.parseJSON(data.result);
            console.log(json);
            console.log(json[0].delete_url);
        }
    });

})

Acont.ready(function () {
    Acont.setContent('我是内容');
});

function tiajia() {
    if (!ue.hasContents()) {
        $('.alertCont').show(300).text('请输入标题').delay(3000).hide(300);
        return false;
    }
    if (!ue1.hasContents()) {
        $('.alertCont').show(300).text('请输入摘要').delay(3000).hide(300);
        return false;
    }
    if (!Acont.hasContents()) {
        $('.alertCont').show(300).text('请输入内容').delay(3000).hide(300);
        return false;
    }

    if ($('#leixing').val() == 0) {
        $('.alertCont').show(300).text('请选择类型').delay(3000).hide(300);
        return false;
    }

    var lxTxt = $('#leixing  option:selected').val();
    var url = "http://192.168.0.1";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            title: ue.getContentTxt(),
            zhaiyao: ue1.getContentTxt(),
            cont: Acont.getContent(),
            leixing: lxTxt
        },
        dateType: "JSON",
        success: function (wenzhang) {

        },
        error: function (wzerroe) {

        }
    })
}
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}
