"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** caminho do arquivo em /public — ex: "/videos/projeto-01.mp4" */
  src: string;
  /** capa em /public — ex: "/posters/projeto-01.svg" */
  poster?: string;
  className?: string;
  /** reproduz sozinho (hero) — cuidado com performance */
  autoPlay?: boolean;
  loop?: boolean;
  /** texto gigante do placeholder enquanto o vídeo não está no ar */
  label?: string;
  sublabel?: string;
  tone?: "acid" | "ember" | "haze" | "bone";
  /** liga/desliga o play (usado no hover dos projetos) */
  playing?: boolean;
};

const TONES: Record<string, string> = {
  acid: "from-[#16210a] via-[#0a0a0d] to-[#050506]",
  ember: "from-[#2a1206] via-[#0a0a0d] to-[#050506]",
  haze: "from-[#100f2a] via-[#0a0a0d] to-[#050506]",
  bone: "from-[#1c1c1f] via-[#0a0a0d] to-[#050506]",
};

/**
 * Player com degradê de segurança: se o arquivo de vídeo ainda não estiver
 * em /public/videos, a camada de capa continua aparecendo com o visual limpo
 * — sem ícone quebrado, sem emoji, sem tela preta vazia.
 */
export default function VideoFrame({
  src,
  poster,
  className = "",
  autoPlay = false,
  loop = true,
  label,
  sublabel,
  tone = "bone",
  playing,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const shouldPlay = playing === undefined ? autoPlay : playing;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.play().catch(() => {
        /* navegador bloqueou autoplay até haver interação — a capa continua visível */
      });
    } else {
      video.pause();
      if (!autoPlay) video.currentTime = 0;
    }
  }, [shouldPlay, autoPlay]);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-ink-2 ${className}`}>
      {/* 1. fundo sempre presente */}
      <div className={`absolute inset-0 bg-gradient-to-br ${TONES[tone]}`} aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, #f2efe9 1px, transparent 1px), linear-gradient(to bottom, #f2efe9 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* 2. tipografia do placeholder */}
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8" aria-hidden>
          <span className="text-[10px] tracking-[0.42em] text-bone/45 uppercase">
            {sublabel ?? "vídeo do projeto"}
          </span>
          {label && (
            <span className="display stroke-text text-[13vw] leading-[0.8] sm:text-[7vw] lg:text-[5vw]">
              {label}
            </span>
          )}
        </div>
      )}

      {/* 3. capa (print do projeto) */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* 4. vídeo de verdade, por cima, aparecendo só quando estiver pronto */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop={loop}
        playsInline
        preload={autoPlay ? "metadata" : "none"}
        disablePictureInPicture
        onCanPlay={() => setReady(true)}
        onLoadedData={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 5. vinheta cinematográfica */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_35%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden
      />
    </div>
  );
}
