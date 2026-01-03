const path = require("path");


const getMainAdmin = (req, res) => {
  res.render(path.join(__dirname, '..', 'public', 'admin.ejs'));
};

const getNewPlayerForm = (req, res) => {
  res.render(path.join(__dirname, '..', 'public', 'new-player.ejs'));
};

const getEditPlayerForm = (req, res) => {
  const id = req.params.id;
  // Basic guard: if id is missing or looks like a placeholder, redirect back to admin
  if (!id || typeof id !== 'string' || id.trim() === '' || id.includes(':') || id === 'undefined') {
    return res.redirect('/admin');
  }

  res.render(path.join(__dirname, '..', 'public', 'edit-player.ejs'), {
    playerId: id
  });
};


module.exports = { getMainAdmin, getNewPlayerForm, getEditPlayerForm };