const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userDao = require('../models/userDao');

const validatePassword = (password) => {
	const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

	if (!passwordRegex.test(password)) {
		const error = new Error('INVALID_PASSWORD')
		error.statusCode = 200

		throw error
	}
}

const hashPassword = async (plaintextPassword) => {
	const saltRounds = 10; 
	const salt = await bcrypt.genSalt(saltRounds);
	
	return await bcrypt.hash(plaintextPassword, salt);
}

const signUp = async (email, password, name, address) => {

	validatePassword(password)

	const hashedPassword = await hashPassword(password)

	return await userDao.createUser(email, hashedPassword, name, address)
}

const checkUser = async (email) => {

	return await userDao.checkUser(email)
}

const signIn = async (email, password) => {

	const user = await userDao.getUserByEmail(email)

    if(!user){
        const error = new Error('WRONG_EMAIL')
		error.statusCode = 400
		throw error
    }

const match = await bcrypt.compare(password, user.password);

	if (!match) {
		const error = new Error('WRONG_PASSWORD')
		error.statusCode = 400
		throw error
	}

	const accessToken = jwt.sign({ user_id : user.id }, process.env.KEY)

	return accessToken

}

const getLikeList = async (userId) => {

	return await userDao.getLikeList(userId);
    
}

const deleteLike = async (userId, productId) => {

	if (typeof productId == "string") productId = [...productId];

	return await userDao.deleteLike(userId, productId);
}

module.exports = { 
    signUp,
    checkUser,
    signIn,
	getLikeList,
	deleteLike
}