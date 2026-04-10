import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX,
  Heart, MessageCircle, 
  Mail, Video, Music as MusicIcon, 
  LayoutGrid, Send, User, Phone, Check
} from 'lucide-react';

// ==========================================
// --- 数据配置区 ---
// ==========================================
const PORTFOLIO_DATA = {
  author: "PEEL",
  backgroundImage: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop", 
  contact: {
    email: "1679646067@qq.com", 
    wechat: "sfmsongfm",            
    phone: "+86 14775909812", 
  },
  videos: [
    { id: 1, title: "星球大战混剪", url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/166.MP4", thumbnail: "https://github.com/1679646067-droid/-/blob/main/IMG_0986.JPG?raw=true" },
    { id: 2, title: "AI Rebirth", url: "https://www.w3schools.com/html/movie.mp4", thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000" }
  ],
  music: [
    { id: 1, title: "toxic", artist: "PEEL", cover: "https://github.com/1679646067-droid/-/blob/main/IMG_0986.JPG?raw=true", url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/TOXIC.mp3" },
    { id: 2, title: "天若有情", artist: "PEEL", cover: "https://github.com/1679646067-droid/peel/blob/main/生成写实赛博小姐.jpg?raw=true", url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/天若有情（网页）.mp3" },
    { id: 3, title: "模特", artist: "PEEL", cover: "https://github.com/1679646067-droid/peel/blob/main/07F7DDB9-6DC7-4473-941D-D59C0604F27E.jpg?raw=true", url: "https://github.com/1679646067-droid/-/raw/refs/heads/main/模特（网页）.mp3" },
    { id: 4, title: "别问很可怕", artist: "PEEL", cover: "https://github.com/1679646067-droid/peel/blob/main/754542BB-61C6-45EB-A988-C483B485A901.jpg?raw=true", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/别问很可怕（网页上传版）.mp3" },
  ],
  shorts: [
    { id: 101, platform: "抖音", likes: "116.0w", shares: "2.7w", title: "体育类VLOG", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/扣篮.mp4" },
    { id: 102, platform: "抖音", likes: "42.1w", shares: "4374", title: "体育类剧情", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/剧情.mp4" },
    { id: 201, platform: "小红书", likes: "3.5k", shares: "776", title: "出海营销案例", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/小红书%202.MP4" },
    { id: 202, platform: "小红书", likes: "24k", shares: "86", title: "toc产品介绍视频", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/小蜜蜂慕斯卡托.mp4" },
    { id: 301, platform: "视频号", likes: "-", shares: "-", title: "MG动画展示商业案例", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/录音笔.mp4" },
    { id: 302, platform: "视频号", likes: "-", shares: "-", title: "实录活动VLOG", url: "https://github.com/1679646067-droid/peel/raw/refs/heads/main/北京晚宴.mp4" }
  ]
};

const LEGAL_NOTICE = "本影片、音乐、特效全采用AI 技术生成，擅自盗用作者视频，将会采取法律途径维权";

// --- 动画进入组件 【已修复：增加 className 参数接收并渲染】 ---
const FadeInSection = ({ children, delay = "0ms", className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

// --- 丝滑光标组件 ---
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let requestRef;
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      requestRef = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${clientX - 20}px, ${clientY - 20}px, 0)`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${clientX - 3}px, ${clientY - 3}px, 0)`;
        }
      });
    };

    const handleMouseOver = (e) => {
      const isSelectable = e.target.closest('button') || e.target.closest('a') || e.target.tagName === 'VIDEO';
      setIsHovering(!!isSelectable);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] rounded-full border border-cyan-400/50 mix-blend-screen transition-all duration-300 ease-out hidden md:block ${isHovering ? 'scale-[2] border-pink-500 bg-pink-500/10' : 'scale-100'}`} 
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full mix-blend-screen pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_#fff]" 
      />
    </>
  );
};

// --- 导航栏 ---
const Navbar = ({ activeSection }) => {
  const tabs = [
    { id: 'video', label: '影片', icon: Video },
    { id: 'music', label: '音乐', icon: MusicIcon },
    { id: 'shorts', label: '流媒体', icon: LayoutGrid },
    { id: 'contact', label: '联系', icon: User },
  ];
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 md:px-8 md:py-4 rounded-full bg-black/50 backdrop-blur-3xl border border-white/10 flex items-center gap-3 md:gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' })}
          className={`flex items-center gap-2 transition-all px-4 py-2.5 md:px-6 md:py-3 rounded-full whitespace-nowrap active:scale-95 ${activeSection === tab.id ? 'text-pink-400 bg-pink-500/15 shadow-[inset_0_0_20px_rgba(236,72,153,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <tab.icon size={16} className="shrink-0" />
          <span className="text-[11px] md:text-xs tracking-[0.2em] font-bold uppercase">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

// --- 影片展示区 ---
const VideoSection = () => {
  const [currentVideo, setCurrentVideo] = useState(PORTFOLIO_DATA.videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);

  const handleVideoChange = (v) => {
    if (v.id === currentVideo.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentVideo(v);
      setIsTransitioning(false);
      setIsPlaying(true);
    }, 400);
  };

  useEffect(() => {
    if (videoRef.current) isPlaying ? videoRef.current.play().catch(()=>setIsPlaying(false)) : videoRef.current.pause();
  }, [isPlaying, currentVideo]);

  return (
    <section id="video" className="min-h-screen pt-40 pb-32 px-4 md:px-12 flex flex-col items-center relative z-10">
      <FadeInSection className="w-full flex justify-center">
        <h1 className="text-6xl md:text-[7rem] font-light italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 mb-16 text-center uppercase drop-shadow-2xl">
          PEEL 创意工坊
        </h1>
      </FadeInSection>

      {/* 这里的布局逻辑现在会完美生效：大屏下分成 12 列，视频占据 9 列，列表占据 3 列 */}
      <div className="max-w-[1800px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <FadeInSection delay="200ms" className="lg:col-span-9 w-full">
          <div className={`w-full aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-black relative group shadow-[0_30px_80px_rgba(0,0,0,0.8)] transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-[0.98] blur-sm' : 'opacity-100 scale-100 blur-none'}`}>
            <video ref={videoRef} key={currentVideo.url} src={currentVideo.url} className="w-full h-full object-cover" muted={isMuted} loop playsInline />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
              {!isPlaying && <Play size={100} strokeWidth={1} fill="white" className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.6)] animate-in zoom-in duration-300" />}
            </div>
            <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="absolute bottom-8 right-8 p-4 md:p-5 bg-black/40 hover:bg-black/70 rounded-full text-white backdrop-blur-xl border border-white/10 transition-all active:scale-90 z-20">
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
        </FadeInSection>

        <FadeInSection delay="400ms" className="lg:col-span-3 w-full">
          <div className="flex flex-col gap-5 h-full pt-4">
            <p className="text-xs md:text-sm tracking-[0.4em] font-bold text-orange-400 mb-4 uppercase opacity-80 border-b border-white/10 pb-4">
              AIGC作品还在创作中 敬请期待｜目前展示影视混剪
            </p>
            {PORTFOLIO_DATA.videos.map(v => (
              <button 
                key={v.id} 
                onClick={() => handleVideoChange(v)}
                className={`flex items-center gap-5 p-4 md:p-5 rounded-3xl border transition-all duration-500 w-full ${currentVideo.id === v.id ? 'bg-gradient-to-r from-pink-900/20 to-black border-pink-500/40 shadow-[0_10px_30px_rgba(236,72,153,0.15)] md:translate-x-2' : 'bg-black/20 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
              >
                <div className="w-24 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg"><img src={v.thumbnail} className="w-full h-full object-cover" /></div>
                <div className="flex flex-col items-start gap-1 overflow-hidden">
                  <span className={`text-sm font-bold uppercase truncate w-full text-left tracking-wider ${currentVideo.id === v.id ? 'text-pink-400' : 'text-gray-300'}`}>{v.title}</span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{currentVideo.id === v.id ? 'NOW PLAYING' : 'CLICK TO VIEW'}</span>
                </div>
              </button>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

// --- 音乐展示区 ---
const MusicSection = () => {
  const [currentTrack, setCurrentTrack] = useState(PORTFOLIO_DATA.music[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef(null);

  const handleTrackChange = (m) => {
    if (m.id === currentTrack.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTrack(m);
      setIsTransitioning(false);
      setIsPlaying(true);
    }, 400);
  };

  useEffect(() => {
    if (audioRef.current) isPlaying ? audioRef.current.play().catch(() => setIsPlaying(false)) : audioRef.current.pause();
  }, [isPlaying, currentTrack]);

  return (
    <section id="music" className="min-h-screen py-40 px-4 md:px-12 flex flex-col items-center relative overflow-hidden">
      <audio ref={audioRef} src={currentTrack.url} onEnded={() => setIsPlaying(false)} />
      
      <FadeInSection className="w-full flex justify-center">
        <h2 className="text-5xl md:text-[6rem] font-light italic tracking-tight text-white/95 mb-24 text-center uppercase drop-shadow-2xl">AI 音乐制作</h2>
      </FadeInSection>

      <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-24 items-center relative z-10">
        
        <div className={`lg:col-span-5 flex flex-col items-center text-center transition-all duration-700 w-full ${isTransitioning ? 'opacity-0 scale-[0.95]' : 'opacity-100 scale-100'}`}>
          <div className={`w-72 h-72 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-4 border-white/5 shadow-[0_0_100px_rgba(236,72,153,0.15)] transition-all duration-1000 ${isPlaying ? 'scale-105 shadow-cyan-500/20 rotate-slow' : 'scale-100 rotate-0 grayscale-[20%]'}`}>
            <img src={currentTrack.cover} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-zinc-900 rounded-full border-4 border-black/50 shadow-inner flex items-center justify-center">
              <div className="w-5 h-5 bg-black rounded-full" />
            </div>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-light italic mt-16 text-white uppercase tracking-widest">{currentTrack.title}</h3>
          <p className="text-cyan-400 text-xs md:text-sm tracking-[0.8em] font-bold mt-4 uppercase">{currentTrack.artist}</p>
          
          <div className="flex justify-center mt-12">
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-[0_15px_30px_rgba(255,255,255,0.2)]">
              {isPlaying ? <Pause size={36} /> : <Play size={36} fill="black" className="ml-2" />}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 bg-black/30 backdrop-blur-3xl p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] w-full">
          <p className="text-xs md:text-sm tracking-[0.4em] font-bold text-cyan-400 mb-10 uppercase border-b border-white/10 pb-6">Tracklist</p>
          <div className="space-y-4">
            {PORTFOLIO_DATA.music.map((m, idx) => (
              <div 
                key={m.id} 
                onClick={() => handleTrackChange(m)}
                className={`group flex items-center justify-between p-6 md:p-8 rounded-3xl cursor-pointer transition-all duration-500 w-full ${currentTrack.id === m.id ? 'bg-gradient-to-r from-cyan-900/20 to-black border border-cyan-500/30 shadow-2xl scale-[1.02]' : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10'}`}
              >
                <div className="flex items-center gap-8 md:gap-12">
                  <span className={`text-2xl md:text-3xl font-light italic transition-opacity ${currentTrack.id === m.id ? 'opacity-80 text-cyan-400' : 'opacity-20 text-white'}`}>0{idx + 1}</span>
                  <span className={`text-lg md:text-xl font-bold uppercase tracking-[0.2em] ${currentTrack.id === m.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{m.title}</span>
                </div>
                {currentTrack.id === m.id && isPlaying ? (
                  <div className="flex gap-1.5 h-8 items-end shrink-0">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 bg-cyan-400 rounded-t-sm animate-pulse" style={{ height: `${Math.random()*24 + 8}px`, animationDelay: `${i*0.15}s` }} />)}
                  </div>
                ) : (
                  <MusicIcon size={24} className={`shrink-0 transition-opacity ${currentTrack.id === m.id ? 'opacity-50 text-cyan-400' : 'opacity-0 group-hover:opacity-20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 流媒体展示区 ---
const ShortsCard = ({ v, platform }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="w-full max-w-[450px] mx-auto mb-40 last:mb-0">
      <div className="flex justify-between items-end mb-6 px-4">
        <span className="text-xs md:text-sm tracking-[0.5em] font-black text-orange-400 uppercase">{platform}</span>
        <span className="text-[10px] md:text-xs font-light italic opacity-50 uppercase tracking-widest">{v.title}</span>
      </div>
      
      <div 
        className="aspect-[9/16] bg-zinc-900/60 rounded-[3.5rem] border-[6px] border-white/5 overflow-hidden relative shadow-[0_40px_100px_-15px_rgba(0,0,0,1)] cursor-pointer group hover:border-white/15 transition-all duration-700 hover:-translate-y-4" 
        onClick={() => { 
          setIsPlaying(!isPlaying); 
          if(videoRef.current) isPlaying ? videoRef.current.pause() : videoRef.current.play();
        }}
      >
        <video ref={videoRef} src={v.url} className="w-full h-full object-cover" loop playsInline />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all duration-500">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform">
              <Play size={40} strokeWidth={1} fill="white" className="text-white ml-2" />
            </div>
          </div>
        )}
        <div className="absolute right-8 bottom-20 flex flex-col gap-8 text-white bg-black/30 p-6 rounded-full backdrop-blur-2xl border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center gap-1.5 group-hover:scale-110 transition-transform"><Heart size={26} className={v.likes !== '-' ? 'text-pink-500' : 'text-white'} fill={v.likes !== '-' ? 'currentColor' : 'none'} /><span className="text-[11px] font-black">{v.likes}</span></div>
          <div className="flex flex-col items-center gap-1.5 group-hover:scale-110 transition-transform"><MessageCircle size={26} /><span className="text-[11px] font-black">{v.shares}</span></div>
        </div>
      </div>
    </div>
  );
};

// --- 联系页按钮 ---
const ContactButton = ({ icon: Icon, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error(err); }
    document.body.removeChild(textArea);
  };

  return (
    <button 
      onClick={handleCopy} 
      className={`px-12 py-8 bg-black/30 rounded-[2.5rem] border border-white/10 flex flex-col items-center gap-6 transition-all duration-500 group active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden ${copied ? 'border-green-500/50 bg-green-500/10' : 'hover:bg-white hover:text-black hover:scale-[1.03]'}`}
    >
      <div className={`w-20 h-20 rounded-full flex items-center justify-center border transition-all duration-500 ${copied ? 'bg-green-500 border-transparent text-white' : 'bg-white/5 border-white/20 group-hover:bg-black group-hover:text-white'}`}>
        {copied ? <Check size={32} /> : <Icon size={32} strokeWidth={1.5} />}
      </div>
      <span className={`text-base font-black tracking-widest uppercase ${copied ? 'text-green-500' : ''}`}>
        {copied ? "COPIED" : value}
      </span>
    </button>
  );
};

// --- 主页面 ---
export default function App() {
  const [activeSection, setActiveSection] = useState('video');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['video', 'music', 'shorts', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const backgroundY = scrollY * 0.15;

  return (
    <div className="text-white font-sans selection:bg-pink-500/30 selection:text-white relative min-h-screen overflow-x-hidden bg-black">
      
      {/* 视差滚动底层 */}
      <div 
        className="fixed inset-[-10%] z-0 bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform" 
        style={{ 
          backgroundImage: `url(${PORTFOLIO_DATA.backgroundImage})`,
          transform: `translate3d(0, ${-backgroundY}px, 0) scale(1.15)`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black" />
        
        {/* 巨型氛围光晕 */}
        <div className="absolute top-[10%] left-[-20%] w-[60%] h-[60%] bg-pink-600/10 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-20%] w-[60%] h-[60%] bg-cyan-600/10 rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <CustomCursor />
      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <VideoSection />
        
        {/* 增加板块间的分割留白 */}
        <div className="h-24 w-full" />
        
        <MusicSection />

        <div className="h-24 w-full" />

        <section id="shorts" className="py-40 px-6 flex flex-col items-center">
          <FadeInSection>
            <div className="text-center mb-40">
              <h2 className="text-5xl md:text-[6rem] font-light italic tracking-tight uppercase mb-6 text-white/95 drop-shadow-xl">流媒体作品</h2>
              <p className="text-cyan-400/80 text-sm tracking-[0.6em] font-bold uppercase opacity-80">Vertical Content Gallery</p>
            </div>
          </FadeInSection>
          
          <div className="flex flex-col w-full max-w-4xl">
            {PORTFOLIO_DATA.shorts.map((s, idx) => (
              <FadeInSection key={s.id} delay={`${idx * 100}ms`}>
                <ShortsCard v={s} platform={s.platform} />
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="contact" className="min-h-screen py-40 flex flex-col items-center justify-center px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none" />
          
          <FadeInSection className="relative z-10 w-full max-w-[1400px]">
            <div className="text-center space-y-12">
              <h2 className="text-[5rem] md:text-[10rem] font-light italic uppercase tracking-tighter leading-none opacity-95 drop-shadow-2xl">
                LET'S <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">CREATE.</span>
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-24 justify-center items-stretch">
                <ContactButton icon={Mail} value={PORTFOLIO_DATA.contact.email} />
                <ContactButton icon={Phone} value={PORTFOLIO_DATA.contact.phone} />
                <ContactButton icon={Send} value={PORTFOLIO_DATA.contact.wechat} />
              </div>
            </div>
          </FadeInSection>
          <div className="absolute bottom-12 opacity-20 text-xs tracking-[0.5em] text-center w-full px-4 font-bold uppercase relative z-10 mt-32">{LEGAL_NOTICE}</div>
        </section>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #000; 
          scroll-behavior: smooth;
        }
        
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        *::-webkit-scrollbar {
          display: none !important;
        }

        section {
          scroll-margin-top: 120px;
        }

        .rotate-slow {
          animation: rotate 25s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-in {
          animation: animate-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes animate-in {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.15); }
        }
        .animate-pulse {
          animation: pulse 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}