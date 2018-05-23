 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<t:js url="/lib/javascript/Ztree/jquery.ztree.core-3.5.min.js"></t:js>
<t:js url="/lib/javascript/Ztree/jquery.ztree.excheck-3.5.min.js"></t:js> 
<t:css url="/lib/css/zTreeStyle.css"></t:css>

 <input type="hidden" id="List" value='${treeJson}'/>

 <input type="hidden" id="vname" value="" />
 <input type="hidden" id="vmodulID" value="" />
 <input type="hidden" id="CRoleID" value="${roleId}"/>
 <div class="content_wrap">
     <div class="zTreeDemoBackground left">
         <ul id="trees" class="ztree" style="height: 350px;">
         </ul>
     </div>
 </div>

<script type="text/javascript">
    function beforeCheck(treeId, treeNode) {
        className = (className === "dark" ? "" : "dark");
        return (treeNode.doCheck !== false);
    }
    function onCheck(e, treeId, treeNode) {
        var treeObj = $.fn.zTree.getZTreeObj("trees"),
            nodes = treeObj.getCheckedNodes(true),
            vmodulID = "";
        for (var i = 0; i < nodes.length; i++) {
            vmodulID += nodes[i].id + "|";
        }
        $("#vname").val(vname);
        $("#vmodulID").val(vmodulID);
    }
    $(document).ready(function () { 
        var zNodes = eval(decodeURIComponent($("#List").val()));
        var setting = {
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            }, callback: {
                onCheck: onCheck
            }
        };
        setting.check.chkboxType = { "Y": "ps", "N": "ps" };
        $.fn.zTree.init($("#trees"), setting, zNodes);
    });
</script>

