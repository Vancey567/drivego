class HomeController {
    home(req, res) {
        return res.json("Hello From home");
    }
}

module.exports = new HomeController();