BEGIN;
DO $$
BEGIN
 IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'valid_status') THEN
    CREATE TYPE  valid_status AS ENUM ('active','complete');
 END IF;
 END
$$;
CREATE TABLE orders (status valid_status ,user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id),id SERIAL PRIMARY KEY); 
COMMIT;

  
 


