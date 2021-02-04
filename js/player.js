function playPause(end=false) {
	playButton = document.getElementsByClassName('music-player-container')[0]
	playButton.classList.toggle("is-playing")
	if (!end) {
		justplay()
		done = true
	}
}
function changeWheelPic() {
	album_art =  document.querySelector('#track-picture')
	trackImage = getComputedStyle(album_art).backgroundImage
	vinyl_image = getComputedStyle(document.querySelector('.vinyl')).backgroundImage
	document.querySelector('.vinyl').style.backgroundImage = vinyl_image.split(",")[0]+","+`url('${trackImage.slice(4, -1).replace(/"/g, "")}')`
}
function changeTrackImage(image) {
	var track_image = document.querySelector("#track-picture")
	track_image.style.backgroundImage = `url('${image}')`
}
allSongs = JSON.parse(localStorage.getItem('allSongs'));
noSuchSong = JSON.parse(localStorage.getItem('noSuchSong'));

previous = document.querySelector('#pre');
play = document.querySelector('#play');
next = document.querySelector('#next');
title = document.querySelector('#title');
recent_volume= document.querySelector('.volume');
volume_show = document.querySelector('#volume_show');
slider = document.querySelector('#duration_slider');
auto_play = document.querySelector('#auto');
present = document.querySelector('#present');
total = document.querySelector('#total');
artist = document.querySelector('#artist');



let timer;
autoplay = 0;

index_no = 0;
Playing_song = false;

//create a audio Element
track = document.createElement('audio');
if (!getQueryVariable("songs")) {
	getPlaylistType()
	ids = playlist.songs
	All_song = songsList(ids)
	if (ids.length == 0) {
		present.innerHTML = 0
	}
}else{
	ids = getQueryInt("songs")
	All_song = songsList(ids)
}

//All songs list

document.getElementById('total').innerHTML = ids.length

// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();
	if (All_song[index_no] === undefined){
		track.src = noSuchSong.path;
		title.innerHTML = noSuchSong.name;	
		changeTrackImage(noSuchSong.img)
		changeWheelPic()
    	artist.innerHTML = noSuchSong.singer;
    	track.load()
	}else{
		track.src = All_song[index_no].path;
		title.innerHTML = All_song[index_no].name;	
		changeTrackImage(All_song[index_no].img)
		changeWheelPic()
    	artist.innerHTML = All_song[index_no].singer;
    	track.load();
	}

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	if (ids.length > 0) {
		present.innerHTML = index_no + 1;
	}
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume_show.value = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		if (!Playing_song){
			playPause(end=true)
		}
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		if (!Playing_song){
			playPause(end=true)
		}
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		if (!Playing_song){
			playPause(end=true)
		}
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length-1;
		if (!Playing_song){
			playPause(end=true)
		}
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	track.volume = volume_show.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "#fef29c";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
       if (!Playing_song){
       	playPause()
       }
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
           if(autoplay==1){
		       index_no += 1;
		       checkIndex()
		       load_track(index_no);
		       playsong();
           }else{
           	if (Playing_song) {
           		playPause(end=true)
           		Playing_song = false
           	}
           }
	    }
     }

function checkIndex(){
	if (index_no >= All_song.length){
		index_no = 0
	}
	else if (index_no < 0){
		index_no = All_song.length-1
	}
}
function checkVolumeValue(){
	var v = document.getElementById('volume_show').value
	if (v <= 100) {
		volume_change()
	}else{
		document.getElementById('volume_show').value = 80;
		volume_change()
	}
}
function getPlaylistType() {
	id = getQueryVariable('id')
	var validTypes = ['r', 'u']
	var type = getQueryVariable('type')
	if (type != false && type != "" && type != "u") {
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