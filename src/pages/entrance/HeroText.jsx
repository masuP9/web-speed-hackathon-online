import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
const displayDurationInTotal = 3000;
const typingDurationInTotal = 800;

export function HeroText(props) {
  const timers = [];
  const heroTextJaList = ['あみぶろ', '阿弥ぶろ', 'アミブロ'];
  const [heroTextJa, setHeroTextJa] = useState(heroTextJaList[0]);

  useEffect(() => {
    if (document.getElementById('webFontStyleLink') === null) {
      const webFontStyleLink = document.createElement('link');
      webFontStyleLink.setAttribute('rel', 'stylesheet');
      webFontStyleLink.setAttribute(
        'href',
        `https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:700&display=swap&text=${heroTextJaList.join(
          '',
        )}`,
      );
      webFontStyleLink.setAttribute('id', 'webFontStyleLink');
      document.head.appendChild(webFontStyleLink);
    }

    const setText = () => {
      const text = heroTextJaList.shift();
      const length = text.length;
      const charInterval = typingDurationInTotal / length;

      setHeroTextJa('　'.repeat(length));

      for (let i = 1; i <= length; i++) {
        timers[i] = setTimeout(() => {
          setHeroTextJa(text.substring(0, i) + '　'.repeat(length - i));
        }, charInterval * i);
      }

      heroTextJaList.push(text);
    };
    setText();

    timers[0] = setInterval(() => setText(), displayDurationInTotal);

    return () => {
      clearInterval(timers[0]);
      timers.filter((_, i) => i !== 0).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <p className="Entrance__hero-text">
      <span className="Entrance__hero-text-en">Amida Blog:</span>
      <span className="Entrance__hero-text-ja">{heroTextJa}</span>
    </p>
  );
}
