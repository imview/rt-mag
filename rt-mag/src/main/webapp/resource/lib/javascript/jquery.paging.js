(function ($) {
    $.fn.jpaging = function (settings) {
        //设置默认值
        jpaging.setConfig(settings);
        //设置分页table
        jpaging.setConfig({ tableDoc: $(this) });
        //生成分页控件
        jpaging.createPaging();

    };
})(jQuery);

var jpaging = {
    loading: function (container) {
        $("#" + (container || "container")).html('<tr><td colspan="20"><div id="loading" class="center">加载中...<div class="center"></div></div></td></tr>');
    },
    setConfig: function (config) {
        $.extend(jpaging.config, config);
        return jpaging.config;
    },
    config: {
        params: '', //查询参数
        pageIndex: 1, //当前页码
        pageSize: 10, //每页显示笔数
        pageCount: 0, //总笔数
        url: '_QueryPaging', //数据源地址
        numberOfPages: 0, //显示分页按钮数量
        pageStatu: 0, //默认为0 使用规则-当页面出现多个分页条码  可以改变这个状态 便于分页 不至于使原始正常分页条混乱
        callback: function () { },
        container: "container",
        tableDoc: ""
    },
    moveFirst: function () {
        jpaging.asnyloadc(1);
    },
    asnyloadc: function (thiIndex) {
        jpaging.loading();
        if (jpaging.config.url) {
            jpaging.config.tableDoc.parent().find(".pagination>ul>li").addClass('active');
            jpaging.config.tableDoc.parent().find(".pagination>ul").find("#liload").show();
            var param = 'ra=' + RandomNumber() + jpaging.config.params + '&pPageIndex=' + thiIndex;
            $.ajax({
                type: "POST",
                url: jpaging.config.url,
                data: param,
                success: function (msg) {
                    jpaging.config.tableDoc.find('tbody').html(msg);
                    
                    //将当前页码设置为本次页码
                    jpaging.config.pageIndex = thiIndex;
                    //为当前页码设置总数
                    if ($("#pCount").val() != null) {//当同一页需要弹出框再次分页的时候 避免冲突定义变量为 pCount
                        jpaging.config.pageCount = $("#pCount").val();
                    }
                    else {
                        jpaging.config.pageCount = $("#iCount").val();
                    }
                    if (jpaging.config.pageStatu == 1) {
                        jpaging.config.pageCount = $("#DCount").val();
                    }
                    if (jpaging.config.pageStatu == 2) {
                        jpaging.config.pageCount = $("#HCount").val();
                    }
                    jpaging.createPaging();

                    if (msg.indexOf('id="iCount" value="0"') > 0) {
                        jpaging.config.tableDoc.find('tbody').html('<tr><td colspan="20"><div class="center">暂无数据<div class="center"></div></div></td></tr>');
                    }

                    jpaging.config.callback();
                },
                error: function (e) {
                    jpaging.config.tableDoc.parent().find('#' + thiIndex).parent().removeClass('active');
                    jpaging.config.tableDoc.parent().find('#' + thiIndex).unbind('click').bind('click', function () {
                        jpaging.asnyloadc($(this).attr('id'));
                    });
                }
            });
        }
    },
    /// <summary>
    /// 根据总笔数/当前页码/每页显示笔数生成paging控件
    /// </summary>
    createPaging: function () {
        jpaging.config.tableDoc.parent().find('.pagination').remove();
        var pagingHtml = new Array();
        pagingHtml.push('<div class="pagination pagination-centered"><ul>');

        var startPage = '<li><a style="cursor:pointer;" id=' + (parseInt(jpaging.config.pageIndex) - 1) + '>上一页</a></li>';
        var endPage = '<li><a style="cursor:pointer;" id=' + (parseInt(jpaging.config.pageIndex) + 1) + '>下一页</a></li>';
        var loadPage = '<li class="active" id="liload" style="display:none;"><a><img id="imgload" src="../lib/css/imgs/ajax-loaders/ajax-loader-1.gif"></a></li>';

        var allPages = 0; //总页数
        var beginCount = 0; //当前页前面的页数
        var endCount = 0; //当前页后面的页数       
        //计算总页数
        if (jpaging.config.pageSize > 0) {
            allPages = jpaging.config.pageCount / jpaging.config.pageSize;
            allPages = jpaging.config.pageCount % jpaging.config.pageSize != 0 ? allPages + 1 : allPages;
            allPages = allPages == 0 ? 1 : allPages;
            allPages = parseInt(allPages);
        }
        //中间页起始序号
        beginCount = parseInt(jpaging.config.pageIndex) + 5 > allPages ? allPages - 9 : parseInt(jpaging.config.pageIndex) - 4;
        //中间页终止序号
        endCount = parseInt(jpaging.config.pageIndex) < 5 ? 10 : parseInt(jpaging.config.pageIndex) + 5;
        //为了避免产生负数,如果小于1则从序号1开始
        beginCount = beginCount < 1 ? 1 : beginCount;
        //页码+5可能超出总页数,要将其控制在总页数之内
        endCount = endCount >= allPages ? allPages : endCount;
        if (jpaging.config.numberOfPages) {
            endCount = jpaging.config.numberOfPages;
        }
        //总数为0/只有一页数据的時候
        if (jpaging.config.pageCount == 0 || allPages == 1) {
            startPage = '<li class="active"><a  style="cursor:pointer;" id=' + (parseInt(jpaging.config.pageIndex) - 1) + '>上一页</a></li>';
            endPage = '<li class="active"><a style="cursor:pointer;" id=' + (parseInt(jpaging.config.pageIndex) + 1) + '>下一页</a></li>';
        }
        else if (parseInt(jpaging.config.pageIndex) - 1 <= 0)//沒有上一页的情況
        {
            startPage = '<li class="active"><a style="cursor:pointer;" id=' + (parseInt(jpaging.config.pageIndex) - 1) + '>上一页</a></li>';
            endPage = '<li><a style="cursor:pointer;" id=' + (parseInt(jpaging.config.pageIndex) + 1) + '>下一页</a></li>';
        }
        else if (parseInt(jpaging.config.pageIndex) + 1 > allPages)//沒有下一页的情況
        {
            startPage = '<li><a style="cursor:pointer;" id=' + (parseInt(jpaging.config.pageIndex) - 1) + '>上一页</a></li>';
            endPage = '<li class="active"><a style="cursor:pointer;" id=' + (parseInt(jpaging.config.pageIndex) + 1) + '>下一页</a></li>';
        }

        pagingHtml.push(startPage);

        //中间页处理，这个增加时间复杂度，减小空间复杂度
        if (beginCount > 1) {
            pagingHtml.push('<li><a style="cursor:pointer;" id="1">1</a></li>');
            pagingHtml.push('<li><a>..</a></li>');
        }
        for (var i = beginCount; i <= endCount; i++) {
            pagingHtml.push(parseInt(jpaging.config.pageIndex) == i ? '<li class="active"><a style="cursor:pointer;" id=' + i + '>' + i + '</a></li>' : '<li><a style="cursor:pointer;" id=' + i + '>' + i + '</a></li>');
        }
        if (endCount < allPages) {
            pagingHtml.push('<li><a>..</a></li>');
            pagingHtml.push('<li><a style="cursor:pointer;" id=' + allPages + '>' + allPages + '</a></li>');
        }

        pagingHtml.push(endPage);
        pagingHtml.push(loadPage);
        //            pagingHtml.push('</ul></div>');
        pagingHtml.push('<li  class="active" disabled="disabled" ><a>总共：' + jpaging.config.pageCount + '条</a></li></ul></div>');

        jpaging.config.tableDoc.after(pagingHtml.join(''));
        //绑定页码按鈕事件
        jpaging.config.tableDoc.parent().find(".pagination>ul>li[class!='active']>a").unbind('click').bind('click', function () {
            if ($(this).text() != '..') {
                jpaging.asnyloadc($(this).attr('id'));
            }
        });
    },
    refresh: function () {
        var index = $("#iIndex").val();
        jpaging.asnyloadc(index);
    }
};