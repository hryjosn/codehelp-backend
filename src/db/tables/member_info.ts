const createMemberInfoQueryString = `
    CREATE TABLE IF NOT EXISTS member_info (
        id                  UUID            PRIMARY KEY,                       
        user_id             UUID            UNIQUE,
        level_of_experience VARCHAR(30)     NOT NULL,
        field_of_work       JSONB           NOT NULL
    );
`

export default createMemberInfoQueryString
