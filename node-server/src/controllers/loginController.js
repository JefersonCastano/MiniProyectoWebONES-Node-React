const loginService = require("../services/userService");
const messagesEs = require("../utils/messagesEs");

const loginUser = async (req, res) => {
    const { body } = req;

    if (
        !body.username ||
        !body.password
    ) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: messagesEs.errors.MISSING_REQUIRED_FIELDS + "'username', 'password'",
            },
        });
        return;
    }

    const loginData = {
        username: body.username,
        password: body.password
    };

    try {
        const userToken = await loginService.loginUser(loginData);
        res.status(201).send({ status: "OK", data: userToken });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { loginUser};