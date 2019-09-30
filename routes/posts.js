const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
  //we now have got access to the user
  res.send(req.user);
});

module.exports = router;
