const router = require('express').Router();
const User = require('../model/User');

router.post('/register', async (req, res) => {
  //res.send('Register');

  //res.send(req.body);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    //call save method within Mongoose.
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
