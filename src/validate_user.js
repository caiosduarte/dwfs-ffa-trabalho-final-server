const validateUser = (
  userName,
  password,
  callback) => {
  if (!userName || !password) {
    callback("Missing user/password", null);
  } else if (userName === "usuario" && password === "password") {
    callback(null, "usuario"); // OK, send userName back
  } else {
    callback("Not valid user", null);
  }
};

module.exports=validateUser;
