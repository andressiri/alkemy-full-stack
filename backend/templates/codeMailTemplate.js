// Mail template for sendVerificationCode
module.exports = (userName, code) => {
  return(`
    <h1>Regards from Spends Checker!</h1>
    <p>Hello ${userName}! In order to verify your identity you should use the following code:</p>
    <h2>${code}</h2>
    <p>Sorry for the trouble, we hope you enjoy the app!</p>`
  );
};