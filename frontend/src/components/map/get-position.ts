type Position = {
  lat: number;
  lng: number;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 18;

export const getPosition = (
  points: Position[],
): { center: Position; zoom: number } => {
  if (points.length === 0) {
    return { center: { lat: 0, lng: 0 }, zoom: 2 };
  }

  const latMin = points.reduce((acc, cur) => Math.min(acc, cur.lat), Infinity);
  const latMax = points.reduce((acc, cur) => Math.max(acc, cur.lat), -Infinity);
  const lngMin = points.reduce((acc, cur) => Math.min(acc, cur.lng), Infinity);
  const lngMax = points.reduce((acc, cur) => Math.max(acc, cur.lng), -Infinity);

  const lat = (latMin + latMax) / 2;
  const lng = (lngMin + lngMax) / 2;

  const latDiff = latMax - latMin;
  const lngDiff = lngMax - lngMin;

  const zoomLat = Math.floor(Math.log2(360 / latDiff));
  const zoomLng = Math.floor(Math.log2(360 / lngDiff));

  const zoom = Math.min(Math.max(MIN_ZOOM, zoomLat, zoomLng), MAX_ZOOM);

  return { center: { lat, lng }, zoom };
};
