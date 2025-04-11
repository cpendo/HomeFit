const generatePin = () => {
  const pin = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  const pinExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins later
  return { pin, pinExpiry };
};

module.exports = generatePin;
