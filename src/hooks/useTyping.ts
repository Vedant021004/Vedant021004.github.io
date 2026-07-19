import { useState, useEffect } from 'react';

export const useTyping = (words: string[], speed = 80, pause = 1800) => {
  const [text, setText] = useState(words[0]);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    if (!deleting && subIndex === current.length) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [words, index, subIndex, deleting, speed, pause]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [index, subIndex, words]);

  return text;
};
