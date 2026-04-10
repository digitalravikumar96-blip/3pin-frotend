import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 20000,
})

export const normalizeProperty = (property) => {
  if (!property) return property
  const areaSqm = property.area != null ? property.area : property.areaSqm
  return {
    ...property,
    id: property._id ?? property.id,
    areaSqm: areaSqm != null && areaSqm !== '' ? Number(areaSqm) : null,
    amenities: Array.isArray(property.amenities) ? property.amenities : [],
    nearbyLandmarks: Array.isArray(property.nearbyLandmarks) ? property.nearbyLandmarks : [],
    floorPlans: Array.isArray(property.floorPlans) ? property.floorPlans : [],
    images: Array.isArray(property.images) ? property.images : [],
  }
}
