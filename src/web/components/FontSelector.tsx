import { useState } from "react";

const FONT_OPTIONS = [
  {
    name: "Cinzel Decorative",
    family: "'Cinzel Decorative', serif",
    selected: true,
  },
  {
    name: "Grenze Gotisch",
    family: "'Grenze Gotisch', serif",
    selected: false,
  },
  {
    name: "Playfair Display",
    family: "'Playfair Display', serif",
    selected: false,
  },
  {
    name: "Abril Fatface",
    family: "'Abril Fatface', serif",
    selected: false,
  },
];

interface FontSelectorProps {
  onFontChange: (fontFamily: string) => void;
}

export default function FontSelector({ onFontChange }: FontSelectorProps) {
  const [activeFont, setActiveFont] = useState(1); // Grenze Gotisch by default
  const [isOpen, setIsOpen] = useState(false);

  const handleFontChange = (index: number) => {
    setActiveFont(index);
    onFontChange(FONT_OPTIONS[index].family);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-auto px-4 py-2 bg-black/80 border border-red-600/40 text-white text-xs font-mono tracking-widest uppercase hover:border-red-600/60 transition-all"
      >
        {isOpen ? "HIDE" : "FONTS"}
      </button>

      {/* Font Options Panel */}
      {isOpen && (
        <div className="flex flex-col gap-2 bg-black/80 p-4 border border-red-600/40 rounded">
          <p className="text-xs text-white/50 font-mono tracking-widest uppercase mb-2">
            Choose Font
          </p>
          {FONT_OPTIONS.map((font, i) => (
            <button
              key={i}
              onClick={() => handleFontChange(i)}
              className={`px-3 py-2 text-sm tracking-widest uppercase transition-all ${
                activeFont === i
                  ? "bg-red-600/40 border border-red-600 text-white"
                  : "border border-white/20 text-white/60 hover:text-white/80"
              }`}
            >
              {font.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
