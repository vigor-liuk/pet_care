"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  { name: "布丁的妈妈", pet: "比熊 · 造型美容", icon: "🐶", title: "不只是变漂亮，也被温柔对待。", text: "布丁第一次来有点紧张，美容师没有着急开始，而是先陪它熟悉环境。接回家时毛茸茸、香喷喷的，小圆脸剪得刚刚好，是我想要的自然可爱！", tag: "耐心安抚 · 细致造型" },
  { name: "奶茶的爸爸", pet: "英短 · 基础洗护", icon: "🐱", title: "把怕水的小家伙交给你们，很安心。", text: "奶茶平时不太配合洗澡，这次工作人员一直轻声安抚，也会根据它的状态放慢节奏。洗完毛发很蓬松，耳朵和指甲也照顾到了，细节让人放心。", tag: "温和洗护 · 用心照顾" },
  { name: "豆包的姐姐", pet: "柯基 · SPA 护理", icon: "🐕", title: "每次来，都像见到了老朋友。", text: "喜欢这里干净又放松的氛围，护理前会仔细沟通需求，结束后也会分享日常梳毛的小建议。豆包回家后软乎乎的，连抱抱都舍不得松手。", tag: "舒适体验 · 贴心沟通" },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const playing = !paused && !reducedMotion;
  useEffect(() => {
    if (!playing || hovered || focused || !visible || !pageVisible) return;
    const timer = window.setTimeout(() => setCurrent((value) => (value + 1) % reviews.length), 6000);
    return () => window.clearTimeout(timer);
  }, [current, playing, hovered, focused, visible, pageVisible]);

  function show(index: number) {
    setCurrent((index + reviews.length) % reviews.length);
  }

  return (
    <section id="testimonials" className="testimonials section" aria-labelledby="testimonials-title">
      <div className="wrap">
        <div className="section-top">
          <div className="section-title">
            <div className="eyebrow">HAPPY PETS, HAPPY PEOPLE</div>
            <h2 id="testimonials-title">被信任的每一次，都放在心上。</h2>
          </div>
          <p>来自毛孩子家长的小小心声。</p>
        </div>
        <div ref={root} className="review-carousel" role="region" aria-roledescription="轮播" aria-label="客户评价" tabIndex={0}
          onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}
          onFocus={(event) => setFocused(event.target.matches(":focus-visible"))} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              show(current + (event.key === "ArrowRight" ? 1 : -1));
            }
          }}>
          <div className="review-viewport"
            onTouchStart={(event) => { touch.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; }}
            onTouchCancel={() => { touch.current = null; }}
            onTouchEnd={(event) => {
              if (touch.current && event.changedTouches.length) {
                const dx = event.changedTouches[0].clientX - touch.current.x;
                const dy = event.changedTouches[0].clientY - touch.current.y;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
              }
              touch.current = null;
            }}>
            {reviews.map((review, index) => (
              <article key={review.name} className={`review-card${current === index ? " is-active" : ""}`} aria-hidden={current !== index} role="group" aria-roledescription="幻灯片" aria-label={`第 ${index + 1} 条，共 ${reviews.length} 条评价`}>
                <div className="review-person">
                  <span className="review-avatar" aria-hidden="true">{review.icon}</span>
                  <strong>{review.name}</strong>
                  <span>{review.pet}</span>
                  <span className="review-tag">{review.tag}</span>
                </div>
                <div className="review-story">
                  <span className="review-quote" aria-hidden="true">“</span>
                  <div className="review-stars" aria-label="5 星评价">★★★★★</div>
                  <h3>{review.title}</h3>
                  <blockquote>{review.text}</blockquote>
                  <span className="review-signoff">一份宠爱，一份安心。 <span aria-hidden="true">♡</span></span>
                </div>
              </article>
            ))}
          </div>
          <div className="review-controls">
            <span className="review-count" aria-live={playing && !focused ? "off" : "polite"}>0{current + 1} <span>/ 0{reviews.length}</span></span>
            <div className="review-dots">
              {reviews.map((review, index) => <button type="button" key={review.name} className="review-dot" aria-label={`查看第 ${index + 1} 条评价`} aria-current={current === index ? "true" : undefined} onClick={() => show(index)} />)}
            </div>
            <div className="review-buttons">
              {!reducedMotion && <button type="button" className="review-pause" onClick={() => {
                setPaused(!paused);
                // An explicit play request takes priority over retained focus.
                if (paused) setFocused(false);
              }} aria-label={paused ? "播放客户评价" : "暂停客户评价"}>{paused ? "播放" : "暂停"}</button>}
              <button type="button" className="review-arrow" aria-label="上一条评价" onClick={() => show(current - 1)}>←</button>
              <button type="button" className="review-arrow" aria-label="下一条评价" onClick={() => show(current + 1)}>→</button>
            </div>
          </div>
        </div>
        <p className="review-note">以上为示例评价，仅作展示，待替换为获授权的真实客户反馈。</p>
      </div>
    </section>
  );
}
