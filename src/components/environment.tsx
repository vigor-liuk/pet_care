"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type TouchEvent,
} from "react";

const captions = [
  ["迎宾接待区", "弧形石材与温润木色，让等候也成为一段放松的时光。"],
  ["专业洗护区", "独立浴槽与有序收纳，把每一次洗护安排得从容、细致。"],
  ["美容护理区", "通透明亮的护理空间，为每一个可爱造型留出专注的时刻。"],
];
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export function Environment() {
  const [current, setCurrent] = useState(0);
  const [playOverride, setPlayOverride] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [timerVersion, setTimerVersion] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );
  const documentVisible = useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true,
  );
  const playing = playOverride ?? !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia(motionQuery);
    const resetPreference = () => setPlayOverride(null);
    media.addEventListener("change", resetPreference);
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0].isIntersecting),
      { threshold: 0.2 },
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", resetPreference);
    };
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused || !visible || !documentVisible) return;
    const timer = window.setInterval(
      () => setCurrent((value) => (value + 1) % captions.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [playing, hovered, focused, visible, documentVisible, timerVersion]);

  function show(index: number) {
    const next = (index + captions.length) % captions.length;
    setCurrent(next);
    setStatus(`第 ${next + 1} 张，共 3 张：${captions[next][0]}`);
    setTimerVersion((value) => value + 1);
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      show(current + (event.key === "ArrowRight" ? 1 : -1));
    }
  }
  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStart.current =
      event.touches.length === 1
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : null;
  }
  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (!touchStart.current || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy))
      show(current + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  }
  return (
    <section
      id="environment"
      className="wrap section environment"
      aria-labelledby="environmentTitle"
    >
      <div className="section-top">
        <div className="section-title">
          <div className="eyebrow">A SPACE TO FEEL AT HOME</div>
          <h2 id="environmentTitle">店内环境 · 把安心，留在每一处。</h2>
        </div>
        <p>
          温润的木色，柔和的光线。
          <br />
          从进门到护理，都有恰到好处的舒适。
        </p>
      </div>
      <div
        className="space-carousel"
        ref={rootRef}
        onKeyDown={onKeyDown}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onFocus={(event) => setFocused(event.target.matches(":focus-visible"))}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
        role="region"
        aria-roledescription="轮播图"
        aria-label="三个店内区域"
        tabIndex={0}
      >
        <div
          className="space-viewport"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={() => {
            touchStart.current = null;
          }}
        >
          <figure
            className={current === 0 ? "space-slide is-active" : "space-slide"}
            role="group"
            aria-roledescription="幻灯片"
            aria-label="第 1 张，共 3 张：迎宾接待区"
            aria-hidden={current !== 0}
          >
            <img
              src="/assets/reception.jpg"
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
              alt="高端宠物店迎宾接待区，弧形石材接待台、浅木色陈列柜与柔软休息座椅"
            />
          </figure>
          <figure
            className={current === 1 ? "space-slide is-active" : "space-slide"}
            role="group"
            aria-roledescription="幻灯片"
            aria-label="第 2 张，共 3 张：专业洗护区"
            aria-hidden={current !== 1}
          >
            <img
              src="/assets/bathing.jpg"
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
              alt="高端宠物店专业洗护区，独立宠物浴槽、整洁毛巾收纳与通透玻璃隔断"
            />
          </figure>
          <figure
            className={current === 2 ? "space-slide is-active" : "space-slide"}
            role="group"
            aria-roledescription="幻灯片"
            aria-label="第 3 张，共 3 张：美容护理区"
            aria-hidden={current !== 2}
          >
            <img
              src="/assets/grooming.jpg"
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
              alt="高端宠物店美容护理区，专业升降美容台、整齐工具收纳与明亮落地窗"
            />
          </figure>
          <span className="space-badge">PAWPAL · 空间美学</span>
          <button
            className="space-arrow prev"
            onClick={() => show(current - 1)}
            type="button"
            aria-label="上一张店内环境"
          >
            ←
          </button>
          <button
            className="space-arrow next"
            onClick={() => show(current + 1)}
            type="button"
            aria-label="下一张店内环境"
          >
            →
          </button>
        </div>
        <div className="space-footer">
          <div className="space-caption">
            <span className="space-number" aria-hidden="true">
              {String(current + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 id="spaceTitle">{captions[current][0]}</h3>
              <p id="spaceDescription">{captions[current][1]}</p>
            </div>
          </div>
          <div className="space-controls">
            <div className="space-dots" role="group" aria-label="选择环境图片">
              <button
                className="space-dot"
                aria-label="查看迎宾接待区"
                data-space="0"
                aria-current={current === 0}
                onClick={() => show(0)}
              ></button>
              <button
                className="space-dot"
                aria-label="查看专业洗护区"
                data-space="1"
                aria-current={current === 1}
                onClick={() => show(1)}
              ></button>
              <button
                className="space-dot"
                aria-label="查看美容护理区"
                data-space="2"
                aria-current={current === 2}
                onClick={() => show(2)}
              ></button>
            </div>
            <button
              className="space-pause"
              type="button"
              aria-label={playing ? "暂停自动轮播" : "开始自动轮播"}
              onClick={() => {
                setPlayOverride(!playing);
                // An explicit play request takes priority over retained focus.
                if (!playing) setFocused(false);
              }}
            >
              {playing ? "Ⅱ 暂停轮播" : "▷ 播放轮播"}
            </button>
          </div>
        </div>
        <div className="space-choices" role="group" aria-label="按区域浏览">
          <button
            className="space-choice"
            data-space="0"
            aria-current={current === 0}
            onClick={() => show(0)}
          >
            <img
              src="/assets/reception.jpg"
              width="78"
              height="52"
              loading="lazy"
              alt=""
            />
            <span>
              <strong>迎宾接待区</strong>
              <small>01 / RECEPTION</small>
            </span>
          </button>
          <button
            className="space-choice"
            data-space="1"
            aria-current={current === 1}
            onClick={() => show(1)}
          >
            <img
              src="/assets/bathing.jpg"
              width="78"
              height="52"
              loading="lazy"
              alt=""
            />
            <span>
              <strong>专业洗护区</strong>
              <small>02 / BATH & SPA</small>
            </span>
          </button>
          <button
            className="space-choice"
            data-space="2"
            aria-current={current === 2}
            onClick={() => show(2)}
          >
            <img
              src="/assets/grooming.jpg"
              width="78"
              height="52"
              loading="lazy"
              alt=""
            />
            <span>
              <strong>美容护理区</strong>
              <small>03 / GROOMING</small>
            </span>
          </button>
        </div>
        <p
          className="sr-only"
          id="spaceStatus"
          aria-live="polite"
          aria-atomic="true"
        >
          {status}
        </p>
      </div>
      <p className="space-note">
        AI 生成空间效果图 · 展现门店设计理念，非实际门店照片。
      </p>
    </section>
  );
}
