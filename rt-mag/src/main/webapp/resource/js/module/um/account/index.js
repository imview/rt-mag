    var moduel = new Array();
    var secondM = new Array();
    $(function () {  
        $(".btn.btn-refresh.btn-round").hide();
        $(".btn.btn-minimize.btn-round").hide();
        $(".btn.btn-close.btn-round").hide();

        var menuLeft = eval($("#menuleft").val());
        var innHtml = "";
        for (var i = 0; i < menuLeft.length; i++) {
            if (menuLeft[i].level == 1) {
                moduel[menuLeft[i].id] = new Array();
            }
            if (menuLeft[i].level == 2 && moduel[menuLeft[i].parentId]) {
                moduel[menuLeft[i].parentId].push(menuLeft[i]);
                secondM[menuLeft[i].id] = new Array();
            }
            if (menuLeft[i].level == 3 && secondM[menuLeft[i].parentId]) {
                secondM[menuLeft[i].parentId].push(menuLeft[i]);
            }
        }

        $("li[id^='main_']").live("click", function (e) {
            ShowSubMenu($(this).attr("id"));
        });

        showGetHtml(umGlobal.defaultModuleId);
        $("a[id^='Top_']").live("click", function (e) {
            $('.nav li a').removeClass('current');
            $(this).addClass('current');
        });

        $("a[request_href]").live("click", function () {
              
            //每点击一次就加载新页面，那么就显示遮罩层
            $("#loading").show();
            var tabs = $('#menu-content');
            var tab = tabs.tabs('getTab', this.title);
            var url = $(this).attr("request_href");
            //if (url.split("/").length == 2) {
            //    url = "/" + url;
            //}

            if (tab) {
                tabs.tabs('select', this.title); 
                var i = $(".tabs-selected").index()//-1;
                try{
                    var originalSrc = $("iframe[name=ifr]").eq(i).attr("src").replace(/[&|\?]ra=\d*.\d*/g, ""); 
                    $("iframe[name=ifr]").eq(i).attr("src", originalSrc + (originalSrc.indexOf('?') > 0 ? '&' : '?') + "ra=" + RandomNumber());
                }
                catch (e) {  }
            }
            else { 
                var html = '<iframe name="ifr" src="' + url + '" width="100%" height="100%"  frameborder="0" style="margin-bottom:-20px;overflow-y:hidden;" />';
                tabs.tabs("add", { title: this.title, content: html, closable: true });
            }
              
            frameResize(); 

        });
     
        //选中选项卡事件触发操作
        $('#menu-content').tabs({
            onSelect: function (title, index) {

                $(".selected").removeClass("selected");
                $(".menuli a[title=" + title + "]").prev().addClass("selected");
                var sumWeight = 0;
                $.each($("#menu-content ul li"), function (item) {
                    sumWeight += $(this).width()
                });

                //var menuWidth = $("#menu-content").width() - $("#tabs-scroller-left").width() - $("#tabs-scroller-right").width();
                var menuWidth = $("#menu-content").width() - 42;
                if (sumWeight > menuWidth) {
                    $("#menu-content .tabs-wrap").css("width", menuWidth - 42).css("left", "20px");
                }

                var tabs=$("#menu-content ul li");
                var firstTab = $(tabs[0]);
               
                if (tabs.length == 1) {
                    $("#menu-content .tabs-closer-all").css("display", "none");
                    if (firstTab)
                        firstTab.find('.tabs-close').hide();
                }
                else {
                    if (tabs.length >1) { 
                        $("#menu-content .tabs-closer-all").css("display", "block");
                       // $("#menu-content .tabs-wrap").css("width", $("#menu-content .tabs-wrap").width() - 20);
                    }
                    if (firstTab)
                        firstTab.find('.tabs-close').show();
                }
            }
        });

        var firstUrl = $($("#showMenu li.sub a")[0]).attr("request_href");
        $("a[request_href='" + firstUrl + "']").click();
        collapseShow();
        $("#menu-content .tabs-scroller-right").after('<div id="btnCloseAll" class="tabs-closer-all tabs-scroller-over" style="display: none;cursor: pointer;z-index:21" title="关闭全部"></div>');


        $("#menu-content .tabs-scroller-right").after('<div id="btnFullScreen" class="tabs-fullscreen tabs-btnFullScreen" style="cursor: pointer;z-index:21" title="全屏查看"></div>');


        $("#btnCloseAll").bind("click", function () {
           
            $(".tabs li").each(function () {
                var $this = $(this), index = $this.index();
                if (index != 0) {
                    $this.find(".tabs-close").click(); 
                }
            });
            frameResize();
        });


        //全屏
        $("#divContent").ucsfullscreen({ 
            element_back_style: "margin-left:10px;",
            max_class: "tabs-fullscreen tabs-btnFullScreen",
            min_class: "tabs-fullscreen tabs-btnMiddleScreen",
            btn_element: "#btnFullScreen",
            ext_max: function () {
                //console.log("max"); 
                $(".icon-chevron-left").click();
                $("#icon-chevron-right").css("display", "none"); 
                $("#divContent").css("margin-left", "0");

                $("#btnFullScreen").attr("title", "还原窗口");
                frameResize();
            },
            ext_min: function () {
                //console.log("min");  

                $("#btnFullScreen").attr("title", "全屏查看");
                $(".icon-chevron-right").click(); 
                frameResize();
            }
        });
        
    });

    function getHtml(mid) {
        var innerHtml = "";
        var mod = moduel[mid];
        var firstModId = "";
        $.each(mod || [], function (i, e) {
            innerHtml += '<li class="main" id="main_' + mod[i].name + '" style="cursor: pointer;">' +
                '<a class="ajax-link btn-primary"><i class="icon-tags icon-white"></i><span class="hidden-tablet">' + mod[i].name + '</span></a></li>';
            var sedMod = secondM[mod[i].id];
            if (i == 0) {
                firstModId = "main_" + mod[i].name;
            }
            $.each(sedMod || [], function (j, e) {
                innerHtml += "<li class ='sub' style='display: none;'name='sub_" + mod[i].name + "' MID=" + mod[i].parentId + "><a class='ajax-link'" +
                    "request_href='" + umGlobal.basePath+'/'+ sedMod[j].url + "'title='" + sedMod[j].name + "'>" +
                    "<i class='icon icon-blue icon-tag'></i><span class='hidden-tablet'>" + sedMod[j].name + "</span></a></li>";
            });
        });
        $("#showMenu").html(innerHtml);
        ShowSubMenu(firstModId);
    }
    function showGetHtml(ID) {
        getHtml(ID);
    }

    //设置Iframe的宽度
    function frameResize() {
         
                var $iframe = $("iframe");
                var bodyHeight = $(window).height();
                var h = bodyHeight - 128;
                $iframe.css("height", h);
                $("#menu-content").css("height", h);

                //判断是否全屏
                var globalShow = $("#divContent").attr("ucsglobalscreen_data");
         

               // debugger;
               if ( globalShow == "on" )
               {
                   var contentWidth = $("#divContent").width();
                   $("#menu-content").css("width", contentWidth);
                   $(".tabs-wrap").css("width", contentWidth);

                   $("#menu-content").css("height", bodyHeight + "px");

                   $("#menu-content  iframe").height(bodyHeight);

               }
               else
               {
                    
                   var contentWidth = $(".row-fluid").width() - $("#leftMenu").width() - 10;
                   $("#menu-content").css("width", contentWidth);
                   $(".tabs-wrap").css("width", contentWidth - 42);

                   //$("#menu-content  iframe").height(h);
               }


                //重新算菜单栏宽度
               var sumWeight = 0;
               $.each($("#menu-content ul li"), function (item) {
                   sumWeight += $(this).width()
               });

               var menuWidth = $("#menu-content").width() - 42;
               if (sumWeight > menuWidth) {
                   $("#menu-content .tabs-wrap").css("width", menuWidth - 42).css("left", "20px");
               }

           }

    window.onresize = function () {
     
                 frameResize();
             };
       window.onload = frameResize;

    function RedirectWithIfr(title,url)
    {
        var tabs = $('#menu-content');
            var tab = tabs.tabs('getTab', title);

            if (tab) {
                tabs.tabs('select', title);
                var i = $(".tabs-selected").index()//-1;
                $("iframe[name=ifr]").eq(i).attr("src",$("iframe[name=ifr]").eq(i).attr("src"));

            }
            else {
                var html = '<iframe name="ifr" src="' + umGlobal.basePath+'/'+ url + '" width="100%" height="100%"  frameborder="0" style="margin-bottom:-20px;overflow-y:hidden;" />';
                tabs.tabs("add", { title: title, content: html, closable: true });
                frameResize();
            }
    }