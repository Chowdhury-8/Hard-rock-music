const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    // console.log(searchText);
    const url = `https://api.lyrics.ovh/suggest/${searchText}`

    //load  data
    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
}
const displaySongs = songs => {
    // console.log(songs);
    // songs.forEach(song => console.log(song));               //looking for each individual song
    // songs.forEach(song => console.log(song.title));          //for song title
    const songContainer = document.getElementById('song-container');

    songContainer.innerHTML = '';                              // it refresh after adding new search

    songs.forEach(song => {
        //console.log(song);                                    //to check out the songs
        // const li = document.createElement('li');
        // li.innerText = song.title;
        // songContainer.appendChild(li);
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `<div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}',' ${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
            <audio controls>
                  <source src=${song.preview} type="audio/mpeg">
            </audio>`;
        songContainer.appendChild(songDiv);

    });
}


const getLyric = async (artist, title) => {
    // console.log(artist, title);                         // before load to check out
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    // .then(data=>console.log(data.lyrics));
    displayLyrics(data.lyrics);
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;

}
