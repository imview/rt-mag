package com.rt.dto.enums;

public enum OperationType {
	
	栏目("栏目",1),按钮("按钮",2);
	
    private int value;
    private String text;
	
    OperationType(String text, int value) {
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
