$(document).ready(function () { 
    pageReady(); 
    $('#divlist').getUcspager().setConfig({
        params: $($("#searchForm")[0]).serialize()
    });
    $('#divlist').getUcspager().moveFirst();

});

function pageReady() {
	$('#divlist').ucspager({
        params: $($("#searchForm")[0]).serialize(), 
        url: umGlobal.basePath+"/project/confirm/list_page",
        id: "divlist"
    });
	
	$("#divProjectName").ucsfield("ucsfield.text", {
        id: "txtProjectName",
        name:"projectName",
        labelText: "项目名称" 
    });
	
	$("#divProjectNo").ucsfield("ucsfield.text", {
        id: "txtProjectNo",
        name:"projectNo",
        labelText: "项目编号" 
    });
	
	//融资状态
	$("#divFinanceType").ucsfield("ucsfield.combobox", {
        id: "financeType",
        name:"financeType",
        labelText: "状态",
        //url:"getFinanceType"
        valueType:"FinanceTypeEnum"  //FinanceTypeEnum 枚举类
    });
	
	//资产类型
	$("#divAssetType").ucsfield("ucsfield.combobox", {
        id: "assetType",
        name:"assetType",
        labelText: "资产类型",
        //url:"getFinanceType"
        valueType:"AssetTypeEnum"  //FinanceTypeEnum 枚举类
    });
	
	$("#divValueBeginStart").ucsfield("ucsfield.date", {
        labelText: "起息日",
        id: "txtValueBeginStart",
        name: "valueBeginStart",
        onfocus: function () { WdatePicker({ dateFmt: 'yyyy-MM-dd'}) }
    });
	
	//End Date 不能小于  Start Date
	$("#divValueBeginEnd").ucsfield("ucsfield.date", {
        labelText: "",
        id: "txtValueBeginEnd",
        name: "valueBeginEnd",
        onfocus: function () { WdatePicker({ dateFmt: 'yyyy-MM-dd'}) }
    });
	
	$("#divSettleTimeStart").ucsfield("ucsfield.date", {
        labelText: "起息日",
        id: "txtSettleTimeStart",
        name: "settleTimeStart",
        onfocus: function () { WdatePicker({ dateFmt: 'yyyy-MM-dd'}) }
    });
	
	$("#divSettleTimeEnd").ucsfield("ucsfield.date", {
        labelText: "",
        id: "txtSettleTimeEnd",
        name: "settleTimeEnd",
        onfocus: function () { WdatePicker({ dateFmt: 'yyyy-MM-dd'}) }
    });
	
	
	
	 //查询
   $("#btnQuery").ucsbutton({
       icon: "search",
       handler: function () {
           $('#divlist').getUcspager().setConfig({
               params: $($("#searchForm")[0]).serialize()
           });
           $('#divlist').getUcspager().moveFirst();
       },
       text: "查询",
       size: "small",
       isHighlight: true
   });
   
   $("#btnReset").ucsbutton({
       icon: "reset",
       handler: function () {
           $("#searchForm")[0].reset();
       },
       text: "重置"
   });
   
   //导出
   $("#btnExport").ucsbutton({
       icon: "export",
       handler: function () {
           $('#divlist').getUcspager().setConfig({
               params: $($("#searchForm")[0]).serialize()
           });
           //ajax 发送导出请求操作
           //$('#divlist').getUcspager().moveFirst();
       },
       text: "导出",
       size: "small",
       isHighlight: true
   });
	
   
	
	
	
	
	
	
	
	
}