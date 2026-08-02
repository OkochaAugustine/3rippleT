import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

export function useTypewriter({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  loop = true,
}: UseTypewriterOptions) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (text.length < currentPhrase.length) {
          setText(currentPhrase.slice(0, text.length + 1));
        } else {
          // Finished typing, pause
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(currentPhrase.slice(0, text.length - 1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          if (loop) {
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration, loop, isPaused]);

  return text;
}
