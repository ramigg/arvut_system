class CreateLocalKabtv < ActiveRecord::Migration
  def self.up
    execute <<-SQL
    -- Table: listing

    -- DROP TABLE listing;

    CREATE TABLE copy_listings
    (
      id serial NOT NULL,
      lang character varying(50),
      week_day character varying(10),
      start_time smallint,
      duration smallint,
      sources character varying(200),
      title text,
      descr text,
      CONSTRAINT copy_listing_pkey PRIMARY KEY (id)
    )
    WITH (
      OIDS=FALSE
    );

    CREATE INDEX lang_week_day_start_time_idx
    ON copy_listings
    USING btree
    (lang, week_day, start_time);

    -- Table: questions
    CREATE TABLE copy_questions
    (
      id serial NOT NULL,
      lang character varying(255) NOT NULL,
      qname text NOT NULL,
      qfrom text NOT NULL,
      qquestion text NOT NULL,
      isquestion smallint NOT NULL,
      approved smallint DEFAULT 0,
      ip character varying(255),
      "timestamp" timestamp(0) without time zone NOT NULL DEFAULT now(),
      country_name text,
      country_code text,
      region text,
      city text,
      is_hidden smallint DEFAULT 0,
      translation text,
      who character varying(255),
      folded boolean,
      "position" integer,
      holder character varying(255),
      fb_id character varying(255),
      stimulator_id integer DEFAULT 0,
      remote_question_id integer DEFAULT 0,
      CONSTRAINT copy_questions_pkey PRIMARY KEY (id)
    )
    WITH (
      OIDS=FALSE
    );
    
    -- Table: dates
    CREATE TABLE copy_dates
    (
      lang character varying(255),
      week_day character varying(255),
      d integer,
      m integer
    )
    WITH (
      OIDS=FALSE
    );

    SQL
  end

  def self.down
    execute <<-SQL
    DROP INDEX lang_week_day_start_time_idx;
    DROP TABLE copy_listings;
    DROP TABLE copy_questions;
    DROP TABLE copy_dates;

    SQL
  end
end
