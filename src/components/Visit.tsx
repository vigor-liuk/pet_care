import {
  AddressCopyProvider,
  CopyAddressButton,
  AddressCopyStatus,
} from "./copy-address";
import { BookingButton } from "./booking";

const storeMapUrl = `https://uri.amap.com/search?keyword=${encodeURIComponent("上海市闵行区江川路街道沧源路595号")}&city=310000&view=map&src=pawpal`;

export function Visit() {
  return (
    <>
      <AddressCopyProvider>
        <section
          id="visit"
          className="wrap section visit"
          aria-labelledby="visitTitle"
        >
          <div>
            <div className="eyebrow">COME SAY HELLO</div>
            <h2 id="visitTitle">
              跟着小爪印，
              <br />
              来店里坐坐。
            </h2>
            <p className="visit-lead">
              我们在沧源路595号，等你和毛孩子来。
              <br />
              一份温柔的照顾，从见面开始。
            </p>
            <div className="visit-card">
              <h3 className="store-name">宠爱屋宠物猫舍犬舍宠物基地</h3>
              <div className="store-kicker">🐾 上海 · 闵行江川路街道</div>
              <div className="visit-row">
                <span>门店地址</span>
                <strong id="storeAddress">
                  上海市闵行区江川路街道沧源路595号
                </strong>
              </div>
              <div className="visit-row">
                <span>位置提示</span>
                <strong>沧源路与德宏路交叉口附近，可参照到店小地图。</strong>
              </div>
              <div className="visit-row">
                <span>营业时间</span>
                <strong>到店前请与门店确认</strong>
              </div>
              <div className="store-actions">
                <a
                  className="button"
                  href={storeMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  高德地图查看 <span aria-hidden="true">↗</span>
                </a>
                <CopyAddressButton />
              </div>
              <AddressCopyStatus />
              <BookingButton className="button outline">
                为毛孩子安排一次洗护 <span aria-hidden="true">↗</span>
              </BookingButton>
              <p className="sample-note">预约信息生成后，请发送给门店确认。</p>
            </div>
          </div>
          <figure className="store-map">
            <div className="map-heading">
              <strong>🐾 毛孩子的到店小地图</strong>
              <span>FIND US HERE</span>
            </div>
            <a
              className="illustrated-map-link"
              href={storeMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="在高德地图查看宠爱屋，沧源路595号"
            >
              <img
                className="illustrated-map-image"
                src="/assets/store-location-ai.png"
                width="1024"
                height="1024"
                loading="lazy"
                decoding="async"
                alt="宠爱屋宠物店的猫狗主题插画地图：沧源路和德宏路相交，门店在路口右下方，地址为上海市闵行区江川路街道沧源路595号。"
              />
            </a>
            <figcaption>
              AI 插画位置示意 · 非等比例地图。点击图片可在高德地图查看实际位置。
            </figcaption>
          </figure>
        </section>
      </AddressCopyProvider>
    </>
  );
}
