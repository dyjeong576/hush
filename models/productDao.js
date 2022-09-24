const appDataSource = require('./dataSource')

const getProduct = async (productId) => {
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
        WHERE id = ?`, [productId]
    )
    
    return result [0]
  };

module.exports = {
   getProduct
}