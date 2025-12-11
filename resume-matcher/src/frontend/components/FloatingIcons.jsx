import { useMemo } from "react";

function floatingIcons(){
// Icons we want to show
  const icons = ["📄","📑","📝","💼","📊","📈","🔍","📚","💡"];

  // Generate 20 random floating icons ONCE
  const floatingIcons = useMemo(() => {
    return Array.from({ length: 20 }).map(() => {
      const icon = icons[Math.floor(Math.random() * icons.length)];
      const left = Math.random() * 90 + "%";
      const size = Math.random() * 25 + 30; // 30px - 55px
      const delay = Math.random() * 10 + "s";
      const duration = Math.random() * 10 + 12 + "s"; // 12s - 22s speed

      return { icon, left, size, delay, duration };
    });
  }, []);

  return (
    <>
              {/* Professional clean gradient background */}
      <div className="colorful-bg"></div>

      {/* Randomized floating icons */}
      <div className="hr-bg">
        {floatingIcons.map((it, i) => (
          <span
            key={i}
            style={{
              left: it.left,
              fontSize: it.size + "px",
              animationDelay: it.delay,
              animationDuration: it.duration
            }}
          >
            {it.icon}
          </span>
        ))}
      </div>
    </>
  );
}

export default floatingIcons;