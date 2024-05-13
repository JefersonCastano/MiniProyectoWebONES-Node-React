const userService = require("../services/userService");
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
        const userToken = await userService.loginUser(loginData);
        res.status(200).send({ status: "OK", data: userToken });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getUserByToken = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).send(messagesEs.errors.AUTHORIZATION_HEADER_MISSING);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send(messagesEs.errors.TOKEN_MISSING);
    }
    try {
        const userInfo = await userService.getUserByToken(token);
        res.status(200).send({ status: "OK", data: userInfo });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { loginUser, getUserByToken };