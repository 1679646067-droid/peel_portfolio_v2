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
  // 短视频页面数据重构：每个平台支持多个视频翻页
  shorts: [
    { 
      id: 1, 
      platform: "抖音", 
      videos: [
        { vId: 101, likes: "12.8w", plays: "105w", shares: "3.2w", title: "AI换脸特效展示", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { vId: 102, likes: "5.4w", plays: "30w", shares: "1.1w", title: "赛博迷幻视觉", url: "https://www.w3schools.com/html/movie.mp4" }
      ]
    },
    { 
      id: 2, 
      platform: "小红书", 
      videos: [
        { vId: 201, likes: "5.6k", plays: "20w", shares: "1.1k", title: "Suno创作教学", url: "https://www.w3schools.com/html/movie.mp4" },
        { vId: 202, likes: "9.2k", plays: "45w", shares: "3.5k", title: "干货分享", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
      ]
    },
    { 
      id: 3, 
      platform: "视频号", 
      videos: [
        { vId: 301, likes: "8.2k", plays: "45w", shares: "2.5k", title: "可灵AI视频大片", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { vId: 302, likes: "1.2w", plays: "60w", shares: "4.1k", title: "超清画质重制", url: "https://www.w3schools.com/html/movie.mp4" }
      ]
    }
  ]
};

const LEGAL_NOTICE = "本影片、音乐、特效全采用AI 技术生成，所有产权均为PEEL一人，擅自盗用作者视频，将会采取法律途径维权";

// --- 光标交互组件 (增加吸附和磁性交互) ---
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    
    // 监听交互元素的悬浮状态
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

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted, currentVideo]);

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

      {/* 新增：PEEL的创作空间 标题 */}
      <div className="relative z-10 max-w-6xl w-full mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extralight tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">PEEL的创作空间</h1>
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 group relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.15)] bg-black transition-transform duration-700 hover:scale-[1.01]">
          
          {/* 修改: AIGC 平台标识 Badge 改为可点击跳转 */}
          <a 
            href={PORTFOLIO_DATA.tapnewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 right-6 z-30 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] transform hover:scale-105 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] tracking-widest text-cyan-50 uppercase font-bold">本作品由 TapNew 提供的工作流平台制作</span>
          </a>

          <video ref={videoRef} key={currentVideo.url} src={currentVideo.url} className="w-full h-full object-cover cursor-pointer" onClick={togglePlay} onTimeUpdate={handleTimeUpdate} playsInline />
          
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
              {currentVideo.id === v.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent w-1/2 h-full skew-x-12 translate-x-[-100%] animate-[slideRight_2s_infinite]" />
              )}
              <div className="w-16 h-10 bg-zinc-800 rounded-md overflow-hidden shrink-0 relative">
                <img src={v.thumbnail} className="w-full h-full object-cover group-hover/btn:scale-110 transition-transform duration-500" />
                {currentVideo.id === v.id && <div className="absolute inset-0 bg-cyan-500/20" />}
              </div>
              <span className={`text-xs font-light truncate transition-colors ${currentVideo.id === v.id ? 'text-cyan-300 font-bold' : 'text-gray-300'}`}>{v.title}</span>
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

// --- 音乐页面 ---
const MusicPage = () => {
  const [currentTrack, setCurrentTrack] = useState(PORTFOLIO_DATA.music[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.play().catch(() => setIsPlaying(false)); } 
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
      <div className={`absolute inset-0 transition-all duration-[3000ms] scale-110 blur-[60px] opacity-40 ${isPlaying ? 'scale-125' : ''}`} style={{ backgroundImage: `url(${currentTrack.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      <div className="relative z-10 w-full max-w-5xl px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-center group">
          <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full border-[12px] border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-700 group-hover:scale-105 ${isPlaying ? 'animate-[spin_15s_linear_infinite]' : ''}`}>
            {/* 移除了内嵌圆孔和模糊效果，全尺寸展示封面图 */}
            <img src={currentTrack.cover} className="w-full h-full object-cover" />
          </div>
          <div className="mt-12 text-center transition-transform duration-500 group-hover:-translate-y-2">
            <h2 className="text-3xl font-light tracking-tighter text-white mb-2 drop-shadow-lg">{currentTrack.title}</h2>
            <p className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-bold">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-[40px] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* 流光特效边框 */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
          
          <div className="flex justify-center gap-10 items-center mb-12 text-white">
            <button onClick={handlePrev} className="text-gray-400 hover:text-white hover:scale-110 transition-all"><SkipBack size={28} /></button>
            <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:bg-pink-400 hover:text-white transition-all transform active:scale-90 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]">
              {isPlaying ? <Pause size={32} /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={handleNext} className="text-gray-400 hover:text-white hover:scale-110 transition-all"><SkipForward size={28} /></button>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {PORTFOLIO_DATA.music.map((m, idx) => (
              <div 
                key={m.id} 
                onClick={() => { setCurrentTrack(m); setIsPlaying(true); }} 
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 group/item ${
                  currentTrack.id === m.id 
                    ? 'bg-gradient-to-r from-pink-500/20 to-transparent text-pink-400 border border-pink-500/30 shadow-lg' 
                    : 'text-gray-400 hover:bg-white/5 hover:translate-x-2 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className={`text-[10px] font-mono italic ${currentTrack.id === m.id ? 'opacity-100 text-pink-300' : 'opacity-30'}`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-sm font-light ${currentTrack.id === m.id ? 'font-medium' : ''}`}>{m.title}</span>
                </div>
                {currentTrack.id === m.id && isPlaying && (
                  <div className="flex gap-[3px] items-end h-4 mr-2">
                    <div className="w-1 bg-pink-400 rounded-t-sm animate-[bounce_0.8s_infinite_0s]" style={{height:'40%'}} />
                    <div className="w-1 bg-pink-400 rounded-t-sm animate-[bounce_0.8s_infinite_0.2s]" style={{height:'100%'}} />
                    <div className="w-1 bg-pink-400 rounded-t-sm animate-[bounce_0.8s_infinite_0.4s]" style={{height:'60%'}} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-4">
        <p className="text-[10px] text-white/30 tracking-widest uppercase italic">{LEGAL_NOTICE}</p>
      </div>
    </div>
  );
};

// --- 短视频卡片组件 (独立管理翻页和播放状态) ---
const ShortsCard = ({ platformData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videos = platformData.videos;
  const currentVideo = videos[currentIndex];

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
    <div className="w-full max-w-[320px] mx-auto flex flex-col group/card perspective-1000">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase group-hover/card:text-orange-400 transition-colors">{platformData.platform}</span>
        <div className="flex gap-1 items-center">
          <span className="text-[8px] font-mono text-gray-500 mr-2">{currentIndex + 1} / {videos.length}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500/30" />
        </div>
      </div>

      <div 
        className="aspect-[9/16] bg-zinc-950 rounded-[2rem] border-[4px] border-zinc-800 overflow-hidden relative shadow-2xl transition-all duration-500 group-hover/card:-translate-y-2 group-hover/card:shadow-[0_20px_50px_rgba(249,115,22,0.15)] cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <video 
          key={currentVideo.url} // 强迫重新加载
          src={currentVideo.url} 
          className="w-full h-full object-cover transition-opacity duration-500"
          autoPlay={isPlaying}
          loop
          muted={false}
          playsInline
        />

        {/* 翻页控制区 (右侧边缘悬浮) */}
        {videos.length > 1 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 translate-x-4 group-hover/card:translate-x-0">
            <button onClick={handlePrev} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/60 hover:text-white hover:bg-black/80 hover:scale-110 transition-all shadow-lg border border-white/10">
              <ChevronUp size={18} />
            </button>
            <button onClick={handleNext} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white/60 hover:text-white hover:bg-black/80 hover:scale-110 transition-all shadow-lg border border-white/10">
              <ChevronDown size={18} />
            </button>
          </div>
        )}

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] transition-opacity">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover/card:scale-110 transition-transform">
              <Play className="text-white ml-1" size={32} fill="white" />
            </div>
          </div>
        )}
        
        <div className="absolute right-3 bottom-6 flex flex-col gap-6 items-center bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center group/icon hover:-translate-y-1 transition-transform">
            <Heart size={20} className="mb-1 text-white/80 group-hover/icon:text-red-500 transition-colors drop-shadow-md" />
            <span className="text-[10px] font-mono text-white/90">{currentVideo.likes}</span>
          </div>
          <div className="flex flex-col items-center group/icon hover:-translate-y-1 transition-transform">
            <MessageCircle size={20} className="mb-1 text-white/80 group-hover/icon:text-orange-400 transition-colors drop-shadow-md" />
            <span className="text-[10px] font-mono text-white/90">{currentVideo.plays}</span>
          </div>
          <div className="flex flex-col items-center group/icon hover:-translate-y-1 transition-transform">
            <Share2 size={20} className="mb-1 text-white/80 group-hover/icon:text-blue-400 transition-colors drop-shadow-md" />
            <span className="text-[10px] font-mono text-white/90">{currentVideo.shares}</span>
          </div>
        </div>
      </div>
      
      <p className="mt-5 text-center text-sm font-light text-gray-400 tracking-widest uppercase transition-colors group-hover/card:text-white">{currentVideo.title}</p>
    </div>
  );
}

const ShortsPage = () => {
  return (
    <div className="min-h-screen relative text-white pt-32 pb-20 flex flex-col items-center overflow-hidden bg-[#050505]">
      {/* 流媒体风格环境光背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[150px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
      </div>

      <div className="relative z-10 mb-16 text-center">
        <h2 className="text-lg tracking-widest text-orange-400 uppercase font-bold mb-4 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">国内流媒体平台作品</h2>
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

// --- 联系页面 (极简重构 & 复制功能) ---
const ContactPage = () => {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, label) => {
    // 兼容浏览器复制
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const contactItems = [
    { icon: Mail, label: 'Email', value: PORTFOLIO_DATA.contact.email },
    { icon: Phone, label: 'Phone', value: PORTFOLIO_DATA.contact.phone },
    { icon: Send, label: 'WeChat', value: PORTFOLIO_DATA.contact.wechat },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* 极简网格背景 */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center mt-[-10vh]">
        <h2 className="text-6xl md:text-8xl font-extralight tracking-tighter mb-20 italic text-white/90 drop-shadow-2xl hover:scale-105 transition-transform duration-700 select-none cursor-default">
          Let's <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Create.</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center w-full">
          {contactItems.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => handleCopy(item.value, item.label)}
              className="group relative flex flex-col items-center gap-4 cursor-pointer p-6 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 w-full md:w-auto"
            >
              <div className="w-16 h-16 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500 shadow-xl relative overflow-hidden">
                {copied === item.label ? <Check size={24} className="text-green-500" /> : <item.icon size={24} />}
                
                {/* 点击水波纹效果 */}
                {copied === item.label && (
                  <div className="absolute inset-0 bg-green-400/30 animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_1]" />
                )}
              </div>
              
              <div className="flex flex-col items-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 transition-colors group-hover:text-gray-300">{item.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm md:text-base font-light tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    {copied === item.label ? <span className="text-green-400 font-medium">COPIED!</span> : item.value}
                  </p>
                  {copied !== item.label && <Copy size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 主程序入口 ---
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&family=Playfair+Display:ital@1&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background: #000;
          font-family: 'Inter', sans-serif;
          color: white;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        @keyframes slideRight {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
      `}</style>
    </div>
  );
}