const maintenance = (req, res) => {
  res.status(503).send('<h1>Undergoing maintenance, check back soon!</h1>');
};

module.exports = maintenance;
