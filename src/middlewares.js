const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'O campo "email" e "password" são obrigatórios' }); 
  }

  next();
};

module.exports = { validateLogin };