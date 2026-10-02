"use client";

import { useEffect, useState } from "react";

/**
 * Media query segura para SSR: retorna `false` no servidor e se ajusta
 * logo depois da hidratação — evita diferença entre o HTML do servidor
 * e o do navegador.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** true em telas com mouse (onde o player flutuante faz sentido) */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
}
