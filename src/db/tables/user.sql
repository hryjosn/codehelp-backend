CREATE TABLE IF NOT EXISTS "user" (
    id                  UUID            PRIMARY KEY         DEFAULT gen_random_uuid(),
    user_name           VARCHAR(30)     NOT NULL,
    email               VARCHAR(254)    NOT NULL UNIQUE,
    password            VARCHAR(100)    NOT NULL,
    avatar              VARCHAR(150)    NOT NULL,
    gender              VARCHAR(30)     NOT NULL,
    country             VARCHAR(30)     NOT NULL,
    title               VARCHAR(100)    NOT NULL,
    company             VARCHAR(100)    NOT NULL,
    phone_number        VARCHAR(20)     NOT NULL,
    email_otp           BOOLEAN         NOT NULL            DEFAULT FALSE,
    introduction        VARCHAR(500)    NOT NULL,
    created_at          timestamp       NOT NULL            DEFAULT LOCALTIMESTAMP,
    updated_at          timestamp       NOT NULL            DEFAULT LOCALTIMESTAMP
);
