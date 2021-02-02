function listReadyMade() {
	var playlistCardContainer = document.getElementById('Readymade-playlists')
	playlistCardContainer.innerHTML = ""
	readyMade = JSON.parse(localStorage.getItem('readyMade'));
	for (var i in readyMade) {
		playlistCardContainer.innerHTML += `<div class="music-card">
											    <a href="/playlist.html?type=r&id=${parseInt(i)+1}"><img src="${readyMade[i].img}" alt=""></a>
											    <p>${readyMade[i].name}</p>
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
		favouritesCardContainer.innerHTML += `<div class="music-card">
											    <a href="/FinalMusic/player.html?songs=${id}"><img src="${song.img}" alt=""></a>
											    <p>${song.name}</p>
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
			UserPlaylistsContainer.innerHTML += `<div class="music-card">
												    <a href="/playlist.html?type=user&id=${parseInt(i)+1}"><img src="img/userplaylist.jpg" alt=""></a>
												    <p>${playlists[i].name}</p>
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
interval = setInterval(ListAll, 100)
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
		alert("Please enter a valid playlist name")
		modal.style.display = "none";
	}else if (inPlaylist(playlistName)) {
		alert("Playlist Already Exists");
		modal.style.display = "none";		
	}
	else{
		createPlaylist(playlistName)
		modal.style.display = "none";
	}
}
console.log('test')
