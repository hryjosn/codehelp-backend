const createMentorInfoTableQueryString = `
    CREATE TABLE IF NOT EXISTS mentor_info (
        id                      UUID            PRIMARY KEY                             DEFAULT gen_random_uuid(),
        user_id                 UUID            UNIQUE,
        years_of_experience     VARCHAR(5)      NOT NULL,
        linked_url              VARCHAR(257)    NOT NULL,
        primary_expertise       VARCHAR(100)    NOT NULL,
        secondary_expertise     VARCHAR(100)    NOT NULL                                DEFAULT '',
        tertiary_expertise      VARCHAR(100)    NOT NULL                                DEFAULT '',
        disciplines             JSONB           NOT NULL,
        skills                  JSONB           NOT NULL,
        tools                   JSONB           NOT NULL
    );
`
export default createMentorInfoTableQueryString
