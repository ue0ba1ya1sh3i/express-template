module.exports = (req, res) => {
  res.status(404).json({
    path: req.path
  })
}