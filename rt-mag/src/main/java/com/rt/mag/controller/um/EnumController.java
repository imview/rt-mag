package com.rt.mag.controller.um;

import com.rt.util.EnumUtil;
import com.rt.util.NameValue;
import com.rt.util.ServiceResult;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
public class EnumController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "common/getEnums", method = RequestMethod.POST)
	public @ResponseBody  ServiceResult addSave( String targetAction, String ignoreValue,String valueType,HttpServletRequest request) throws Exception{
		ServiceResult result=new ServiceResult();
		logger.debug("ignoreValue:"+ignoreValue);
        String enumName = "com.rt.dto.enums".concat(targetAction);  //zb.financing.service.model.
		if(targetAction.contains("."))
			enumName=targetAction;
		Map<String,String> map=EnumUtil.getEnumMap(enumName);
			 
	    List<String > lsInnoreValue=Arrays.asList(StringUtils.split(ignoreValue==null?"":ignoreValue.trim(),","));
		
		List<NameValue> ls=new ArrayList<NameValue>();
		for (Map.Entry<String, String> entry : map.entrySet()) {  
			 if(!lsInnoreValue.isEmpty() && lsInnoreValue.contains(entry.getKey()))
				 continue;
			
			NameValue item = new NameValue(entry.getKey(),entry.getValue());
			logger.debug("key:"+entry.getKey());
			logger.debug("value:"+entry.getValue());
			ls.add(item);
		}
		Map<String,Object> dicData=new HashMap<String,Object>();
		dicData.put(targetAction, ls);
		result.setDicData(dicData);
		return result;
	}
}
