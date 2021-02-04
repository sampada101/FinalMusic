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
      var id = getSongIdFromSong(songs[i])
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
                              <strong>Added!</strong>
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
    }
};
displaysongs(allSongs)