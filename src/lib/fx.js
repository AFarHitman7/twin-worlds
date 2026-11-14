export const PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export function confettiBurst(n = 90, reduceMotion = false) {
  if (reduceMotion || typeof document === "undefined") return;
  const colors = ["#f4e3c2", "#cfe0f5", "#e8b07e", "#d6dce6", "#d9a45b", "#ffffff"];
  for (let i = 0; i < n; i++) {
    const p = document.createElement("span");
    const s = Math.random() * 9 + 4;
    p.style.cssText = `position:fixed;z-index:250;left:50%;top:42%;width:${s}px;height:${s * (Math.random() > 0.5 ? 1 : 0.4)}px;pointer-events:none;background:${colors[i % colors.length]};box-shadow:0 0 10px ${colors[i % colors.length]};`;
    document.body.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 380;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist - 120;
    p.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${dx}px, ${dy + 260}px) rotate(${Math.random() * 900 - 450}deg)`,
          opacity: 0,
        },
      ],
      { duration: 1200 + Math.random() * 900, easing: "cubic-bezier(0.23,1,0.32,1)" }
    ).onfinish = () => p.remove();
  }
}
