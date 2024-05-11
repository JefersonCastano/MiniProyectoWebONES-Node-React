const validateCredentials = (loginData) => {
    try {
      
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getUserData = (username) => {
    try {
      
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = validateCredentials && getUserData;