(function ($) {
    $.fn.tableColFmt = function (settings) {
        tableColFmt.setConfig(settings);
        tableColFmt.setTableColFmt();
    };
})(jQuery);

var tableColFmt = {
    setConfig: function (config) {
        $.extend(tableColFmt.config, config);
        return tableColFmt.config;
    },
    config: {
    //ID: ""
},
setTableColFmt: function () {

    var _t = $("table tr td");
    var _r = $("table tr");
    var datatype;
    if (_t.length > 1) {
        debugger;
        var columns = _t.length / (_r.length - 1);
        for (var i = 1; i <= columns; i++) {
            $("table tr td:nth-child(" + i + ")").each(function () {
                datatype = $.trim($(this).attr('ucstablefmt'));
                var value = $.trim($(this).html());
                var fmt = $.trim($(this).attr('fmt'));
                var align = $(this).attr('align') == null ? "left" : $.trim($(this).attr('align'));
                var decimals = $(this).attr('decimals') == null ? 0 : $(this).attr('decimals');
                switch (datatype) {
                    case "int":
                        $(this).css("text-align", align);
                        break;
                    case "number":
                        value = parseFloat(value).toFixed(decimals);
                        $(this).html(value + fmt);
                        $(this).css("text-align", align);
                        $(this).attr("title", value + fmt);
                        break;
                    case "decimals":
                        value = parseFloat(value).toFixed(decimals);
                        value = MoneyShow(value);
                        if (fmt == '￥') {
                            $(this).html(fmt + value);
                            $(this).attr("title", fmt + value);
                        } else {
                            $(this).html(value + fmt);
                            $(this).attr("title", value + fmt);
                        }
                        $(this).css("text-align", align);
                        break;
                    case "date":
                        if (fmt.length > 0) {
                            value = StrToDate(value).formatDate(fmt);
                            $(this).html(value);
                        }
                        $(this).css("text-align", align);
                        $(this).attr("title", value);
                        break;
                    default:
                        $(this).css("text-align", align);
                        var alen = $(this).find("a");
                        if (alen.length > 0) $(this).attr("title", $.trim($(this).find("a").html()));
                        else $(this).attr("title", value);
                        break;
                }
            });
        }
    }
}
}