 CREATE TYPE valid_status AS ENUM ('active','complete');

CREATE TABLE orders (status valid_status ,user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id),id SERIAL PRIMARY KEY); 



  
 


