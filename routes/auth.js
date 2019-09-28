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

  if (user.save()) {
    res.send(user);
  } else {
    res.status(400);
  }
});

module.exports = router;
