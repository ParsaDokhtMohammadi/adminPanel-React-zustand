import { useEffect } from "react";
import React from "react";

const AnimatedBorder = ({children}:{children:React.ReactNode}) => {
    useEffect(() => {
        const card = document.getElementById("card");
        if (!card) return;
        const handleMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        };
        card.addEventListener("mousemove", handleMove);
        return () => card.removeEventListener("mousemove", handleMove);
    }, []);
    return (
        <div
        id="card"
        className={`
          relative w-[300px] h-[300px] rounded-2xl overflow-hidden
          before:content-[''] before:absolute before:inset-0 before:rounded-2xl
          before:p-[6px] before:bg-[radial-gradient(200px_at_var(--x)_var(--y),#b778f0,transparent)]
          before:mask-composite-exclude before:webkit-mask-composite-xor
          before:opacity-0 hover:before:opacity-100
          before:transition-opacity before:duration-500
        `}
      >
        <div className="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center text-white">
          {children}
        </div>
      </div>
    )
}

export default AnimatedBorder