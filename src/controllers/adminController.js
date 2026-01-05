const path = require("path");


const getMainAdmin = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
};

const getNewPlayerForm = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'new-player.html'));
};

const getEditPlayerForm = (req, res) => {
  const id = req.params.id;
  // Basic guard: if id is missing or looks like a placeholder, redirect back to admin
  if (!id || typeof id !== 'string' || id.trim() === '' || id.includes(':') || id === 'undefined') {
    return res.redirect('/admin');
  }

  res.sendFile(path.join(__dirname, '..', 'public', 'edit-player.html'), {
    playerId: id
  });
};


module.exports = { getMainAdmin, getNewPlayerForm, getEditPlayerForm };