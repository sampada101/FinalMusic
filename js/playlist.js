function listSongs(){
	if (playlistType == "u"){
		listUserMadePlaylists()
	}else{
		listReadymade()
	}
}
function getPlaylistType() {
	id = getQueryVariable('id')
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
	var album_name = document.getElementById('album_name');
	var album_img = document.getElementById('album_img');
	album_name.innerHTML = playlist.name
	album_img.src = playlist.img
	var tracks = document.getElementsByClassName('tracks')[0]
	var allPlaylists = ""
    var playlists =  JSON.parse(localStorage.getItem('playlists'));
    if (playlists.length > 0) {
        for (var i in playlists) {
            allPlaylists+= `<option value="${playlists[i].name}">${playlists[i].name}</option>`
        }
    }else{
        allPlaylists+= `<option value="no-playlist-added">No Playlist Added</option>`
    }
	for (var i in playlist.songs) {
		var song = getSongFromId(playlist.songs[i])
		if (!inFavourites(playlist.songs[i])) {
			tracks.innerHTML += `<div class="track">
		                           <div class="track_number">${parseInt(i)+1}</div>
		                           <div class="track_title">${song.name}</div>
		                           <div class="track_explicit">
		                              <span class="label">${song.singer}</span>
		                           </div>
		                           <div class="track_length"><button class="modal-${playlist.songs[i]} color-white" onclick="popupAddPlaylist(this)">+</button></div>
		                           <div class="track_length"><button onclick="changeFavsColor(this)" class="color-white ${playlist.songs[i]}"><i class="fa fa-heart favs" style="font-size:12px"></i></button></div>
		                           <div id="myModal" class="modal modal-${playlist.songs[i]}">
		                              <div class="modal-content">
		                                 <div class="modal-header">
		                                    <span class="close modal-${playlist.songs[i]}">&times;</span>
		                                    <h2>Add To Playlist</h2>
		                                 </div>
		                                 <div class="modal-body">
		                                    <select id="playlist-${playlist.songs[i]}" name="playlist-${playlist.songs[i]}">
		                                    	${allPlaylists}
		                                     </select>
		                                    <div class="alert noSuchPlaylist alert-${playlist.songs[i]}">
		                                       <span class="closebtn" onclick="closeAlert('alert-${playlist.songs[i]}')">&times;</span>  
		                                       <strong>ERROR!</strong>&nbsp;No Such Playlist Exists
		                                    </div>
		                                    <div class="alert playlistAdded alert-${playlist.songs[i]}">
		                                       <span class="closebtn" onclick="closeAlert('playlistAdded alert-${playlist.songs[i]}')">&times;</span>  
		                                       <strong>Added!</strong>
		                                    </div>
		                                    <button onclick="checkAddPlaylist('playlist-${playlist.songs[i]}', ${playlist.songs[i]})">SUBMIT</button>
		                                 </div>
		                              </div>
		                           </div>
		                        </div>`
		}else{
			tracks.innerHTML += `<div class="track">
		                           <div class="track_number">${parseInt(i)+1}</div>
		                           <div class="track_title">${song.name}</div>
		                           <div class="track_explicit">
		                              <span class="label">${song.singer}</span>
		                           </div>
		                           <div class="track_length"><button class="modal-${playlist.songs[i]} color-white" onclick="popupAddPlaylist(this)">+</button></div>
		                           <div class="track_length"><button onclick="changeFavsColor(this)" class="color-red ${playlist.songs[i]}"><i class="fa fa-heart favs" style="font-size:12px"></i></button></div>
		                           <div id="myModal" class="modal modal-${playlist.songs[i]}">
		                              <div class="modal-content">
		                                 <div class="modal-header">
		                                    <span class="close modal-${playlist.songs[i]}">&times;</span>
		                                    <h2>Add To Playlist</h2>
		                                 </div>
		                                 <div class="modal-body">
		                                    <select id="playlist-${playlist.songs[i]}" name="playlist-${playlist.songs[i]}">
		                                    	${allPlaylists}
		                                     </select>
		                                    <div class="alert noSuchPlaylist alert-${playlist.songs[i]}">
		                                       <span class="closebtn" onclick="closeAlert('alert-${playlist.songs[i]}')">&times;</span>  
		                                       <strong>ERROR!</strong>&nbsp;No Such Playlist Exists
		                                    </div>
		                                    <div class="alert playlistAdded alert-${playlist.songs[i]}">
		                                       <span class="closebtn" onclick="closeAlert('playlistAdded alert-${playlist.songs[i]}')">&times;</span>  
		                                       <strong>Added!</strong>
		                                    </div>
		                                    <button onclick="checkAddPlaylist('playlist-${playlist.songs[i]}', ${playlist.songs[i]})">SUBMIT</button>
		                                 </div>
		                              </div>
		                           </div>
		                        </div>`
		}
	}
}
function listUserMadePlaylists() {
	var album_name = document.getElementById('album_name');
	var album_img = document.getElementById('album_img');
	album_img.src = playlist.img
	album_name.innerHTML = playlist.name
	var tracks = document.getElementsByClassName('tracks')[0]
	var allPlaylists = ""
    var playlists =  JSON.parse(localStorage.getItem('playlists'));
    var album_actions = document.getElementById('a_action')
    album_actions.innerHTML += `<button class="button-red delete" id="deletebtn" onclick="document.getElementById('del-playlist').style.display='block'">Delete</button>
	                           <div id="del-playlist" class="del">
	                             <div class="del-content">
	                               <div class="del-container">
	                                 <h1>Delete Playlist</h1>
	                                 <p>Are you sure you want to delete your Playlist?</p>
	                                  <button type="button" onclick="document.getElementById('del-playlist').style.display='none'" class="del-cancelbtn">Cancel</button>
	                                  <button type="button" onclick="deleteWholePlaylist()" class="del-deletebtn">Delete</button>
	                                 </div>
	                              </div>
	                           </div>
    `
    if (playlists.length > 1) {
        for (var i in playlists) {
            if (playlists[i].name != playlist.name) {
            	allPlaylists+= `<option value="${playlists[i].name}">${playlists[i].name}</option>`
            }
        }
    }else{
        allPlaylists+= `<option value="no-playlist-added">No Other Playlist Found</option>`
    }
    for (var i in playlist.songs) {
		var song = getSongFromId(playlist.songs[i])
		if (inFavourites(playlist.songs[i])) {
			tracks.innerHTML += `
		                        <div class="track">
		                           <div class="track_number">${parseInt(i)+1}</div>
		                           <div class="track_title">${song.name}</div>
		                           <div class="track_explicit">
		                              <span class="label">${song.singer}</span>
		                           </div>
		                           <div class="track_length">
		                              <div class="dropdown">
		                                 <i style="font-size:24px" class="fa">&#xf142;</i></i>
		                                 <div class="dropdown-content">
		                                    <a onclick="popupAddPlaylist(this)" class="modal-${playlist.songs[i]}">Add to Playlist</a>
		                                    <a onclick="deleteFromPlaylist(this)" class="${playlist.songs[i]}">Delete From Playlist</a>
		                                 </div>
		                              </div>
		                           </div>
		                           <div class="track_length"><button onclick="changeFavsColor(this)" class="color-red ${playlist.songs[i]}"><i class="fa fa-heart favs" style="font-size:12px"></i></button></div>
			                        <div id="myModal" class="modal modal-${playlist.songs[i]}">
		                              <div class="modal-content">
		                                 <div class="modal-header">
		                                    <span class="close modal-${playlist.songs[i]}">&times;</span>
		                                    <h2>Add To Playlist</h2>
		                                 </div>
		                                 <div class="modal-body">
		                                    <select id="playlist-${playlist.songs[i]}" name="playlist-${playlist.songs[i]}">
		                                    	${allPlaylists}
		                                     </select>
		                                    <div class="alert noSuchPlaylist alert-${playlist.songs[i]}">
		                                       <span class="closebtn" onclick="closeAlert('alert-${playlist.songs[i]}')">&times;</span>  
		                                       <strong>ERROR!</strong>&nbsp;No Such Playlist Exists
		                                    </div>
		                                    <div class="alert playlistAdded alert-${playlist.songs[i]}">
		                                       <span class="closebtn" onclick="closeAlert('playlistAdded alert-${playlist.songs[i]}')">&times;</span>  
		                                       <strong>Added!</strong>
		                                    </div>
		                                    <button onclick="checkAddPlaylist('playlist-${playlist.songs[i]}', ${playlist.songs[i]})">SUBMIT</button>
		                                 </div>
		                              </div>
		                           </div>
		                        </div>`
		}else{
			tracks.innerHTML += `
		                        <div class="track">
		                           <div class="track_number">${parseInt(i)+1}</div>
		                           <div class="track_title">${song.name}</div>
		                           <div class="track_explicit">
		                              <span class="label">${song.singer}</span>
		                           </div>
		                           <div class="track_length">
		                              <div class="dropdown">
		                                 <i style="font-size:24px" class="fa">&#xf142;</i></i>
		                                 <div class="dropdown-content">
		                                    <a onclick="popupAddPlaylist(this)" class="modal-${playlist.songs[i]}">Add to Playlist</a>
		                                    <a onclick="deleteFromPlaylist(this)" class="${playlist.songs[i]}">Delete From Playlist</a>
		                                 </div>
		                              </div>
		                           </div>
		                           <div class="track_length"><button onclick="changeFavsColor(this)" class="color-white ${playlist.songs[i]}"><i class="fa fa-heart favs" style="font-size:12px"></i></button></div>
			                        <div id="myModal" class="modal modal-${playlist.songs[i]}">
		                              <div class="modal-content">
		                                 <div class="modal-header">
		                                    <span class="close modal-${playlist.songs[i]}">&times;</span>
		                                    <h2>Add To Playlist</h2>
		                                 </div>
		                                 <div class="modal-body">
		                                    <select id="playlist-${playlist.songs[i]}" name="playlist-${playlist.songs[i]}">
		                                    	${allPlaylists}
		                                     </select>
		                                    <div class="alert noSuchPlaylist alert-${playlist.songs[i]}">
		                                       <span class="closebtn" onclick="closeAlert('alert-${playlist.songs[i]}')">&times;</span>  
		                                       <strong>ERROR!</strong>&nbsp;No Such Playlist Exists
		                                    </div>
		                                    <div class="alert playlistAdded alert-${playlist.songs[i]}">
		                                       <span class="closebtn" onclick="closeAlert('playlistAdded alert-${playlist.songs[i]}')">&times;</span>  
		                                       <strong>Added!</strong>
		                                    </div>
		                                    <button onclick="checkAddPlaylist('playlist-${playlist.songs[i]}', ${playlist.songs[i]})">SUBMIT</button>
		                                 </div>
		                              </div>
		                           </div>
		                        </div>`
		}
	}
	if (playlist.songs.length <= 0) {
		tracks.innerHTML += "<h1 class='color-white'>NO SONGS FOUND! ADD SONGS TO PLAYLIST TO SEE THEM HERE</h1>"
	}
}
playlistType = getPlaylistType()
listSongs()
function changeFavsColor(obj) {
	var list = obj.classList
	for (var i in list) {
		if (list[i]=='color-white') {
			list.remove('color-white')
		}
	}
	changeIconColor(obj)
	for (var i in obj.classList) {
		if (obj.classList[i] == "color-red") {
			return
		}
	}
	obj.classList.toggle('color-white')
}
playBTN = document.getElementById('playbtn')
playBTN.onclick = function playPlaylistSongs() {
	window.open(`player.html?type=${playlistType}&id=${id}`)
}

function deleteFromPlaylist(obj) {
	addToPlaylist(playlist.name, obj.classList[0], remove=true)
	window.location.reload()
}
function deleteWholePlaylist() {
	console.log(playlist)
	deletePlaylist(playlist.name)
	window.location.reload()
}