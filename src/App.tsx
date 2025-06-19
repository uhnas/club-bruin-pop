import { useState, useRef, createContext, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
// @ts-ignore
import DataViz from "./components/DataViz";
// @ts-ignore
import Lyrics from "./components/Lyrics";
// @ts-ignore
import References from "./components/References";

// Create global audio context
export const AudioContext = createContext<{
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  currentSong: number;
  playlist: Array<{ title: string; artist: string; file: string }>;
  currentTime: number;
  duration: number;
  handlePlayPause: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleTimeUpdate: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlaySong: (songIndex: number) => void;
} | null>(null);

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Timeline data
const timelineData = [
  {
    "Year": 2003,
    "Month": 2,
    "Day": 6,
    "Headline": "50 Cent releases \"In Da Club\"",
    "Group": "Music",
    "Text": "Rap/club crossover rules the charts and starts 2000s pop‑club craze.",
  },
  {
    "Year": 2004,
    "Month": 2,
    "Day": 4,
    "Headline": "Facebook launches at Harvard",
    "Group": "Economy",
    "Text": "Social media's new wave will reshape the virality of music.",
    "Image": "./images/timeline/facebook.jpg"
  },
  {
    "Year": 2005,
    "Month": 2,
    "Day": 14,
    "Headline": "YouTube is founded",
    "Group": "Economy",
    "Text": "A new platform for viral music videos and dance trends."
  },
  {
    "Year": 2006,
    "Month": 4,
    "Day": 1,
    "Headline": "U.S. housing bubble peaks",
    "Group": "Economy",
    "Text": "Record home prices set the stage for the subprime mortgage crisis and following economic crash."
  },
  {
    "Year": 2007,
    "Month": 6,
    "Day": 29,
    "Headline": "First iPhone released",
    "Group": "Economy",
    "Text": "Smartphones make portable streaming and social sharing effortless.",
    "Image": "./images/timeline/iphone.jpg"
  },
  {
    "Year": 2007,
    "Month": 9,
    "Day": 29,
    "Headline": "Soulja Boy's \"Crank That\" hits #1",
    "Group": "Music",
    "Text": "First song to top charts due to viral Myspace & YouTube dances.",
    "Image": "./images/timeline/souljaboy.jpg"
  },
  {
    "Year": 2007,
    "Month": 12,
    "Day": 1,
    "Headline": "NBER declared recession began (Dec 2007).",
    "Group": "Economy",
    "Text": "Official start of the Great Recession in the U.S.",
    "Image": "./images/timeline/recession.jpg"
  },
  {
    "Year": 2008,
    "Month": 9,
    "Day": 15,
    "Headline": "Lehman Brothers collapses",
    "Group": "Economy",
    "Text": "Lehman Brothers, one of the strongest financial firms at the time, files the largest bankruptcy in US history. This triggered a 4.5% drop in the DOW."
  },
  {
    "Year": 2008,
    "Month": 10,
    "Day": 3,
    "Headline": "TARP $700 B bailout signed",
    "Group": "Economy",
    "Text": "U.S. government launches Troubled Asset Relief Program."
  },
  {
    "Year": 2008,
    "Month": 10,
    "Day": 6,
    "Headline": "Lady Gaga releases \"Just Dance\"",
    "Group": "Music",
    "Text": "Electro‑pop anthem fueled by escapist nightlife energy.",
    "Image": "./images/timeline/justdance.jpg"
  },
  {
    "Year": 2009,
    "Month": 6,
    "Day": 15,
    "Headline": "Black Eyed Peas drop \"I Gotta Feeling\"",
    "Group": "Music",
    "Text": "Feel‑good party song becomes the soundtrack to post‑crash weekends."
  },
  {
    "Year": 2009,
    "Month": 10,
    "Day": 23,
    "Headline": "Ke$ha releases \"Tik Tok\"",
    "Group": "Music",
    "Text": "Recession‑pop anthem about partying through tough times."
  },
  {
    "Year": 2009,
    "Month": 10,
    "Day": 31,
    "Headline": "U.S. unemployment peaks at 10%",
    "Group": "Economy",
    "Text": "Highest rate of joblessness and poverty in the era emphasizes the need for escapism.",
    "Image": "./images/timeline/unemployment.jpg"
  },
  {
    "Year": 2011,
    "Month": 1,
    "Day": 25,
    "Headline": "LMFAO debut \"Party Rock Anthem\"",
    "Group": "Music",
    "Text": "Shuffle‑dance craze spreads on early YouTube."
  },
  {
    "Year": 2011,
    "Month": 8,
    "Day": 5,
    "Headline": "S&P downgrades U.S. credit rating",
    "Group": "Economy",
    "Text": "First‑ever downgrade from AAA adds to economic angst."
  },
  {
    "Year": 2013,
    "Month": 2,
    "Day": 10,
    "Headline": "Harlem Shake meme erupts",
    "Group": "Music",
    "Text": "15‑second dance snippets dominate Vine & YouTube.",
    "Image": "./images/timeline/harlemshake.jpg"
  },
  {
    "Year": 2014,
    "Month": 11,
    "Day": 17,
    "Headline": "Pitbull & Ne‑Yo release \"Time of Our Lives\"",
    "Group": "Music",
    "Text": "Late‑recession club staple about living it up despite bills."
  },
  {
    "Year": 2020,
    "Month": 3,
    "Day": 11,
    "Headline": "WHO declares COVID‑19 pandemic",
    "Group": "Economy",
    "Text": "Lockdowns crash economies; TikTok engagement skyrockets.",
    "Image": "./images/timeline/pandemic.jpg"
  },
  {
    "Year": 2021,
    "Month": 1,
    "Day": 28,
    "Headline": "#Y2K trends on TikTok",
    "Group": "Nostalgia",
    "Text": "Gen Z revives 2000s culture and #Y2K hits over 58 million interactions."
  },
  {
    "Year": 2022,
    "Month": 6,
    "Day": 10,
    "Headline": "U.S. inflation hits 40‑year high",
    "Group": "Economy",
    "Text": "Economic pressure mirrors 2008 vibe; party‑pop streams spike."
  },
  {
    "Year": 2023,
    "Month": 4,
    "Day": 11,
    "Headline": "Barbiecore dominates social feeds",
    "Group": "Nostalgia",
    "Text": "Hot‑pink Y2K palette floods social media, fashion, pop culture, showcasing a return to the 2000s.",
    "Image": "./images/timeline/barbiecore.jpg"
  },
  {
    "Year": 2024,
    "Month": 3,
    "Day": 23,
    "Headline": "\"Just Dance\" passes 1 B Spotify streams",
    "Group": "Nostalgia",
    "Text": "Confirms enduring appetite for late‑00s club anthems."
  },
  {
    "Year": 2025,
    "Month": 3,
    "Day": 24,
    "Headline": "'Recession Pop' videos garner million of views on social media.",
    "Group": "Nostalgia",
    "Text": "Social media note a surge in videos using 2007‑2012 club hits; TikTok memes fuel comeback.",
    "Image": "./images/timeline/recessionpop.jpg"
  }
];

function Navigation() {
  return (
    <nav className="neon-nav">
      <div className="nav-container">
        <ul className="nav-links">
          <li><Link to="/home" className="neon-link">Home</Link></li>
          <li><Link to="/timeline" className="neon-link">Timeline</Link></li>
          <li><Link to="/data-viz" className="neon-link">Data Viz</Link></li>
          <li><Link to="/lyrics" className="neon-link">Lyrics</Link></li>
          <li><Link to="/references" className="neon-link">References</Link></li>
        </ul>
        <div className="nav-back">
          <Link to="/" className="back-to-landing-btn">← leave the club</Link>
        </div>
      </div>
    </nav>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <main className="landing-page">
      <div className="neon-grid"></div>
      <div className="content-container">
        <h1 className="neon-text">
          party like it's 2008 :p
        </h1>
        <div className="menu-container">
          <button
            className="neon-button"
            onClick={() => navigate('/home')}
          >
            enter the club
          </button>
        </div>
      </div>
    </main>
  );
}

function HomePage() {
  const audioContext = useContext(AudioContext);
  if (!audioContext) return null;
  const { 
    isPlaying, 
    currentSong, 
    playlist, 
    currentTime,
    duration,
    handlePlayPause, 
    handleNext, 
    handlePrevious,
    handleSeek,
  } = audioContext;

  const navigate = useNavigate();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="equalizer-animation"></div>
        <h1 className="hero-title">CLUB BRUIN POP</h1>
        <p className="hero-tagline">relive the music that defined gen Z</p>
      </section>

      {/* iPod Section with Friends */}
      <section className="ipod-section">
        <div className="myspace-wall">
          <div className="mood-wall">
            <h3>Current Moods</h3>
            <div className="mood-bubbles">
              <div className="mood-bubble">
                <span className="mood-name">Sarah</span>
                "Blasting 'Tik Tok' on my first iPod Nano!"
              </div>
              <div className="mood-bubble">
                <span className="mood-name">Mike</span>
                "Danced to 'Just Dance' at my first school dance!"
              </div>
              <div className="mood-bubble">
                "Made my first YouTube video to 'Party Rock Anthem'"
              </div>
            </div>
            <div className="share-form">
              <input type="text" placeholder="Share your mood..." className="share-input" />
              <button className="neon-button" onClick={() => {
                const input = document.querySelector('.share-input') as HTMLInputElement;
                if (input && input.value) {
                  const bubbles = document.querySelectorAll('.mood-bubble');
                  const bottomBubble = bubbles[bubbles.length - 1]; // Get the last (bottom) bubble
                  if (bottomBubble) {
                    bottomBubble.textContent = input.value;
                  }
                  input.value = '';
                }
              }}>Share</button>
            </div>
          </div>
        </div>
        <div className="ipod-container">
          <div className="ipod">
            <div className="ipod-screen">
              <div className="ipod-content">
                <h3 className="ipod-title">Now Playing</h3>
                <div className="ipod-artwork"></div>
                <p className="ipod-song">{playlist[currentSong].title}</p>
                <p className="ipod-artist">{playlist[currentSong].artist}</p>
                <div className="ipod-progress">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="progress-bar"
                  />
                  <div className="time-display">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                <div className="ipod-controls">
                  <button className="ipod-btn" onClick={handlePrevious}>⏮</button>
                  <button className="ipod-btn" onClick={handlePlayPause}>
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <button className="ipod-btn" onClick={handleNext}>⏭</button>
                </div>
              </div>
            </div>
            <div className="ipod-wheel-container">
              <div className="ipod-wheel"></div>
            </div>
          </div>
        </div>

        {/* Friends Section */}
        <div className="friends-section">
          <div className="friends-container">
            <h2>Friends Online</h2>
            <div className="friends-list">
              <div className="friend">
                <div className="friend-avatar">🎵</div>
                <div className="friend-info">
                  <div className="friend-name">Lady Gaga</div>
                  <div className="friend-status">
                    <span className="status-dot online"></span>
                    Listening to "Just Dance"
                  </div>
                </div>
              </div>
              <div className="friend">
                <div className="friend-avatar">🎵</div>
                <div className="friend-info">
                  <div className="friend-name">Rihanna</div>
                  <div className="friend-status">
                    <span className="status-dot online"></span>
                    Listening to "Umbrella"
                  </div>
                </div>
              </div>
              <div className="friend">
                <div className="friend-avatar">🎵</div>
                <div className="friend-info">
                  <div className="friend-name">Ke$ha</div>
                  <div className="friend-status">
                    <span className="status-dot online"></span>
                    Listening to "Tik Tok"
                  </div>
                </div>
              </div>
              <div className="friend">
                <div className="friend-avatar">🎵</div>
                <div className="friend-info">
                  <div className="friend-name">Pitbull</div>
                  <div className="friend-status">
                    <span className="status-dot online"></span>
                    Listening to "Give Me Everything"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Era Section */}
      <section className="era-section">
        <div className="era-content">
          <div className="era-text">
            <h2>Why This Era?</h2>
            <div className="era-paragraphs">
              <p>
                The late 2000s club-pop scene wasn't just music. It was a cultural reset. The Great Recession hit in 2008 and changed the
                 world. Musical artists such as Lady Gaga, Ke$ha, Rihanna, and Pitbull created pop anthems that became an escape for so many. Their music wasn't just 
                about partying, but about finding joy during hard times.
              </p>
              <p>
                This era was the perfect combination of the rise of social media and music's digital transformation. Online spaces such as MySpace, 
                YouTube, and  Facebook became the new platforms where dance moves and songs went viral. Some examples are the "Crank That" 
                dance and the "Harlem Shake"? These were part of the first wave of internet culture.
              </p>
              <p>
                For Gen Z, this music is more than nostalgia. The music acts as a bridge between the analog and digital eras. We grew up 
                watching these videos on early YouTube, learning dances from online tutorials, and sharing music through 
                the first social medias. These aestheetics and lyrics all shaped our digital identity.
              </p>
              <p>
                Today, as we face new challenges with both the economy and society, this music is making a comeback. TikTok videos about "Recession Pop", 
                Y2K fashion , and the resurgence of electro-pop shows us how timeless this era really is. This entire time period taught us to find joy in the digital age.
              </p>
            </div>
          </div>
          <div className="era-visuals">
            <div className="bpm-chart">
              <img src="./images/timeline/myspace.gif" className="visual-gif" />
            </div>
            <div className="viral-clip">
              <img src="./images/timeline/homepage.gif" className="visual-gif" />
            </div>
          </div>
        </div>
      </section>

      {/* Add Your Content Section */}
      <section className="era-section">
        <div className="era-content flipped">
          <div className="era-visuals">
            <div className="bpm-chart">
              <img src="./images/timeline/cd.gif" className="visual-gif" />
            </div>
            <div className="viral-clip">
              <img src="./images/timeline/mtv.gif" className="visual-gif" />
            </div>
          </div>
          <div className="era-text">
            <h2> Accidental  Revolution</h2>
            <div className="era-paragraphs">
              <p>
                The biggest cultural shift of the 21st century happened by accident. While Wall Street and the world economy was collapsing 
                , a handful of artists had the loudest, most ridiculous party ever. They had no plan, no direction, no 
                viral strategy. The entire late 2000s pop scene was just made up of  autotune, nightlife, and a belief that the world needed more fun.
              </p>
              <p>
                The magic is in the chaos. When the economy crashed, traditional music industry gatekeepers lost 
                their grip. All of a sudden, any song could blow up on MySpace without needing radio play. A dance could go viral on 
                YouTube without MTV. For the first time, artists could build massive followings from their own bedroom.
              </p>
              <p>
                These weren't just songs, they were survival mechanisms. Every track became a manual to help us navigate a harsh realit.
                We had to dance through the pain, party through the stress, and find your community in 
                the comment sections of the internet. Artists gave us permission to be rowdy, loud, and unapologetic
                when everything and everyone demanded that we be serious and small.
              </p>
              <p>
                The revolution wasn't in the music itselfm but it was in who got to make it and how it reached others. Recession 
                pop proved that culture could come from anywhere, spread everywhere, and belong to everyone. Every social media 
                star, every viral moment, and every bedroom producer owes something to the chaos of 2008 when the world stopped 
                and we learned to rebuild it beat by beat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="memory-grid">
        <div className="memory-panel timeline-panel" onClick={() => navigate('/timeline')}>
          <div className="panel-content">
            <h3>Timeline</h3>
            <p>Journey through the key moments that shaped this era</p>
            <div className="panel-button">Enter</div>
          </div>
        </div>
        <div className="memory-panel data-panel" onClick={() => navigate('/data-viz')}>
          <div className="panel-content">
            <h3>Data Viz</h3>
            <p>Explore the numbers behind the music</p>
            <div className="panel-button">View Data</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h1 className="neon-text">The Rise of Recession Pop</h1>
        <p className="neon-text-small">A journey through music, the economy, and the internet</p>
      </div>
      
      <div className="timeline-container">
        {timelineData.map((event, index) => (
          <div key={index} className={`timeline-event ${event.Group.toLowerCase()}`}>
            <div className="timeline-date">
              <span className="date-month">{event.Month}</span>
              <span className="date-day">{event.Day}</span>
              <span className="date-year">{event.Year}</span>
            </div>
            <div className="timeline-content">
              <h3 className="timeline-headline">{event.Headline}</h3>
              {event.Image && (
                <div className="timeline-image-container">
                  <img src={event.Image} alt={event.Headline} className="timeline-image" />
                </div>
              )}
              <p className="timeline-text">{event.Text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist = [
    {
      title: "Party Rock Anthem",
      artist: "LMFAO",
      file: "./music/party-rock-anthem.mp3"
    },
    {
      title: "Tik Tok",
      artist: "Ke$ha",
      file: "./music/tik-tok.mp3"
    },
    {
      title: "Just Dance",
      artist: "Lady Gaga",
      file: "./music/just-dance.mp3"
    },
    {
      title: "I Gotta Feeling",
      artist: "Black Eyed Peas",
      file: "./music/i-gotta-feeling.mp3"
    },
    {
      title: "The Way I Are",
      artist: "Timbaland",
      file: "./music/the-way-i-are.mp3"
    },
    {
      title: "Down",
      artist: "Jay Sean",
      file: "./music/down.mp3"
    },
    {
      title: "DJ Got Us Fallin' In Love",
      artist: "Usher ft. Pitbull",
      file: "./music/dj-got-us-fallin-in-love.mp3"
    },
    {
      title: "We R Who We R",
      artist: "Ke$ha",
      file: "./music/we-r-who-we-r.mp3"
    },
    {
      title: "Give Me Everything",
      artist: "Pitbull ft. Ne-Yo",
      file: "./music/give-me-everything.mp3"
    },
    {
      title: "We Found Love",
      artist: "Rihanna",
      file: "./music/we-found-love.mp3"
    },
    {
      title: "Firework",
      artist: "Katy Perry",
      file: "./music/firework.mp3"
    },
    {
      title: "Dynamite",
      artist: "Taio Cruz",
      file: "./music/dynamite.mp3"
    },
    {
      title: "Time of Our Lives",
      artist: "Ne-Yo & Pitbull",
      file: "./music/time-of-our-lives.mp3"
    }
  ];

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    const nextSong = (currentSong + 1) % playlist.length;
    setCurrentSong(nextSong);
    setCurrentTime(0);
    
    if (audioRef.current) {
      audioRef.current.src = playlist[nextSong].file;
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 10);
    }
  };

  const handlePrevious = () => {
    const prevSong = (currentSong - 1 + playlist.length) % playlist.length;
    setCurrentSong(prevSong);
    setCurrentTime(0);
    
    if (audioRef.current) {
      audioRef.current.src = playlist[prevSong].file;
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 10);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlaySong = (songIndex: number) => {
    setCurrentSong(songIndex);
    setCurrentTime(0);
    
    if (audioRef.current) {
      audioRef.current.src = playlist[songIndex].file;
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 10);
    }
  };

  const handleSongEnded = () => {
    const nextSong = (currentSong + 1) % playlist.length;
    setCurrentSong(nextSong);
    setCurrentTime(0);
    
    if (audioRef.current) {
      audioRef.current.src = playlist[nextSong].file;
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 10);
    }
  };

  const audioContextValue = {
    audioRef,
    isPlaying,
    currentSong,
    playlist,
    currentTime,
    duration,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleTimeUpdate,
    handleSeek,
    handlePlaySong
  };

  return (
    <AudioContext.Provider value={audioContextValue}>
      <Router basename="/club-bruin-pop">
        <div className="app">
          <ScrollToTop />
          <Navigation />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/data-viz" element={<DataViz />} />
              <Route path="/lyrics" element={<Lyrics />} />
              <Route path="/references" element={<References />} />
            </Routes>
          </div>
          <audio
            ref={audioRef}
            src={playlist[currentSong].file}
            onEnded={handleSongEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>
      </Router>
    </AudioContext.Provider>
  );
}
