/*
* updateTime:20180516
* 20180516 更新pPageSize、pPageIndex参数为pageSize、pageIndex
*/

//field
; (function ($) {
    var ucsfield = function (ele, opt) {
        this.$element = ele;
        this.defaults = {
            id: "",
            name: "",
            field: ele,
            size: "small",
            labelText: "",
            onfocus: function () { WdatePicker({ startDate: '%y-%M-01', dateFmt: 'yyyy-MM-dd', alwaysUseStartDate: true }) },
            unit: 1,
            value: '',
            disabled: false,
            layout: '',
            unitText: "",
            isSearch: false,
            valueType: "",
            formId:null,
            callback: null//加载完成后，回调
        }
        this.options = $.extend({}, this.defaults, opt);
    }

    ucsfield.prototype = {
        init: function (xtype) {
            $.extend(this.options, { xtype: xtype });
            if (this.options.name == '') {
                this.options.name = this.options.id;
            }
            //设置大小
            var size = 'input-small';
            switch (this.options.size) {

                case "big":
                    size = 'input-large';
                    break;
                default:
                    size = 'input-small';
                    break;
            }

            var labelText = '';
            if (this.options.labelText != '')
                labelText = this.options.labelText + '：';

            switch (this.options.layout) {
                case 'div-v'://纵向排列
                    this.options.field.css("width", "400px");
                    size = 'input-large';
                    this.options.field.append('<label class="control-label">' + labelText + '</label><div class="controls"></div>');
                    $ele = this.$element.find(".controls");
                    labelText = "";
                    break;
                case 'table':
                    this.options.field.css('float', 'left').css("margin-left", "20px");
                    //if (this.options.labelWidth > 0) {
                    //    labelText = '<label style="width:' + this.options.labelWidth + 'px" >' + labelText + '</label>';
                    //}
                    //else {
                    //    labelText = '<label >' + labelText + '</label>'; 
                    //}
                    $ele = this.$element;
                    break;
                default://横向排列
                    this.options.field.css('float', 'left').css("width", "270px");
                    this.options.field.append('<label class="control-label">' + labelText + '</label><div class="controls"> </div>');
                    $ele = this.$element.find(".controls");
                    labelText = "";
                    break;


                    //                  this.options.field.css('float', 'left').css("margin-left","20px"); 
                    //                   if(this.options.labelWidth > 0){
                    //                         labelText='<label style="width:'+this.options.labelWidth+'px" >'+ labelText +'</label>';
                    //                   }
                    //                      else
                    //                     {
                    //                      labelText='<label >'+ labelText +'</label>';
                    //                     }
                    //                    $ele = this.$element;
                    // break;
            }


            var content = '<input name="' + this.options.name + '" type="text" class="' + size + '"  id="' + this.options.id + '" value="' + this.options.value + '">';



            if (xtype == "ucsfield.combobox") {

                if (this.options.multiSelect) {
                    $ele.append(labelText + '<input id="' + this.options.id + '_1' + '" type="text"  class="' + size + '" style="border:none;outline:none;"/>');
                    $ele.append('<input id="' + this.options.id + '"  name="' + this.options.name + '"   type="hidden" />');
                    $ele.append('<input id="' + this.options.id + 'def" type="hidden" />');
                    $ele.append('<div class="list"></div>');
                } else {
                    if (this.options.isSearch) {
                        $ele.append(labelText + '<input id="' + this.options.id + '_1' + '" type="text"  class="' + size + '" style="border:none;outline:none;"/>');
                        $ele.append('<input id="' + this.options.id + '"  name="' + this.options.name + '"   type="hidden" />');
                        $ele.append('<div class="list"></div>');
                    }
                    else {
                        $ele.append(labelText + '<select name="' + this.options.name + '" id="' + this.options.id + '" class="' + size + '"  ></select>');
                    }
                }
               
            }
            else if (xtype == "ucsfield.number") {

                var defaultNumberConfig = {
                    allowDecimals: false,
                    decimalPrecision: 2
                };
                var value = 0;
                if (this.options.value != '')
                    value = this.options.value;


                this.options = $.extend({}, defaultNumberConfig, this.options);

                if (this.options.allowDecimals) {
                    if (this.options.decimalPrecision)
                        value = value.toFixed(this.options.decimalPrecision);
                }
                content = '  <div class="input-prepend input-append num">   '
                + '<input type="button" value="-" class="add-on numDown" id="RateMinus" style="font-weight: bold;  width: 28px; height: 28px;"/>  '
                + '<input id="' + this.options.id + '" value="' + value + '" name="' + this.options.name + '" type="text" class="' + size + '" style="  text-align: center; margin-left: -5px"  />  '
                + '  <input type="button" value="+" class="add-on numUp" id="RatePlus" style="cursor: pointer; font-weight: bold; width: 28px; height: 28px; margin-left: -5px"> </div>';
                $ele.append(labelText + content);

            }
            else {
                $ele.append(labelText + content);
            }


            switch (xtype) {
                case "ucsfield.number":
                    createNumberField(this.options);
                    break;

                case "ucsfield.combobox":
                    var defaultComboboxConfig = {
                        allText: "全部"
                    };

                    $.extend(this.options, defaultComboboxConfig);
                    createComboboxField(this.options, this.$element);
                    break;

                case "ucsfield.date":
                    if (this.options.onfocus) {
                        $("#" + this.options.id).on("focus", this.options.onfocus)
                    }
                    if (this.options.callback) {
                        this.options.callback
                    }
                    else if (this.options.CallBack) {
                        this.options.CallBack();//
                    }
                    break;

                case "ucsfield.text":
                    createTextField(this.options, this.$element);
                    break;

                default:
                    break;
            }

            if (this.options.disabled)
                $("#" + this.options.id).attr("disabled", "disabled");

            if (this.options.unitText && (this.options.layout == "table" || this.options.layout == "div-v"))
                $("#" + this.options.id).after('<span>' + this.options.unitText + '</span>');
        },
        getValue: function () {
            return $('#' + this.options.id).val();
        },
        setValue: function (value) {

            switch (this.options.xtype) {
                case 'ucsfield.number':
                    $('#' + this.options.id).val(value);
                    break;
                case 'ucsfield.combobox':
                    if (this.options.multiSelect) {
                        //加载勾选项
                        var seledArr = new Array();
                        if (value.length > 0) {
                            seledArr = value.split(",");
                        }

                        $('li input[type="checkbox"]', $('.list ul')).removeAttr("checked");
                        var vArr = new Array();
                        $.each(seledArr, function (index) {
                            var $ul = $('.list ul');
                            $('li input[type="checkbox"]', $ul).removeAttr("checked");
                            $("li input[value='" + seledArr[index] + "']", $ul).attr("checked", "checked");
                            $("input[class!='selectAll']:checked", $ul).each(function (index) {
                                vArr[index] = $(this).next().text();
                            });
                        });
                        $('#' + this.options.id + '1').val(vArr.join(","));
                        $('#' + this.options.id).val(value);
                    } else {
                        this.$element.find('select').val(value);
                    }
                    break;
                default:
                    $('#' + this.options.id).val(value);
                    break;
            }
        },
        refresh:function(url){
        	 if(url)
        		 this.options.url=url; 
        	 
        	 $("#"+this.options.id).html("");
        	 createComboboxField(this.options, this.$element);
        },
        setWidth:function(width){ 
        	$("#"+this.options.id+"1").css("width",width+"px");
        	$("#"+this.options.id+"_search").css("width",(width-20)+"280px");
        	$("div.list").css("width",width+"3px");
        }
    }


    $.fn.ucsfield = function (xtype, options) {

        //
        var field = new ucsfield(this, options);
        field.init(xtype);
 
        $(this).data("_ucsfield", field);

        return field;
    }


    $.fn.getUcsfield = function () {
        return $(this).data("_ucsfield");
    }

    //数值控件
    function createNumberField(config) {

        //限制文本框只允许输入数字,屏蔽输入法切换
        $("#" + config.id).keypress(function (event) {
            var keyCode = event.keyCode || event.which;
            var oval = $("#" + config.id).val();
            if (keyCode == 53)//删除键不受限制
                return true;

            if (!config.allowDecimals) {

                if (keyCode == 46)
                    return false;
            } else {

                if (config.decimalPrecision) {
                    var i = oval.indexOf('.');
                    if (oval.length <= 0 && keyCode == 46)
                        return false;
                    if (i != -1 && oval.length - i > config.decimalPrecision)
                        return false;
                }
            }

            if (oval.indexOf(".") > 0 && keyCode == 46) {
                return false;
            }
            if (keyCode == 8 || keyCode == 46 || (keyCode >= 48 && keyCode <= 57))
                return true;
            else
                return false;
        }).focus(function () {
            this.style.imeMode = 'disabled';
        }).blur(function () {
            var value = $(this).val();

            if (isNaN(value) || value == '')
                value = 0;
            var reg = new RegExp("^-?[1-9]\\d*$|([+-]?)\\d*\\.\\d+$").test(value);
            if (!reg) {
                $(this).val(0);
                return false;
            }


            var decimalPrecision = 0;
            if (config.allowDecimals) {
                if (config.decimalPrecision) {
                    decimalPrecision = config.decimalPrecision;
                }

                value = parseFloat(value);
            }
            else {
                value = parseInt(value);
            }

            if (config.minValue != undefined) {
                if (config.minValue > value) {
                    alert("不能输入小于" + config.minValue + '的数');
                    $(this).val(config.minValue.toFixed(decimalPrecision));
                    return;
                }
            }

            if (config.maxValue != undefined) {
                if (config.maxValue < value) {
                    alert("不能输入大于" + config.maxValue + '的数');
                    $(this).val(config.maxValue.toFixed(decimalPrecision));
                    return;
                }
            }

        });



        $(".numDown", config.field).mousedown(function () {
            var $me = $(this).next();
            var n = $me.val();
            var decimalPrecision = 0;
            if (config.allowDecimals) {
                if (config.decimalPrecision) {
                    decimalPrecision = config.decimalPrecision;
                }
                n = parseFloat(n);
            }
            else
                n = parseInt(n);

            if (config.unit)
                var num = n - config.unit;

            if (config.minValue != undefined) {
                if (num < config.minValue) {
                    $me.val(config.minValue.toFixed(decimalPrecision));
                    return;
                }
            }
            num = num.toFixed(decimalPrecision);
            $me.val(num);
            if (config.callback) {
                config.callback();
            }
            else if (config.CallBack) {
                config.CallBack();//
            }
        });


        $(".numUp", config.field).mousedown(function () {
            var $me = $(this).prev();
            var n = $me.val();
            var decimalPrecision = 0;
            if (config.allowDecimals) {
                if (config.decimalPrecision) {
                    decimalPrecision = config.decimalPrecision;
                }

                n = parseFloat(n);
            }
            else
                n = parseInt(n);
            var num = n + config.unit;
            if (config.maxValue != undefined) {
                if (num > config.maxValue) {
                    $me.val(config.maxValue.toFixed(decimalPrecision));
                    return;
                }
            }
            num = num.toFixed(decimalPrecision);
            $me.val(num);
        });

    }

    //文本控件
    function createTextField(config) {
        if (config.callback)
            config.callback();
        else if (config.CallBack) {
            config.CallBack();//
        }
    }

    //下拉框控件
    function createComboboxField(config, ele) {

        if (config.url) {
            $.ajax({
                type: "POST",
                async: false,
                url: config.url,
                data: {},
                success: function (data) {
                    initComboboxField(config, data, ele);
                    if (config.callback)
                        config.callback();
                    else if (config.CallBack) {
                        config.CallBack(); //
                    }
                },
                error: function (e) {
                    // createComboboxField(defaultComboboxConfig, []);
                    alert('获取数据出现异常，请重新刷新页面');
                }
            });
        }
        else if (config.data) {
            initComboboxField(config, config.data, ele);
            if (config.callback)
                config.callback();
            else if (config.CallBack) {
                config.CallBack();//
            }
        } else {
            $.ajax({
                type: "POST",
                async: false,
                url: umGlobal.basePath+"/common/getEnums",
                data: {
                    targetAction: config.optionName,
                    ignoreValue: config.ignoreValue,
                    valueType: config.valueType
                },
                success: function (result) {
                    //var result = JSON.parse(res);

                    if (result.dicData == null)
                        return;

                    var data = result.dicData[config.optionName]; //JSON.parse(res).DicData[defaultComboboxConfig.optionName];
                    //数据筛选
                    initComboboxField(config, data, ele);
                    if (config.callback)
                        config.callback();
                    else if (config.CallBack) {
                        config.CallBack(); //
                    }
                },
                error: function (e) {
                    // createComboboxField(defaultComboboxConfig, []);
                    alert('获取枚举数据出现异常，请重新刷新页面');
                }
            });
        }
    }

    function initComboboxField(config, listArr, $ele) {
        var comboboxHtml = new Array();
        var size = 'input-small';
        var divlistWidth = 140;
        var inputWidth = 110;
        switch (config.size) {
            case "small":
                break;
            case "big":
                size = 'input-large';
                divlistWidth = 210;
                inputWidth = 180;
                break;
            default:
                break;
        }
        var $ul;
        var $hf;
        var $this;
        var $def;
        //是否含有排除值
        var isHasigoreValue = true;
        if (!config.ignoreValue)
            config.ignoreValue = '';
        //存在全部的选项
        if ((","+config.ignoreValue+",").indexOf(',-1,') < 0) {
            isHasigoreValue = false;
        }

        if (config.isSearch||config.multiSelect) {
            $ele.append(comboboxHtml.join(''));

            $hf = $("#" + config.id); //指向隐藏控件存
            $this = $("#" + config.id+"_1"); //指向text
            $def = $('#' + config.id + 'def');
            var conSelector = "#" + $this.attr("id") + ",#" + $hf.attr("id") + ",#" + $def.attr('id');
            $this.attr("readonly", true);
            $this.addClass("searchSelet-input")

            var $wraper = "";
            $wraper = $(conSelector).wrapAll("<div id='" + config.id + "_div1'><div id='" + config.id + "_div2' style='border:1px solid #DEDEDE;'></div></div>").parent().parent().addClass(size);

            var $list = $('<div class="list" style="width:'+divlistWidth+'px;max-height:300px;"></div>', $ele).appendTo($wraper);

            $("#" + config.id + "_div2").append('<span class="caret" style="vertical-align: middle;"> </span>');

            //$list.css({ "width": $this.width() + 10 });
            $this.width(inputWidth);


            //控制弹出页面的显示与隐藏
            $this.click(function (e) {

                $(".list").hide();
                $list.toggle(10, function () {
                    $("#" + config.id + "_search").focus();
                    $("#" + config.id + "_search").val("");
                });
                //var obj = $this.offset();
                //var top = obj.top;
                //var left = obj.left;
                //var height = $this.height();
                //var bottom = top + height+10;
                //$list.css("left", left);
                //$list.css("top", bottom);//对下拉框进行定位
                e.stopPropagation();
            });

            $(document).click(function () {
                $list.hide();
            });

            $list.filter("*").click(function (e) {
                e.stopPropagation();
            });
           

            //加载默认数据
            if (listArr.length > 0) {

                //下拉框查询功能
                if (config.isSearch) {
                    var searchWidth = divlistWidth - 40;

                    $list.append('<ul><li ><input type="text" id="' + config.id + '_search" style="width:' + searchWidth + 'px;" /></li></ul>');

                    var temp = "";
                    setInterval(function () {
                        var $input = $("#" + config.id + "_search");
                        var keyWord = $.trim($input.val());
                        if (keyWord == temp)
                            return;
                        else {
                            temp = keyWord;
                        }
                        var $li = $($ele.find("." + size + " .list ul.main")).find("li");

                        $li.each(function (index, item) {
                            var reg = new RegExp(keyWord, "gi");
                            var flag = reg.exec($(item).text());
                            if (flag) {
                                $(item).show();
                            } else {
                                $(item).hide();
                            }
                        });
                    }, 500);

                }

                $list.append('<ul class="main"></ul>');

                $ul = $list.find("ul.main");
            }

        }

        if (config.multiSelect) {
            $this.css("background-color", 'white');//设置背景色为白色
            if (!isHasigoreValue) {
            	$ul.append('<li><input type="checkbox" id="selectAll" class="selectAll" value="-1" /><span>全部</span></li>');
            }
            //加载json数据 
            for (var i = 0; i < listArr.length; i++) {
                $ul.append('<li style="white-space:nowrap"><input type="checkbox" value="' + listArr[i].value + '" /><span>' + listArr[i].text + '</span></li>');
            }

            //加载勾选项
            var seledArr;
            if (config.value) {
                if (config.value.length > 0) {
                    seledArr = config.value.split(",");
                }

                $.each(seledArr, function (index) {

                    $("li input[value='" + seledArr[index] + "']", $ul).attr("checked", "checked");
                    var vArr = new Array();
                    $("input[class!='selectAll']:checked", $ul).each(function (index) {
                        vArr[index] = $(this).next().text();
                    });

                    $this.val(vArr.join(","));
                });
                $hf.val(config.value);
                $def.val(config.value);
            }

            //全部选择或全不选
            $("#selectAll").click(function () {
                if ($(this).attr("checked")) {
                    $("li input", $ul).attr("checked", "checked");
                } else {
                    $("li input", $ul).removeAttr("checked");
                }
            });

            //点击其它复选框时，更新隐藏控件值,文本框的值
            $("li", $ul).click(function () {

                var $input =$($(this).find("input"));
                if($input.attr("checked")){
                    $input.removeAttr("checked");
                }
                else{
                    $input.attr("checked","checked");
                }
                renderValue($ul,$hf,$this);
            });

            $("li input", $ul).click(function(event){
                event.stopPropagation();
                renderValue($ul,$hf,$this);
            });
        }
        else { //单选下拉框

            //带搜索功能
            if (config.isSearch) {
                $this.css("background-color", 'white');//设置背景色为白色
                var index = 0;
                if (!isHasigoreValue) {
                    $ul.append('<li><input type="hidden" name="optionValue" class="selectAll" value="-1" /><span>全部</span></li>');
                }
                //加载json数据 
                for (var i = 0; i < listArr.length; i++) {
                    $ul.append('<li style="white-space:nowrap"><input type="hidden" name="optionValue"  value="' + listArr[i].value + '" /><span>' + listArr[i].text + '</span></li>');
                }
                //对单行下拉框进行选择【绑定事件】
                $ul.find('li').bind('click', function () {
                    var valHidden = $(this).find('input[name="optionValue"]').val();
                    var textSpan = $(this).find("span").html();
                    $("#" + config.id + "_1").val(textSpan);
                    $("#" + config.id).val(valHidden);
                    $ul.parent().hide();
                });

                //加载初始值
                var value = "";
                var text = "";
                if (config.value) {
                    var isFind = false;
                    $ul.find('li').each(function (item) {
                        if (!isFind) {
                            var optionValue = $(this).find('input[name="optionValue"]').val();
                            if (optionValue == config.value) {
                                value = optionValue;
                                text = $(this).find("span").html();
                                isFind = true;
                            }
                        }
                    });
                }
                else {
                    if (!isHasigoreValue) {
                        text = '全部';
                        value = "-1";
                    }
                }

                $hf.val(value);
                $this.val(text);


            }
            else { //不带搜索功能
                var HTML = "";
                if (listArr != '' || listArr.length > 0) {
                    if (!isHasigoreValue) {
                        HTML += '<OPTION selected value="-1">全部</OPTION>';
                    }

                    for (var i = 0; i < listArr.length; i++) {
                        HTML += '<option value="' + listArr[i].value + '"> ' + listArr[i].text + '</option>'
                        //comboboxHtml.push('<option value="' + listArr[i].value + '"> ' + listArr[i].text + '</option>');
                    }
                }
                //$ele.find('select').append(comboboxHtml.join(''));

                $ele.find('select').html(HTML);

                setTimeout(function () {
                    $ele.find('select').find("option").eq(0).click();
                }, 1000);

                if (config.value) {
                    $('option[value="' + config.value + '"]', $ele).attr('selected', true);
                    //$ele.find('select').val(config.selected);
                }
            }
        }       

        //对表单重置的事件加入处理函数,未传入formId的时候默认searchForm
        var formId = config.formId;
        if (formId == null) {
            formId = "searchForm";
        }
        var searchForm = $("#" + formId);
        if (searchForm.length > 0) {
            var hiddenInput = searchForm.find('input[id="' + config.id + '"]');
            if (hiddenInput.length > 0) {
                //对表单的重置事件加入处理函数
                searchForm.bind('reset', function () {
                    var defaultValue = "";
                    var defaultText = "";
                    if (!config.ignoreValue)
                        config.ignoreValue = '';
                    //存在全部的选项
                    if (config.ignoreValue.indexOf('-1') < 0) {
                        defaultValue = "-1";
                        defaultText = "全部";
                    }
                    if (config.multiSelect) {
                        $('#div' + config.name).getUcsfield().setValue(defaultValue);
                    }
                    else {
                        $hf.val(defaultValue); 
                    }
                });
            }
        }
    }

    function renderValue(ul,hf,txt){
        var kArr = new Array();
        var vArr = new Array();
        $("input[class!='selectAll']:checked", ul).each(function (index) {
            kArr[index] = $(this).val();
            vArr[index] = $(this).next().text();
        });
        hf.val(kArr.join(","));
        txt.val(vArr.join(","));
    }
})(jQuery);


//pager
; (function ($) {
    var ucspager = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                params: '', //查询参数
                pageIndex: 1, //当前页码
                pageSize: 10, //每页显示笔数
                pageCount: 0, //总笔数
                url: '_QueryPaging', //数据源地址
                numberOfPages: 0, //显示分页按钮数量
                callback: function () { },
                loadingContainer: "container",//展示loading效果的容器
                tableDoc: "",
                selPageSize: true, //是否可以选择每页展示条数 
                isFrozenTableHead: true,      //是否冻结头部默认是
                isOrderTableHead: true,       //是否排序头部 
                isFrozenTableCell: true,       //是否冻结列 
                isCellHidden: true,             //列隐藏
                isTableCellMove: true,
                isLoadTableWidthSet: false,
                isReSetScroll:true
                //id: "" //DIV id
            }; 
            this.options = $.extend({}, this.defaults, opt);
    };
    ucspager.prototype = {
        setConfig: function (config) {
            $.extend(this.options, config);
            return this;
        },
        //跳转第一页
        moveFirst: function () {
            asyncload(this, 1);
        },
        //刷新当前页
        refresh: function () {
            var index = this.options.tableDoc ? 1 : this.options.tableDoc.find("#iIndex").val();
            asyncload(this, index);
        },
        init: function () {
            createPager(this);

            $().ucsTableBase.pagerLoad(this.options);
        }
    };

    $.fn.ucspager = function (options) {
        var config = {
            tableDoc: $(this),
            id: $(this).attr("id") || ""
        };
        $.extend(config, options);
        var ucspag = new ucspager(this, config);
        ucspag.init();
        //调用其方法
        $(this).data('_ucspager', ucspag);
        return ucspag;
    };

    $.fn.getUcspager = function () {
        return $(this).data('_ucspager');
    }


    function loading(ucspag) {

        var cellCount = 0;
        try {

            $().ucsTableBase.closeFrozenCellDiv();
            //$("#oldTbFrozenCellDiv").hide();

            var table = $().ucsTableBase.feedbackMasterTable();
            cellCount = $(table).find("tr th[ishidden!=true]").length;

        }
        catch (e) { }

        if (cellCount == 0) {
            cellCount = $("table tr th").length;
        }

        // ucspag.options.tableDoc.find("#container").html('<tr><td colspan="' + $("table tr th").length + '"><div id="loading" class="center">加载中...<div class="center"></div></div></td></tr>');
        ucspag.options.tableDoc.find("table #container").html('<tr><td colspan="' + cellCount + '"><div id="loading" class="center">加载中...<div class="center"></div></div></td></tr>');

    }

    function ajaxSuccCallback(e) {
        //重设置表格
        $().ucsTableBase.reloadTableSetting({
            isFrozenTableHead: e.options.isFrozenTableHead,
            isOrderTableHead: e.options.isOrderTableHead,
            isFrozenTableCell: e.options.isFrozenTableCell,
            isCellHidden: e.options.isCellHidden,
            isTableCellMove: e.options.isTableCellMove,
            isLoadTableWidthSet: e.options.isLoadTableWidthSet,
            isReSetScroll:e.options.isReSetScroll
        });

    }

    function asyncload(ucspag, thisIndex) {

        //记录位置
        try {
            $().ucsTableBase.setNowScrollTop();

            //IE8(分页置顶不会消失)
            $().ucsTableBase.hideHeadFrozen();
        }
        catch (e) { }

        loading(ucspag);
        if (ucspag.options.url) {
            ucspag.options.tableDoc.next().find("ul>li").addClass('active');
            ucspag.options.tableDoc.next().find("ul").find("#liload").show();

            var param = "";
            if (typeof (ucspag.options.params) == "string") {
                param = ucspag.options.params + '&pageIndex=' + thisIndex + '&pageSize=' + ucspag.options.pageSize + '&ra=' + Math.random();
            }
            else if (typeof (ucspag.options.params) == "object") {
                param = { pageIndex: thisIndex, pageSize: ucspag.options.pageSize, ra: RandomNumber() };
                $.extend(param, ucspag.options.params);
            }
            $.ajax({
                type: "POST",
                url: ucspag.options.url,
                data: param,
                success: function (msg) {
                    ucspag.options.tableDoc.find('tbody').html(msg);

                    //将当前页码设置为本次页码
                    ucspag.options.pageIndex = thisIndex;
                    //为当前页码设置总数
                    ucspag.options.pageCount = ucspag.options.tableDoc.find("#iCount").val();
                    createPager(ucspag);

                    if (msg.indexOf('id="iCount" value="0"') > 0) {

                        var cellCount = 0;
                        try {
                            var table = $().ucsTableBase.feedbackMasterTable();
                            cellCount = $(table).find("tr th[ishidden!=true]").length;
                        } catch (e) { }
                        if (cellCount == 0) {
                            cellCount = $("table tr th").length;
                        }
                        ucspag.options.tableDoc.find('tbody').html('<tr><td colspan="' + cellCount + '"><div class="center">暂无数据<div class="center"></div></div></td></tr>');
                    }

                    ajaxSuccCallback(ucspag);

                },
                error: function (e) {
                    ucspag.options.tableDoc.parent().find('#' + thisIndex).parent().removeClass('active');
                    ucspag.options.tableDoc.parent().find('#' + thisIndex).unbind('click').bind('click', function () {
                        asyncload(ucspag, $(this).attr('id'));
                    });
                }
            });
        }
    }

    /// <summary>
    /// 根据总笔数/当前页码/每页显示笔数生成paging控件
    /// </summary>
    function createPager(ucspag) {
        if (ucspag.options.tableDoc.next().hasClass("pagination")) {
            ucspag.options.tableDoc.next().remove();
        }
        var pagingHtml = new Array();
        pagingHtml.push('<div class="pagination pagination-centered"><ul>');

        if (ucspag.options.selPageSize) {
            var selPageSizeHtml = '<li class="active" ><span href="javascript:void(0);">每页&nbsp;<select size="1" id="selPageSize" style="width:50px;margin-top:-3px" value="' + ucspag.options.pageSize + '"><option value="5">5</option><option value="10" selected="selected">10</option><option value="15">15</option><option value="20">20</option><option value="50">50</option></select>&nbsp;条</span></li>';
            pagingHtml.push(selPageSizeHtml);
        }

        var startPage = '<li><a style="cursor:pointer;" id=' + (parseInt(ucspag.options.pageIndex) - 1) + '>上一页</a></li>';
        var endPage = '<li><a style="cursor:pointer;" id=' + (parseInt(ucspag.options.pageIndex) + 1) + '>下一页</a></li>';
        
        var basePath="";
        if(umGlobal!=undefined&&umGlobal.basePath!=undefined){
        	basePath=umGlobal.basePath;
        }
        var loadPage = '<li class="active" id="liload" style="display:none;"><a><img id="imgload" src="'+basePath+'/lib/css/imgs/ajax-loaders/ajax-loader-1.gif"></a></li>';

        var allPages = 0; //总页数
        var beginCount = 0; //当前页前面的页数
        var endCount = 0; //当前页后面的页数       
        //计算总页数
        if (ucspag.options.pageSize > 0) {
            allPages = ucspag.options.pageCount / ucspag.options.pageSize;
            allPages = ucspag.options.pageCount % ucspag.options.pageSize != 0 ? allPages + 1 : allPages;
            allPages = allPages == 0 ? 1 : allPages;
            allPages = parseInt(allPages);
        }
        //中间页起始序号
        beginCount = parseInt(ucspag.options.pageIndex) + 5 > allPages ? allPages - 9 : parseInt(ucspag.options.pageIndex) - 4;
        //中间页终止序号
        endCount = parseInt(ucspag.options.pageIndex) < 5 ? 10 : parseInt(ucspag.options.pageIndex) + 5;
        //为了避免产生负数,如果小于1则从序号1开始
        beginCount = beginCount < 1 ? 1 : beginCount;
        //页码+5可能超出总页数,要将其控制在总页数之内
        endCount = endCount >= allPages ? allPages : endCount;
        if (ucspag.options.numberOfPages) {
            endCount = ucspag.options.numberOfPages;
        }
        //总数为0/只有一页数据的時候
        if (ucspag.options.pageCount == 0 || allPages == 1) {
            startPage = '<li class="active"><a  style="cursor:pointer;" id=' + (parseInt(ucspag.options.pageIndex) - 1) + '>上一页</a></li>';
            endPage = '<li class="active"><a style="cursor:pointer;" id=' + (parseInt(ucspag.options.pageIndex) + 1) + '>下一页</a></li>';
        }
        else if (parseInt(ucspag.options.pageIndex) - 1 <= 0)//沒有上一页的情況
        {
            startPage = '<li class="active"><a style="cursor:pointer;" id=' + (parseInt(ucspag.options.pageIndex) - 1) + '>上一页</a></li>';
            endPage = '<li><a style="cursor:pointer;" id=' + (parseInt(ucspag.options.pageIndex) + 1) + '>下一页</a></li>';
        }
        else if (parseInt(ucspag.options.pageIndex) + 1 > allPages)//沒有下一页的情況
        {
            startPage = '<li><a style="cursor:pointer;" id=' + (parseInt(ucspag.options.pageIndex) - 1) + '>上一页</a></li>';
            endPage = '<li class="active"><a style="cursor:pointer;" id=' + (parseInt(ucspag.options.pageIndex) + 1) + '>下一页</a></li>';
        }

        pagingHtml.push(startPage);

        //中间页处理，这个增加时间复杂度，减小空间复杂度
        if (beginCount > 1) {
            pagingHtml.push('<li><a style="cursor:pointer;" id="1">1</a></li>');
            pagingHtml.push('<li><a>..</a></li>');
        }
        for (var i = beginCount; i <= endCount; i++) {
            pagingHtml.push(parseInt(ucspag.options.pageIndex) == i ? '<li class="active"><a style="cursor:pointer;" id=' + i + '>' + i + '</a></li>' : '<li><a style="cursor:pointer;" id=' + i + '>' + i + '</a></li>');
        }
        if (endCount < allPages) {
            pagingHtml.push('<li><a>..</a></li>');
            pagingHtml.push('<li><a style="cursor:pointer;" id=' + allPages + '>' + allPages + '</a></li>');
        }

        pagingHtml.push(endPage);
        pagingHtml.push(loadPage);
        //            pagingHtml.push('</ul></div>');
        pagingHtml.push('<li  class="active" disabled="disabled" ><a>总共：' + ucspag.options.pageCount + '条</a></li></ul></div>');

        ucspag.options.tableDoc.after(pagingHtml.join(''));
        //绑定页码按鈕事件
        ucspag.options.tableDoc.next().find("ul>li[class!='active']>a").unbind('click').bind('click', function () {
            if ($(this).text() != '..') {

                asyncload(ucspag, $(this).attr('id'));

                ucsLcs.setItem("nowScrollTopBottom", "true");
            }
        });

        ucspag.options.callback();

        if (ucspag.options.selPageSize) {
            // 设置页记录数的默认值(读取Cookie)
            if ($.cookie("listpagesize_" + getSelPageSizeCookieName(ucspag.options.id)) != null) {
                ucspag.options.tableDoc.next().find("#selPageSize").val($.cookie("listpagesize_" + getSelPageSizeCookieName(ucspag.options.id)));
                ucspag.setConfig({ pageSize: $.cookie("listpagesize_" + getSelPageSizeCookieName(ucspag.options.id)) });

            }
            ucspag.options.tableDoc.next().find("#selPageSize").bind('change', function () {


                $.cookie("listpagesize_" + getSelPageSizeCookieName(ucspag.options.id), $(this).val(), { expires: 30 });

                if ($.trim(ucspag.options.id) == "") {
                    window.location.reload();
                } else {

                    $("#" + ucspag.options.id).ucspager({
                        params: ucspag.options.params,
                        pageIndex: ucspag.options.pageIndex,
                        pageSize: ucspag.options.pageSize,
                        pageCount: ucspag.options.pageCount,
                        url: ucspag.options.url,
                        id: ucspag.options.id,
                        callback: ucspag.options.callback,

                        isFrozenTableHead: ucspag.options.isFrozenTableHead,
                        isOrderTableHead: ucspag.options.isOrderTableHead,
                        isFrozenTableCell: ucspag.options.isFrozenTableCell,
                        isCellHidden: ucspag.options.isCellHidden,
                        isTableCellMove: ucspag.options.isTableCellMove,
                        isLoadTableWidthSet: ucspag.options.isLoadTableWidthSet,
                        isReSetScroll: ucspag.options.isReSetScroll
                    });

                    $("#" + ucspag.options.id).getUcspager().setConfig({
                        params: ucspag.options.params
                    });
                    $("#" + ucspag.options.id).getUcspager().moveFirst();

                }


                ucsLcs.setItem("nowScrollTopBottom", "true");
                //window.location.reload();
            });
        }
    };

    function getSelPageSizeCookieName(id) {
        var arr = location.href.split("/");
        var name = arr[arr.length - 1].toLowerCase().replace("#", "").split("?")[0]+"#"+id;
        return name;
    }
})(jQuery);



//button

; (function ($) {

    //定义ucsbutton的构造函数 
    var ucsbutton = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                id: "",
                text: "",
                name: "",
                icon: "none",
                hidden: false,
                rightskey: '',
                handler: function () { },
                after: null,
                size: "small",
                isHighlight: false
            },
            this.options = $.extend({}, this.defaults, opt);
    }

    //定义UcsButton的方法
    ucsbutton.prototype = {
        setText: function (text) {
            this.$element.find('span').text(text);
        },
        unbind: function (event) {
            this.$element.unbind(event);
            this.$element.attr("disabled", true);
        },
        bind: function (event) {
            this.$element.bind(event, this.options.handler);
            this.$element.removeAttr("disabled");
        },
        init: function () {
            if (this.options.hidden)
                return;

            //权限控制
            if (this.options.rightskey != "") {
                if (!checkButtonRights(this.options.rightskey)){
                	this.$element.remove();
                    return;
                }
            }

            var buttonHtml = new Array();

            //  图标样式
            switch (this.options.icon) {
                case "add":
                    buttonHtml.push('<i style="vertical-align: middle" class="icon-plus icon-white"></i>');
                    break;
                case "submit":
                    buttonHtml.push('<i style="vertical-align: middle" class="icon-ok icon-white"></i>');
                    break;
                case "edit":
                    buttonHtml.push('<i style="vertical-align: middle" class="icon-edit icon-white"></i>');
                    break;
                case "delete":
                    buttonHtml.push('<i style="vertical-align: middle" class="icon-remove icon-white"></i>');
                    break;
                    //                            case "Cacel":     
                    //                                buttonHtml.push('<i style="vertical-align: middle" class="icon-search icon-white"></i>');     
                    //                                break;     
                case "export":
                    buttonHtml.push('<i style="vertical-align: middle" class="icon-share icon-white"></i>');
                    break;
                case "search":
                    buttonHtml.push('<i style="vertical-align: middle" class="icon-search icon-white"></i>');
                    break;
                case "reset":
                    buttonHtml.push('<i style="vertical-align: middle" class="icon-repeat  icon-white"></i>');
                    break;
                    //                            case "return":     
                    //                                buttonHtml.push('<i style="vertical-align: middle" class="icon-search icon-white"></i>');     
                    //                                break;     
                case "view":
                    buttonHtml.push('<i style="vertical-align: middle" class="icon-zoom-in icon-white"></i>');
                    break;

                default:
                    break;
            }

            //按钮的样式
            switch (this.options.size) {
                case "small":
                    this.$element.addClass("btn");
                    break;
                case "big":
                    this.$element.addClass("btn").css("width", "100px");
                    break;
                default:
                    this.$element.addClass("btn");
                    break;
            }

            buttonHtml.push('<span style="vertical-align:middle">' + this.options.text + '</span>');
            this.$element.html('');
            this.$element.append(buttonHtml.join(''));

            if (this.options.isHighlight)
                this.$element.addClass("btn-primary");
            else {
                this.$element.addClass("btn-default");
                this.$element.find('i').removeClass('icon-white');
            }

            this.$element.click(this.options.handler); //判定点击事件 

            //按钮生成后事件
            var after = this.options.after;
            if (after && typeof after == "function") {
                $.each(this.$element, function (i, item) {
                    after(item);
                });
            }
        }
    }


    $.fn.getUcsbutton = function () {
        return $(this).data('_ucsbutton');
    };

    //在插件中使用ucsbutton对象
    $.fn.ucsbutton = function (options) {
        //创建ucsButton的实体 
        var btn = new ucsbutton(this, options);
        btn.init();
        //调用其方法
        $(this).data('_ucsbutton', btn);
        return btn;
    }

    /* 按钮权限控制
    * 配置参数中的按钮权限key为空时，按钮不受权限控制
    * 当夜幕中不存在权限内容时，按钮不受权限控制（mvc后台页面的权限内容统一由top视图生成）
    */
    function checkButtonRights(rightskey) {
        if (rightskey == "")
            return true;

        if ($("#rightskey").length == 0)//未对页面实现权限出事化的页面，不受权限控制
            return true;

        var rootList = $("#rightskey").val().split(',');
        if (rootList == undefined || rootList.length <= 0) {
            return false;
        }

        for (var i = 0; i < rootList.length; i++) {
            if (rightskey == rootList[i]) {
                return true;
            }
        }

        return false;
    };

})(jQuery);


//window
;
(function ($) {
    //定义ucswindow的构造函数 
    var ucswindow = function (ele, opt) {
        this.$element = ele,
            this.defaults = {
                id: ele.attr("id"),
                text: "",
                name: "",
                icon: "none",
                hidden: false,
                rightskey: '',
                handler: function () { },
                size: "small",
                isHighlight: false,
                callback: null,
                isbackdrop: true,    //其他区域不可以关闭
                isdraggable: true,    //可以托送
				cssTop: null,
                cssLeft: null
            },
            this.options = $.extend({}, this.defaults, opt);
    };


    //定义ucswindow的方法
    ucswindow.prototype = {
        show: function (param) {
            var config = { data: param };
            $.extend(this.options, config);
            var id = this.$element.attr('id');
            this.$element.modal('hide');
            dialog(this.options, function (msg, cfg) {

                $("#" + id + '_body').html(msg);
                if (cfg.callback) {
                    cfg.callback();
                }
                else if (cfg.CallBack) {
                    cfg.CallBack();
                }
            },
            function () {
                //重设高度 
                this.$element = $("#" + id);
                var windowHeight = $(window).height();
                var elementHeight = this.$element.height();

                var topPopDiv = (parseInt(windowHeight) - elementHeight) / 2;
                this.$element.css("top", topPopDiv);
                this.$element.modal('show');

            });
        },
        close: function () {

            this.$element.modal('hide');
        },
        setConfig: function (setting) {
            $.extend(this.options, setting);
            switch (this.options.size) {
                case "small":
                    this.$element.css("width", "300px", "height", "150px");
                    break;
                case "big":
                    this.$element.css("width", "680px", "height", "250px");
                    break;
                case "large":
                    this.$element.css("width", "900px", "height", "400px");
                    break;
                default:
                    this.$element.removeAttr("style").css("display", "block");
                    break;
            }



            if (!(setting.url)) {
                //重设高度 
                var windowHeight = $(window).height();
                var elementHeight = this.$element.height();
                var topPopDiv = (parseInt(windowHeight) - elementHeight) / 2;
				
                if (this.options.cssTop) {
                    topPopDiv = this.options.cssTop;
                }
				
                this.$element.css("top", topPopDiv);
            }

            //计算宽度
            var elementWidth = $(this.$element).width();
            var windowWidth = $(window).width();
            var leftPopDiv = (parseInt(windowWidth) - elementWidth) / 2;
			
			if (this.options.cssLeft) {
                leftPopDiv = this.options.cssLeft;
            }
			 
            this.$element.css("left", leftPopDiv + "px");

			//修复兼容(2017-5-3)
            this.$element.modal({ backdrop: this.options.isbackdrop });

            if (this.options.isdraggable) {
                this.$element.draggable({
                    handle: ".modal-header",
                    cursor: 'move',
                    refreshPositions: false
                });
                this.$element.find(".modal-header").css("cursor", "move");
            }


        },
        init: function () {
            //加载样式

            this.$element.addClass("modal hide");


            switch (this.options.size) {
                case "small":
                    this.$element.css("width", "300px", "height", "150px");
                    break;
                case "big":
                    this.$element.css("width", "680px", "height", "250px");
                    break;
                case "large":
                    this.$element.css("width", "900px", "height", "400px");
                    break;
                default:
                    break;
            }
            
            if(this.options.height){
            	this.$element.css( "height", this.options.height);
            }
            //加载表头
            this.$element.append('<div class="modal-header"> <button type="button" class="close" data-dismiss="modal" style="*line-height:33px;*margin-top:-11px;">  ×</button> <h3 style="*display:inline;"> </h3> </div>');

            //加载窗体的框架
            this.$element.append('<div class="modal-body" id="' + this.$element.attr('id') + '_body"> </div>');

            if (this.options.height != undefined) {
                if (this.options.height <= 10)
                    this.options.height = 10;
                this.$element.find('.modal-body').css("height", this.options.height);
            }

            //加载底部的按钮 
            if (this.options.buttons.length > 0) {
                this.$element.append('<div class="modal-footer"></div>');
                for (var i = 0; i < this.options.buttons.length; i++) {

                    var button = this.options.buttons[i];

                    this.$element.find(".modal-footer").append(' <a  id="' + button.id + '" >' + '</a>');

                    $('#' + button.id).ucsbutton({
                        text: button.text,
                        handler: button.handler,
                        size: button.size,
                        icon: button.icon,
                        isHighlight: button.isHighlight
                    });
                }
            }

        }


    };


    $.fn.ucswindow = function (settings) {

        var id = this.selector.replace('#', '');
        if ($("#" + id).length <= 0) {
            $('body').append('<div  id="' + id + '"  class="hide"></div>');
        }

        var win = new ucswindow($('#' + id), settings);
        win.init();

        $('#' + id).data('_ucswindow', win); //绑定对象
        return win;
    };


    $.fn.getUcswindow = function () {
        return $(this).data('_ucswindow');
    }


    function dialog(cfg, callback, complete) {
        $('#' + cfg.id + ' .modal-header h3').text(cfg.title);
        var w = $.noty({
            timeout: false,
            layout: "center",
            type: "information",
            animateClose: true,
            dismissQueue: false,
            closeOnSelfOver: false,
            template: '<div class="noty_message"><span class="noty_text"></span><div id="loading" class="center">加载中...<div class="center"></div></div><div class="noty_close"></div></div>'
        });
        $.ajax({
            url: cfg.url,
            type: 'get',
            data: cfg.data,
            dataType: cfg.dataType,
            async: cfg.async || true,
            contentType: cfg.contentType,
            success: function (msg) {
                callback(msg, cfg);
            },
            error: function (msg) {
                $(".modal-body").html('<div class="center">' + msg.Message + '<div class="center"></div></div>');
            },
            complete: function () {
                $.noty.close(w);
                if (complete)
                    complete();
            }
        });
    }



})(jQuery);
//窗体公用函数
function colseUcswindow(id) {
    $('#' + id).modal('hide');
}


//alert
; (function ($) {
    var ucsalert = function (ele, opt) {

        this.$element = ele,
         this.defaults = {
             title: "消息提醒",
             message: "",
             timeout: 0
         },
         this.options = $.extend({}, this.defaults, opt);

    };


    ucsalert.prototype = {
        init: function () {
            this.$element.addClass("ucsalert");
            //加载表头
            this.$element.append('<div class="ucsalert-header"> <button type="button" class="close" data-dismiss="modal" style="*line-height:33px;*margin-top:-11px;">  ×</button> <h3  style="*display:inline;">' + this.options.title + ' </h3> </div>');

            //加载窗体的框架
            this.$element.append('<div class="ucsalert-body"> <div class="left">' + this.options.message.replace('{$ms$}', this.options.timeout) + '<div class="center"></div></div> </div>');
           
            //加载底部的按钮  
            this.$element.append('<div class="ucsalert-footer"><a href="#" class="alertclose btn btn-primary " id="btnUcsOk"  data-dismiss="modal">  确认</a></div>');

            this.$element.find('.ucsalert-header .close').bind('click', function () {
                $('.ucsalert').modal('hide');

            });

            this.$element.find('.ucsalert-footer .alertclose').bind('click', function () {
                $('.ucsalert').modal('hide');

            });
        }
    };


    $.ucsalert = function (msg, timeout, callback, complete) {
        if (typeof (msg) != "string") {
            this.options = $.extend({}, this.options, msg);
            msg = this.options.msg;

            timeout = this.options.timeout;
            callback = this.callback;
            complete = this.complete;
        }
        else {
            this.options = $.extend({}, this.options, {
                message: msg,
                timeout: timeout,
                isbackdrop: true,    //其他区域不可以关闭
                isdraggable: true    //可以托送
            });
        }
      

        var $alert = $(".ucsalert");
        //删除已存在的弹出框
        if ($(".ucsalert").length > 0)
            $(".ucsalert").remove();


        $('body').append('<div class="ucsalert"></div>');
        var $this = $('.ucsalert');
        if (this.options.width)
        {
            $this.css("width", this.options.width + "px");
        }
        var a = new ucsalert($this, this.options);
        a.init();
        if (callback && typeof callback == "function") {
            $("#btnUcsOk").bind('click', callback);
        }

     


        //添加弹出框完成后事件
        if (complete && typeof complete == "function") {
            $('.ucsalert-header .close').bind("click", complete);
            if (!callback || typeof callback != "function") {
                $("#btnUcsOk").bind('click', complete);
            }
        }

        ucsAlertMsg = msg;
        $(".ucsalert-body .left").html(msg.replace('{$ms$}', this.options.timeout / 1000));

        if (this.options.isbackdrop) {
            $this.modal({ backdrop: 'static' });
        }
        else {
            $this.modal({ backdrop: true });
        }

        if (this.options.isdraggable) {
            $this.find(".ucsalert-header").css("cursor", "move");
            $this.draggable({
                handle: ".ucsalert-header",
                cursor: 'move',
                refreshPositions: false
            });

        }

        //重设高度 
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        var elementHeight = $this.height();
        var elementWidth = $this.width();

        var topPopDiv = (parseInt(windowHeight) - elementHeight) / 2;
        var leftPopDiv = (parseInt(windowWidth) - elementWidth) / 2;

        $this.css("margin-top", 0);
        $this.css("margin-left", 0);
        $this.css("top", topPopDiv);
        $this.css("left", leftPopDiv);

        $('.ucsalert').modal('show');

        $('.ucsalert').next().css("z-index", 1052);

        if (!this.options.timeout || this.options.timeout <= 0)
            return;

        ucsalertTimer = this.options.timeout;
        setTimeout(timeoutCloseMsg, 1000);
    };


    var ucsalertTimer = 0;
    var ucsAlertMsg = '';
    function timeoutCloseMsg() {
        if ($('.ucsalert').hasClass('in')) {
            if (ucsalertTimer > 0) {
                setTimeout(timeoutCloseMsg, 1000);
                $(".ucsalert-body .left").text(ucsAlertMsg.replace('{$ms$}', ucsalertTimer / 1000));
                ucsalertTimer = ucsalertTimer - 1000;
            } else {
                $('.ucsalert').fadeOut(1500, function () { $('.ucsalert').modal('hide') });
                $("#btnUcsOk").click();
            }
        }
    }
})(jQuery);

//ucstablefmt
(function ($) {
    $.fn.ucstablefmt = function (settings) {
        ucstablefmt.setConfig(settings);
        ucstablefmt.setTableColFmt();
    };
    var ucstablefmt = {
        setConfig: function (config) {
            $.extend(ucstablefmt.config, config);
            return ucstablefmt.config;
        },
        config: {
            divId: ""
        },
        setTableColFmt: function () {
            var _t;
            var _r;
            var tb;

            if (ucstablefmt.config.divId != "") {
                _t = $("#" + ucstablefmt.config.divId + " table tr td");
                _r = $("#" + ucstablefmt.config.divId + " table tr");
                tb = "#" + ucstablefmt.config.divId + " table";
            } else {
                _t = $("table tr td");
                _r = $("table tr");
                tb = "table";
            }

            var datatype;
            if (_t.length > 1) {
                var rs = _r.length - 2 == 0 ? 1 : _r.length - 2;
                var columns = Math.ceil(_t.length / rs);

                for (var i = 1; i <= columns; i++) {
                    $("" + tb + " tr td:nth-child(" + i + ")").each(function () {
                        datatype = $.trim($(this).attr('ucsdatatype'));
                        var value = $.trim($(this).html());
                        var fmt = $.trim($(this).attr('fmt'));
                        var align = $(this).attr('align') == null ? "left" : $.trim($(this).attr('align'));
                        var decimals = $(this).attr('decimals') == null ? 0 : $(this).attr('decimals');
                        ;
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
                                    var date = new Date(value);
                                    value = date.format(fmt);
                                    $(this).html(value);
                                }
                                $(this).css("text-align", align);
                                $(this).attr("title", value);
                                break;
                            case "text":
                                $(this).css("text-align", align);
                                $(this).attr("title", value);
                                break;;
                            default:
                                $(this).css("text-align", align);
                                if ($(this).find("input").attr('type') != undefined && $(this).find("input").attr('type') != 'checkbox') {
                                    var alen = $(this).find("a");
                                    if (alen.length > 0)
                                        $(this).attr("title", $.trim($(this).find("a").html()));
                                    //else $(this).attr("title", value);
                                }
                                break;
                        }
                    });
                }
            }
        }
    }
})(jQuery);

//设置table操作列宽度随按钮的数量填充
(function ($) {
    $.fn.ucsautowidth = function (settings) {
        ucsautowidth.setConfig(settings);
        ucsautowidth.setAutoWidth();
    };
    var ucsautowidth = {
        setConfig: function (config) {
            $.extend(ucsautowidth.config, config);
            return ucsautowidth.config;
        },
        config: {
            tableid: ""
        },
        setAutoWidth: function () {
            if ($("#" + ucsautowidth.config.tableid + " tr td").length > 1) {
                var columns = $("#" + ucsautowidth.config.tableid + " tr td").length / ($("#" + ucsautowidth.config.tableid + " tr").length - 1); //计算列数
                var max = 0;
                $("#" + ucsautowidth.config.tableid + " tr td:nth-child(" + columns + ")").each(function () {
                    var tdWidth = 0;
                    $(this).find("a").each(function () {
                        var wtd = $(this).width();
                        if (wtd > 1 && wtd < 80) {
                            tdWidth = tdWidth + wtd + 40;
                        } else if (wtd > 1 && wtd > 80) {
                            tdWidth = tdWidth + wtd;
                        }
                    });
                    if (tdWidth > max)
                        max = tdWidth;
                });
                $("#" + ucsautowidth.config.tableid + " tr th:last").css("width", max);
            }
        }
    }
})(jQuery);


//全屏显示
(function ($) {
    $.fn.ucsfullscreen = function (settings) {
        var $config = null;
        settings.element = "#" + $(this).attr("id");
        ucsfullscreen.setConfig(settings);
        $config = ucsfullscreen.config;
        ucsfullscreen.fullScreen($config);
        ucsfullscreen.keyEscEvent($config);
    };

    var ucsfullscreen = {
        setConfig: function (config) {
            $.extend(ucsfullscreen.config, config);
            return ucsfullscreen.config;
        },
        config: {
            element: "",                   //放大元素ID
            width: "100%",                 //百分比
            top: "0",                      //放大后高度  
            element_back_position: null,   //还原旧的布局方式 
            element_back_style: null,      //还原Style
            max_class: null,                //放大的icon class
            min_class: null,                //缩小icon class
            btn_element: null,             //点击按钮ID
            ext_max: null,                 //放大后执行函数
            ext_min: null                  //缩小后执行函数
        },
        keyEscEvent: function (config) {
            $this = this;
            //监控ecs
            $(document).keyup(function (event) {
                switch (event.keyCode) {
                    case 27:
                        $this._backscreen(config);
                    case 96:
                        // $this._backscreen(config);
                }
            });
        },
        _fullscreen: function (config) {
            var _widths = window.screen.availWidth;
            var _heights = window.screen.availHeight;
            var $d = $(config.element);

            $d.css('position', 'fixed');
            $d.css("width", config.width).css("top", config.top);
            $d.css("height", _heights);
            $d.attr('ucsglobalscreen_data', 'on');

            if (config.btn_element)
                $(config.btn_element).attr("class", config.min_class);

            if (config.ext_max)
                config.ext_max();
        },
        _backscreen: function (config) {
            var _widths = window.screen.availWidth;
            var _heights = window.screen.availHeight;
            var $d = $(config.element);

            if (config.btn_element)
                $(config.btn_element).attr("class", config.max_class);

            if (config.element_back_style)
                $d.attr("style", config.element_back_style);

            if (config.element_back_position)
                $d.attr("position", config.element_back_position);


            $d.attr('ucsglobalscreen_data', 'off');

            if (config.ext_min)
                config.ext_min();

        },
        fullScreen: function (config) {

            $this = this;

            $(config.btn_element).bind("click", function (e) {

                var $d = $(config.element);
                var status = $d.attr('ucsglobalscreen_data');
                if (status == 'off' || (!status)) {
                    $this._fullscreen(config);
                }
                else {
                    $this._backscreen(config);
                }
            });
        }
    }
})(jQuery);

//冻结表列控件
(function ($) {
    $.fn.ucsfrozentablecol = function (settings) {
        ucsfrozentablecol.setConfig(settings);
        ucsfrozentablecol.setFrozenTableCol();
    };
    var ucsfrozentablecol = {
        setConfig: function (config) {
            $.extend(ucsfrozentablecol.config, config);
            return ucsfrozentablecol.config;
        },
        config: {
            tableid: "", //表格table的ID
            cols: 0,    //要冻结的列表数 如2，则冻结表格前两列
            width: "100%",    //宽度
            height: 450    //默认高度450
        },
        setFrozenTableCol: function () {
            /// <summary>
            ///     锁定表头和列
            ///     <para> sorex.cnblogs.com </para>
            /// </summary>
            /// <param name="ucsfrozentablecol.config.tableid" type="String">
            ///     要锁定的Table的ID
            /// </param>
            /// <param name="ucsfrozentablecol.config.cols" type="Number">
            ///     要锁定列的个数
            /// </param>
            /// <param name="width" type="Number">
            ///     显示的宽度
            /// </param>
            /// <param name="height" type="Number">
            ///     显示的高度
            /// </param>


            if ($("#" + ucsfrozentablecol.config.tableid + "_tableLayout").length != 0) {
                $("#" + ucsfrozentablecol.config.tableid + "_tableLayout").before($("#" + ucsfrozentablecol.config.tableid));
                $("#" + ucsfrozentablecol.config.tableid + "_tableLayout").empty();
            }
            else {
                $("#" + ucsfrozentablecol.config.tableid).after("<div id='" + ucsfrozentablecol.config.tableid + "_tableLayout' style='overflow:hidden;height:" + ucsfrozentablecol.config.height + "px; width:" + ucsfrozentablecol.config.width + ";'></div>");
            }
            $('<div id="' + ucsfrozentablecol.config.tableid + '_tableFix"></div>'
            + '<div id="' + ucsfrozentablecol.config.tableid + '_tableHead"></div>'
            + '<div id="' + ucsfrozentablecol.config.tableid + '_tableColumn"></div>'
            + '<div id="' + ucsfrozentablecol.config.tableid + '_tableData"></div>').appendTo("#" + ucsfrozentablecol.config.tableid + "_tableLayout");
            var oldtable = $("#" + ucsfrozentablecol.config.tableid);
            var tableFixClone = oldtable.clone(true);
            tableFixClone.attr("id", ucsfrozentablecol.config.tableid + "_tableFixClone");
            $("#" + ucsfrozentablecol.config.tableid + "_tableFix").append(tableFixClone);
            var tableHeadClone = oldtable.clone(true);
            tableHeadClone.attr("id", ucsfrozentablecol.config.tableid + "_tableHeadClone");
            $("#" + ucsfrozentablecol.config.tableid + "_tableHead").append(tableHeadClone);
            var tableColumnClone = oldtable.clone(true);
            tableColumnClone.attr("id", ucsfrozentablecol.config.tableid + "_tableColumnClone");
            $("#" + ucsfrozentablecol.config.tableid + "_tableColumn").append(tableColumnClone);
            $("#" + ucsfrozentablecol.config.tableid + "_tableData").append(oldtable);
            $("#" + ucsfrozentablecol.config.tableid + "_tableLayout table").each(function () {
                $(this).css("margin", "0");
            });
            var headHeight = $("#" + ucsfrozentablecol.config.tableid + "_tableHead thead").height();
            headHeight += 2;
            $("#" + ucsfrozentablecol.config.tableid + "_tableHead").css("height", headHeight);
            $("#" + ucsfrozentablecol.config.tableid + "_tableFix").css("height", headHeight);
            var columnsWidth = 0;
            var columnsNumber = 0;
            $("#" + ucsfrozentablecol.config.tableid + "_tableColumn thead tr th:lt(" + ucsfrozentablecol.config.cols + ")").each(function () {

                //判断是否有隐藏的列
                if ($(this).css("display") == "none" || $(this).css("visibility") == "hidden") {
                    columnsNumber++;
                } else {
                    columnsWidth += $(this).outerWidth(true);
                    columnsNumber++;
                }
            });
            columnsWidth += 2;
            if ($.browser.msie) {
                switch ($.browser.version) {
                    case "7.0":
                        if (columnsNumber >= 3) columnsWidth--;
                        break;
                    case "8.0":
                        if (columnsNumber >= 2) columnsWidth--;
                        break;
                }
            }

            $("#" + ucsfrozentablecol.config.tableid + "_tableColumn").css("width", columnsWidth);
            $("#" + ucsfrozentablecol.config.tableid + "_tableFix").css("width", columnsWidth);
            $("#" + ucsfrozentablecol.config.tableid + "_tableData").scroll(function () {
                $("#" + ucsfrozentablecol.config.tableid + "_tableHead").scrollLeft($("#" + ucsfrozentablecol.config.tableid + "_tableData").scrollLeft());
                $("#" + ucsfrozentablecol.config.tableid + "_tableColumn").scrollTop($("#" + ucsfrozentablecol.config.tableid + "_tableData").scrollTop());
            });
            $("#" + ucsfrozentablecol.config.tableid + "_tableFix").css({ "overflow": "hidden", "position": "relative", "z-index": "50", "background-color": "#ffffff" });
            $("#" + ucsfrozentablecol.config.tableid + "_tableHead").css({ "overflow": "hidden", "width": ucsfrozentablecol.config.width - 17, "position": "relative", "z-index": "45", "background-color": "#ffffff" });
            $("#" + ucsfrozentablecol.config.tableid + "_tableColumn").css({ "overflow": "hidden", "height": ucsfrozentablecol.config.height - 17, "position": "relative", "z-index": "40", "background-color": "#ffffff" });
            $("#" + ucsfrozentablecol.config.tableid + "_tableData").css({ "overflow-x": "scroll", "width": ucsfrozentablecol.config.width, "height": ucsfrozentablecol.config.height, "position": "relative", "z-index": "35" });
            /*
            if ($("#" + ucsfrozentablecol.config.tableid + "_tableHead").width() > $("#" + ucsfrozentablecol.config.tableid + "_tableFix table").width()) {
            $("#" + ucsfrozentablecol.config.tableid + "_tableHead").css("width", $("#" + ucsfrozentablecol.config.tableid + "_tableFix table").width());
            $("#" + ucsfrozentablecol.config.tableid + "_tableData").css("width", $("#" + ucsfrozentablecol.config.tableid + "_tableFix table").width() + 17);
            }

            if ($("#" + ucsfrozentablecol.config.tableid + "_tableColumn").height() > $("#" + ucsfrozentablecol.config.tableid + "_tableColumn table").height()) {
            $("#" + ucsfrozentablecol.config.tableid + "_tableColumn").css("height", $("#" + ucsfrozentablecol.config.tableid + "_tableColumn table").height());
            $("#" + ucsfrozentablecol.config.tableid + "_tableData").css("height", $("#" + ucsfrozentablecol.config.tableid + "_tableColumn table").height() + 17);
            }*/
            $("#" + ucsfrozentablecol.config.tableid + "_tableFix").offset($("#" + ucsfrozentablecol.config.tableid + "_tableLayout").offset());
            $("#" + ucsfrozentablecol.config.tableid + "_tableHead").offset($("#" + ucsfrozentablecol.config.tableid + "_tableLayout").offset());
            $("#" + ucsfrozentablecol.config.tableid + "_tableColumn").offset($("#" + ucsfrozentablecol.config.tableid + "_tableLayout").offset());
            $("#" + ucsfrozentablecol.config.tableid + "_tableData").offset($("#" + ucsfrozentablecol.config.tableid + "_tableLayout").offset());
        }
    }
})(jQuery);

//ucsmsk遮罩
(function ($) {
    $.fn.ucsunmask = function () {
        var $msk = $(this);
        $msk.prev().remove();
        $msk.removeClass('msk');
    };
    $.fn.ucsmask = function () {
        var $msk = $(this);
        $msk.before('<div class="form-horizontal" ><table style="    margin: 200px auto;"><tr><td ><div id="loading" class="center">加载中...<div class="center"></div></div></td></tr></table></div>');
    }
})(jQuery);


$.extend({
    ucsajax: function (opt) {
        var defaults = {
            maskArea: "",
            maskMsg: "请稍后...",
            url: "",
            data: "",
            type: "post",
            befText: "提交",
            dataType: null,
            contentType: null,
            success: null,
            fail: null,
            error: null,
            handler: null,
            currentPage: false
        };
        var options = $.extend({}, defaults, opt);
        if (!options.url || !options.maskArea) {
            alert("方法参数设置异常");
            return;
        }

        var $btn = $(options.maskArea);
        var isBtn = false;
        var btnCfg = $btn.getUcsbutton() ? $btn.getUcsbutton().options : "";
        if (btnCfg && ($btn[0].tagName.toLowerCase() == "a" || $btn.attr("type").toLowerCase() == "button")) {
            isBtn = true;
            $btn.find('span').text(options.maskMsg);
            $btn.unbind('click');
            $btn.attr("disabled", true);
        }
        else if (options.maskArea && $.fn.mask) {
            $(options.maskArea).mask(options.maskMsg);
        }
        if (!options.contentType)
        {
            options.contentType = 'application/json; charset=utf-8';
        }

        $.ajax({
            url: opt.url,
            type: options.type,
            data: options.data, 
            contentType: options.contentType,
            success: function (msg) {
                if (msg.isSuccess) {
                    try {
                        if (options.success) {
                            options.success();
                        }
                        else {
                            alert("提交成功！");
                        }
                    }
                    catch (e) { }
                    finally {
                        if (options.currentPage) {
                            if (isBtn) {
                                $btn.find('span').text(options.befText);
                                $btn.removeAttr("disabled");
                                $btn.unbind('click').bind('click', btnCfg.handler);
                            }
                            else if (options.maskArea && $.fn.mask) {
                                $(options.maskArea).unmask();
                            }
                        }
                    }
                } else {
                    try {
                        if (options.fail)
                            options.fail(msg.message);
                        else {
                            alert("提交失败！");
                        }
                    }
                    catch (e) { }
                    finally {
                        if (isBtn) {
                            $btn.find('span').text(options.befText);
                            $btn.removeAttr("disabled");
                            $btn.unbind('click').bind('click', btnCfg.handler);
                        }
                        else if (options.maskArea && $.fn.mask) {
                            $(options.maskArea).unmask();
                        }
                    }
                }
            },
            error: function (e) {
                try {
                    if (options.error)
                        options.error(e.toString());
                    else
                        alert("ajax执行异常!");
                }
                catch (e) { }
                finally {
                    if (isBtn) {
                        $btn.find('span').text(options.befText);
                        $btn.bind('click', btnCfg.handler);
                        $btn.removeAttr("disabled");
                    }
                    else if (options.maskArea && $.fn.mask) {
                        $(options.maskArea).unmask();
                    }
                }
            }
        });
    }
});

//本地存储方法
var ucsLcs = window.localStorage || {

    setItem: function (key, value) //设置缓存
    {
        try {
            UserData.setItem(key, value);
        } catch (e) { }
    },
    getItem: function (key) {
        try {
            return UserData.setItem(key);
        } catch (e) { }
    }
};

var UserData = { //新建一个UserData对象来做IE6 7的兼容,注意第一个字母大写
    userData: null,//用来判断是否有userData属性，也就是判断是否是IE6 7，或者说是否支持userData属性
    name: location.hostname,
    init: function () {
        if (!UserData.userData) {
            try {
                UserData.userData = document.createElement('INPUT');
                UserData.userData.type = "hidden";
                UserData.userData.style.display = "none";
                UserData.userData.addBehavior("#default#userData");
                document.body.appendChild(UserData.userData);
                var expires = new Date();
                expires.setDate(expires.getDate() + 365);
                UserData.userData.expires = expires.toUTCString();
            } catch (e) {
                return false;
            }
        }
        return true;
    },


    setItem: function (key, value) {//设置缓存
        if (UserData.init()) {
            UserData.userData.load(UserData.name);
            UserData.userData.setAttribute(key, value);
            UserData.userData.save(UserData.name);
        }
    },


    getItem: function (key) {//获取缓存
        if (UserData.init()) {
            UserData.userData.load(UserData.name);
            return UserData.userData.getAttribute(key)
        }
    },


    remove: function (key) {  //删除缓存
        if (UserData.init()) {
            UserData.userData.load(UserData.name);
            UserData.userData.removeAttribute(key);
            UserData.userData.save(UserData.name);
        }
    },
    clear: function () {//清除所有缓存
        UserData.userData.load(UserData.name);
        var now = new Date();
        now = new Date(now.getTime() - 1);
        UserData.userData.expires = now.toUTCString();
        UserData.userData.save(UserData.name);
    }
};

//表格列冻结&列隐藏&表头固定&列宽调整
!function ($) {


    var param = {
        scrollTop: 0,                                                               //当前竖滚动条位置 
        tableParentID: "#divlist",
        tableClass: ".table-bordered",



        IsDefaultHide: "IsDefaultHide"
    };

    var config = {

        //外部表格定义
        table: param.tableParentID + " " + param.tableClass + "[cellCopyTable!=true][headcopytable!=true][cellCopyFixTable!=true]",     //原来的table 
        tableHeadCopy: ".table-bordered[headcopytable]",                               //头部复制表
        tableCellCopy: ".table-bordered[cellcopytable]",                               //列复制表
        tableCellCopyFix: ".table-bordered[cellCopyFixTable]",                         //列冻结修复
        alltable: ".table-bordered",                                                   //所有的table 
        tableFreeze: ".table-bordered[headcopytable]",                                 //冻结列的table  
        tableDiv: param.tableParentID,                                                          //table父div 
        PageSearchFormID: "searchForm",                                                //页面搜索区域的表单ID  
        isAdminDom: ".hidden-phone",                                                   //父窗元素 

        //内部定义
        settingModal: "HiddenFrozenModal",                                         //设置弹出框ID
        enableWidth: "isEnableCellWidthSetting",                                   //是否开启列设置
        enableFreezeCell: "hasBindFrozenTableCell",                                //是否绑定列冻结
        hasCellFrozen: "hasCellFrozen",                                            //是否有列冻结
        hasFrozenFix: "hasFrozenFix",                                               //冻结列头部修复
        cellCopyTable: "cellCopyTable",                                            //表格复制
        cellCopyFixTable: "cellCopyFixTable",
        tableFreezeDivID: "oldTbFrozenCellDiv",
        tableFreezeFixDivID: "oldTbFrozenCellFixDiv",
        tableHeadFreezeDivID: "oldTbDiv",                                        //头部冻结表父div
        frozenKey: "_TableFrozen",                                                //冻结列的存储key            
        hiddenKey: "_TableCellHidden",                                           //隐藏列的存储key
        widthKey: "_TableWidthSetting",                                           //表格宽度存储
        hasDefaultSetFrozenKey: "_hasDefaultSetFrozenKey",                       //是否已经设置过默认值

        //排序
        tableHeadCellHiddenID: "tableHeadCellHidden",                           //表头排序hiddenID
        tableHeadOrderHiddenID: "tableHeadOrderHidden",                           //排序字段hiddenID 

        tableHeadIntro: "右击设置冻结列和隐藏列"

    };


    //表头列隐藏
    $.fn.ucsTableCellHidden = {

        //重设置列隐藏
        resetCell: function (e) {
            $.extend(config, e);
            var hiddenKey = "_TableCellHidden";
            var pageName = $().ucsTableBase.getNowUrl();
            hiddenCell = ucsLcs.getItem(pageName + hiddenKey);

            //show全部
            $(config.alltable).find("tr").find("th,td").show().removeAttr("ishidden");

            if (hiddenCell) {
                _cell = hiddenCell.split(",");
                for (x in _cell) {
                    var cellIndex = _cell[x].replace(/_/g, "");
                    if (cellIndex != "")
                        $(config.alltable).find("tr").find('th:eq(' + cellIndex + '),td:eq(' + cellIndex + ')').hide().attr("ishidden", "true");
                }
            }

            //默认隐藏
            $(config.alltable).find("tr").find('th[IsDefaultHide=true]').each(function () {
                $this = $(this);
                $index = $this.index();

                /*
                var nowHide = ucsLcs.getItem(pageName + hiddenKey);
                nowHide = nowHide || "";
                nowHide = nowHide.replace(",_" + $index + "_", "")
                nowHide += ",_" + $index + "_"; 
                ucsLcs.setItem(pageName + hiddenKey, nowHide);
                */


                $(config.alltable).find("tr").find('th:eq(' + $index + '),td:eq(' + $index + ')').hide().attr("ishidden", "true");


            });


        }

    },
    //列冻结
    $.fn.ucsTableCellForzen = function (e) {

        $.extend(config, e);

        //重设置表格 
        $().ucsTableBase.reloadTableSetting(config);

        //弹出层设置
        $().ucsTableBase.buildSettingDiv(config);
    },
    //列冻结-修复头部
    $.fn.ucsTableCellForzenFix = {
        reset: function (e) {
            $.extend(config, e);
            //try {
            var $c = "checked";
            var frozenKey = config.frozenKey;
            var pageName = $().ucsTableBase.getNowUrl();
            frozenCell = ucsLcs.getItem(pageName + frozenKey);

            if (frozenCell) {
                var _top = $(config.table).position().top;
                var tb = $(config.table);
                var divlist = $(config.tableDiv);
                var oldTb = $(tb).clone(true);
                var hasFrozenFix = divlist.attr(config.hasFrozenFix);

                //第一次
                if (tb && (hasFrozenFix != "t")) {


                    var oldTbDiv = $($(tb).parent()).prepend("<div id='" + config.tableFreezeFixDivID + "' style='background-color: white;z-index:200;position: fixed;top: 0;display:none'></div>");
                    var newTbDiv = $("#" + config.tableFreezeFixDivID).append(oldTb);

                    newTbDiv.find("table").attr(config.cellCopyFixTable, "true");

                    newTbDiv.find("input[hidden]").remove();
                    newTbDiv.find("div[id^=mydivmove]").remove();
                    newTbDiv.find("tbody").remove();

                    //newTbDiv.find(">table").css("height", "22px");

                    $().ucsTableBase.resetForzenCellWidth(tb, newTbDiv, frozenCell, _top);



                    divlist.attr(config.hasFrozenFix, "t");

                }
                else if (tb && (hasFrozenFix == "t")) {

                    //删除旧的 
                    $("#" + config.tableFreezeFixDivID).find(">table").remove();
                    var newTbDiv = $("#" + config.tableFreezeFixDivID).append(oldTb);
                    newTbDiv.find("tbody").remove();


                    // newTbDiv.find(">table").css("height", "22px");

                    newTbDiv.find("table").attr(config.cellCopyFixTable, "true");
                    newTbDiv.find("input[hidden]").remove();
                    newTbDiv.find("div[id^=mydivmove]").remove();


                    $().ucsTableBase.resetForzenCellWidth(tb, newTbDiv, frozenCell, _top);

                }
            }

        }
        ,//传到服务器
        ajaxToServer: function (e) {

        }
        ,//服务器读取
        ajaxGetServer: function (e) {

        }

        ,//JS设置冻结
        setCellForzen: function (e, r) {

            var pageName = $().ucsTableBase.getNowUrl();
            var defaultFrozen = ucsLcs.getItem(pageName + config.hasDefaultSetFrozenKey)
            if ((!defaultFrozen) || r == true) {
                var cell = parseInt(e);
                if (e > 0) {
                    ucsLcs.setItem(pageName + config.frozenKey, e - 1);
                }

                ucsLcs.setItem(pageName + config.hasDefaultSetFrozenKey, "1")
            }
        }
    },
    //头部冻结
    $.fn.ucsTableHeadFreeze = function (e) {
        $.extend(config, e);
        var tb = $(config.table)[0];
        var divlist = $(config.tableDiv);
        var hasFrozen = divlist.attr("hasFrozen");

        if (tb && (hasFrozen != "t")) {
            var oldTbTrHeight = ($(tb).find("tr:eq(0)").height()) == 0 ? 29 : ($(tb).find("tr:eq(0)").height() + 1);
            var oldTb = $(tb).clone(true).attr("headCopyTable", "true");

            var oldTbDiv = $($(tb).parent()).prepend("<div style='display:none; z-index:111;height: " + oldTbTrHeight + "px;overflow-y: hidden;left:11px;right:11px;position: fixed;top: 0px;'><div style='display:none; overflow-y: auto;background-color: white;z-index:123' id='oldTbDiv'></div></div>");
            var newTbDiv = $("#" + config.tableHeadFreezeDivID).append(oldTb);
            //$("#oldTbDiv > table tr :nth-child(2)").remove();
            //
            var newTb = $("#" + config.tableHeadFreezeDivID).find(" > table").width(oldTb.width());
            $("#" + config.tableHeadFreezeDivID).find(" > table").attr("style", "z-index:22");


            newTb.find("tr:not(:eq(0),:eq(1))").remove();
            newTb.find("tr:eq(1)").hide();
            newTb.attr("style", "");
            newTb.find("input[type=hidden]").remove();
            newTb.find("div[id^=mydivmove]").remove();

            //设置表头介绍
            newTb.find("thead tr").attr("title", config.tableHeadIntro);

            //newTb.find("input[type=checkbox]").removeAttr("value");

            //上下滚动监听
            window.onscroll = tabIframScroll;
            function tabIframScroll() {
                scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                param.scrollTop = scrollTop;

                var tbTop = $(tb).offset().top;
                if (scrollTop > tbTop) {
                    newTbDiv.parent().show();
                    newTbDiv.show();

                    var tbHeight = $(config.table).find("tr:eq(0)").height();
                    newTbDiv.parent().css("height", (tbHeight + 1) + "px");

                    $("#" + config.tableFreezeFixDivID).show();
                }
                else {
                    newTbDiv.parent().hide();
                    newTbDiv.hide();
                    $("#" + config.tableFreezeFixDivID).hide();
                }
            }

            //横下滚动监听  
            oldTbDiv.scroll(function () {
                var _left = $(this).scrollLeft();
                $(config.tableDiv).find('>div>div>div').scrollLeft(_left);

            });
            divlist.attr("hasFrozen", "t");

        }
    },
    //列排序
    $.fn.ucsTableHeadOrder = function (e) {

        $.extend(config, e);

        var hasInit = $("#" + config.tableHeadCellHiddenID).length;
        var _cellName = "data-cell";

        _tb = $(config.table);
        _tbHead = $(config.tableHeadCopy);
        _tbCell = $(config.tableCellCopy);

        tb = $(_tb).find("th[" + _cellName + "]");
        tbHead = _tbHead.find("th[" + _cellName + "]");
        tbCell = _tbCell.find("th[" + _cellName + "]");
        tbFrozenCell = _tbCell.find("th[" + _cellName + "]");

        var tbAllCell = _tb.find("th");
        var divlist = $(config.tableDiv);

        //$("#" + config.tableFreezeDivID).hide();

        if (hasInit == 0) {

            var cellOrderHidden = "<input type='hidden' name='" + config.tableHeadCellHiddenID + "' id='" + config.tableHeadCellHiddenID + "' />";
            var orderTypeHidden = "<input type='hidden' name='" + config.tableHeadOrderHiddenID + "' id='" + config.tableHeadOrderHiddenID + "' />"
            $("#" + config.PageSearchFormID).append(cellOrderHidden).append(orderTypeHidden);

            $(config.alltable).addClass("tableOrder");

            var tbAllCell = _tb.find("th");
            var tbHeadAllCell = _tbHead.find("th");

            //添加点击监听
            tb.addClass("sorting").bind("click", function () {

                var nowClass = $(this).attr("class");
                $index = $(this).index();
                cleanClass(tb, tbHead, tbCell);
                resetClass(nowClass, this, $index, tbHeadAllCell);
            });
            tbHead.addClass("sorting").bind("click", function () {
                // _tbCell.parent().hide();

                var nowClass = $(this).attr("class");
                $index = $(this).index();
                cleanClass(tb, tbHead, tbCell);
                resetClass(nowClass, this, $index, tbAllCell);
            });
        }
        else {
            _tbCell.parent().show();
            tbFrozenCell.unbind("click").bind("click", function (e) {
                // _tbCell.parent().hide();
                var nowClass = $(this).attr("class");
                $index = $(this).index();
                cleanClass(tb, tbHead);
                resetClass(nowClass, this, $index, tbAllCell);

                e.stopPropagation();
            });


        }




        //如果存在checkbox,所有checkbox重绑事件 
        var AllCbk = divlist.find("table").find("input:checkbox");
        var SelectAllCbk = divlist.find("table").find("input:checkbox[id=cbxAll]");
        if (AllCbk.length > 0) {
            AllCbk.unbind("click").not("[id=cbxAll]").bind("click", function () {
                $this = $(this);
                $value = $this.attr("value");

                var row = $this.parents("tr").prevAll().length + 1;
                var cell = $this.parents("td").prevAll().length;

                targetCbx = $(config.tableCellCopy).find("tr:eq(" + row + ") td:eq(" + cell + ")").find("input[type=checkbox]");
                targetTableCbx = $(config.table).find("tr:eq(" + row + ") td:eq(" + cell + ")").find("input[type=checkbox]");

                uiformCheck($this, targetCbx);
                uiformCheck($this, targetTableCbx);
            });

            if (SelectAllCbk.length > 0) {
                SelectAllCbk.unbind("click").bind("click", function () {
                    $this = $(this);
                    if ($this.is(":checked")) {
                        AllCbk.attr("checked", "checked");
                        AllCbk.parent().attr("class", "checked");
                    }
                    else {
                        AllCbk.removeAttr("checked");
                        AllCbk.parent().removeAttr("class");
                    }
                });
            }
        }




        function uiformCheck($this, cb) {
            if ($this.is(":checked")) {
                cb.attr("checked", "checked");
                cb.not("[id=cbxAll]").parent().attr("class", "checked");
            }
            else {
                cb.removeAttr("checked");
                cb.parent().removeAttr("class");
            }
        }
        function cleanClass(t1, t2, t3) {

            //记录当前竖向滚动条位置
            //ucsLcs.setItem("nowScrollTop",param.scrollTop);
            //$().ucsTableBase.setNowScrollTop();

            $(t1).attr("class", "sorting");
            $(t2).attr("class", "sorting");
            $(t3).attr("class", "sorting");
        }
        function _ajax() {
            var searchBtn = $("#" + config.PageSearchFormID).find("#btnQuery");
            if (searchBtn.length != 0) {
                searchBtn.click();
            }
            else {

                divlist.getUcspager().setConfig({
                    params: "&" + $($("#" + config.PageSearchFormID)[0]).serialize()
                });
                divlist.getUcspager().moveFirst();
            }
        }
        function resetClass(nowClass, e, index, tb) {
            $this = $(e);
            if (nowClass == "sorting" || nowClass == "sorting_desc") {

                _tbHead.find("th:eq(" + index + ")").attr("class", "sorting_asc");
                _tb.find("th:eq(" + index + ")").attr("class", "sorting_asc");
                _tbCell.find("th:eq(" + index + ")").attr("class", "sorting_asc");

                $("#" + config.tableHeadCellHiddenID).val($this.attr(_cellName));
                $("#" + config.tableHeadOrderHiddenID).val("asc");

                _ajax();
            }
            else {

                _tbHead.find("th:eq(" + index + ")").attr("class", "sorting_desc");
                _tb.find("th:eq(" + index + ")").attr("class", "sorting_desc");
                _tbCell.find("th:eq(" + index + ")").attr("class", "sorting_desc");

                $("#" + config.tableHeadCellHiddenID).val($this.attr(_cellName));
                $("#" + config.tableHeadOrderHiddenID).val("desc");

                _ajax();
            }
        }
    },
    $.fn.ucsTableBase = {

        //弹出层-关闭
        close: function (e) {
            colseUcswindow(e);
        },

        //冻结列-表格父DIV隐藏
        closeFrozenCellDiv: function (e) {
            _divID = "#" + config.tableFreezeDivID;
            $(_divID).hide();
        }

        ,//分页pager-初始化执行判断是否开启table列设置(ucspager:init)
        pagerLoad: function (e) {

            $.extend(config, e);

            if (e.isFrozenTableHead)
                $().ucsTableHeadFreeze(config);

            if (e.isFrozenTableCell)
                $().ucsTableCellForzen(config);


            if (e.isOrderTableHead)
                $().ucsTableHeadOrder(config);


            //初始化冻结列后，因为[reloadTableSetting]被开启显示，再次隐藏(冻结表格DIV)xxxx
            //等待页面加载完毕再次调用重置冻结列，会再次开启 
            $("#" + config.tableFreezeDivID).hide();
            /////////////////////////////////////////////////////// 

            if (e.isLoadTableWidthSet) {
                $().mousedone.load(this);

                //开启父窗口
                //table
                var parentDIV = $(config.table).parent();
                var id = $(config.tableDiv).attr("id");
                $().mousedone.enableOverflow(parentDIV, id);



                var hasLoad = $(config.tableDiv).is("[hasAjaxLoadWidth]");
                if (!hasLoad) {
                    //读取服务器数据 
                    $().ucsTableBase.ajaxGetServer(function () {
                        $().mousedone.load(this);
                    });

                    $(config.tableDiv).attr("hasAjaxLoadWidth", "true");
                }

            }


            //设置表头介绍
            if (e.isFrozenTableHead || e.isFrozenTableCell)
                $(config.table).find("thead tr").attr("title", config.tableHeadIntro);



            //窗口变化监听
            window.onresize = function () {
                //ucsWindowsResize();
                if (e.isFrozenTableCell)
                    $().ucsTableBase.resetForzen(config);

                if (e.isOrderTableHead)
                    $().ucsTableHeadOrder(config);
            };
            //第一次加载监听
            window.onload = function () {

                if (e.isFrozenTableCell)
                    $().ucsTableBase.resetForzen(config)


                if (e.isOrderTableHead)
                    $().ucsTableHeadOrder(config)
            }
        },

        //弹出层初始化-冻结&隐藏设置 
        showSettingDiv: function (e) {

            $.extend(config, e);
            _popModal = $("#" + config.settingModal);

            if (_popModal.length != 0) {

                _popModal.getUcswindow().setConfig({
                    title: "冻结&隐藏设置",
                    buttons: [
                       {
                           id: "btnSaveTableSetting", text: "确定", isHighlight: true, handler: function () {
                               //保存后重新设置表格
                               $().ucsTableBase.reloadTableSetting();
                           }, icon: ""
                       }
                       ,
                       {
                           id: "btnCancelTableWidthSetting", text: "调整列宽度", handler: function () {
                               settingWidthBtn();
                           }
                       }
                    ]
                });

                $().ucsTableBase.close(config.settingModal);


                //设置按钮事件
            }
            else {
                _popModal.ucswindow({
                    title: "冻结&隐藏设置",
                    url: "",
                    async: true,
                    size: "default",
                    data: "",
                    isbackdrop: true,   //其他区域不可关闭
                    isdraggable: true,
                    buttons: [
                        {
                            id: "btnSaveTableSetting", text: "确定", isHighlight: true, handler: function () {

                                //保存后重新设置表格
                                $().ucsTableBase.reloadTableSetting(config);


                            }, icon: ""
                        }
                        ,
                        {
                            id: "btnCancelTableWidthSetting", text: "调整列宽度", handler: function () {
                                settingWidthBtn();
                            }
                        }
                    ]
                });

                _popModal = $("#" + config.settingModal);
                _popModal.getUcswindow().setConfig({
                    title: "冻结&隐藏设置",
                    size: "default"
                });


                $().ucsTableBase.close(config.settingModal);

            }

            var settingWidthBtn = function () {

                var isEnable = $(config.tableDiv).attr(config.enableWidth);
                if (isEnable == "true") {

                    _popModal.find("#btnCancelTableWidthSetting span").text("调整列宽度");

                    var Key = "_TableWidthSetting";
                    var pageName = $().ucsTableBase.getNowUrl();
                    var oldTable = $(config.table);

                    var ajaxData =
                        {
                            table: pageName + Key,
                            cell: []
                        }

                    oldTable.find("th").each(function () {
                        $this = $(this);
                        $index = $this.index();
                        $width = parseInt($this.width());
                        ucsLcs.setItem(pageName + Key + "_" + $index, $width);
                        _cell = { index: $index, width: $width };
                        ajaxData.cell.push(_cell);

                    });

                    //关闭
                    $().mousedone.clean();
                    $(config.tableDiv).removeAttr(config.enableWidth);

                    $().ucsTableBase.reloadTableSetting(config);
                    $().ucsTableBase.reloadTableWidthSetting(config);

                    $().ucsTableCellForzenFix.reset(config);

                    //打开列排序
                    if (config.isOrderTableHead)
                        $().ucsTableBase.resetOrderTableCell(config);


                    $().ucsTableBase.ajaxToServer(ajaxData);

                    alert("保存成功!");
                }
                else {

                    var oldTable = $(config.table);
                    oldTable.ucsTableCellMove({ minWidth: 60 });


                    //隐藏冻结列&冻结头表格
                    $(config.tableHeadCopy).hide();
                    $(config.tableCellCopy).hide();
                    $(config.tableCellCopyFix).hide();

                    //关闭列排序
                    $().ucsTableBase.closeOrderTableCell();


                    _popModal.find("#btnCancelTableWidthSetting span").text("保存列宽度");

                    $(config.tableDiv).attr(config.enableWidth, "true");

                }

                $().ucsTableBase.close(config.settingModal);
            };
        }
        , //弹出层右击-内容设置
        buildSettingDiv: function (e) {

            var oldTb = $(config.table);
            var _hasBind = oldTb.attr(config.enableFreezeCell);

            if (!_hasBind) {

                var tbAllCell = $(oldTb).find("th");
                var tbHeadAllCell = $(config.tableFreeze).find("th");

                //禁止右键
                $(tbAllCell).bind("contextmenu", function (e) {
                    e.stopPropagation();
                    return false;
                });

                $(tbHeadAllCell).bind("contextmenu", function (e) {
                    e.stopPropagation();
                    return false;
                });

                oldTb.attr(config.enableFreezeCell, "t");

                tbAllCell.bind('contextmenu', function (e) {
                    _showSetting();
                });

                tbHeadAllCell.bind('contextmenu', function (e) {
                    _showSetting();
                });

                //初始化弹出层
                $().ucsTableBase.showSettingDiv();
            }

            var $c = "checked";
            pageName = $().ucsTableBase.getNowUrl();
            var popDiv = $("#" + config.settingModal);

            //还原checkbox设置
            var _showAllCheckBoxState = function () {

                hiddenCell = ucsLcs.getItem(pageName + config.hiddenKey);
                frozenCell = ucsLcs.getItem(pageName + config.frozenKey);

                popDiv.find(".modal-body table input[type=checkbox]").each(function () {

                    $this = $(this).parent();
                    cb = $this.find("input").is(":checked")
                    var rowIndex = $(".pop_table_cell tr").index($this.parents("tr")) - 1;
                    var nowTD = $this.parents("td");
                    var cellIndex = nowTD.parent().find("td").index(nowTD);

                    if (cellIndex == 1) {
                        //隐藏
                        if (hiddenCell) {
                            _cell = hiddenCell.split(",");

                            if (jQuery.inArray("_" + rowIndex + "_", _cell) > -1) {
                                //$this.find("input").attr($c, $c);

                                $.uniform.update($this.find("input").attr($c, true));


                                //是否默认隐藏


                            }
                        }
                    }
                    else if (cellIndex == 2) {
                        //冻结
                        if (frozenCell && frozenCell != "-1") {
                            if (parseInt(frozenCell) >= rowIndex) {

                                $.uniform.update($this.find("input").attr($c, true));

                            }
                        }
                    }


                });
            }


            function _showSetting() {

                popDiv.find('.modal-header h3').text("冻结&隐藏设置");
                popDiv.find('#btnSaveTableSetting').show();



                var str = '<style>.pop_table_cell{  width:300px;  text-align: left; margin-right: auto; margin-left: auto;  border-left: 0; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px;} .pop_table_cell tr{height:20px;}</style>';
                str += "<table class='pop_table_cell'>"
                str += "<tr ><th style=' text-align: left;'>列名</th><th  style=' text-align: left;'>隐藏</th><th style=' text-align: left;'>冻结</th></tr>";

                tbAllCell.each(function () {
                    $this = $(this);

                    var IsDefaultHide = "";

                    if ($this.attr(param.IsDefaultHide) == "true") {

                        IsDefaultHide = param.IsDefaultHide + "='true'";
                    }

                    var cellName = $this.text().replace(/[ ]|[\r\n]/g, "");
                    if (cellName == "")
                        cellName = "第" + (parseInt($this.index()) + 1) + "列";

                    str += "<tr>";
                    str += "<td >" + cellName;
                    str += "<td ><input " + IsDefaultHide + " type='checkbox'/></td>";
                    str += "<td ><input type='checkbox'/></td>";
                    str += "</tr>";
                });
                str += "</table>";

                popDiv.find(".modal-body").html(str).find("input[type=checkbox]").uniform().bind("click", function () {

                    $this = $(this).parent();
                    cb = $this.find("input").is(":checked")

                    var rowIndex = $(".pop_table_cell tr").index($this.parents("tr")) - 1;

                    var nowTD = $this.parents("td");
                    var cellIndex = nowTD.parent().find("td").index(nowTD);

                    if (cellIndex == 1) {

                        var IsDefaultHide = nowTD.find("input").attr(param.IsDefaultHide);
                        if (IsDefaultHide == "true") {
                            alert('该列默认隐藏');
                            return;
                        }

                        //隐藏 
                        index = "_" + rowIndex + "_";
                        hiddenCell = ucsLcs.getItem(pageName + config.hiddenKey);
                        hiddenCell = (hiddenCell || "");
                        hiddenCell = hiddenCell.replace("," + index, "");

                        if (!cb) {
                            ucsLcs.setItem(pageName + config.hiddenKey, hiddenCell);
                        }
                        else {
                            ucsLcs.setItem(pageName + config.hiddenKey, hiddenCell + "," + index);
                        }
                    }
                    else if (cellIndex == 2) {
                        //冻结
                        totalLi = $(".pop_table_cell tr").length - 1;

                        if ((rowIndex + 1) == totalLi) {
                            $.uniform.update($(this).attr($c, false));
                            alert("不能冻结所有列");
                            return;
                        }

                        ucsLcs.setItem(pageName + config.frozenKey, rowIndex);

                        if (rowIndex == 0) {
                            //nextCheckBox = $(e).next().find("input");
                            nextCheckBox = $(".pop_table_cell tr:eq(" + rowIndex + 2 + ") td:eq(" + cellIndex + ")").find("input");

                            if ($c == nextCheckBox.attr($c)) {

                                $.uniform.update($(this).attr($c, true));

                            }
                            else {
                                if (!$(this).is(":checked"))
                                    ucsLcs.setItem(pageName + config.frozenKey, -1);
                            }
                        }


                        $(".pop_table_cell tr:not(:first)").each(function () {
                            _index = $(this).index() - 1;
                            _this = $(this);
                            nCb = _this.find("td:eq(2) input[type=checkbox]");

                            if (_index <= rowIndex) {
                                if ((rowIndex == 0 && _index != 0) || rowIndex != 0)

                                    $.uniform.update(nCb.attr($c, true));
                            }
                            else {
                                if ((rowIndex == 0 && _index != 0) || rowIndex != 0)
                                    $.uniform.update(nCb.attr($c, false));
                            }
                        });

                    }

                });


                popDiv.find(".modal-body").find("input[type=checkbox][IsDefaultHide=true]").each(function () {
                    $this = $(this);
                    $.uniform.update($this.attr("disabled", true));
                });
                //$.uniform.update(nowTD.find("input").attr("disabled",true));

                //设置checkbox样式事件 
                var _cleanSelectCheckBox = function (e) {
                    $index = $(e).index();
                    $parent = $(e).parent();
                    totalLi = $parent.find("li").length;

                    if (($index + 1) == totalLi) {
                        $(e).find("input").removeAttr($c);
                        alert("不能冻结所有列");
                        return;
                    }

                    ucsLcs.setItem(pageName + config.frozenKey, $index);

                    if ($index == 0) {
                        nextCheckBox = $(e).next().find("input");
                        if ($c == nextCheckBox.attr($c)) {
                            $(e).find("input").attr($c, $c);
                        }
                        else {
                            if (!$(e).find("input[type=checkbox]").is(":checked"))
                                ucsLcs.setItem(pageName + config.frozenKey, -1);
                        }

                    }

                    $parent.find("li").each(function () {
                        _index = $(this).index();
                        _this = $(this);
                        if (_index <= $index) {

                            if (($index == 0 && _index != 0) || $index != 0)
                                _this.find("input").attr($c, $c);
                        }
                        else {
                            if (($index == 0 && _index != 0) || $index != 0)
                                _this.find("input").removeAttr($c);
                        }
                    });

                };

                _showAllCheckBoxState();

                //popDiv.modal('show');
                popDiv.getUcswindow().setConfig({
                    title: "冻结&隐藏设置",
                    size: "default"
                });


                //判断是否admin
                var isAdmin = $(config.isAdminDom, parent.document).is("[isadmin=t]");
                if (!isAdmin) {
                    $("#" + config.settingModal).find("#btnCancelTableWidthSetting").hide();
                    //.btnCancel
                }

            }
        }
        , //冻结列-重设置
        resetForzen: function (e) {

            $.extend(config, e);
            //try {
            var $c = "checked";
            var frozenKey = config.frozenKey;
            var pageName = $().ucsTableBase.getNowUrl();

            //判断是否没有数据,如果没数据就不显示冻结
            var tableHasData = $(config.table).find("tbody >tr td").length;
            if (tableHasData >= 2) {
                tableHasData = true;
            }
            else {
                tableHasData = false;
            }


            frozenCell = ucsLcs.getItem(pageName + frozenKey);
            if (frozenCell && frozenCell != -1 && tableHasData) {
                var _top = $(config.table).position().top;
                var tb = $(config.table);
                var divlist = $(config.tableDiv);
                var oldTb = $(tb).clone(true);
                var hasFrozen = divlist.attr(config.hasCellFrozen);
                var newTbDiv = null;

                //第一次 
                if (tb && (hasFrozen != "t")) {

                    var oldTbDiv = $($(tb).parent()).prepend("<div id='" + config.tableFreezeDivID + "' style='display:none;background-color: white;z-index:25;position: absolute;top: " + _top + ";'></div>");
                    newTbDiv = $("#" + config.tableFreezeDivID).append(oldTb);

                    newTbDiv.find("table").attr(config.cellCopyTable, "true");
                    newTbDiv.find("input[hidden]").remove();
                    newTbDiv.find("div[id^=mydivmove]").remove();


                    $().ucsTableBase.resetForzenCellWidth(tb, newTbDiv, frozenCell, _top);

                    divlist.attr(config.hasCellFrozen, "t");

                }
                else if (tb && (hasFrozen == "t")) {
                    //删除旧的TabletableFreezeDivID
                    $("#" + config.tableFreezeDivID).hide();
                    $("#" + config.tableFreezeDivID).find(">table").remove();
                    var newTbDiv = $("#" + config.tableFreezeDivID).append(oldTb);
                    newTbDiv.find("table").attr(config.cellCopyTable, "true");
                    newTbDiv.find("input[hidden]").remove();
                    newTbDiv.find("div[id^=mydivmove]").remove();

                    $().ucsTableBase.resetForzenCellWidth(tb, newTbDiv, frozenCell, _top);
                }


                //设置表头介绍
                newTbDiv.find("table thead tr").attr("title", config.tableHeadIntro);

                newTbDiv.find("input[type=checkbox]").removeAttr("value");
            } else {
                //如果没有删除
                $("#" + config.tableFreezeDivID).remove();
                $(config.tableDiv).removeAttr(config.hasCellFrozen);
            }
            //} catch (e) { }

            //修复冻结列头部 
            $().ucsTableCellForzenFix.reset();

        }

        ,//冻结列-重算表格宽度
        resetForzenCellWidth: function (tb, newTbDiv, frozenCell, _top) {

            oldTbFrozenCellDivWidth = 0;
            var trs = newTbDiv.find("table tr");
            //debugger;
            newTbDiv.find("th").each(function () {
                index = $(this).index();
                $this = $(this);
                //debugger;
                width = tb.find("th:eq(" + index + ")").outerWidth();

                if (parseInt(frozenCell) < index) {
                    trs.find('th:eq(' + index + '),td:eq(' + index + ')').hide();
                }
                else {

                    //列没隐藏
                    if (!$this.attr("ishidden"))
                        oldTbFrozenCellDivWidth += width;
                }
            });
            // debugger;
            height = tb.find("th").height()
            newTbDiv.find("tr:eq(0) th").css("height", height);
            newTbDiv.css("width", oldTbFrozenCellDivWidth + 1);

            if (newTbDiv.is("[id!=" + config.tableFreezeFixDivID + "]")) {
                //$(config.tableFreeze).css("top", _top); 
                //设置高度宽度
                newTbDiv.find(">table").height(tb.outerHeight());
            }

            if (newTbDiv.is("[id=" + config.tableFreezeDivID + "]")) {
                newTbDiv.css("top", _top);

            }

            if (_top == 0) {
                $("#" + config.tableFreezeDivID).hide();
            }
            else {
                //重设置头部冻结高度
                //$(config.tableHeadCopy).
                var thHeight = $(config.table).find("th").outerHeight() + 1;
                $("#" + config.tableHeadFreezeDivID).parent().css("height", thHeight);

                $("#" + config.tableFreezeDivID).show();
            }
        }

        ,//重新加载列隐藏&列冻结&列宽&列排序&头部冻结
        reloadTableSetting: function (e, act) {

            $.extend(config, e);

            if (config.isCellHidden)
                $().ucsTableCellHidden.resetCell();

            if (config.isFrozenTableCell)
                $().ucsTableBase.resetForzen();


            $().ucsTableBase.close(config.settingModal);


            //判断是否开启列宽调节 
            var isEnable = $(config.tableDiv).attr(config.enableWidth);
            if (isEnable == "true") {
                //任何时候隐藏冻结列&冻结头表格
                $(config.tableHeadCopy).hide();
                $(config.tableCellCopy).hide();
                $(config.tableCellCopyFix).hide();
                $().ucsTableBase.closeOrderTableCell();
            }
            else {

                if (config.isFrozenTableHead)
                    $(config.tableHeadCopy).show();

                if (config.isFrozenTableCell)
                    $(config.tableCellCopy).show();

                $(config.tableCellCopyFix).show();

                if (config.isOrderTableHead)
                    $().ucsTableBase.resetOrderTableCell();
            }

            if (config.isReSetScroll)
                $().ucsTableBase.settingScroll();

        }
        ,//宽度调整-表格加载
        reloadTableWidthSetting: function (e) {
            $.extend(config, e);

            var Key = config.widthKey;
            var pageName = $().ucsTableBase.getNowUrl() + Key;
            var oldTable = $(config.table);
            var headTable = $(config.tableHeadCopy);
            var fixTable = $(config.tableCellCopyFix);

            //主表
            oldTable.find("th").each(function () {
                $this = $(this);
                $index = $(this).index();

                var width = ucsLcs.getItem(pageName + "_" + $index);
                if (width) {
                    $this.width(width);
                    fixTable.find("th:eq(" + $index + ")").width(width);
                    headTable.find("th:eq(" + $index + ")").width(width);
                }
            });

        }

        ,//主表-头部-宽度重设置
        resetHeadTableWidth: function (e) {

            $.extend(config, e);
            var Key = config.widthKey;
            var pageName = $().ucsTableBase.getNowUrl() + Key;
            var headTable = $(config.tableHeadCopy);

            //头表
            headTable.find("th").each(function () {
                $this = $(this);
                $index = $(this).index();

                var width = ucsLcs.getItem(pageName + "_" + $index);
                if (width) {
                    $this.width(width);
                }
            });
        }
        ,//主表-头部-排序关闭
        closeOrderTableCell: function (e) {

            var hasInit = $("#" + config.tableHeadCellHiddenID).length;
            var _cellName = "data-cell";
            _tb = $(config.table);
            _tbHead = $(config.tableHeadCopy);
            _tbCell = $(config.tableCellCopy);

            tb = $(_tb).find("th[" + _cellName + "]");
            tbHead = _tbHead.find("th[" + _cellName + "]");
            tbCell = _tbCell.find("th[" + _cellName + "]");

            if (hasInit != 0) {
                tb.removeAttr("class").unbind("click");
                tbHead.removeAttr("class").unbind("click");
                tbHead.removeAttr("class").unbind("click");

                $("#" + config.tableHeadCellHiddenID).remove();
                $("#" + config.tableHeadOrderHiddenID).remove();
            }
        }
        ,//主表-头部-排序关闭还原列
        resetOrderTableCell: function (e) {
            $().ucsTableHeadOrder();
        }

        ,//设置列宽ajax到服务器
        ajaxToServer: function (e) {
            //设置表格 
            $.ajax({
                type: "POST",
                async: true,
                url: "/UcsWebConfig/SetTableWidth",
                data: {
                    table: JSON.stringify(e)
                },
                success: function (res) {
                    //alert("succ");
                },
                error: function (e) {

                }
            });
        }
        ,//服务端读取配置
        ajaxGetServer: function (load) {

            var pageName = $().ucsTableBase.getNowUrl();
            //获取表格 
            $.ajax({
                type: "POST",
                async: true,
                timeout: 10000,
                url: "/UcsWebConfig/GetTableWidth",
                data: {
                    table: pageName + config.widthKey
                },
                success: function (res) {

                    try {
                        //设置本地表格 
                        if (res.cell) {
                            for (c in res.cell) {
                                if (res.cell[c].index.toString() != "" && res.cell[c].width.toString() != "") {
                                    ucsLcs.setItem(pageName + config.widthKey + "_" + res.cell[c].index, res.cell[c].width);
                                }
                            }
                            load();
                        }
                    } catch (e) { }
                },
                error: function (e) {

                }
            });
        }
        ,//获取当前网址
        getNowUrl: function (e) {

            var name = window.location.href.replace("http://", "").replace(/#/g, "").replace("//", "/");
            name = name.replace("https://", "");
            //param = name.split("?");
            name = name.replace(/[&|\?]ra=\d*.\d*/, "");
            return name;

        }
        //记录当前滚动条位置
        , setNowScrollTop: function (e) {
            //记录当前竖向滚动条位置
            ucsLcs.setItem("nowScrollTop", param.scrollTop);
        }
        ,//横向滚动-如果不存在添加并开启监听
        initDivScrollY: function (e, divID) {

            var id = $(e).attr("id")
            if (id == divID) {
                var nodes = $(e).children();
                $(e).append("<div style='overflow-x: scroll;min-height:10%'></div>");
                $(e).find(":last").append(nodes);

                //横下滚动监听  
                $(config.tableDiv).find(">div").scroll(function () {
                    var _left = $(this).scrollLeft();
                    $(config.tableDiv).find('>div>div>div').scrollLeft(_left);

                });
            } 
			else
            {
                //解决IE9bug
                $("#" + divID).find("> div").css("min-height", "10%");
            }
        }
        ,//滚动条设置
        settingScroll: function (e) {

            //如果是排序后执行，判断还原上次滚动条位置
            var lastScrollTop = ucsLcs.getItem("nowScrollTop");
            if (lastScrollTop && (lastScrollTop != "")) {
                $(document).scrollTop(parseInt(lastScrollTop));
                ucsLcs.setItem("nowScrollTop", "");
            }

            //滚动条置底
            var lastScrollTopBottom = ucsLcs.getItem("nowScrollTopBottom");
            if (lastScrollTopBottom && (lastScrollTopBottom != "")) {

                var h = $(document).height() - $(window).height();
                $(document).scrollTop(h);

                ucsLcs.setItem("nowScrollTopBottom", "");
            }
        }
        ,//头部冻结-隐藏兼容IE8
        hideHeadFrozen: function (e) {

            $("#" + config.tableHeadFreezeDivID).hide();
            $("#" + config.tableFreezeFixDivID).hide();
        }
        ,//返回主表
        feedbackMasterTable: function (e) {
            return config.table;
        }
    }
}(jQuery);

//表格列宽度调整
!function ($) {
    //   _tbCss =  '<style type="text/css">.jt-hidetd {table-layout: fixed;} .jt-hidetd td{white-space:nowrap;overflow:hidden;padding-right:0px}.jt-hidetd th{white-space:nowrap;overflow:hidden;padding-right:0px}</style>'
    //  $("head").append(_tbCss);

    var lastCol;//最后一列
    var tableWidth_org = 0;
    var lastColWidth_org = 0;
    var lastColWidth_new = 0;
    var $table = null,
        c = window.captureEvents ? 3 : 4,

    defaultTb = {
        divlistID: "#divlist",
        minWidth: 60,
        zIndex: 126,
        zLeft: 1,
        opacity: 0.1,
        headTb: null,
        cellTb: null
    };

    var $zLeft = 0;
    $.fn.ucsTableCellMove = function (e) {
        $.extend(defaultTb, e),
        $zLeft = parseInt(defaultTb.zLeft);
        $head = $("head");

        if (!$head.is("[hasResizeDivClass=true]")) {
            $("head").attr("hasResizeDivClass", "true")
            var _tbDIv = '<style type="text/css"> .resizeDivClass{position:absolute;margin-right:0;width:2px; height:22px;display: block; border:1px dotted black; cursor:e-resize; filter:alpha(opacity='
                    + defaultTb.opacity + ");opacity:" + defaultTb.opacity + ";}</style>";

            $("head").append(_tbDIv);

        }
        else {
            var allTable = $(".table-bordered");
            allTable.find("th").find("div[id^=mydivmoveth]").remove();
        }

        $table = $this = this;

        var g = "",
            _th = $($this).addClass("jt-hidetd").find("tr:first>th");
        0 == _th.length && (_th = $($this).find("tr:first>td"));

        var len = _th.length;
        tableWidth_org = $($this).width();

        _th.each(function (e) {
            $index = $(this).index();
            dropCellDiv = '<div id="mydivmoveth'
                    + e
                    + '"onmousedown="$().mousedone.movedown(event,this)" ondblclick="$().mousedone.clickdb(event,this)"></div>';

            //最后一个不加拖拽
            if ((len - 1) == e) {

                lastCol = $(this);
                lastColWidth_org = lastCol.width();
                lastColWidth_new = lastCol.width();
            }
            //   } else {

            $(this).append(dropCellDiv).css("min-width", defaultTb.minWidth + "px");

            var _thOffset = $(this).offset(),
                _thDivLeft = _thOffset.left + $(this).width(); // - $zLeft;

            var scrollLeft = $(defaultTb.divlistID).find(">div").scrollLeft();
            if (scrollLeft != 0) {
                _thDivLeft += scrollLeft;
            }

            $this.css("position", "relative");
            $("#mydivmoveth" + e).addClass("resizeDivClass").css({
                left: _thDivLeft,
                //top: _thOffset.top,
                top: 0,
                height: $(this).outerHeight() + "px",
                "z-index": defaultTb.zIndex
            });


            // }

        })
    },
$.fn.mousedone = {
    clean: function () {

        $table.find("th div[id^=mydivmoveth]").remove();
    }
    ,
    load: function () {

        $().ucsTableBase.reloadTableWidthSetting();

        //头冻结表
    },
    enableOverflow: function (e, divID) {
        $().ucsTableBase.initDivScrollY(e, divID);
    },
    movedown: function (d, e) {
        d = window.event || d;
        var f = d.clientX || d.pageX;
        e.mouseDownX = f, e.pareneTdW = $(e).parent().width(),
        e.pareneTableW = $table.width(), e.setCapture ? e
                .setCapture() : window.captureEvents
                && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP),
                document.onmousemove = function (d) {
                    var f = e, g = window.event || d;
                    if (f.mouseDownX) {
                        var h = f.pareneTdW + (g.clientX || g.pageX) - f.mouseDownX;
                        if (h > 0) {
                            $(f).parent().width(h);

                            if (lastColWidth_org < (lastColWidth_new + tableWidth_org - f.pareneTableW - ((g.clientX || g.pageX) - f.mouseDownX))) {
                                //lastCol.width(lastColWidth_new+tableWidth_org-f.pareneTableW-((g.clientX || g.pageX) - f.mouseDownX));
                            }

                            //b.width(f.pareneTableW + (g.clientX || g.pageX) - f.mouseDownX);
                            var i = $table.find("tr:first>th");
                            0 == i.length && (i = $table.find("tr:first>td")),

                                i.each(function (d) {
                                    var scrollLeft = $(defaultTb.divlistID).find(">div").scrollLeft();
                                    var e = $(this).offset().left + scrollLeft;
                                    f = e + $(this).width();//+ b.offset().left - c;

                                    $("#mydivmoveth" + d).css({
                                        left: f
                                    })
                                })
                        }
                    }
                }, document.onmouseup = function (a) {
                    var b = e;
                    lastColWidth_new = lastCol.width();
                    b.setCapture ? b.releaseCapture() : window.captureEvents
                            && window.releaseEvents(a.MOUSEMOVE | a.MOUSEUP), b.mouseDownX = 0
                }

        //e.stopPropagation();
    }
}

}(jQuery);
