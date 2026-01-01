const path = require("path");
const User = require("../models/User");

const getMain = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
};

const getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
};

const getRegister = (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
}

const postLogin = async(req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email: email } );

        if (!user) {
            req.session.error = 'Erabiltzailea ez dago Erregistratuta, Erregistratu zaitez mesedez';
            res.redirect('/register');
            return
        }


        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            req.session.error = 'Pasahitza ez da zuzena';
            res.redirect('/login');
            return
        }

        req.session.userId = user._id;
        req.session.user = {
            email: user.email,
            name: user.name
        };

        res.redirect('/users/main');
    } catch (error) {
        console.error('Error en el login:', error);
        req.session.error = 'Errorea zerbitzarian';
        res.redirect('/login');
    }
}

const postRegister = async(req, res) => {
    if(req.body.email !== ""){
        if(req.body.password.length <10 ){
            req.session.error = 'Pasahitzak gutxienez 6 karaktere izan behar ditu!';
            res.redirect('/register');
            return
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            lastName: req.body.lastName,
            registerDate: new Date()
        })
        req.session.userId = user._id;
        req.session.user = {
            email: user.email,
            name: user.name
        };
        const existsUser = await User.findOne({ email: req.body.email } );

        if(existsUser){
            req.session.error = 'Erabiltzailea jada erregistratua dago';
        } else {
            await user.save()
        }

        res.redirect("/login");
    }
}


module.exports = { getMain, getLogin, getRegister, postLogin, postRegister };