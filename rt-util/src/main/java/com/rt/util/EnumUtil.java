package com.rt.util;

import org.apache.commons.lang3.reflect.MethodUtils;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;


/**
 * System.out.println( EnumUtil.getText(EnumType.class, 2 ) ) ; 获取枚举2的文本内容
 * System.out.println( EnumUtil.getEnumItem(EnumType.class, 2) ) ; 将数字2转换成为枚举
 * System.out.println( EnumUtil.parseEnum(EnumType.class) ) ; 将枚举转换成为Map
 **/
public class EnumUtil {
    private static Map<String,Map<String,String> > mapList=new HashMap<String,Map<String,String> >();
    public static Map<String,String> getEnumMap(String enumName)throws ClassNotFoundException{
        if(mapList.containsKey(enumName)){
            return mapList.get(enumName);
        }
        else{
            Class<?> cls=Class.forName(enumName);
            Map<String,String> map=parseEnum(cls);
            mapList.put(enumName, map);
            return map;
        }
    }
    public static String getText(String className, Object value) throws ClassNotFoundException {
        Class<?> cls=Class.forName(className);
        return  getText(cls,value);
    }
    public static String getText(Class<?> cls, Object value) {
        if (value == null)
            return "";
        Map<String, String> map;
        String className=cls.getName();
        if(!mapList.containsKey(className)){
            map=parseEnum(cls);
            mapList.put(className, map);
        }
        else{
            map=mapList.get(className);
        }

        return map.get(value.toString());
    }

    public static <T> Map<String, String> parseEnum(Class<T> ref) {
        Map<String, String> map = new LinkedHashMap<String, String>();
        if (ref.isEnum()) {
            T[] ts = ref.getEnumConstants();
            for (T t : ts) {
                String text = getInvokeValue(t, "getText");
                Enum<?> tempEnum = (Enum<?>) t;
                if (text == null) {
                    text = tempEnum.name();
                }
                String value = getInvokeValue(t, "getValue");
                if (value == null) {
                    value = String.valueOf(tempEnum.ordinal());
                }
                map.put(value, text);
            }
        }
        return map;
    }

    public static <T> T getEnumItem(Class<T> ref, Object i) {
        T returnT = null;
        if (ref.isEnum()) {
            T[] ts = ref.getEnumConstants();
            String tempI =  i.toString();
            for (T t : ts) {
                Enum<?> tempEnum = (Enum<?>) t;
                String value = getInvokeValue(t, "getValue");
                if (value == null) {
                    value = String.valueOf(tempEnum.ordinal());
                }
                if (tempI.equals(value)) {
                    returnT = t;
                    break;
                }
            }
        }
        return returnT;
    }

    static <T> String getInvokeValue(T t, String methodName) {
        Method method = MethodUtils.getAccessibleMethod(t.getClass(), methodName);
        if (null == method) {
            return null;
        }
        try {
            String text = String.valueOf(method.invoke(t));
            return text;
        } catch (Exception e) {
            return null;
        }
    }
}
