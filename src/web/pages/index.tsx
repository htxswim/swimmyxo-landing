import { Suspense, lazy, useState } from "react";
import BlinkingEyes from "../components/BlinkingEyes";
import FontSelector from "../components/FontSelector";

const HeroScene = lazy(() => import("../components/three/HeroScene"));

const SOCIAL_LINKS = [
  {
    name: "YOUTUBE",
    handle: "@swimmyruleseverything",
    url: "https://www.youtube.com/@swimmyruleseverything",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    primary: true,
  },
  {
    name: "SOUNDCLOUD",
    handle: "htxswim",
    url: "https://soundcloud.com/htxswim",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.099-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.206-1.308-.206-1.332c-.014-.057-.047-.094-.104-.094m1.8-.7c-.065 0-.111.05-.118.117l-.213 2.009.213 1.96c.007.066.053.117.118.117s.111-.05.118-.117l.248-1.96-.248-2.009c-.007-.066-.053-.117-.118-.117m.899-.181c-.073 0-.127.058-.134.125l-.193 2.19.193 2.109c.008.073.061.125.134.125.072 0 .125-.052.133-.125l.221-2.109-.221-2.19c-.008-.073-.061-.125-.133-.125m.9-.239c-.08 0-.14.063-.147.139l-.175 2.429.175 2.176c.008.08.067.139.147.139.079 0 .14-.063.147-.139l.201-2.176-.201-2.429c-.008-.076-.068-.139-.147-.139m.899-.17c-.088 0-.154.07-.16.152l-.158 2.599.158 2.218c.006.088.072.152.16.152.087 0 .154-.064.16-.152l.181-2.218-.181-2.599c-.006-.082-.073-.152-.16-.152m.9-.099c-.095 0-.168.078-.174.166l-.14 2.698.14 2.249c.006.094.079.166.174.166.094 0 .168-.072.174-.166l.16-2.249-.16-2.698c-.006-.088-.08-.166-.174-.166m.899-.044c-.103 0-.184.085-.188.181l-.122 2.742.122 2.267c.004.101.085.181.188.181s.184-.08.188-.181l.14-2.267-.14-2.742c-.004-.096-.085-.181-.188-.181m.9.01c-.11 0-.197.092-.201.195l-.105 2.732.105 2.277c.004.108.091.195.201.195.109 0 .197-.087.201-.195l.119-2.277-.119-2.732c-.004-.103-.092-.195-.201-.195m.967-.154c-.02-.003-.038-.003-.058-.003-.11 0-.201.09-.209.2l-.098 2.886.098 2.29c.008.115.099.2.209.2.02 0 .038 0 .058-.004.098-.017.172-.1.176-.196l.112-2.29-.112-2.886c-.004-.1-.078-.184-.176-.197m.86-.149c-.124 0-.221.103-.225.219l-.08 2.935.08 2.305c.004.12.101.219.225.219.123 0 .22-.099.225-.219l.092-2.305-.092-2.935c-.005-.116-.102-.219-.225-.219m5.955.867c-.28 0-.548.047-.8.131-.165-1.836-1.731-3.268-3.648-3.268-.396 0-.781.067-1.14.187-.134.045-.17.092-.172.182v6.423c.002.094.076.174.17.183h5.59c1.118 0 2.025-.916 2.025-2.046s-.907-2.046-2.025-2.046" />
      </svg>
    ),
  },
  {
    name: "INSTAGRAM",
    handle: "@htxswim",
    url: "https://www.instagram.com/htxswim",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: "APPLE MUSIC",
    handle: "htxswim",
    url: "https://music.apple.com/us/artist/htxswim/1643619252",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0 0 19.7.247a10.39 10.39 0 0 0-1.74-.164C17.08.037 16.198.012 15.32.009 14.442.005 13.564.001 12.686 0h-1.37c-.88.001-1.757.005-2.636.009-.877.003-1.759.028-2.64.074a10.39 10.39 0 0 0-1.74.164 5.022 5.022 0 0 0-1.874.645C1.308 1.621.563 2.621.246 3.931a9.23 9.23 0 0 0-.24 2.19c-.029.88-.04 1.76-.04 2.64V15.24c0 .88.011 1.76.04 2.64.022.735.1 1.465.24 2.19.317 1.31 1.062 2.31 2.18 3.043a5.022 5.022 0 0 0 1.874.645c.575.11 1.158.156 1.74.164.88.047 1.762.072 2.64.074.877.004 1.756.008 2.636.009h1.37c.878-.001 1.756-.005 2.634-.009.878-.002 1.76-.027 2.64-.074a10.39 10.39 0 0 0 1.74-.164 5.022 5.022 0 0 0 1.874-.645c1.118-.733 1.863-1.733 2.18-3.043.14-.725.218-1.455.24-2.19.029-.88.04-1.76.04-2.64V8.76c0-.88-.011-1.76-.04-2.64l.002.004zM16.94 17.627a.58.58 0 0 1-.013.164c-.14.617-.53.918-1.124.918a1.8 1.8 0 0 1-.45-.06c-.496-.139-.907-.396-1.19-.847a2.07 2.07 0 0 1-.282-1.05c-.016-.44.087-.862.36-1.21.38-.487.917-.638 1.5-.537.29.05.555.176.773.392a.58.58 0 0 0 .013-.163V9.834a.487.487 0 0 0-.377-.488l-4.8-1.117a.487.487 0 0 0-.597.475v7.085a.58.58 0 0 1-.013.164c-.14.617-.53.918-1.124.918a1.8 1.8 0 0 1-.45-.06c-.496-.139-.907-.396-1.19-.847a2.07 2.07 0 0 1-.282-1.05c-.016-.44.087-.862.36-1.21.38-.487.917-.638 1.5-.537.29.05.555.176.773.392a.58.58 0 0 0 .013-.163V6.816a.974.974 0 0 1 .754-.976l5.3-1.233a.487.487 0 0 1 .597.475v12.545h-.052z" />
      </svg>
    ),
  },
];

const UPCOMING_RELEASES = [
  {
    title: "VILE",
    date: "May 1, 2026",
    description: "Single",
  },
];

function Index() {
  const [fontFamily, setFontFamily] = useState("'Grenze Gotisch', serif");

  return (
    <div className="noise-bg min-h-screen bg-black text-white overflow-hidden relative">
      {/* Scanline effect */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-[2px] bg-red-500"
          style={{ animation: "scanline 4s linear infinite" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* 3D Background */}
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        {/* Blinking Eyes Layer */}
        <BlinkingEyes />

        {/* Font Selector */}
        <FontSelector onFontChange={setFontFamily} />

        {/* Red gradient overlay at edges */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          {/* Artist name */}
          <h1
            className="animate-fade-in-up delay-100 leading-[1.1] tracking-[0.04em] uppercase"
            style={{
              fontFamily,
              fontSize: "clamp(2.8rem, 10vw, 9rem)",
              fontWeight: 900,
              textShadow: `
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000,
                -2px 0 0 #000,
                2px 0 0 #000,
                0 -2px 0 #000,
                0 2px 0 #000,
                -2px -2px 0 #000,
                2px -2px 0 #000,
                -2px 2px 0 #000,
                2px 2px 0 #000,
                0 0 40px rgba(139,0,0,0.6),
                0 0 80px rgba(139,0,0,0.2)
              `,
            }}
          >
            <span className="text-white">htx</span>
            <span
              style={{
                color: "#8b0000",
              }}
            >swim</span>
          </h1>

          {/* Tagline */}
          <p
            className="animate-fade-in-up delay-200 mt-3 tracking-[0.3em] text-white/40 uppercase"
            style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(0.55rem, 1.5vw, 0.85rem)" }}
          >
            swimmyxo
          </p>

          {/* Subscribe CTA */}
          <div className="animate-fade-in-up delay-300 mt-10">
            <a
              href="https://www.youtube.com/@swimmyruleseverything"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-mono text-sm tracking-widest uppercase transition-all duration-300 animate-pulse-red"
              style={{
                backgroundColor: "#8b0000",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a00000")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#8b0000")}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              SUBSCRIBE
              <span className="absolute inset-0 border border-red-900/50 rounded-2xl group-hover:border-red-700/80 transition-colors" />
            </a>
          </div>

          {/* Japanese quote */}
          <div className="animate-fade-in-up delay-400 mt-16 max-w-xl mx-auto">
            <p className="text-sm md:text-base leading-relaxed text-white/60 font-mono">
              二度と水面が見えなくても、最も暗い海を泳ぐ
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="animate-fade-in delay-500 mt-16">
            <div className="flex flex-col items-center gap-2 text-white/20">
              <span className="text-[10px] tracking-[0.4em] font-mono uppercase">
                Connect
              </span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-red-600/50 to-transparent animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="relative z-10 px-4 py-20 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-2xl md:text-3xl tracking-[0.15em] uppercase mb-8 text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="text-red-600">ABOUT</span>
          </h2>
          <div className="space-y-4 text-sm md:text-base leading-relaxed text-white/70 font-mono">
            <p>
              Florida-born, Houston-raised artist and content creator whose presence spans both music production and YouTube gameplay. As <span className="text-white/90">swimmyxo</span> on YouTube, htxswim has built a dedicated community through high-energy gameplay videos, collaborations, and behind-the-scenes content that connects with fans on multiple levels.
            </p>
            <p>
              His sound moves fluidly between hip-hop, rap, rock, and dark pop. Captivated by the idea of "swimming through our darkest seas," the music balances raw vulnerability with unyielding resilience. Known for swirling synth textures, haunting vocal delivery, and introspective lyricism, htxswim explores themes of loss, love, spiritual transformation, and the hidden struggles behind everyday life.
            </p>
            <p>
              On YouTube, he creates engaging gameplay content that showcases his personality beyond the studio—a space where fans can connect with the person behind the music. His channel serves as a bridge between his artistic vision and his community, offering streams, gaming highlights, and exclusive glimpses into his creative process.
            </p>
            <p>
              Since emerging online, he has released dozens of tracks while growing his YouTube presence, building a dedicated following across multiple platforms. Recent singles like <span className="text-white/90">mylord</span> and <span className="text-white/90">confessions/sinner</span> highlight his journey on following Jesus and learning to lead others down the same path even if he feels he himself is not worthy of the task.
            </p>
            <p>
              YouTube serves as the gateway—a community-building space where audiences connect with htxswim as a person, naturally leading them to discover the music waiting on all streaming platforms.
            </p>
            <p>
              With a distinctive red-and-black visual aesthetic and a motto that embodies perseverance—<span className="text-white/90 italic">"Even if the water's surface can no longer be seen, swim in the darkest sea"</span>—htxswim invites fans into a sonic and visual world where melancholy meets momentum. Forthcoming projects promise even deeper dives into genre-bending production, storytelling, gameplay content, and the emotional landscapes that define his work.
            </p>
          </div>
        </div>
      </section>

      {/* Releases Section */}
      <section className="relative z-10 px-4 py-20 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-2xl md:text-3xl tracking-[0.15em] uppercase mb-8 text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="text-red-600">UPCOMING</span> MUSIC
          </h2>
          <div className="space-y-3">
            {UPCOMING_RELEASES.map((release, i) => (
              <div
                key={i}
                className="animate-fade-in-up p-4 md:p-5 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300"
                style={{ animationDelay: `${(i + 8) * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold tracking-[0.15em] uppercase text-white">
                      {release.title}
                    </h3>
                    <p className="text-xs md:text-sm font-mono text-white/50 mt-2">
                      {release.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm md:text-base font-mono text-red-500/80 tracking-widest uppercase">
                      {release.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs md:text-sm font-mono text-white/40 text-center">
            Check back for new releases and updates
          </p>
        </div>
      </section>

      {/* Links Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-2xl mx-auto space-y-3">
          {SOCIAL_LINKS.map((link, i) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`animate-fade-in-up group flex items-center gap-4 p-4 md:p-5 border transition-all duration-300 hover:translate-x-1 ${
                link.primary
                  ? "border-red-600/40 bg-red-600/5 hover:bg-red-600/10 hover:border-red-500/60"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12]"
              }`}
              style={{ animationDelay: `${(i + 12) * 0.1}s` }}
            >
              <div
                className={`flex-shrink-0 ${
                  link.primary ? "text-red-500" : "text-white/40 group-hover:text-white/70"
                } transition-colors`}
              >
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-lg md:text-xl tracking-[0.15em] uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {link.name}
                </div>
                <div className="text-xs font-mono text-white/30 truncate">
                  {link.handle}
                </div>
              </div>
              <svg
                className={`w-4 h-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                  link.primary ? "text-red-500" : "text-white/20 group-hover:text-white/50"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Bottom branding */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-[1px] bg-red-600/30" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">
              htxswim &copy; 2026
            </span>
            <div className="w-8 h-[1px] bg-red-600/30" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
