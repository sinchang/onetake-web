import axios from 'axios'

export const getVideos = (id, cursor) => {
  const query = cursor ? `id=${id}&next_cursor=${cursor}` : `id=${id}`
  return axios.get(`https://cors-anywhere.herokuapp.com/https://onetake.dafork.com/api/v2/editor_collections/show?${query}`)
}

export const getMedias = (type, cursor) => {
  const query = cursor ? `video_type=${type}&next_cursor=${cursor}` : `video_type=${type}`
  return axios.get(`https://cors-anywhere.herokuapp.com/https://onetake.dafork.com/api/v4/timeline/discover?${query}`)
}
