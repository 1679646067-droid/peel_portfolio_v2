import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Share2, Heart, MessageCircle, 
  Instagram, Mail, Video, Music as MusicIcon, 
  LayoutGrid, Send, User, ChevronUp, ChevronDown, Check, Copy, Phone
} from 'lucide-react';

// ==========================================
// --- 数据配置区 ---
// ==========================================
const PORTFOLIO_DATA = {
  author: "PEEL",
  tapnewUrl: "https://www.baidu.com", // ★ 在这里修改 TapNew 平台跳转的网页链接
  contact: {
    email: "1679646067@qq.com", 
    wechat: "sfmsongfm",            
    phone: "+86 14775909812", // ★ 修改为你的电话号码
    location: "Shenzhen, China"       
  },
  videos: [
    { 
      id: 1, 
      title: "星球大战混剪", 
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
      cover: "https://github.com/1679646067-droid/peel/blob/main/生成写实赛博小姐.jpg?raw=true", 
      url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/天若有情（网页）.mp3" 
    },
    { 
      id: 3, 
      title: "模特", 
      artist: "PEEL", 
      cover: "https://github.com/1679646067-droid/peel/blob/main/07F7DDB9-6DC7-4473-941D-D59C0604F27E.jpg?raw=true", 
      url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/模特（网页）.mp3" 
    },
    { 
      id: 4, 
      title: "别问很可怕", 
      artist: "PEEL", 
      cover: "https://github.com/1679646067-droid/peel/blob/main/754542BB-61C6-45EB-A988-C483B485A901.jpg?raw=true", 
      url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/别问很可怕（网页上传版）.mp3" 
    },
  ],
  shorts: [
    { 
      id: 1, 
      platform: "抖音", 
      videos: [
        { vId: 101, likes: "116.0w", plays: "2.4w", shares: "2.7w", title: "体育类VLOG", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/扣篮.mp4" },
        { vId: 102, likes: "42.1w", plays: "126", shares: "4374", title: "体育类剧情", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/剧情.mp4" }
      ]
    },
    { 
      id: 2, 
      platform: "小红书", 
      videos: [
        { vId: 201, likes: "3.5k", plays: "260", shares: "776", title: "出海营销案例", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/小红书%202.MP4" },
        { vId: 202, likes: "24k", plays: "4", shares: "86", title: "toc产品介绍视频", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/小蜜蜂慕斯卡托.mp4" }
      ]
    },
    { 
      id: 3, 
      platform: "视频号", 
      videos: [
        { vId: 301, likes: "-", plays: "-", shares: "-", title: "MG动画展示商业案例", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/录音笔.mp4" },
        { vId: 302, likes: "-", plays: "-", shares: "-", title: "实录活动VLOG", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/北京晚宴.mp4" }
      ]
    }
  ]
};

const LEGAL_NOTICE = "本影片、音乐、特效全采用AI 技术生成，擅自盗用作者视频，将会采取法律途径维权";

// --- 光标交互组件 ---
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    
    const handleMouseOver = (e) => {
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full border flex items-center justify-center mix-blend-screen transition-all duration-300 ease-out hidden md:flex ${
          isHovering 
            ? 'w-16 h-16 border-cyan-400 bg-cyan-500/10 scale-110' 
            : isClicking 
              ? 'w-12 h-12 scale-50 border-pink-500 bg-pink-500/20' 
              : 'w-12 h-12 scale-100 border-cyan-500/50'
        }`}
        style={{ left: pos.x - (isHovering ? 32 : 24), top: pos.y - (isHovering ? 32 : 24) }}
      />
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full mix-blend-screen transition-all duration-150 ease-out hidden md:block ${
          isHovering
            ? 'w-3 h-3 bg-white shadow-[0_0_20px_#fff]'
            : isClicking 
              ? 'w-2 h-2 bg-cyan-400 shadow-[0_0_20px_#22d3ee] scale-150' 
              : 'w-2 h-2 bg-pink-500 shadow-[0_0_15px_#ec4899] scale-100'
        }`}
        style={{ left: pos.x - (isHovering ? 6 : 4), top: pos.y - (isHovering ? 6 : 4) }}
      />
    </>
  );
};

// --- 导航栏 ---
const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'video', label: '视频', icon: Video },
    { id: 'music', label: '音乐', icon: MusicIcon },
    { id: 'shorts', label: '流媒体', icon: LayoutGrid },
    { id: 'contact', label: '联系', icon: User },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-8 group/nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 transition-all duration-500 px-2 py-1 rounded-full ${
            activeTab === tab.id 
              ? 'text-cyan-400 scale-110 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <tab.icon size={18} />
          <span className="text-xs tracking-widest font-light whitespace-nowrap">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

// --- 视频页面 ---
const VideoPage = () => {
  const [currentVideo, setCurrentVideo] = useState(PORTFOLIO_DATA.videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.play().catch(e => console.log("Playback failed:", e));
      else videoRef.current.pause();
    }
  }, [isPlaying, currentVideo]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = (e) => { e.stopPropagation(); setIsMuted(!isMuted); };
  const handleTimeUpdate = () => {
    if (videoRef.current) setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
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
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000')" }} />
      </div>

      <div className="relative z-10 max-w-6xl w-full mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extralight tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">PEEL的创作空间</h1>
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 group relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.15)] bg-black transition-transform duration-700 hover:scale-[1.01]">
          <a 
            href={PORTFOLIO_DATA.tapnewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 right-6 z-30 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] transform hover:scale-105 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] tracking-widest text-cyan-50 uppercase font-bold">本作品由 TapNew 提供的工作流平台制作</span>
          </a>

          <video ref={videoRef} key={currentVideo.url} src={currentVideo.url} className="w-full h-full object-cover cursor-pointer" onClick={togglePlay} onTimeUpdate={handleTimeUpdate} muted={isMuted} playsInline />
          
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity pointer-events-none z-20">
               <button className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 pointer-events-auto hover:bg-white/20 hover:scale-110 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)]" onClick={togglePlay}>
                  <Play size={32} fill="white" className="ml-1" />
               </button>
            </div>
          )}
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] py-4 px-8 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center gap-6 w-2/3">
              <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="hover:text-cyan-400 hover:scale-110 transition-all">
                {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
              </button>
              <div className="h-2 w-full max-w-md bg-white/10 rounded-full relative overflow-hidden hidden md:block cursor-pointer group/progress" onClick={handleSeek}>
                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_#06b6d4] transition-all duration-75 group-hover/progress:h-3" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={toggleMute} className="hover:text-cyan-400 hover:scale-110 transition-all z-30">
                {isMuted ? <VolumeX size={20} className="text-cyan-400" /> : <Volume2 size={20} className="text-gray-400" />}
              </button>
              <div className="text-[10px] font-mono tracking-widest text-cyan-400 truncate max-w-[100px]">PLAYING: {currentVideo.title}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs tracking-[0.3em] uppercase text-cyan-500 font-bold mb-4 flex items-center gap-2">
            <div className="w-1 h-3 bg-cyan-500 rounded-full" />
            Playlist
          </h3>
          {PORTFOLIO_DATA.videos.map(v => (
            <button 
              key={v.id}
              onClick={() => { setCurrentVideo(v); setIsPlaying(true); }}
              className={`p-3 rounded-xl border transition-all duration-500 flex gap-4 items-center group/btn overflow-hidden relative ${
                currentVideo.id === v.id 
                  ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                  : 'bg-white/5 border-white/5 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl'
              }`}
            >
              <div className="w-16 h-10 bg-zinc-800 rounded-md overflow-hidden shrink-0 relative">
                <img src={v.thumbnail} className="w-full h-full object-cover group-hover/btn:scale-110 transition-transform duration-500" />
              </div>
              <span className={`text-xs font-light truncate ${currentVideo.id === v.id ? 'text-cyan-300 font-bold' : 'text-gray-300'}`}>{v.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 音乐页面 ---
const MusicPage = () => {
  const [currentTrack, setCurrentTrack] = useState(PORTFOLIO_DATA.music[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
      else audioRef.current.pause();
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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">
      <audio ref={audioRef} src={currentTrack.url} onEnded={handleNext} />
      <div className={`absolute inset-0 transition-all duration-[3000ms] scale-110 blur-[60px] opacity-40 ${isPlaying ? 'scale-125' : ''}`} style={{ backgroundImage: `url(${currentTrack.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative z-10 w-full max-w-5xl px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-center group">
          <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full border-[12px] border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-700 ${isPlaying ? 'animate-[spin_15s_linear_infinite]' : ''}`}>
            <img src={currentTrack.cover} className="w-full h-full object-cover" />
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-light tracking-tighter text-white mb-2">{currentTrack.title}</h2>
            <p className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-bold">{currentTrack.artist}</p>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-[40px] p-8 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex justify-center gap-10 items-center mb-12 text-white">
            <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-all"><SkipBack size={28} /></button>
            <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:bg-pink-400 hover:text-white transition-all shadow-xl">
              {isPlaying ? <Pause size={32} /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={handleNext} className="text-gray-400 hover:text-white transition-all"><SkipForward size={28} /></button>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {PORTFOLIO_DATA.music.map((m) => (
              <div key={m.id} onClick={() => { setCurrentTrack(m); setIsPlaying(true); }} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${currentTrack.id === m.id ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' : 'text-gray-400 hover:bg-white/5'}`}>
                <span className="text-sm font-light">{m.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 修补后的短视频卡片组件 ---
const ShortsCard = ({ platformData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const videos = platformData.videos;
  const currentVideo = videos[currentIndex];

  // 监听播放状态改变
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => {
          console.warn("Autoplay blocked:", e);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(true);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-[320px] mx-auto flex flex-col group/card">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase group-hover/card:text-orange-400 transition-colors">{platformData.platform}</span>
        <span className="text-[8px] font-mono text-gray-500">{currentIndex + 1} / {videos.length}</span>
      </div>

      <div 
        className="aspect-[9/16] bg-zinc-950 rounded-[2rem] border-[4px] border-zinc-800 overflow-hidden relative shadow-2xl transition-all duration-500 group-hover/card:-translate-y-2 cursor-pointer"
        onClick={togglePlay}
      >
        <video 
          ref={videoRef}
          key={currentVideo.url}
          src={currentVideo.url} 
          className="w-full h-full object-cover"
          loop
          playsInline
        />

        {/* 翻页控制 */}
        {videos.length > 1 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30 opacity-0 group-hover/card:opacity-100 transition-opacity">
            <button onClick={handlePrev} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/60 hover:text-white border border-white/10">
              <ChevronUp size={18} />
            </button>
            <button onClick={handleNext} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/60 hover:text-white border border-white/10">
              <ChevronDown size={18} />
            </button>
          </div>
        )}

        {/* 播放按钮叠加层 */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] z-20 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Play className="text-white ml-1" size={32} fill="white" />
            </div>
          </div>
        )}
        
        <div className="absolute right-3 bottom-6 flex flex-col gap-6 items-center bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 z-20">
          <div className="flex flex-col items-center">
            <Heart size={18} className="mb-1 text-white/80" />
            <span className="text-[8px] font-mono">{currentVideo.likes}</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle size={18} className="mb-1 text-white/80" />
            <span className="text-[8px] font-mono">{currentVideo.plays}</span>
          </div>
          <div className="flex flex-col items-center">
            <Share2 size={18} className="mb-1 text-white/80" />
            <span className="text-[8px] font-mono">{currentVideo.shares}</span>
          </div>
        </div>
      </div>
      <p className="mt-5 text-center text-xs font-light text-gray-400 tracking-widest uppercase truncate">{currentVideo.title}</p>
    </div>
  );
}

const ShortsPage = () => {
  return (
    <div className="min-h-screen relative text-white pt-32 pb-20 flex flex-col items-center overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600 rounded-full blur-[150px]" />
      </div>
      <div className="relative z-10 mb-16 text-center">
        <h2 className="text-lg tracking-widest text-orange-400 uppercase font-bold mb-4">国内流媒体平台作品</h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto opacity-70" />
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 max-w-7xl w-full">
        {PORTFOLIO_DATA.shorts.map((platformData) => (
          <ShortsCard key={platformData.id} platformData={platformData} />
        ))}
      </div>
    </div>
  );
};

// --- 联系页面 ---
const ContactPage = () => {
  const [copied, setCopied] = useState(null);
  const handleCopy = (text, label) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  const contactItems = [
    { icon: Mail, label: 'Email', value: PORTFOLIO_DATA.contact.email },
    { icon: Phone, label: 'Phone', value: PORTFOLIO_DATA.contact.phone },
    { icon: Send, label: 'WeChat', value: PORTFOLIO_DATA.contact.wechat },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative">
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        <h2 className="text-6xl md:text-8xl font-extralight tracking-tighter mb-20 italic">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Create.</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
          {contactItems.map((item, idx) => (
            <div key={idx} onClick={() => handleCopy(item.value, item.label)} className="group flex flex-col items-center gap-4 cursor-pointer p-6 rounded-3xl hover:bg-white/5 transition-all">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                {copied === item.label ? <Check size={24} /> : <item.icon size={24} />}
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">{item.label}</p>
              <p className="text-sm font-light opacity-80">{copied === item.label ? "COPIED!" : item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('video');
  return (
    <div className="font-sans select-none overflow-x-hidden bg-black">
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
        body { margin: 0; background: #000; font-family: 'Inter', sans-serif; color: white; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}