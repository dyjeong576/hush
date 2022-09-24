-- migrate:up
CREATE TABLE order_item_status (
    id INT NOT NULL AUTO_INCREMENT,
    status VARCHAR(50),
    PRIMARY KEY (id)
);
-- migrate:down
DROP TABLE order_item_status;