const songdiv= document.getElementById("songs");
const playlistDiv= document.getElementById("playlists")
sortsongs(); //sorts songs by title
sortplaylists(); //sorts playlists by name
// Creating the page structure
generateSongs()
generatePlaylists()
/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
 const Title= document.createElement("h1");
 Title.innerText= "MP3";
 const theTitle=document.getElementById("title");
 theTitle.appendChild(Title);
 let playedsongID; //used in playsong function
 const outputSong= document.getElementById("songOutput");
 const playedSong= document.createElement("h2");
 outputSong.appendChild(playedSong);

function playSong(songId) {
    const generatedID= "this"+songId
    const div= document.getElementById(generatedID);
    div.style.border="3px solid green";
    const TheSong= GetsongById(Number(songId));
    if(playedsongID===undefined)
    {
        playedsongID=generatedID;
        playedSong.innerText= songplayedDet(TheSong);
    }
    else
    {
        let resetback= document.getElementById(playedsongID);
        resetback.style.border="thin solid black";
        playedsongID=generatedID;
        playedSong.innerText= songplayedDet(TheSong);
    }
}
function songplayedDet(song)
{
    return ("Playing "+song.title+ " from " +song.album+" by "+song.artist+" | "+durationConvert(song.duration)+".")
}
/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId)
 {
    if(GetsongById(Number(songId))===undefined)
    {
        throw "invalid ID";
    }
    else{
        let songIndex= GetSongIndexById(Number(songId)); //get index of song in songs array
        player.songs.splice(songIndex,1); // removed song from songs array
    for(let i of player.playlists) //filter playlist from songs with id
      {
        for(let j=0;j< i.songs.length; j++)
        {
          if(i.songs[j]===Number(songId)){
            i.songs.splice(j,1);
          }
        }
      }
    }
    const divId= "this"+Number(songId);
    document.getElementById(divId).remove();
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function randomID() //generated random id not existing in player songs
{
    let randomId= Math.floor(Math.random()*100); //generates a random id to the song
    for(let song of player.songs)
    {
        while(randomId === (song.id)) // if the genrated id exists generate a new one
        {
            randomId= Math.floor(Math.random()*100)
        }
    }
    return randomId;      
}

function addSong({ title, album, artist, duration, coverArt }) {
    const newID= randomID();
    const newSong=createSongElement(newID,title,album,artist,duration, coverArt);
    const newSongAtt= {id:newID,title, album, artist, duration, coverArt};
    player.songs.push(newSongAtt);
    songdiv.append(newSong);
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const ul= document.createElement("ul");
    for(let i=0; i<5; i++)
    {

            if(arguments[i] === arguments[4]) //convert duration to mm:ss format
            {
                arguments[i] = durationConvert(arguments[4]);
            }
            let li= document.createElement("li");
            li.innerText = arguments[i];
            ul.appendChild(li);
    }
    let image= document.createElement("img");
    image.src= arguments[5];
    ul.appendChild(image);
    children.push(ul); // song data in list
    const generatedButtonID= "Playbtn"+ arguments[0];
    const playbutton= createElement("button", [],["playButtons"],{id:generatedButtonID});
    playbutton.innerText="Play \u25B6";
    children.push(playbutton);
    const generatedButtonID2= "Removebtn"+ arguments[0];
    const removeButton= createElement("button", [],["removeButtons"],{id:generatedButtonID2});
    removeButton.innerText="Remove";
    children.push(removeButton);
    const classes = []
    classes.push(["songs"]);
    const generatedID= "this"+ arguments[0]
    //const attrs = { onclick:`playSong(${arguments[0]})`, id:generatedID}
    const attrs = {id:generatedID} ;//defined id to every div so it can be used in playsong function
    return createElement("div", children, classes, attrs);
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
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
    li.innerHTML = durationConvert(playlistDuration(arguments[0]));  //add mm:ssdurationto playlist list
    ul.appendChild(li);
    children.push(ul);
    const classes = []
    classes.push(["playlists"])
    const attrs = {}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const createdElement= document.createElement(tagName);
    for(let childElement of children)
    {
        if(typeof childElement==="string")
        {
            createdElement.textContent=childElement;
        }
        else
        {
            createdElement.appendChild(childElement);
        }
    }
    createdElement.classList.add(classes);
    const seperatekeys= Object.entries(attributes)
    for (let [att, value] of seperatekeys)
    {
        createdElement.setAttribute(`${att}`, `${value}`);
    }
    return createdElement;
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    for(let song of player.songs)
    {
        const { id, title, album, artist, duration, coverArt}= song;
        const songElem = createSongElement(id, title, album, artist, duration, coverArt);
        songdiv.appendChild(songElem);
    }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    for(let playlist of player.playlists)
    {
        const { id, name, songs}= playlist;
        const playlistElem = createPlaylistElement(id, name, songs);
        playlistDiv.appendChild(playlistElem);
    }
}


// Making the add-song-button actually do something
//document.getElementById("add-button").addEventListener("click", handleAddSongEvent)


document.getElementById("body").addEventListener("click",(e)=>{
if(e.target.id==="add-button")
{
    //get song details from input fields
    const title = document.getElementsByTagName("input")[0].value;
    const album = document.getElementsByTagName("input")[1].value;
    const artist = document.getElementsByTagName("input")[2].value;
    let duration = document.getElementsByTagName("input")[3].value;
    const coverArt = document.getElementsByTagName("input")[4].value;
    //convert duration from string mm:ss format to number
    duration = parseInt(duration.slice(0,Math.floor(duration.length/2)))*60+parseInt(duration.slice(Math.ceil(duration.length/2)));
    addSong({title,album,artist,duration,coverArt});
}
else if(e.target.id.includes("Removebtn"))
{
    //find nearest song id
    const closestdiv = e.target.closest("div");
    const closestUl = closestdiv.firstChild;
    const LiId= closestUl.firstChild.innerText;
    removeSong(LiId)
}
else if(e.target.id.includes("Playbtn"))
{
    //find nearest song id
    const closestdiv2 = e.target.closest("div");
    const closestul2 = closestdiv2.firstChild;
    const LiId2= closestul2.firstChild.innerText;
    playSong(LiId2);
}
}
);
