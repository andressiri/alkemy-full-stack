//  generate verification code
module.exports = () => {
  const randomNum = Math.floor(Math.random() * 1000000);
  let auxString = randomNum.toString();
  while (auxString.length < 6) {
    auxString = `0${auxString}`;
  };
  return auxString; 
};