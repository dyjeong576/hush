-- migrate:up
CREATE TABLE product_images
(
id INT NOT NULL AUTO_INCREMENT,
image_url VARCHAR(500) NOT NULL,
product_id INT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (id),
FOREIGN KEY (product_id) REFERENCES products (id)
);

-- migrate:down
DROP TABLE product_images;