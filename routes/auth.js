const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {
  //res.send('Register');
  //res.send(req.body);

  //Validating the data
  //returns an object
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //cheking if the user exists
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) return res.status(400).send('Email Already Exists');

  //Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  if (user.save()) {
    res.send(user);
  } else {
    res.status(400);
  }
});

module.exports = router;
