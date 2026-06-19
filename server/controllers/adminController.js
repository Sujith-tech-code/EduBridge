const adminLogin = (req, res) => {
  const { password } = req.body
  if (!password) {
    return res.status(400).json({ message: 'Password is required.' })
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Incorrect password.' })
  }
  res.json({ success: true, message: 'Access granted.' })
}

module.exports = { adminLogin }