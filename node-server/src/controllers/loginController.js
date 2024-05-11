const loginService = require("../services/loginService");

const loginUser = (req, res) => {
    const { body } = req;

    if (
        !body.username ||
        !body.password
    ) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'username', 'password'",
            },
        });
    }

    const loginData = {
        username: body.username,
        password: body.password
    };

    try {
        const userToken = loginService.loginUser(loginData);
        res.status(201).send({ status: "OK", data: userToken });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
};

module.exports = loginUser;