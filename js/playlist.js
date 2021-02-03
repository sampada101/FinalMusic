function listSongs(){
	if (playlistType == "u"){
		listUserMadePlaylists()
	}else{
		listReadymade()
	}
}
function getPlaylistType() {
	var validTypes = ['r', 'u']
	var type = getQueryVariable('type')
	if (type != false && type != "") {
		for (var i in validTypes) {
			if (validTypes[i] == type) {
				playlist = getPlaylistDetailsTypeId(getQueryVariable('id'))
				if (!playlist) {window.location.href="index.html"}
				return validTypes[i]
			}
		}
		window.location.href="index.html"
	}else{
		playlist = getPlaylistDetailsTypeId(getQueryVariable('id'), type="u")
		if (!playlist) {window.location.href="index.html"}
		return "u"
	}
}
function listReadymade() {
	for (var i in playlist.songs) {
		console.log(getSongFromId(playlist.songs[i]))
	}
}
playlistType = getPlaylistType()
listSongs()