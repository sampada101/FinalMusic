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
    for (var i in songs) {
        var song = songs[i]
        if (inFavourites(id)) {
            songsLists.innerHTML += `
            <li class="song">
                <h2 class="song_name">${song.name}</h2>
                <p class="singer">${song.singer}</p>
                <img src="${song.img}"></img>
                <span>
                    <button><abbr title="Add to playlist">+</abbr></button>
                    <button onclick="changeIconColor(this)" class="${id} color-red"><abbr title="Add to favorites"><span class="fa fa-heart"></span></abbr></button>
                    <button onclick="window.location.href='/FinalMusic/player.html?songs=${id}'"><abbr title="Play"><span class="fa fa-play"></span></abbr></button>
                </span>
            </li>
        `
        }else{
            songsLists.innerHTML += `
                <li class="song">
                    <h2 class="song_name">${song.name}</h2>
                    <p class="singer">${song.singer}</p>
                    <img src="${song.img}"></img>
                    <span>
                        <button><abbr title="Add to playlist">+</abbr></button>
                        <button onclick="changeIconColor(this)" class="${id}"><abbr title="Add to favorites"><span class="fa fa-heart"></span></abbr></button>
                        <button onclick="window.location.href='/FinalMusic/player.html?songs=${id}'"><abbr title="Play"><span class="fa fa-play"></span></abbr></button>
                    </span>
                </li>
            `
        }
        id++
    }
};
displaysongs(allSongs)