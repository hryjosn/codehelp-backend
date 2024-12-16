import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateBookingTable1734304167532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE booking (
                id                  UUID                            DEFAULT gen_random_uuid()   NOT NULL,
                mentor_id           UUID                                                        NOT NULL,
                member_id           UUID                                                        NOT NULL,
                problem             TEXT                                                        NOT NULL,
                booking_status      SMALLINT                        DEFAULT 0                   NOT NULL,
                booking_at          TIMESTAMP WITHOUT TIME ZONE                                 NOT NULL,
                created_at          TIMESTAMP WITHOUT TIME ZONE     DEFAULT NOW()               NOT NULL,
                PRIMARY KEY(id),
                CONSTRAINT fk_booking_member FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE,
                CONSTRAINT fk_booking_mentor FOREIGN KEY (mentor_id) REFERENCES mentor(id) ON DELETE CASCADE
            );

            COMMENT ON TABLE booking IS 'Booking table';
            COMMENT ON COLUMN booking.id IS 'Booking UUID';
            COMMENT ON COLUMN booking.mentor_id IS 'Which mentor is booked';
            COMMENT ON COLUMN booking.member_id IS 'Which member made the booking';
            COMMENT ON COLUMN booking.problem IS 'The member problem description';
            COMMENT ON COLUMN booking.booking_status IS 'The stage of this booking 0: request 1: reject 2: accept 3: finish';
            COMMENT ON COLUMN booking.booking_at IS 'The member booking time';
            COMMENT ON COLUMN booking.created_at IS 'Booking create time';
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE booking;
        `)
  }
}
