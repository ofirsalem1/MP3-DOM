
function playSong(songId) {
    const generatedID= "this"+songId
    const div= document.getElementById(generatedID);
    div.style.backgroundColor= "rgb(60, 255, 0)";
    if(playedsongID===undefined)
    {
        playedsongID=generatedID;
        playedSong.innerText= songplayedDet(GetsongById(songId));
    }
    else
    {
        let resetback= document.getElementById(playedsongID);
        resetback.style.backgroundColor= "rgb(255, 0, 234)";
        playedsongID=generatedID;
        playedSong.innerText= songplayedDet(GetsongById(songId));
    }
    
}
function songplayedDet(song)
{
    return ("Playing "+song.title+ " from " +song.album+" by "+song.artist+" | "+durationConvert(song.duration)+".")
}

function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const ul= document.createElement("ul");
    for(let i=0; i<5; i++)
    {
        if(arguments[i] === arguments[4]) 
        {
            arguments[i] = durationConvert(arguments[4]);
        }
        let li= document.createElement("li");
        li.innerHTML = arguments[i];
        ul.appendChild(li);
    }
    let a= document.createElement("img");
    a.src= arguments[5];
    ul.appendChild(a);
    children.push(ul);
    const classes = []
    classes.push(["songs"]);
    const generatedID= "this"+ arguments[0]
    const attrs = { onclick:`playSong(${arguments[0]})`, id:generatedID} 
    return createElement("div", children, classes, attrs)
}


function createPlaylistElement({ id, name, songs }) {
    const children = []
    const ul= document.createElement("ul");
    for(let i=0; i<3; i++)
    {
        let li= document.createElement("li");
        li.innerHTML = arguments[i];
        ul.appendChild(li);
    }
    let li= document.createElement("li");
    li.innerHTML = durationConvert(playlistDuration(arguments[0]));  
    ul.appendChild(li);
    children.push(ul);
    const classes = []
    classes.push(["playlists"])
    const attrs = {}
    return createElement("div", children, classes, attrs)
}


function createElement(tagName, children = [], classes = [], attributes = {}) {
    const createdElement= document.createElement(tagName);
    for(let childElement of children)
    {
        createdElement.appendChild(childElement);
    }
    createdElement.classList.add(classes);
    const seperatekeys= Object.entries(attributes)
    for (let key of seperatekeys)
    {
        createdElement.setAttribute(key[0],key[1]);
    }
    return createdElement;
}
const songdiv= document.getElementById("songs");
const playlistDiv= document.getElementById("playlists")
sortsongs(); 
sortplaylists(); 
PrintAllSongs();
PrintAllPlaylists();
const Title= document.createElement("h1");
Title.innerText= "MP3";
const theTitle=document.getElementById("title");
theTitle.appendChild(Title);
let playedsongID; 
const outputSong= document.getElementById("songOutput");
const playedSong= document.createElement("h2");
outputSong.appendChild(playedSong);
function PrintAllSongs()
{
    for(let song of player.songs)
    {
        const { id, title, album, artist, duration, coverArt}= song;
        const songElem = createSongElement(id, title, album, artist, duration, coverArt);
        songdiv.appendChild(songElem);
    }
}
function PrintAllPlaylists()
{
    for(let playlist of player.playlists)
    {
        const { id, name, songs}= playlist;
        const playlistElem = createPlaylistElement(id, name, songs);
        playlistDiv.appendChild(playlistElem);
    }
}