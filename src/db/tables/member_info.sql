CREATE TABLE IF NOT EXISTS member_info (
    user_id             UUID            PRIMARY KEY,
    level_of_experience VARCHAR(30)     NOT NULL,
    field_of_work       JSONB           NOT NULL
);
