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