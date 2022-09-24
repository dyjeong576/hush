const dataSource = require('./dataSource')

const createUser = async (email, hashedPassword, name, address) => {

  return await dataSource.query(`
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

    const [result] =  await dataSource.query(`
	SELECT EXISTS(
		SELECT *
		FROM users 
		WHERE email = ?) AS boolean;`,
      [email]
    )
	console.log(result.boolean)
	return result;
  }

  const getUserByEmail = async (email) => {
	const [user] = await dataSource.query(`
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
	return await dataSource.query(`
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

		await dataSource.query(`
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

module.exports = { 
	createUser,
    checkUser,
    getUserByEmail,
	getLikeList, deleteLike
}