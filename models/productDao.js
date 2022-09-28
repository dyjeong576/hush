const appDataSource = require('./dataSource')

const getProduct = async (productId) => {
    const [result] = await appDataSource.query(`
    SELECT
      p.id,
      p.name,
      p.price,
      p.stock,
      c.name as category_name,
      p.thumbnail_image_url,
      JSON_ARRAYAGG(i.image_url) AS image_url
    FROM 
      products p
    JOIN 
      categories c
    ON  
      c.id = p.category_id
    JOIN
      product_images i
    ON
      p.id = i.product_id
    WHERE 
      p.id = ?`, [productId]
    )
    
    if(typeof result.image_url == "string"){
      result.image_url = result.image_url.replace("[",'');
      result.image_url = result.image_url.replace("]",'');
      result.image_url = result.image_url.replace(/"/g,'');
      result.image_url = result.image_url.replace(/ /g,'');
      result.image_url = result.image_url.split(",");
    }
  
    return result;
  };

  const checkLike = async (userId, productId) => {

    const [doesExist] = await appDataSource.query(`
    SELECT EXISTS(
        SELECT 
            id
        FROM 
            likes 
        WHERE 
            user_id = ? AND
            product_id = ?) AS boolean`,
    [userId, productId]
  )

  return doesExist.boolean;

}

const inputLike = async (userId, productId) => {
  console.log(userId);
    return await appDataSource.query(`
    INSERT INTO likes (
      user_id, product_id
      ) VALUES (
              ?,
              ?
      )`,
  [userId, productId]
    )
}

const getCategoryProducts = async (category) => {

  const result = await appDataSource.query(`
    SELECT
        p.id,
        p.name,
        p.price,
        p.stock,
        c.id as category_id,
        c.name as category_name,
        thumbnail_image_url
      FROM products p
      INNER JOIN
        categories c on c.id = p.category_id
      WHERE c.name = ?`, [category]
  )

  return result
}

const addCart = async (product_id, quantity, userId) => {
	const result = await appDataSource.query(`
		INSERT INTO carts (
			user_id,
			product_id,
			quantity
		) VALUES (
			?,
			?,
			?
		)`, [userId, product_id, quantity]
	)

	return result.insertId
}

const getAllProducts = async (limit, offset) => {

  return await appDataSource.query(`
    SELECT
      products.id,
      products.name,
      products.price,
      products.stock,
      products.thumbnail_image_url,
      categories.name as category_name,
      products.category_id
    FROM 
      products,categories
    WHERE 
      products.category_id = categories.id
    LIMIT ? offset ?
      `, 
      [+limit, +offset]
  )
};


module.exports = {
   getProduct,
   inputLike,
   checkLike,
   getCategoryProducts,
   addCart,
   getAllProducts
}