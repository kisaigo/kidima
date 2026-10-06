import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

// Valeurs alignées sur constants/theme.ts. Elles sont dupliquées ici car le document
// HTML est rendu hors du contexte React Native et ne peut pas consommer les tokens TypeScript.
const shellStyles = `
html, body {
  background-color: #F5F4ED;
  color: #183A31;
}
body {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
:focus-visible {
  outline: 2px solid #1B604B;
  outline-offset: 2px;
  border-radius: 8px;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#F5F4ED" />
        <title>Kidima</title>
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: shellStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
