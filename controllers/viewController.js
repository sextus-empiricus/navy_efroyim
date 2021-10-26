exports.home = (req, res) => {
    res.render('home')
};

exports.register = (req, res) => {
    res.render('register')
};

exports.login = (req, res) => {
    res.render('login')
};

exports.message = (req, res) => {
    res.render('message')
};

exports.cockpit = (req, res) => {
    res.render('cockpit', {
        email: req.user.email
    })
};

exports.thankyou = (req, res) => {
    res.render('thankyou')
};