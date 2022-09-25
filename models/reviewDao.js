const appDataSource = require('./dataSource')

const getreviews = async (product_id) => {
    return await appDataSource.query(`
	SELECT 
        u.name as userName, 
        p.name as productName, 
        r.content, 
        r.created_at as createdAt
	FROM 
        reviews r
	JOIN 
        users u
	ON 
        u.id=r.user_id
	JOIN 
        products p
	ON 
        p.id=r.product_id
	WHERE 
        product_id=?;
        `, [product_id])
  };


  module.exports = {
    getreviews
 }