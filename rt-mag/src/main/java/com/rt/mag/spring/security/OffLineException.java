package com.rt.mag.spring.security;

public class OffLineException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    /**
      * 创建一个新的实例 
      */
    public OffLineException() {
        super();
    }

    /**
      * 创建一个新的实例 
      * @param message
      * @param cause
      */
    public OffLineException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
      * 创建一个新的实例 
      * @param message
      */
    public OffLineException(String message) {
        super(message);
    }

    /**
      * 创建一个新的实例 
      * @param cause
      */
    public OffLineException(Throwable cause) {
        super(cause);
    }

}
