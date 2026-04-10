import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX,
  Heart, MessageCircle, 
  Mail, Video, Music as MusicIcon, 
  LayoutGrid, Send, User, Phone, Check
} from 'lucide-react';

// ==========================================
// --- 数据配置区 (在此修改背景和内容) ---
// ==========================================
const PORTFOLIO_DATA = {
  author: "PEEL",
  
  // 背景图：数字艺术空间
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

// --- 动画进入组件 ---
const FadeInSection = ({ children, delay = "0ms" }) => {
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
      className={`transition-all duration-[1000ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
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
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] rounded-full border border-orange-400/50 mix-blend-screen transition-all duration-150 ease-out hidden md:block ${isHovering ? 'scale-150 border-pink-500 bg-pink-500/10' : 'scale-100'}`} 
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full mix-blend-screen pointer-events-none z-[9999] hidden md:block" 
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
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 md:px-6 md:py-3 rounded-full bg-black/40 backdrop-blur-3xl border border-white/5 flex items-center gap-2 md:gap-4 shadow-2xl">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' })}
          className={`flex items-center gap-2 transition-all px-3 py-2 md:px-5 md:py-2.5 rounded-full whitespace-nowrap ${activeSection === tab.id ? 'text-pink-400 bg-pink-500/10' : 'text-gray-400 hover:text-white'}`}
        >
          <tab.icon size={14} className="shrink-0" />
          <span className="text-[10px] md:text-[11px] tracking-widest font-bold uppercase">{tab.label}</span>
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
    }, 300);
  };

  useEffect(() => {
    if (videoRef.current) isPlaying ? videoRef.current.play().catch(()=>setIsPlaying(false)) : videoRef.current.pause();
  }, [isPlaying, currentVideo]);

  return (
    <section id="video" className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center relative z-10">
      <FadeInSection>
        <h1 className="text-5xl md:text-8xl font-light italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400/80 to-pink-600/80 mb-12 text-center uppercase px-4">
          PEEL 创意工坊
        </h1>
      </FadeInSection>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        <FadeInSection delay="200ms">
          <div className={`lg:col-span-3 aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-black relative group shadow-2xl transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            <video ref={videoRef} key={currentVideo.url} src={currentVideo.url} className="w-full h-full object-cover" muted={isMuted} loop playsInline />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-all cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
              {!isPlaying && <Play size={64} strokeWidth={1} fill="white" className="text-white drop-shadow-2xl animate-in zoom-in duration-300" />}
            </div>
            <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="absolute bottom-6 right-6 p-3 bg-black/40 rounded-full text-white backdrop-blur-md border border-white/10">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </FadeInSection>

        {/* --- 这里是你要修改的“精选作品”文案位置 --- */}
        <FadeInSection delay="400ms">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] tracking-[0.3em] font-bold text-orange-400 mb-2 uppercase opacity-60">
              AIGC作品还在创作中 敬请期待 / 目前展示影视混剪作品
            </p>
            {PORTFOLIO_DATA.videos.map(v => (
              <button 
                key={v.id} 
                onClick={() => handleVideoChange(v)}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${currentVideo.id === v.id ? 'bg-pink-900/10 border-pink-500/30 scale-105' : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20'}`}
              >
                <div className="w-16 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10"><img src={v.thumbnail} className="w-full h-full object-cover" /></div>
                <span className={`text-[11px] font-bold uppercase truncate ${currentVideo.id === v.id ? 'text-pink-400' : 'text-gray-400'}`}>{v.title}</span>
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
    }, 300);
  };

  useEffect(() => {
    if (audioRef.current) isPlaying ? audioRef.current.play().catch(() => setIsPlaying(false)) : audioRef.current.pause();
  }, [isPlaying, currentTrack]);

  return (
    <section id="music" className="min-h-screen py-32 px-4 flex flex-col items-center border-t border-white/5 relative overflow-hidden">
      <audio ref={audioRef} src={currentTrack.url} onEnded={() => setIsPlaying(false)} />
      
      <FadeInSection>
        <h2 className="text-4xl md:text-6xl font-light italic tracking-tight text-white/90 mb-20 text-center uppercase">AI 音乐制作</h2>
      </FadeInSection>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className={`flex flex-col items-center text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}>
          <div className={`w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-700 ${isPlaying ? 'scale-105 shadow-pink-500/10' : 'scale-100 rotate-0'}`}>
            <img src={currentTrack.cover} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-3xl font-light italic mt-10 text-white uppercase tracking-wider">{currentTrack.title}</h3>
          <p className="text-cyan-400/80 text-[10px] tracking-[0.5em] font-bold mt-2 uppercase">{currentTrack.artist}</p>
          
          <div className="flex justify-center gap-10 mt-12">
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-20 h-20 rounded-full bg-white/90 text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl">
              {isPlaying ? <Pause size={32} /> : <Play size={32} fill="black" className="ml-1" />}
            </button>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/5">
          <div className="space-y-3">
            {PORTFOLIO_DATA.music.map((m, idx) => (
              <div 
                key={m.id} 
                onClick={() => handleTrackChange(m)}
                className={`flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 ${currentTrack.id === m.id ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'hover:bg-white/5 border border-transparent opacity-60 hover:opacity-100'}`}
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm font-light italic opacity-30">0{idx + 1}</span>
                  <span className="text-[12px] font-bold uppercase tracking-widest">{m.title}</span>
                </div>
                {currentTrack.id === m.id && isPlaying && (
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-1 bg-pink-400 animate-pulse" style={{ height: `${Math.random()*12 + 4}px`, animationDelay: `${i*0.1}s` }} />)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 流媒体竖版展示卡片 ---
const ShortsCard = ({ v, platform }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="w-full max-w-[400px] mx-auto mb-24 last:mb-0">
      <div className="flex justify-between items-end mb-4 px-2">
        <span className="text-[10px] tracking-[0.4em] font-black text-orange-400 uppercase">{platform}</span>
        <span className="text-[10px] font-light italic opacity-40 uppercase">{v.title}</span>
      </div>
      <div 
        className="aspect-[9/16] bg-zinc-900/50 rounded-[3rem] border-[4px] border-white/5 overflow-hidden relative shadow-2xl cursor-pointer group" 
        onClick={() => { 
          setIsPlaying(!isPlaying); 
          if(videoRef.current) isPlaying ? videoRef.current.pause() : videoRef.current.play();
        }}
      >
        <video ref={videoRef} src={v.url} className="w-full h-full object-cover" loop playsInline />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all">
            <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
              <Play size={32} strokeWidth={1} fill="white" className="text-white ml-1" />
            </div>
          </div>
        )}
        <div className="absolute right-6 bottom-16 flex flex-col gap-6 text-white bg-black/20 p-5 rounded-full backdrop-blur-xl border border-white/5">
          <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform"><Heart size={20} className={v.likes !== '-' ? 'text-pink-500' : 'text-white'} fill={v.likes !== '-' ? 'currentColor' : 'none'} /><span className="text-[10px] font-black">{v.likes}</span></div>
          <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform"><MessageCircle size={20} /><span className="text-[10px] font-black">{v.shares}</span></div>
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
      className={`px-10 py-6 bg-black/20 rounded-3xl border border-white/10 flex items-center gap-5 transition-all duration-500 group active:scale-95 shadow-2xl relative ${copied ? 'border-green-500/50 bg-green-500/5' : 'hover:bg-white hover:text-black hover:scale-105'}`}
    >
      {copied ? <Check size={20} className="text-green-500" /> : <Icon size={20} />}
      <span className={`text-[13px] font-black tracking-widest uppercase ${copied ? 'text-green-500' : ''}`}>
        {copied ? "已复制" : value}
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
      
      <div 
        className="fixed inset-[-10%] z-0 bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform" 
        style={{ 
          backgroundImage: `url(${PORTFOLIO_DATA.backgroundImage})`,
          transform: `translate3d(0, ${-backgroundY}px, 0) scale(1.1)`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black" />
        
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-pink-500/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <CustomCursor />
      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <VideoSection />
        <MusicSection />

        <section id="shorts" className="py-32 px-6 flex flex-col items-center border-t border-white/5">
          <FadeInSection>
            <div className="text-center mb-32">
              <h2 className="text-4xl md:text-7xl font-light italic tracking-tight uppercase mb-4 text-white/90">流媒体作品展示</h2>
              <p className="text-cyan-400/70 text-xs tracking-[0.5em] font-bold uppercase opacity-60">Vertical Content Gallery</p>
            </div>
          </FadeInSection>
          
          <div className="flex flex-col w-full max-w-2xl">
            {PORTFOLIO_DATA.shorts.map((s, idx) => (
              <FadeInSection key={s.id} delay={`${idx * 100}ms`}>
                <ShortsCard v={s} platform={s.platform} />
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="contact" className="min-h-screen py-32 flex flex-col items-center justify-center px-6 border-t border-white/5 relative">
          <FadeInSection>
            <div className="text-center space-y-6">
              <h2 className="text-7xl md:text-9xl font-light italic uppercase tracking-tighter leading-none opacity-90">LET'S <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500/80 to-orange-500/80">CREATE.</span></h2>
              <div className="flex flex-col md:flex-row gap-6 mt-16 justify-center">
                <ContactButton icon={Mail} value={PORTFOLIO_DATA.contact.email} />
                <ContactButton icon={Phone} value={PORTFOLIO_DATA.contact.phone} />
                <ContactButton icon={Send} value={PORTFOLIO_DATA.contact.wechat} />
              </div>
            </div>
          </FadeInSection>
          <div className="absolute bottom-10 opacity-20 text-[10px] tracking-[0.5em] text-center w-full px-4 font-bold uppercase">{LEGAL_NOTICE}</div>
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
          scroll-margin-top: 100px;
        }

        .animate-in {
          animation: animate-in 0.5s ease-out forwards;
        }

        @keyframes animate-in {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }
        .animate-pulse {
          animation: pulse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}