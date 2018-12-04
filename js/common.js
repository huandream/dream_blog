$(function () {
        // 右侧高度
        var h = $(".cont_left").height();
        $(".cont_right").css("height",h);

        // 导航部分
        var headers = '<h2>追幻梦</h2>';
        headers += '<p>影子是一个会撒谎的精灵，它在虚空中流浪和等待被发现之间;在存在与不存在之间....</p>'
        headers += '<div class="logo">';
        headers += '<a href="index.html"></a>';
        headers += '</div>';
        headers += '<div class="nav">';
        headers += '<ul>';
        headers += '<li class="offset"><a href="/dream_blog/index.html" class="sy">首页</a></li>';
        headers += '<li><a href="/dream_blog/about.html" class="gyw">关于我</a></li>';
        headers += '<li><a href="/dream_blog/mansh.html" class="msh">慢生活</a></li>';
        headers +='<li class="offset-right"><a href="/dream_blog/LogOn/Index.html">登录</a></li>';
        headers += '</ul>';
        headers += '</div>';
        $('#header').html(headers);

        // 导航焦点
        var url = location.href;
        var str = url.split("/");
        var Txt = str[str.length-1];
        var result1 = Txt.search(/index.html/);
        var result2 = Txt.search(/about.html/);
        var result3 = Txt.search(/mansh.html/);
        if(result1!=-1){
            $(".sy").addClass("active");
        }
        if(result2!=-1){
            $(".gyw").addClass("active");
        }
        if(result3!=-1){
            $(".msh").addClass("active");
        }

        // 导航js
        $(".one").hover(function () {
            $(this).find(".smallo_icon").stop().fadeIn().css("display", "inline-block");
            $(this).find(".nei").css("background", "rgba(0,0,0,.8)")
        }, function () {
            $(this).find(".smallo_icon").stop().fadeOut();
            $(this).find(".nei").css("background", "rgba(0,0,0,.3)")
        });

        $(".one_cont .miniature").hover(function () {
            $(this).find("img").addClass("hover");
        }, function () {
            $(this).find("img").removeClass("hover");
        });

        $(".banner .en").hover(function () {
            $(".banner .en").addClass("hover");
        }, function () {
            $(".banner .en").removeClass("hover");
        });

        $(".banner .zh").hover(function () {
            $(".banner .zh").addClass("hover");
        }, function () {
            $(".banner .zh").removeClass("hover");
        });

        $(".content .cont_right .headPhoto").hover(function () {
            $(this).find("p").stop().animate({bottom: "0px"});
        }, function () {
            $(this).find("p").stop().animate({bottom: "-70px"});
        });

    }
);