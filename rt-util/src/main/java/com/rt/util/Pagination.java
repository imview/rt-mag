package com.rt.util;

import java.util.Collections;
import java.util.List;
import java.util.Map;

public class Pagination<T1,T2> {
    private Map<String, Object> conditionsMap;
    private T1 conditions;
    private List<T2> records;

    private Integer pageIndex;
    private Integer pageSize;

    public Pagination() {
        this.records = Collections.emptyList();
    }

    private Integer offset;
    private Integer totalCount;
    public Integer getOffset() {
        return this.pageSize * this.pageIndex - this.pageSize;
    }

    public Map<String, Object> getConditionsMap() {
        return conditionsMap;
    }

    public void setConditionsMap(Map<String, Object> conditionsMap) {
        this.conditionsMap = conditionsMap;
    }

    public T1 getConditions() {
        return conditions;
    }

    public void setConditions(T1 conditions) {
        this.conditions = conditions;
    }

    public List<T2> getRecords() {
        return records;
    }

    public void setRecords(List<T2> records) {
        this.records = records;
    }

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }
}