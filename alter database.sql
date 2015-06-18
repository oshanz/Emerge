
SELECT 
    CONCAT('ALTER TABLE ',
            TABLE_SCHEMA,
            '.',
            table_name,
            ' DROP `company_id`;') AS ddl
FROM
    information_schema.tables
WHERE
    TABLE_SCHEMA = 'api_erp_accounts'
        AND table_type = 'base table' 
UNION SELECT 
    CONCAT('ALTER TABLE ',
            TABLE_SCHEMA,
            '.',
            table_name,
            ' DROP `company_group_id`;') AS ddl
FROM
    information_schema.tables
WHERE
    TABLE_SCHEMA = 'api_erp_accounts'
        AND table_type = 'base table' 
UNION SELECT 
    CONCAT('ALTER TABLE ',
            TABLE_SCHEMA,
            '.',
            table_name,
            ' DROP `updated_at`;') AS ddl
FROM
    information_schema.tables
WHERE
    TABLE_SCHEMA = 'api_erp_accounts'
        AND table_type = 'base table' 
UNION SELECT 
    CONCAT('ALTER TABLE ',
            TABLE_SCHEMA,
            '.',
            table_name,
            ' DROP `created_at`;') AS ddl
FROM
    information_schema.tables
WHERE
    TABLE_SCHEMA = 'api_erp_accounts'
        AND table_type = 'base table' 
UNION SELECT 
    CONCAT('ALTER TABLE ',
            TABLE_SCHEMA,
            '.',
            table_name,
            'DROP `deleted_at`;') AS ddl
FROM
    information_schema.tables
WHERE
    TABLE_SCHEMA = 'api_erp_accounts'
        AND table_type = 'base table' 
UNION SELECT 
    CONCAT('ALTER TABLE ',
            TABLE_SCHEMA,
            '.',
            table_name,
            'DROP `api_client_id`;') AS ddl
FROM
    information_schema.tables
WHERE
    TABLE_SCHEMA = 'api_erp_accounts'
        AND table_type = 'base table' 
UNION SELECT 
    CONCAT('ALTER TABLE ',
            TABLE_SCHEMA,
            '.',
            table_name,
            'ADD COLUMN `company_id` INT(10) UNSIGNED NOT NULL AFTER `code`,
                                                            ADD COLUMN `company_group_id` INT(10) UNSIGNED NOT NULL AFTER `company_id`,
                                                            ADD COLUMN `updated_at` DATETIME NULL DEFAULT NULL AFTER `company_group_id`,
                                                            ADD COLUMN `created_at` DATETIME NULL DEFAULT NULL AFTER `updated_at`,
                                                            ADD COLUMN `deleted_at` DATETIME NULL DEFAULT NULL AFTER `created_at`,
                                                            ADD COLUMN `api_client_id` INT(11) NULL DEFAULT 0 AFTER `deleted_at`;
                                                            ') AS sdfgd
INTO OUTFILE '/tmp/alter_table.sql' FROM
    information_schema.tables
WHERE
    TABLE_SCHEMA = 'api_erp_accounts'
        AND table_type = 'base table';
