import images from "../assets"

export const weatherIcon = (data)  => {
  const stateName = data.split(' ').join('')
  return images[stateName]
}