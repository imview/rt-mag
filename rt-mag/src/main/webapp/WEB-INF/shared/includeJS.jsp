<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script language="JavaScript" type="text/javascript">
    if(typeof(Object)==="undefined") {
        window.location.reload();
    }
</script>
<t:js url="/lib/javascript/jquery-1.7.2.min.js"></t:js>
<t:js url="/lib/javascript/jquery-ui-1.8.21.custom.min.js"></t:js>
<script>
$(function(){
	if($(".msk")){
		$(".msk").ucsmask();
	} 
});
var umGlobal={
	basePath:'${__basePath}'
}
</script>
<t:js url="/js/module/include_header.js"></t:js>
<t:js url="/lib/javascript/verification.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-transition.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-alert.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-modal.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-dropdown.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-scrollspy.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-tab.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-tooltip.js"></t:js> 
<t:js url="/lib/javascript/bootstrap/bootstrap-popover.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-button.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-collapse.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-carousel.js"></t:js>
<t:js url="/lib/javascript/bootstrap/bootstrap-typeahead.js"></t:js>
<t:js url="/lib/javascript/jquery.cookie.js"></t:js>
<t:js url="/lib/javascript/jquery.dataTables.min.js"></t:js>
<t:js url="/lib/javascript/jquery.chosen.min.js"></t:js>
<t:js url="/lib/javascript/jquery.uniform.min.js"></t:js>
<t:js url="/lib/javascript/jquery.noty.js"></t:js>
<t:js url="/lib/javascript/jquery.iphone.toggle.js"></t:js>
<t:js url="/lib/javascript/jquery.history.js"></t:js>
<t:js url="/lib/javascript/jquery.scrollUp.min.js"></t:js>
<t:js url="/lib/javascript/jquery.paging.js"></t:js>
<t:js url="/lib/javascript/Jquery.Query.js"></t:js>
<t:js url="/lib/javascript/ucs/ucs-all.dev.js"></t:js>
<t:js url="/js/module/common_script.js"></t:js>
<t:js url="/js/module/common_ajax.js"></t:js>
<t:js url="/js/module/common.js"></t:js>
<t:js url="/js/module/helper.js" />
<t:js url="/js/My97DatePicker/WdatePicker.js"></t:js>
<t:js url="${param.curJSUrl}"></t:js>
<script>
$(function(){
	if($(".msk")){ 
		$(".msk").ucsunmask();
	} 
})
</script>