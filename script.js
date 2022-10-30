console.log("Welcome to spotify");
let songIndex = 0;
let audioElement = new Audio("songs/song-1.mp3")
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let songs = [
    {songName: "Dil Bechara", filePath: "songs/song-1.mp3", coverPath: "cover images/item1.png"},
    {songName: "Lut Gaye", filePath: "songs/song-2.mp3", coverPath: "cover images/item2.png"},
    {songName: "Manike", filePath: "songs/song-3.mp3", coverPath: "cover images/item3.png"},
    {songName: "Taaron Ke Shehar", filePath: "songs/song-4.mp3", coverPath: "cover images/item4.png"},
    {songName: "Teri Aankhon Mein", filePath: "songs/song-5.mp3", coverPath: "cover images/item5.png"},
    {songName: "Tum Mere", filePath: "songs/song-6.mp3", coverPath: "cover images/item6.png"}
]
songItems.forEach((element,i)=> {
    console.log(element,i)
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    
})
myProgressBar.value=0;
masterPlay.addEventListener('click', ()=>{
    
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        masterSongName.innerText = songs[songIndex].songName;
        makeAllPlays();
    }
})
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
document.getElementById("next").addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById("previous").addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 5;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
