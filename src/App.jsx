import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Share2, Heart, MessageCircle, ExternalLink,
  Instagram, Mail, Twitter, Video, Music as MusicIcon, 
  LayoutGrid, Send, User, ChevronRight
} from 'lucide-react';

const PORTFOLIO_DATA = {
  author: "PEEL",
  contact: {
    email: "1679646067@qq.com", 
    wechat: "sfmsongfm",            
    instagram: "@peel",          
    location: "Shenzhen, China"       
  },
  videos: [
    { 
      id: 1, 
      title: "星球大战", 
      url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/166.MP4", 
      thumbnail: "https://github.com/1679646067-droid/-/blob/main/IMG_0986.JPG?raw=true" 
    },
    { 
      id: 2, 
      title: "AI Rebirth", 
      url: "https://www.w3schools.com/html/movie.mp4", 
      thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000" 
    }
  ],
  music: [
    { 
      id: 1, 
      title: "toxic", 
      artist: "PEEL", 
      cover: "https://github.com/1679646067-droid/-/blob/main/IMG_0986.JPG?raw=true", 
      url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/TOXIC.mp3" 
    },
    { 
      id: 2, 
      title: "天若有情", 
      artist: "PEEL", 
      cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000", 
      url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/天若有情（网页）.mp3" 
    },
    { 
      id: 3, 
      title: "模特", 
      artist: "PEEL", 
      cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000", 
      url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/模特（网页）.mp3" 
    }
  ],
  shorts: [
    { 
      id: 1, 
      platform: "抖音", 
      likes: "12.8w", 
      plays: "105w", 
      shares: "3.2w", 
      title: "AI换脸特效展示",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" 
    },
    { 
      id: 2, 
      platform: "小红书", 
      likes: "5.6k", 
      plays: "20w", 
      shares: "1.1k", 
      title: "Suno创作教学",
      videoUrl: "https://www.w3schools.com/html/movie.mp4"
    },
    { 
      id: 3, 
      platform: "视频号", 
      likes: "8.2k", 
      plays: "45w", 
      shares: "2.5k", 
      title: "可灵AI视频大片",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ]
};

const LEGAL_NOTICE = "本影片、音乐、特效全采用AI 技术生成，所有产权均为PEEL一人，擅自盗用作者视频，将会采取法律途径维权";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed pointer-events-none z-[9999] w-12 h-12 rounded-full border flex items-center justify-center mix-blend-screen transition-all duration-300 ease-out hidden md:flex ${
          isClicking ? 'scale-50 border-pink-500 bg-pink-500/20' : 'scale-100 border-cyan-500/50'
        }`}
        style={{ left: pos.x - 24, top: pos.y - 24 }}
      />
      <div
        className={`fixed pointer-events-none z-[9999] w-2 h-2 rounded-full mix-blend-screen transition-all duration-150 ease-out hidden md:block ${
          isClicking ? 'bg-cyan-400 shadow-[0_0_20px_#22d3ee] scale-150' : 'bg-pink-500 shadow-[0_0_15px_#ec4899] scale-100'
        }`}
        style={{ left: pos.x - 4, top: pos.y - 4 }}
      />
    </>
  );
};

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'video', label: '视频', icon: Video },
    { id: 'music', label: '音乐', icon: MusicIcon },
    { id: 'shorts', label: '流媒体', icon: LayoutGrid },
    { id: 'contact', label: '联系', icon: User },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-8">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 transition-all duration-500 ${activeTab === tab.id ? 'text-cyan-400 scale-110' : 'text-gray-400 hover:text-white'}`}
        >
          <tab.icon size={18} />
          <span className="text-xs tracking-widest font-light">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

const VideoPage = () => {
  const [currentVideo, setCurrentVideo] = useState(PORTFOLIO_DATA.videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => console.log("Playback failed:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentVideo]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = (e) => { e.stopPropagation(); setIsMuted(!isMuted); };
  const handleTimeUpdate = () => {
    if (videoRef.current) { setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100); }
  };
  const handleSeek = (e) => {
    e.stopPropagation();
    if (videoRef.current && videoRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
      setProgress(pos * 100);
    }
  };

  return (
    <div className="min-h-screen relative text-white pt-32 pb-20 px-4 flex flex-col items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#050505]/85 z-10 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000')" }} />
      </div>
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 group relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_0_50px_rgba(34,211,238,0.1)]">
          <video ref={videoRef} key={currentVideo.url} src={currentVideo.url} className="w-full h-full object-cover cursor-pointer" onClick={togglePlay} onTimeUpdate={handleTimeUpdate} playsInline muted={isMuted}/>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
               <button className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 pointer-events-auto" onClick={togglePlay}>
                  <Play size={32} fill="white" />
               </button>
            </div>
          )}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] py-4 px-8 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            <div className="flex items-center gap-6 w-2/3">
              <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="hover:text-cyan-400 transition-colors">
                {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
              </button>
              <div className="h-2 w-full max-w-md bg-white/20 rounded-full relative overflow-hidden hidden md:block cursor-pointer" onClick={handleSeek}>
                <div className="absolute left-0 top-0 h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={toggleMute} className="hover:text-cyan-400 transition-colors z-30">
                {isMuted ? <VolumeX size={20} className="text-cyan-400" /> : <Volume2 size={20} className="text-gray-400" />}
              </button>
              <div className="text-[10px] font-mono tracking-widest text-cyan-400 truncate max-w-[100px]">PLAYING: {currentVideo.title}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xs tracking-[0.3em] uppercase text-cyan-500 font-bold mb-2">作品列表</h3>
          {PORTFOLIO_DATA.videos.map(v => (
            <button key={v.id} onClick={() => { setCurrentVideo(v); setIsPlaying(true); }} className={`p-3 rounded-xl border transition-all duration-300 flex gap-4 items-center ${currentVideo.id === v.id ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
              <div className="w-16 h-10 bg-zinc-800 rounded-md overflow-hidden shrink-0">
                <img src={v.thumbnail} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-light truncate">{v.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-20 text-center max-w-2xl px-4">
        <p className="text-[10px] text-gray-500 leading-relaxed tracking-widest uppercase opacity-60 italic">{LEGAL_NOTICE}</p>
      </div>
    </div>
  );
};

const MusicPage = () => {
  const [currentTrack, setCurrentTrack] = useState(PORTFOLIO_DATA.music[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.play().catch(e => { console.log("Audio play blocked", e); setIsPlaying(false); }); } 
      else { audioRef.current.pause(); }
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleNext = () => {
    const currentIndex = PORTFOLIO_DATA.music.findIndex(m => m.id === currentTrack.id);
    setCurrentTrack(PORTFOLIO_DATA.music[(currentIndex + 1) % PORTFOLIO_DATA.music.length]);
    setIsPlaying(true);
  };
  const handlePrev = () => {
    const currentIndex = PORTFOLIO_DATA.music.findIndex(m => m.id === currentTrack.id);
    setCurrentTrack(PORTFOLIO_DATA.music[(currentIndex - 1 + PORTFOLIO_DATA.music.length) % PORTFOLIO_DATA.music.length]);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center transition-all duration-1000 bg-black">
      <audio ref={audioRef} src={currentTrack.url} onEnded={handleNext} />
      <div className="absolute inset-0 transition-all duration-1000 scale-110 blur-3xl opacity-30" style={{ backgroundImage: `url(${currentTrack.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative z-10 w-full max-w-5xl px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-center">
          <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-white/5 shadow-2xl overflow-hidden ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`}>
            <img src={currentTrack.cover} className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-[40px] border-black/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full border-4 border-white/10" />
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-light tracking-tighter text-white mb-2">{currentTrack.title}</h2>
            <p className="text-pink-400 tracking-[0.4em] text-[10px] uppercase">{currentTrack.artist}</p>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-3xl border border-white/10">
          <div className="flex justify-center gap-10 items-center mb-12 text-white">
            <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-colors"><SkipBack size={28} /></button>
            <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:bg-pink-400 hover:text-white transition-all transform active:scale-95 shadow-xl">
              {isPlaying ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
            </button>
            <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors"><SkipForward size={28} /></button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {PORTFOLIO_DATA.music.map(m => (
              <div key={m.id} onClick={() => { setCurrentTrack(m); setIsPlaying(true); }} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${currentTrack.id === m.id ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono opacity-50 italic">#{m.id}</span>
                  <span className="text-sm font-light">{m.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ShortsPage = () => {
  const [playingId, setPlayingId] = useState(null);
  return (
    <div className="min-h-screen bg-[#080808] text-white pt-32 pb-20 flex flex-col items-center">
      <div className="mb-16 text-center">
        <h2 className="text-xs tracking-[0.8em] text-orange-500 uppercase font-bold mb-4">社交流媒体平台作品</h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 max-w-7xl w-full">
        {PORTFOLIO_DATA.shorts.map((short) => (
          <div key={short.id} className="w-full max-w-[300px] group mx-auto flex flex-col">
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">{short.platform}</span>
            </div>
            <div onClick={() => setPlayingId(playingId === short.id ? null : short.id)} className="aspect-[9/16] bg-zinc-900 rounded-[2rem] border-[4px] border-[#1a1a1a] overflow-hidden relative shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 cursor-pointer">
              {short.videoUrl && <video src={short.videoUrl} className="w-full h-full object-cover" autoPlay={playingId === short.id} loop muted={false} playsInline />}
              {playingId !== short.id && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border border-white/20 mb-4">
                    <Play className="text-white" size={32} fill="white" />
                  </div>
                </div>
              )}
              <div className="absolute right-3 bottom-20 flex flex-col gap-6 items-center bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 z-10">
                <div className="flex flex-col items-center"><Heart size={20} className="mb-1" /><span className="text-[10px] font-mono">{short.likes}</span></div>
                <div className="flex flex-col items-center"><MessageCircle size={20} className="mb-1" /><span className="text-[10px] font-mono">{short.plays}</span></div>
                <div className="flex flex-col items-center"><Share2 size={20} className="mb-1" /><span className="text-[10px] font-mono">{short.shares}</span></div>
              </div>
            </div>
            <p className="mt-6 text-center text-sm font-light text-gray-400 tracking-widest uppercase">{short.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-5xl md:text-6xl font-extralight tracking-tighter mb-8 italic text-white/90">Let's <br/> Create.</h2>
          <div className="space-y-8 mt-12">
            <div className="group flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"><Mail size={18} /></div>
              <div><p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Email</p><p className="text-sm font-light tracking-wide">{PORTFOLIO_DATA.contact.email}</p></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <input type="text" placeholder="YOUR NAME" className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-cyan-500 transition-colors text-sm font-light tracking-widest uppercase" />
          <textarea rows="4" placeholder="TELL ME ABOUT YOUR PROJECT" className="bg-transparent border-b border-white/10 py-4 outline-none focus:border-cyan-500 transition-colors text-sm font-light tracking-widest resize-none uppercase"></textarea>
          <button className="mt-8 self-start flex items-center gap-4 group">
            <span className="text-xs tracking-[0.3em] font-bold">SEND MESSAGE</span>
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-2 transition-transform"><ChevronRight size={18} /></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('video');
  return (
    <div className="font-sans select-none selection:bg-cyan-500/30 overflow-x-hidden cursor-default md:cursor-none">
      <CustomCursor />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="transition-opacity duration-500">
        {activeTab === 'video' && <VideoPage />}
        {activeTab === 'music' && <MusicPage />}
        {activeTab === 'shorts' && <ShortsPage />}
        {activeTab === 'contact' && <ContactPage />}
      </main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap');
        body { margin: 0; padding: 0; background: #000; font-family: 'Inter', sans-serif; color: white; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
