// import router
const router = require("express").Router();

const users = require("../db/users.json");

const { user_game, user_game_biodata } = require("../models");

router.get("/login", require("./login"));

router.get("/register", require("./register"));

router.get("/dashboard/index", (req, res) => {
    user_game.findAll().then((data) => {
        res.render("dashboard/index", { users: data });
    });
});

router.get("/dashboard/create", (req, res) => {
    res.render("dashboard/create");
});

router.get("/dashboard/update/:id", (req, res) => {
    user_game
        .findByPk(req.params.id, {
            include: {
                model: user_game_biodata, 
            },
        })
        .then((data) => {
            res.render("dashboard/update", { user: data });
        });
});

router.get("/dashboard/detail/:id", (req, res) => {
    user_game
        .findByPk(req.params.id, {
            include: {
                model: user_game_biodata, 
            },
        })
        .then((data) => {
            console.log(data);
            res.render("dashboard/detail", { user: data });
        });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    let userFound;

    for (let index = 0; index < users.length; index++) {
               if (users[index].email === email) {
            userFound = users[index];
        }
    }

    if (!userFound) {
        return res.redirect("/login?error=email");
    }

    if (userFound.password != password) {
        return res.redirect("/login?error=password");
    }

    res.redirect("/dashboard/index");
});

router.post("/users/create", (req, res) => {
    user_game
        .create(
            {
                email: req.body.email,
                password: req.body.password,
                user_game_biodatum: {
                    name: req.body.name,
                },
            },
            {
                include: {
                    model: user_game_biodata,
                },
            }
        )
        .then(() => {
            res.redirect("/dashboard/index");
        });
});

router.post("/users/update/:id", (req, res) => {
    user_game
        .update(
            {
                email: req.body.email,
                password: req.body.password,
            },
            {
                where: { id: req.params.id },
            }
        )
        .then(() => {
            user_game_biodata.update(
                {
                    name: req.body.name,
                },
                {
                    where: { id_user: req.params.id },
                }
            );
        })
        .then(() => {
            res.redirect("/dashboard/index");
        });
});

// api hapus data
router.get("/users/delete/:id", (req, res) => {
    user_game_biodata
        .destroy({
            where: { id_user: req.params.id },
        })
        .then(() => {
           user_game.destroy({
                where: { id: req.params.id },
            });
        })
        .then(() => {
            res.redirect("/dashboard/index");
        });
});

module.exports = router;
