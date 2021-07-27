let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let uzi_btn = document.querySelector(".lil-uzi");
let juice_btn = document.querySelector(".juice");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played

let track_list = [];

let juice_track_list = [
  {
    name: "Purple Moncler",
    artist: "Juice Wrld",
    image: "https://i.ytimg.com/vi/PniDn95dEGA/maxresdefault.jpg",
    path: "audio/purplemontcler.mp3"
  },
  {
    name: "Old Me",
    artist: "Juice Wrld",
    image: "https://i1.wp.com/houseofaceonline.com/wp-content/uploads/2018/05/img_3839.jpg?fit=750%2C723&ssl=1",
    path: "audio/oldme.mp3"
  },
  {
    name: "In The Air",
    artist: "Juice Wrld",
    image: "https://tse2.mm.bing.net/th?id=OIP.m0bApeh9eGrs7DopM-wFNQHaHa&pid=Api&P=0&w=300&h=300",
    path: "audio/in_the_air.mp3",
  },
  {
    name: "All Girls Are The Same",
    artist: "Juice Wrld",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Oj57-gLXbMjU42gPGRQqSDxOzfejTFW_fQ&usqp=CAU",
    path: "audio/all_girls_are_the_same.mp3",
  }
];

let uzi_track_list = [{
  name: "Harden",
  artist: "Lil Uzi Vert",
  image: "track_art/harden.png",
  path: "audio/harden.mp3"
},
{
  name: "Buy It",
  artist: "Lil Uzi Vert",
  image: "https://th.bing.com/th/id/OIP._J8aTsOqQU-UbMhL4xoeLQHaEK?w=311&h=180&c=7&o=5&pid=1.7",
  path: "audio/buy_it.mp3",
}
];

track_list = juice_track_list;


function changeTrackToUzi() {
  track_list = uzi_track_list;
  loadTrack(0);
  playTrack();
}

function changeTrackToJuice() {
  track_list = juice_track_list;
  loadTrack(0);
  playTrack();
}



uzi_btn.addEventListener('click', changeTrackToUzi);

juice_btn.addEventListener('click', changeTrackToJuice);



function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Update details of the track
  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
}


// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;

  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;

  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index);