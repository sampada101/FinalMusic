function listReadyMade() {
	var playlistCardContainer = document.getElementById('Readymade-playlists')
	playlistCardContainer.innerHTML = ""
	readyMade = JSON.parse(localStorage.getItem('readyMade'));
	for (var i in readyMade) {
		playlistCardContainer.innerHTML += `
											<div class="album">
							                  <img src="${readyMade[i].img}">
							                  <div class="album-info">
							                     <h2>${readyMade[i].name}</h2>
							                     <a href="playlist.html?type=r&id=${parseInt(i)+1}">PLAY NOW</a>
							                  </div>
							               </div>`
	}
}
function songsDetails(id) {
	allSongs = JSON.parse(localStorage.getItem('allSongs'));
	if (id <= allSongs.length && id >= 0) {
		return allSongs[id]
	}

	return JSON.parse(localStorage.getItem('noSuchSong'));
}
function listFavourites() {
	var favouritesCardContainer = document.getElementById('myFavourites')
	favouritesCardContainer.innerHTML = ""
	favourites = JSON.parse(localStorage.getItem('favourites'));
	var id=1
	for (var i in favourites) {
		song = songsDetails(parseInt(favourites[i])-1)
		favouritesCardContainer.innerHTML += `
											<div class="album">
							                  <img src="${song.img}">
							                  <div class="album-info">
							                     <h2>${song.name}</h2>
							                     <h4>${song.singer}</h4>
							                     <a href="player.html?songs=${parseInt(favourites[i])}" target="_blank">PLAY NOW</a>
							                  </div>
							               </div>`
		id++
	}
	if(favourites.length == 0){
		favouritesCardContainer.innerHTML += `<p class="empty plb-20">Add Songs to your favourites to see them here</p>`
	}
}
function listUserPlaylists() {
	var UserPlaylistsContainer = document.getElementById('User-Playlists')
	UserPlaylistsContainer.innerHTML = ""
	playlists =  JSON.parse(localStorage.getItem('playlists'));
	if (playlists.length > 0) {
		for (var i in playlists) {
			UserPlaylistsContainer.innerHTML += `
												<div class="album">
								                  <img src="${playlists[i].img}">
								                  <div class="album-info">
								                     <h2>${playlists[i].name}</h2>
								                     <a href="playlist.html?id=${parseInt(i)+1}">PLAY NOW</a>
								                  </div>
								               </div>`
		}
	}else{
		UserPlaylistsContainer.innerHTML += `<p class="empty plb-20">Create playlists to see them here</p>`
	}
}
function ListAll() {
	listReadyMade()
	listFavourites()
	listUserPlaylists()
}
ListAll()
interval = setInterval(ListAll, 1000)
var modal = document.getElementById("myModal");

var btn = document.getElementById("createBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}
function checkPlaylist() {
	var playlistName = document.getElementById('playlist').value
	if (playlistName == "") {
		document.getElementsByClassName('alert wrongName')[0].style.display = "block"
	}else if (inPlaylist(playlistName)) {
		document.getElementsByClassName('alert sameName')[0].style.display = "block"	
	}
	else{
		createPlaylist(playlistName)
		modal.style.display = "none";
	}
}