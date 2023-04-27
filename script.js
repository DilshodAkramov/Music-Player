let body = document.querySelector("body");
let container = document.querySelector(".container");
let songName = document.querySelectorAll(".song-name-music");
let img = document.querySelector(".photo img");
let currentMinute= document.querySelector(".current-minute");
let totalMinute= document.querySelector(".total-minute");
let progressRange = document.querySelector(".range");
let replay = document.querySelector(".replay");
let prevBtn = document.querySelector(".prev-btn");
let playCircle = document.querySelector(".play-circle");
let nextBtn = document.querySelector(".next-btn");
let playlist = document.querySelector(".playlist");
let musicList = document.querySelector(".music-lists");
let closeIcon = document.querySelector(".close-icon");
let volume = document.querySelector(".volume-div input");
let expandMore = document.querySelector(".expand-more");
let audio = document.querySelector(".haupt-audio");
let switchBtn = document.querySelector(".switch");


switchBtn.addEventListener("click", () =>{

    body.style.backgroundColor = "#212429";
    container.style.backgroundColor = "#1e2126";
})


let minute;
let seconds;
let currentTime;
let musicDuration;
let progressWidth;







playlist.addEventListener("click", () => {
    musicList.style.display = "block";
    musicList.style.height = "100%";
})

closeIcon.addEventListener("click", e => {
    musicList.style.height = 0;
})

let songs = [
    {
        title: "Death Grips - Beware",
        image: "images/photo.jpg",
        music: "musics/music-1.mp3",
    },
    {
        title: "Death Grips - Blackjack",
        image: "images/photo-1.jpg",
        music: "musics/music-2.mp3"
    },
    {
        title: "Death Grips - Get Got",
        image: "images/photo-2.jpg",
        music: "musics/music-3.mp3"
    },
    {
        title: "Death Grips - I Want It I Need It",
        image: "images/photo-3.jpg",
        music: "musics/music-4.mp3"
    }
];


let counter = 0;
// let audio = new Audio();
isPlaying = false;

// volume.addEventListener("input", changeVolume);

function changeVolume(e){
    audio.volume = e.target.value;
}


loadMusic(songs[counter]);


function loadMusic(){
    songName.forEach(nameTitle =>{
        nameTitle.innerHTML = songs[counter].title;
        
    })
    img.src = songs[counter].image;
    audio.src = songs[counter].music;
    
    audio.addEventListener("timeupdate", e =>{
        currentTime = e.target.currentTime;
        musicDuration = e.target.duration;
        progressWidth = (currentTime / musicDuration) * 100;
        progressRange.style.width = `${progressWidth}%`;
        minute = Math.floor(musicDuration / 60);
        seconds = Math.floor(musicDuration % 60);
        totalMinute.innerHTML = minute +":"+ seconds;
        if(minute < 10){
            minute = "0" + minute
        }
        
        minute = Math.floor(currentTime / 60);
        seconds = Math.floor(currentTime % 60);
        if(minute < 10){
            minute = "0" + minute;
        }
        if(seconds < 10){
            seconds = "0" + seconds;
            
        }
        
        currentMinute.innerHTML = minute +":"+ seconds;
        
        
        if(totalMinute.innerHTML == "NaN:NaN"){
            totalMinute.innerHTML = "";
        }
        console.log(e);
    })

    

};


// nextBtn 

nextBtn.addEventListener("click", nextSong);

function nextSong(){
    counter++;
    if(counter > songs.length - 1){
        counter = 0;
    }
    loadMusic(songs[counter]);
    audio.play();
}


// prevBtn 

prevBtn.addEventListener("click", prevSong);

function prevSong(){
    counter--;
    if(counter < 0){
        counter = songs.length - 1;
    }
    loadMusic(songs[counter]);
    audio.play();
    
    
}


// Play and Pause Music/ 

function playMusic(){
    container.classList.add("paused");
    playCircle.innerHTML = `<span class="play-circle material-symbols-outlined">
    pause_circle</span>`;
    
    audio.play();
}
function pauseMusic(){
    container.classList.remove("paused");
    playCircle.innerHTML = `
    <span class="play-circle material-symbols-outlined">play_circle</span>`;
    audio.pause();
}


// playCircle 

playCircle.addEventListener("click", () =>{
    let isMusicPlaying = container.classList.contains("paused");

    isMusicPlaying ? pauseMusic() : playMusic();
});

