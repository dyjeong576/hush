const appDataSource = require('./dataSource')

const createUser = async (email, hashedPassword, name, address) => {

  return await appDataSource.query(`
	  INSERT INTO users (
        email, password, name, address
		) VALUES (
				?,
				?, 
				?, 
				?
		)`,
    [email, hashedPassword, name, address]
  )
}

const checkUser = async (email) => {

    const [result] =  await appDataSource.query(`
	SELECT EXISTS(
		SELECT 
			email 
		FROM 
			users 
		WHERE 
			email = ?) AS boolean;`,
      [email]
    )

	return result.boolean;
  }

  const getUserByEmail = async (email) => {
	const [user] = await appDataSource.query(`
		SELECT 
			id,
			name,
			email,
			password
		FROM users
		WHERE email=?`, [email]
	)

	return user
}

const getLikeList = async (userId) => {
    console.log(userId);
	return await appDataSource.query(`
	  SELECT 
		  products.id as productId, 
		  products.name as productName, 
		  products.price, 
		  categories.name as categoryName 
	  FROM 
		  products 
	  INNER JOIN likes ON
		  likes.product_id = products.id  
	  INNER JOIN categories ON
		  categories.id = products.category_id 
	  WHERE likes.user_id = ?`,
		  [userId]
	)
  }

  const deleteLike = async (userId, productId) => {

	for(const el of productId ){

		await appDataSource.query(`
		DELETE FROM 
			likes
		WHERE 
			user_id= ? AND
			product_id = ?`, 
			[userId, el]
		)
	}

	return;

}

const getPoint = async (userId) => {

	const [result] = await appDataSource.query(`
		SELECT 
			point
		FROM 
			users
		WHERE users.id = ?`,
			[userId]
	)

	return result;
}
  


module.exports = { 
	createUser,
    checkUser,
    getUserByEmail,
	getLikeList, 
	deleteLike,
	getPoint
}