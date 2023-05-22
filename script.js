let body = document.querySelector("body");
let container = document.querySelector(".container");
let songName = document.querySelectorAll(".song-name-music");
let img = document.querySelector(".photo img");
let photoContainer = document.querySelector(".photo");
let currentMinute= document.querySelector(".current-minute");
let totalMinute= document.querySelector(".total-minute");
let progressRange = document.querySelector(".range");
let replay = document.querySelector(".replay");
let prevBtn = document.querySelector(".prev-btn");
let playCircle = document.querySelector(".play-circle");
let nextBtn = document.querySelector(".next-btn");
let playlist = document.querySelector(".playlist");
let musicList = document.querySelector(".music-lists");
let musicListUl = document.querySelector(".music-lists ul");
let closeIcon = document.querySelector(".close-icon");
let volume = document.querySelector(".volume-div input");
let expandMore = document.querySelector(".expand-more");
let audio = document.querySelector(".haupt-audio");
let switchBtn = document.querySelector("#switch");
let change = document.querySelector(".switched-on");
let subInfo = document.querySelector(".sub-info");
let addNewMusicBtn = document.querySelector(".expand-actions .add");

let addingWindow = document.querySelector(".adding-music-window");
let closingAddingWindow = document.querySelector(".close-adding-window");
let musicTitle = document.querySelector(".music-title");
let musicImg = document.querySelector(".music-img");
let musicSrc = document.querySelector(".music-src");
let submitBtn = document.querySelector(".submit-new-music");


// window.addEventListener('load', ()=> {
//     songs.push(localStorage.getItem("newSong"));
// });






closingAddingWindow.addEventListener("click", () => {
    addingWindow.style.display = "none";
})


addNewMusicBtn.addEventListener("click", () => {
    addingWindow.style.display = "block";

})




expandMore.addEventListener("click", () => {
    container.classList.toggle("example1");
    photoContainer.classList.toggle("photo-example");
    subInfo.classList.toggle("example-sub-info");
    // if(container.classList.contains("example1")){
    //     photoContainer.style.display = "none";
    // }else{
    //     photoContainer.style.display = "block";
        
    // }
})


switchBtn.addEventListener("click", () =>{
    body.classList.toggle("darkmode");
    change.classList.toggle("toggle1");
})


let minute;
let seconds;
let currentTime;
let musicDuration;
let progressWidth;
let songs =[];






playlist.addEventListener("click", () => {
    musicList.style.display = "block";
    musicList.style.height = "100%";
})

closeIcon.addEventListener("click", e => {
    musicList.style.height = 0;
})










songs = [
    // {
    //     title: "Death Grips - Beware",
    //     image: "images/photo.jpg",
    //     music: "musics/music-1.mp3",
    // },
    // {
    //     title: "Death Grips - Blackjack",
    //     image: "images/photo-1.jpg",
    //     music: "musics/music-2.mp3"
    // },
    // {
    //     title: "Death Grips - Get Got",
    //     image: "images/photo-2.jpg",
    //     music: "musics/music-3.mp3"
    // },
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
    // {
    //     title: "Death Grips - Get Got",
    //     image: "images/photo-2.jpg",
    //     music: "musics/music-3.mp3"
    // },
    {
        title: "Death Grips - I Want It I Need It",
        image: "images/photo-3.jpg",
        music: "musics/music-4.mp3"
    }
];




// Adding New Song 

let newSongAdded;

submitBtn.addEventListener("click", (e) =>{

    e.preventDefault();
    newSongAdded = {
        title: document.querySelector(".music-title").value,
        image: musicImg.value,
        music: musicSrc.value
    }

    if(submitBtn){
        addingWindow.style.display = "none";
    }

    
    songs.push(newSongAdded);
    
    
    
    localStorage.setItem("newSong", JSON.stringify(songs));
    
    // console.log(localStorage);
    // console.log(songs);
    
    
})

// console.log(localStorage);


function getAllSongs(){
    songs.forEach((song) => {
        console.log(song);
    })
};

getAllSongs();



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



creatingLi();


function creatingLi(e){

    let local = localStorage.getItem("newSong");

    let obj = JSON.parse(local);
    for (let i = 0; i < songs.length; i++){
    
        let li = document.createElement("li");
        
        li.innerHTML = `<div>       
                            <span>${songs[i].title}</span>
                            <span>New Playlist</span>
                        </div>
                        <div class="time">
                            <span>${"loadMusic()"}</span>
                        </div>`;
        
        li.classList.add("li");
    
        musicListUl.appendChild(li);
    }
}




// nextBtn 

nextBtn.addEventListener("click", nextSong);

function nextSong(){
    
    counter++;
    if(counter > songs.length - 1){
        counter = 0;
    }
    loadMusic(songs[counter]);
    audio.play();
    if(nextBtn){
        playCircle.innerHTML = `<span class="play-circle material-symbols-outlined">
        pause_circle</span>`;
    }
    
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
    
    if(nextBtn){
        playCircle.innerHTML = `<span class="play-circle material-symbols-outlined">
        pause_circle</span>`;
    }
    
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
    
    
    
    if(pauseMusic){
        photoContainer.classList.remove("photo-running");
    }else{
        photoContainer.classList.add("photo-running");
    }
    // if(pauseMusic){
        //     photoContainer.style.animationPlayState = "paused";
        // }
        

});

