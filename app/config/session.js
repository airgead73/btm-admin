const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUnitialized: true,
  cookie: {}
}

module.exports = sessionConfig;