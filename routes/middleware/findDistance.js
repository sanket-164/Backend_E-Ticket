/* fetchDistance.js is used to create a middleware that is used to find distance bewteen two stations and store into req object */

function haversineDistance(coords1, coords2) {
  // Convert coordinates to radians
  const lat1 = toRadians(coords1.latitude);
  const lon1 = toRadians(coords1.longitude);
  const lat2 = toRadians(coords2.latitude);
  const lon2 = toRadians(coords2.longitude);

  // Haversine formula
  const a =
    Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon2 - lon1) / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Earth's radius in kilometers
  const EARTH_RADIUS_KM = 6371;
  return EARTH_RADIUS_KM * c;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

const findDistance = (req, res, next) => {

  // Fetching latitude and longitude of start and end station
  const startcoords = {
    latitude: req?.start?.st_lat,
    longitude: req?.start?.st_long,
  };

  const endcoords = {
    latitude: req?.dest?.st_lat,
    longitude: req?.dest?.st_long,
  };

  const distance = haversineDistance(startcoords, endcoords);

  req.dist = Math.round(distance);  // Storing distance into req object

  // Calling next function
  next();
};

export default findDistance;
