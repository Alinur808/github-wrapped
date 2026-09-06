import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import { SLIDES } from "../slides";
import ProgressBar from "./ProgressBar";

export default function StoryViewer({ stats, archetype, onRestart }) {
  const [index, setIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const cardRef = useRef(null);

  const slide = SLIDES[index];

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, SLIDES.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const handleZoneClick = (event) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - left;
    if (clickX < width / 2) {
      goPrev();
    } else {
      goNext();
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsSaving(true);
    try {
      // skipFonts avoids html-to-image hanging/failing when it tries to re-fetch
      // cross-origin @font-face files (e.g. on a flaky connection or strict CORS).
      const exportPromise = toPng(cardRef.current, { pixelRatio: 2, skipFonts: true });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Image export timed out")), 8000)
      );
      const dataUrl = await Promise.race([exportPromise, timeoutPromise]);

      const link = document.createElement("a");
      link.download = `${stats.user.login}-github-wrapped.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Could not export image", error);
      window.alert("Couldn't generate the image — try again in a moment.");
    } finally {
      setIsSaving(false);
    }
  };

  const { Component } = slide;

  return (
    <div className="story" style={{ background: slide.gradient }}>
      <ProgressBar total={SLIDES.length} currentIndex={index} />

      <div className="story__click-zone" onClick={handleZoneClick}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="story__slide"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {slide.isFinal ? (
              <Component stats={stats} archetype={archetype} ref={cardRef} />
            ) : (
              <Component stats={stats} archetype={archetype} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {slide.isFinal && (
        <div className="story__actions" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="btn btn--primary" onClick={handleDownload} disabled={isSaving}>
            {isSaving ? "Saving..." : "Download my card 📸"}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onRestart}>
            Wrap someone else
          </button>
        </div>
      )}
    </div>
  );
}
