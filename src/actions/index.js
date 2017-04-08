export const SEARCH_ITEM = 'SEARCH_ITEM'
export const REQUEST_ITEM = 'REQUEST_ITEM'
export const RECEIVE_ITEM = 'RECEIVE_ITEM'
export const SELECT_PAGE = 'SELECT_PAGE'

export const selectPage = page => ({
	type: SELECT_PAGE,
	page
})

export const searchItem = item => ({
	type: SEARCH_ITEM,
	item
})


export const requestItem = item => ({
  type: REQUEST_ITEM,
  item
})

export const receiveItem = (item, json) => ({
  type: RECEIVE_ITEM,
  item,
  itemData: json
})



const mergeFetchedData = (artists, albums, tracks) => ({
	artists: artists,
	albums: albums,
	tracks: tracks
})

const fetchTracks = item => dispatch => {
	dispatch(requestItem(item))
	return fetch(`https://api.spotify.com/v1/search?q=${item}&type=track`)
		.then(response => response.json())
		.then(json => json.tracks.items.map(item => ({
			id: item.id,
			name: item.name
		})))
}

const fetchAlbums = item => dispatch => {
	dispatch(requestItem(item))
	return fetch(`https://api.spotify.com/v1/search?q=${item}&type=album`)
		.then(response => response.json())
		.then(json => json.albums.items.map(item => ({
			id: item.id,
			name: item.name
		})))
}

const fetchArtists = item => dispatch => {
	dispatch(requestItem(item))
	return fetch(`https://api.spotify.com/v1/search?q=${item}&type=artist`)
		.then(response => response.json())
		.then(json => json.artists.items.map(item => ({
			id: item.id,
			name: item.name,
			followers: item.followers.total
		})))
}

export const fetchData = searchedItem => dispatch => {
	let setArtists = dispatch(fetchArtists(searchedItem))
	let setAlbums = dispatch(fetchAlbums(searchedItem))
	let setTracks = dispatch(fetchTracks(searchedItem))

	Promise.all([setArtists, setAlbums, setTracks])
		.then(values => mergeFetchedData(...values))
		.then(parsedItems => dispatch(receiveItem(searchedItem, parsedItems)))
}