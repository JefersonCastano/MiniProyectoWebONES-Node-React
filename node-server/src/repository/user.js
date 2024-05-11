const validateCredentials = (loginData) => {
    try {
      if(loginData.username === "coor" && loginData.password === "coor") {
        return true;
      }
      if(loginData.username === "pepe" && loginData.password === "pepe") {
        return true;
      }
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getUserData = (username) => {
    try {
      if(username === "coor") {
        return { id: 1, username: "coor", role: "coordinador" };
      }
    if(username === "pepe") {
        return { id: 2, username: "pepe", role: "docente" };
    }
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {validateCredentials, getUserData}