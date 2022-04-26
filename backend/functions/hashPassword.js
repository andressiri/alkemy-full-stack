const bcrypt = require('bcryptjs');

module.exports = async (password) => {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(() => {
          throw new Error(err);
        });
      };
      resolve(hash);
    });
  });

  return hashedPassword;
}