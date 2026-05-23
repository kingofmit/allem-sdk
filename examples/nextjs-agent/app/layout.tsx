import type { ReactNode } from "react";

export const metadata = {
  title: "Allem SDK — Agent Example",
  description: "Multi-step AI agent with tool calling, guardrails, and memory",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 800, margin: "0 auto", padding: 20 }}>
        {children}
      </body>
    </html>
  );
}
