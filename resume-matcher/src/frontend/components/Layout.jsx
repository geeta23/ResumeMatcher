// frontend/components/Layout.jsx
import WaveBackground from "./WaveBackground";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Subtle blue waves behind everything */}
      <WaveBackground />

      {/* Content on top */}
      <div className="relative z-10 flex-1">{children}</div>
    </div>
  );
}
