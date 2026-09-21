import { BookingButton } from "./booking";

export function Services() {
  return (
    <>
      <section id="services" className="wrap section">
        <div className="section-top">
          <div className="section-title">
            <div className="eyebrow">OUR SERVICES</div>
            <h2>从干净，到闪闪惹人爱。</h2>
          </div>
          <p>不同的小可爱，都有适合自己的宠爱方式。</p>
        </div>
        <div className="services">
          <article className="service">
            <div className="service-icon">
              <svg viewBox="0 0 28 28">
                <path d="M3 14h22l-2 8H6Zm4 8v3m14-3v3M7 14V6a3 3 0 0 1 6 0v2m-3 0h6" />
                <circle cx="20" cy="7" r="2" />
              </svg>
            </div>
            <h3>香香基础洗护</h3>
            <span className="en">BATH & FLUFF</span>
            <p>
              把撒欢的痕迹洗掉，
              <br />
              留下干净、柔软的好心情。
            </p>
            <ul>
              <li>温和沐浴 · 深层清洁</li>
              <li>吹干梳毛 · 蓬松整理</li>
              <li>指甲修剪 · 耳部清洁</li>
            </ul>
            <div className="price-row">
              <span className="price">
                <sup>¥</sup>89<small>起 / 次</small>
              </span>
              <BookingButton
                className="service-button"
                service="香香基础洗护"
                aria-label="预约香香基础洗护"
              >
                ↗
              </BookingButton>
            </div>
          </article>
          <article className="service">
            <span className="tag">人气推荐</span>
            <div className="service-icon">
              <svg viewBox="0 0 28 28">
                <circle cx="7" cy="8" r="4" />
                <circle cx="7" cy="21" r="4" />
                <path d="m10 11 14 13M10 18 24 4m-9 10h1" />
              </svg>
            </div>
            <h3>精致造型美容</h3>
            <span className="en">GROOM & STYLE</span>
            <p>
              保留它的可爱个性，
              <br />
              换一个让你忍不住抱抱的新造型。
            </p>
            <ul>
              <li>包含全部基础洗护</li>
              <li>根据体型与毛质设计造型</li>
              <li>全身精修 · 面部细节修剪</li>
            </ul>
            <div className="price-row">
              <span className="price">
                <sup>¥</sup>169<small>起 / 次</small>
              </span>
              <BookingButton
                className="service-button"
                service="精致造型美容"
                aria-label="预约精致造型美容"
              >
                ↗
              </BookingButton>
            </div>
          </article>
          <article className="service">
            <div className="service-icon">
              <svg viewBox="0 0 28 28">
                <path d="M14 24S3 17 4 8c6-1 10 6 10 6S17 7 24 8c1 9-10 16-10 16Z" />
                <path d="M14 17s-7-7 0-14c7 7 0 14 0 14Z" />
              </svg>
            </div>
            <h3>舒适 SPA 护理</h3>
            <span className="en">RELAX & RECHARGE</span>
            <p>
              给忙着可爱的它，
              <br />
              一段慢下来、放松一下的时光。
            </p>
            <ul>
              <li>包含全部基础洗护</li>
              <li>温水泡浴 · 轻柔按摩</li>
              <li>滋养护毛 · 柔顺梳理</li>
            </ul>
            <div className="price-row">
              <span className="price">
                <sup>¥</sup>199<small>起 / 次</small>
              </span>
              <BookingButton
                className="service-button"
                service="舒适 SPA 护理"
                aria-label="预约舒适 SPA 护理"
              >
                ↗
              </BookingButton>
            </div>
          </article>
        </div>
        <p className="price-note">
          以上为示例起价，实际费用根据宠物体型、毛量及护理需求，服务前确认。
        </p>
      </section>
    </>
  );
}
