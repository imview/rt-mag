package com.rt.util;

import org.dozer.DozerBeanMapper;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

public class BeanMapperUtil {
	private static DozerBeanMapper dozer = new DozerBeanMapper();

	public static <T> T map(Object sourceObject, Class<T> destObjectclazz) {
		return ((sourceObject == null) ? null : dozer.map(sourceObject, destObjectclazz));
	}

	public static <T, S> List<T> mapList(Collection<S> sourceList, Class<T> destObjectclazz) {
		if (sourceList == null) {
			return null;
		}
		List destinationList = new ArrayList();
		for (Iterator it = sourceList.iterator(); it.hasNext();) {
			destinationList.add(map(it.next(), destObjectclazz));
		}
		return destinationList;
	}
}