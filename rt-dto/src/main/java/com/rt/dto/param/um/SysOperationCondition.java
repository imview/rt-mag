package com.rt.dto.param.um;

public class SysOperationCondition {

    private String moduleId;
    private String categoryId;
    private String menuId;
    private String operationName;

    public String getModuleId() {
        return moduleId;
    }

    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    public String getOperationName() {
        return operationName;
    }

    public void setOperationName(String opertionName) {
        this.operationName = opertionName;
    }
}
