const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

//Register
router.post('/register', async (req, res) => {
  //res.send('Register');
  //res.send(req.body);

  //Validating the data
  //returns an object
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //cheking if the user is already in the dataBase
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) return res.status(400).send('Email Already Exists');

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  if (user.save()) {
    res.send({
      user: user._id
    });
  } else {
    res.status(400);
  }
});

//LogIn
router.post('/login', async (req, res) => {
  //Validating the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //cheking if the email exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send('Email is not Found');

  //if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) res.status(400).send('Invalid Password');

  //Create and Assign a Token
  //Passing parameters including even what will be passed during decode.
  const token = jwt.sign(
    {
      _id: user._id
    },
    process.env.TOKEN_SECRET
  );

  res.header('auth-token', token).send(token);

  res.send('Logged In');
});

module.exports = router;
