const songsLists = document.getElementById('songsList');
const searchBar = document.getElementById('searchBar');
allSongs= JSON.parse(localStorage.getItem('allSongs'));
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredsongs = allSongs.filter((song) => {
        return (
            song.name.toLowerCase().includes(searchString) ||
            song.singer.toLowerCase().includes(searchString)
        );
    });
    displaysongs(filteredsongs);
});
const displaysongs = (songs) => {
    songsLists.innerHTML = ""
    var id = 1
    var allPlaylists = ""
    var playlists =  JSON.parse(localStorage.getItem('playlists'));
    if (playlists.length > 0) {
        for (var i in playlists) {
            var playlist = playlists[i]
            allPlaylists+= `<option value="${playlist.name}">${playlist.name}</option>`
        }
    }else{
        allPlaylists+= `<option value="no-playlist-added">No Playlist Added</option>`
    }
    for (var i in songs) {
        var song = songs[i]
        if (inFavourites(id)) {
            songsLists.innerHTML += `
                <li class="song">
                    <h2 class="song_name">${song.name}</h2>
                    <p class="singer">${song.singer}</p>
                    <img src="${song.img}"></img>
                    <span>
                        <button class="modal-${id}" onclick="popupAddPlaylist(this)"><abbr title="Add to playlist">+</abbr></button>
                        <button onclick="changeIconColor(this)" class="${id} color-red"><abbr title="Add to favorites"><span class="fa fa-heart"></span></abbr></button>
                        <button onclick="window.open('player.html?songs=${id}')"><abbr title="Play"><span class="fa fa-play"></span></abbr></button>
                    </span>
                    <div id="myModal" class="modal modal-${id}">
                     <div class="modal-content">
                        <div class="modal-header">
                           <span class="close modal-${id}">&times;</span>
                           <h2>Add To Playlist</h2>
                        </div>
                        <div class="modal-body">
                           <select id="playlist-${id}" name="playlist-${id}">
                              ${allPlaylists}
                            </select>
                           <div class="alert noSuchPlaylist alert-${id}">
                              <span class="closebtn" onclick="closeAlert('alert-${id}')">&times;</span>  
                              <strong>ERROR!</strong>&nbsp;No Such Playlist Exists
                           </div>
                           <div class="alert playlistAdded alert-${id}">
                              <span class="closebtn" onclick="closeAlert('playlistAdded alert-${id}')">&times;</span>  
                              <strong>ERROR!</strong>&nbsp;Please Enter a valid playlist Name!
                           </div>
                           <button onclick="checkAddPlaylist('playlist-${id}', ${id})">SUBMIT</button>
                        </div>
                     </div>
                  </div>
                </li>
            `
        }else{
            songsLists.innerHTML += `
                <li class="song">
                    <h2 class="song_name">${song.name}</h2>
                    <p class="singer">${song.singer}</p>
                    <img src="${song.img}"></img>
                    <span>
                        <button class="modal-${id}" onclick="popupAddPlaylist(this)"><abbr title="Add to playlist">+</abbr></button>
                        <button onclick="changeIconColor(this)" class="${id}"><abbr title="Add to favorites"><span class="fa fa-heart"></span></abbr></button>
                        <button onclick="window.open('player.html?songs=${id}')"><abbr title="Play"><span class="fa fa-play"></span></abbr></button>
                    </span>
                    <div id="myModal" class="modal modal-${id}">
                     <div class="modal-content">
                        <div class="modal-header">
                           <span class="close modal-${id}">&times;</span>
                           <h2>Add To Playlist</h2>
                        </div>
                        <div class="modal-body">
                           <select id="playlist-${id}" name="playlist-${id}">
                              ${allPlaylists}
                            </select>
                           <div class="alert noSuchPlaylist alert-${id}">
                              <span class="closebtn" onclick="closeAlert('alert-${id}')">&times;</span>  
                              <strong>ERROR!</strong>&nbsp;No Such Playlist Exists
                           </div>
                           <div class="alert playlistAdded alert-${id}">
                              <span class="closebtn" onclick="closeAlert('playlistAdded alert-${id}')">&times;</span>  
                              <strong>Added!</strong>
                           </div>
                           <button onclick="checkAddPlaylist('playlist-${id}', ${id})">SUBMIT</button>
                        </div>
                     </div>
                  </div>
                </li>
            `
        }
        id++
    }
};
displaysongs(allSongs)
function popupAddPlaylist(obj){
    var modal = document.getElementsByClassName(`modal ${obj.classList[0]}`)[0];
    modal.style.display = "block"
    var span = document.getElementsByClassName(`close ${obj.classList[0]}`)[0];
    span.onclick = function() {
      modal.style.display = "none";
    }
}
function checkAddPlaylist(name, id){
    var playlistName = document.getElementById(name).value 
    if (inPlaylist(playlistName)) {
        addToPlaylist(playlistName, id)
        document.getElementsByClassName(`alert playlistAdded alert-${id}`)[0].style.display = "block"
        document.getElementsByClassName(`alert playlistAdded alert-${id}`)[0].style.backgroundColor = "#4CAF50"
    }else{
        document.getElementsByClassName(`alert noSuchPlaylist alert-${id}`)[0].style.display = "block"
    }
}