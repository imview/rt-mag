package com.rt.util;

public enum TrueFalse {
	
	True("true",1),False("false",0);
	
    private int value;
    private String text;
	
	TrueFalse(String text, int value) {
        this.value = value;
        this.text = text;
    }

    public int getValue() {
        return this.value;
    }

    public String getText() {
        return this.text;
    }
}
