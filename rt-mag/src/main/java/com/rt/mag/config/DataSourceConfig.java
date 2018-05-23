package com.rt.mag.config;

import com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean;
import com.rt.mag.property.AppProperty;
import org.apache.commons.dbcp.BasicDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement(proxyTargetClass = true)
public class DataSourceConfig {
    @Autowired
    AppProperty appProperty;

    @Bean
    public BasicDataSource dataSource_web() {
        BasicDataSource bds = new BasicDataSource();
        bds.setDriverClassName(appProperty.getWebJdbcDriverClassName());
        bds.setUrl(appProperty.getWebJdbcUrl());
        bds.setUsername(appProperty.getWebJdbcUsername());
        bds.setPassword(appProperty.getWebJdbcPassword());
        bds.setValidationQuery("SELECT 1");
        bds.setTestOnBorrow(true);
        return bds;
    }

    @Bean
    public BasicDataSource dataSource_um() {
        BasicDataSource bds = new BasicDataSource();
        bds.setDriverClassName(appProperty.getUmJdbcDriverClassName());
        bds.setUrl(appProperty.getUmJdbcUrl());
        bds.setUsername(appProperty.getUmJdbcUsername());
        bds.setPassword(appProperty.getUmJdbcPassword());
        bds.setValidationQuery("SELECT 1");
        bds.setTestOnBorrow(true);
        return bds;
    }

/*
    @Bean
    @Qualifier("web")
    public SqlSessionFactoryBean sessionFactory_web() throws Exception {
        MybatisSqlSessionFactoryBean lsfb = new MybatisSqlSessionFactoryBean();
        lsfb.setDataSource(this.dataSource_web());
        lsfb.setConfigLocation(new ClassPathResource("conf/mybatis-config.xml"));
        lsfb.setMapperLocations(new Resource[]{new ClassPathResource("mapper/*.xml")});
        return lsfb;
    }

    @Bean
    static MapperScannerConfigurer mapperScannerConfigurer_web() {
        MapperScannerConfigurer msc = new MapperScannerConfigurer();
        msc.setBasePackage("com.rt.dao.mapper");
        msc.setSqlSessionFactoryBeanName("sessionFactory_web");
        return msc;
    }*/

    @Bean
    @Qualifier("um")
    public SqlSessionFactory sessionFactory_um() throws Exception {
        MybatisSqlSessionFactoryBean lsfb = new MybatisSqlSessionFactoryBean();
        lsfb.setDataSource(this.dataSource_um());
        lsfb.setConfigLocation(new ClassPathResource("conf/mybatis-config.xml"));
        lsfb.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapper/um/*.xml"));
        return lsfb.getObject();
    }

    @Bean
    static MapperScannerConfigurer mapperScannerConfigurer_um() {
        MapperScannerConfigurer msc = new MapperScannerConfigurer();
        msc.setBasePackage("com.rt.dao.mapper.um");
        msc.setSqlSessionFactoryBeanName("sessionFactory_um");
        return msc;
    }

/*
    @Bean
    @Qualifier("web")
    public DataSourceTransactionManager transactionManager_web() {
        DataSourceTransactionManager dstm = new DataSourceTransactionManager();
        dstm.setDataSource(this.dataSource_web());
        return dstm;
    }*/

    @Bean
    @Qualifier("um")
    public DataSourceTransactionManager transactionManager_um() {
        DataSourceTransactionManager dstm = new DataSourceTransactionManager();
        dstm.setDataSource(this.dataSource_um());
        return dstm;
    }
}
