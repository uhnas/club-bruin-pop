import React, { useContext } from 'react';
import { AudioContext } from '../App';

const Lyrics = () => {
  // Access the AudioContext provided by App.tsx
  const audioContext = useContext(AudioContext);
  
  const recessionSongs = [
    {
      title: "Tik Tok",
      artist: "Ke$ha",
      year: "2009",
      themes: "Escapism through partying, finding joy despite economic uncertainty",
      relevantLyrics: "\"Ain't got a care in the world, but got plenty of beer / Ain't got no money in my pocket, but I'm already here\"",
      playlistIndex: 1 // matches playlist position
    },
    {
      title: "Time of Our Lives",
      artist: "Ne-Yo & Pitbull",
      year: "2014",
      themes: "Financial struggle, having fun despite money problems",
      relevantLyrics: "\"I knew my rent was gon' be late about a week ago / I worked my ass off, but I still can't pay it though\"",
      playlistIndex: 12 // matches playlist position
    },
    {
      title: "Just Dance",
      artist: "Lady Gaga",
      year: "2008",
      themes: "Dancing away problems, finding relief through pop / dance music",
      relevantLyrics: "\"Just dance, gonna be okay / Da da doo-doo-n / Just dance, spin that record babe\"",
      playlistIndex: 2 // matches playlist position
    },
    {
      title: "I Gotta Feeling",
      artist: "Black Eyed Peas", 
      year: "2009",
      themes: "Stress relief through partying, weekend escapism",
      relevantLyrics: "\"If we get down and go out and just lose it all / I feel stressed out, I wanna let it go\"",
      playlistIndex: 3 // matches playlist position
    },
    {
      title: "The Way I Are",
      artist: "Timbaland",
      year: "2007",
      themes: "Being broke but confident, lack of money not defining worth",
      relevantLyrics: "\"I ain't got no money / I ain't got no car to take you on a date\"",
      playlistIndex: 4 // matches playlist position
    },
    {
      title: "Down",
      artist: "Jay Sean",
      year: "2009",
      themes: "Recession references, finding companionship during hard times",
      relevantLyrics: "\"And honestly, I'm down like the economy, hey / You won't be lonely even if the sky is falling down\"",
      playlistIndex: 5 // matches playlist position
    },
    {
      title: "DJ Got Us Fallin' In Love",
      artist: "Usher ft. Pitbull",
      year: "2010",
      themes: "Club escapism, falling in love with the night",
      relevantLyrics: "\"So we back in the club / Get that bodies rockin' from side to side\"",
      playlistIndex: 6 // matches playlist position
    },
    {
      title: "We R Who We R",
      artist: "Ke$ha",
      year: "2010",
      themes: "Being tired of seriousness, living it up despite life hitting, generational identity",
      relevantLyrics: "\"It's about damn time to live it up / I'm so sick of being so serious\"",
      playlistIndex: 7 // matches playlist position
    },
    {
      title: "Party Rock Anthem",
      artist: "LMFAO",
      year: "2011",
      themes: "Living in the moment, dance as universal language",
      relevantLyrics: "\"Party rock is in the house tonight / Everybody just have a good time\"",
      playlistIndex: 0 // matches playlist position
    },
    {
      title: "Give Me Everything",
      artist: "Pitbull ft. Ne-Yo",
      year: "2011",
      themes: "Living like there's no tomorrow, financial uncertainty",
      relevantLyrics: "\"Give me everything tonight / For all we know we might not get tomorrow\"",
      playlistIndex: 8 // matches playlist position
    },
    {
      title: "We Found Love",
      artist: "Rihanna",
      year: "2011",
      themes: "Finding joy in chaos, love as escape, hope in hopeless places",
      relevantLyrics: "\"We found love in a hopeless place\"",
      playlistIndex: 9 // matches playlist position
    },
    {
      title: "Firework",
      artist: "Katy Perry",
      year: "2010",
      themes: "Self-worth despite setbacks, overcoming adversity",
      relevantLyrics: "\"Do you ever feel like a plastic bag / Drifting through the wind, wanting to start again?\"",
      playlistIndex: 10 // matches playlist position
    },
    {
      title: "Dynamite",
      artist: "Taio Cruz",
      year: "2010",
      themes: "Self-empowerment, breaking free from constraints",
      relevantLyrics: "\"I throw my hands up in the air sometimes / Saying hey-oh, gotta let go\"",
      playlistIndex: 11 // matches playlist position
    }
  ];

  return (
    <div className="lyrics-page">
      <div className="lyrics-header">
        <h1 className="neon-text">Recession Pop Lyrics</h1>
        <p className="neon-text-small">Songs that defined a generation's response to economic crisis</p>
      </div>

      <div className="songs-container">
        {recessionSongs.map((song, index) => (
          <div key={index} className={`song-card ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="song-header">
              <h3 className="song-title">"{song.title}"</h3>
              <p className="song-artist">{song.artist} ({song.year})</p>
            </div>
            
            <div className="song-themes">
              <h4>Themes:</h4>
              <p className="themes-text">{song.themes}</p>
            </div>
            
            <div className="song-lyrics">
              <h4>Relevant Lyrics:</h4>
              <p className="lyrics-text">{song.relevantLyrics}</p>
            </div>

            {song.playlistIndex !== undefined && audioContext && (
              <div className="song-play-section">
                <button 
                  className="play-button neon-button"
                  onClick={() => audioContext.handlePlaySong(song.playlistIndex)}
                >
                  ▶ Play in iPod (double-click)
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lyrics; 