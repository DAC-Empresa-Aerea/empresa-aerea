package com.ms.reserve.config;

import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.orm.jpa.persistenceunit.PersistenceUnitManager;
import javax.sql.DataSource;
import org.springframework.beans.factory.ObjectProvider;
import java.util.HashMap;

@Configuration
public class JpaBuilderConfig {

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setGenerateDdl(true); 
        vendorAdapter.setShowSql(true);
        return vendorAdapter;
    }

    @Bean
    public EntityManagerFactoryBuilder entityManagerFactoryBuilder(
        JpaVendorAdapter jpaVendorAdapter,
        ObjectProvider<PersistenceUnitManager> persistenceUnitManager
    ) {
        return new EntityManagerFactoryBuilder(
            jpaVendorAdapter,
            new HashMap<>(),
            persistenceUnitManager.getIfAvailable()
        );
    }
}
