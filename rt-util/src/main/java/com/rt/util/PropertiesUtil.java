package com.rt.util;
import java.util.Properties;

public class PropertiesUtil
{
  private static Properties defaultInitProperties;

  public static void setInitProperty(Properties props)
  {
    defaultInitProperties = props;
  }

  public static String getProperty(String name) {
    return defaultInitProperties.getProperty(name);
  }

  public static String getProperty(String name, String defaultValue) {
    if ((defaultInitProperties.getProperty(name) == null) || (defaultInitProperties.getProperty(name).equals(""))) {
      return defaultValue;
    }
    return defaultInitProperties.getProperty(name);
  }
}
