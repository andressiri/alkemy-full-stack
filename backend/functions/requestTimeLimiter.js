// can request: check at least ${time} has passed from last request that reached this point
module.exports = (req, res, sessionTimestamp, timeToWait) => {
  let timePassedBetweenRequests = 0;
  if (!req.session[sessionTimestamp]) {
    req.session[sessionTimestamp] = Date.now();
    timePassedBetweenRequests = timeToWait;
  } else {
    const auxDate = Date.now();
    timePassedBetweenRequests = auxDate - req.session[sessionTimestamp];
  };
  if (timePassedBetweenRequests < timeToWait) {
    res.status(429)
    throw new Error(`You will have to wait ${Math.floor((timeToWait - timePassedBetweenRequests)/1000)}s to request again`);
  } else {
    req.session[sessionTimestamp] = Date.now();
  };
  return;
};