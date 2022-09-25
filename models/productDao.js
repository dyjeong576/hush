const appDataSource = require('./dataSource')

const getProduct = async (productId) => {
    const [result] = await appDataSource.query(`
      SELECT
          p.id,
          p.name,
          p.price,
          p.stock,
          p.category_id,
          p.thumbnail_image_url,
          p.created_at,
          p.updated_at,
          c.name as category_name
        FROM products p, categories c
        WHERE p.id = ? and c.id = p.category_id`, [productId]
    )
    
    return result
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

const getCategoryProducts = async (categoryId) => {
  const result = await appDataSource.query(`
    SELECT
        id,
        name,
        price,
        stock,
        category_id,
        thumbnail_image_url,
        created_at,
        updated_at
      FROM products
      WHERE category_id = ?`, [categoryId]
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

const getAllProducts = async () => {
  return await appDataSource.query(`
    SELECT
        products.id,
        products.name,
        products.price,
        products.stock,
        products.thumbnail_image_url,
        products.updated_at,
        categories.name as category_name,
        products.category_id,
        products.created_at
    FROM products,categories
    where products.category_id = categories.id;
      `)
};


module.exports = {
   getProduct,
   inputLike,
   checkLike,
   getCategoryProducts,
   addCart,
   getAllProducts
}