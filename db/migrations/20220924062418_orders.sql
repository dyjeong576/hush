-- migrate:up
CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_status_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    req_message VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (order_status_id) REFERENCES order_status (id)
)
-- migrate:down
DROP TABLE orders;
