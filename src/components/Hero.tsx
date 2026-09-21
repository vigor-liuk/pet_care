import { BookingButton } from "./booking";

export function Hero() {
  return (
    <>
      <section className="wrap hero">
        <div>
          <div className="eyebrow">GENTLE CARE, HAPPY PAWS</div>
          <h1>
            给毛孩子，
            <br />
            刚刚好的<em>宠爱。</em>
          </h1>
          <p className="intro">
            洗去小小烦恼，抱回一身蓬松。
            <br />
            用温柔的双手与专业的护理，
            <br />
            让每一次洗护，都成为被好好宠爱的时刻。
          </p>
          <div className="hero-actions">
            <BookingButton className="button">
              预约一份宠爱 <span>↗</span>
            </BookingButton>
            <a className="button outline" href="#services">
              看看洗护服务 <span>↓</span>
            </a>
          </div>
          <div className="little-note">
            <span className="paw">♡</span>
            <span>慢一点，温柔一点，让毛孩子安心一点。</span>
          </div>
        </div>
        <div className="hero-photo">
          <div className="photo-outline"></div>
          <div className="photo-frame">
            <img
              id="heroImage"
              src="/assets/hero.jpg"
              alt="一只温柔的金毛犬，期待被好好照顾"
              width="550"
              height="500"
              fetchPriority="high"
            />
          </div>
          <div className="photo-stamp">
            <span>HAPPY PETS</span>
            <b>♡</b>
            <span>HAPPY DAYS</span>
          </div>
          <div className="photo-label">
            <span className="heart">♡</span>
            <div>
              <strong>干干净净，快快乐乐。</strong>
              <small>FRESH LOOK. HAPPY LITTLE SOUL.</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
