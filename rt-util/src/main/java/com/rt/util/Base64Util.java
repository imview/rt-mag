package com.rt.util;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;

public class Base64Util {
    // 加密
    public static String encode(byte[] b) {
        String s = null;
        if (b != null) {
            s = new BASE64Encoder().encode(b);
        }
        return s;
    }

    public static String encode(String str) {
        byte[] b = null;  
        String s = null;  
        try {  
            b = str.getBytes("utf-8");  
        } catch (UnsupportedEncodingException e) {  
            e.printStackTrace();  
        }  
        if (b != null) {  
            s = new BASE64Encoder().encode(b);  
        }  
        return s;  
    }  
  
    // 解密
    public static byte[] decode(byte[] b) {
        byte[] c = null;
        if (b != null) {
            BASE64Decoder decoder = new BASE64Decoder();
            try {
                c = decoder.decodeBuffer(new String(b, "utf-8"));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return c;
    }
    /*
    public static String decode(byte[] b) {
        byte[] c = null;
        String result = null;
        if (b != null) {
            BASE64Decoder decoder = new BASE64Decoder();
            try {
                c = decoder.decodeBuffer(new String(b, "utf-8"));
                result = new String(c, "utf-8");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result;
    }*/
    public static String decode(String s) {
        byte[] b = null;  
        String result = null;  
        if (s != null) {  
            BASE64Decoder decoder = new BASE64Decoder();  
            try {  
                b = decoder.decodeBuffer(s);  
                result = new String(b, "utf-8");  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
        }  
        return result;  
    }  
}  