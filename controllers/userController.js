const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const  userService  = require('../services/userService');
const { catchAsync } = require('../utils/error')

const signUp = catchAsync(async (req, res) => {
    const { email, password, name, address } = req.body;
      
      await userService.signUp(email, password, name, address);
      
      res.status(201).json({ message : "SIGN_UP_SUCCESS"});
  
  })

  const checkUser = catchAsync(async (req, res) => {
    const { email } = req.body;
      
    const result = await userService.checkUser(email);

    if (!result) return res.status(200).json({ message : "EXCESS_SUCCESS"});

    res.status(200).json({ message : "KEY_ALREADY_EXISTS"});

  })

  const signIn = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	const accessToken = await userService.signIn(email, password)

	res.status(200).json({ accessToken })

})


  module.exports = {
	signUp,
    checkUser,
    signIn
}