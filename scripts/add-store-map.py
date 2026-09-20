from pathlib import Path
from urllib.parse import quote

root = Path(__file__).resolve().parents[1]
page = root / 'index.html'
html = page.read_text(encoding='utf-8')
address = '上海市闵行区江川路街道沧源路595号'
map_url = 'https://map.baidu.com/search/' + quote(address)
css = '''
/* Store location */
.visit{grid-template-columns:minmax(0,.85fr) minmax(0,1.3fr);gap:48px;align-items:start}
.visit .visit-lead{margin:0 0 25px;line-height:1.9}
.store-kicker{display:inline-flex;align-items:center;gap:7px;background:var(--sage);border-radius:30px;padding:5px 13px;font-size:12px;color:#667254;margin-top:4px}
.visit .visit-card{padding:22px 25px}.visit-row{gap:14px}.visit-row strong{flex:1;min-width:0}.visit-row span{flex-shrink:0}
.store-name{font-size:19px;margin:0 0 10px;line-height:1.6;font-weight:600}
.store-actions{display:flex;gap:10px;margin-top:15px}.visit-card .store-actions .button{margin:0;width:auto;flex:1;padding:11px 10px;gap:8px}
.address-copy-status{font-size:12px!important;margin:8px 0 0;min-height:21px}
.store-map{margin:0;border:1px solid #e0dfcf;border-radius:22px;background:#f0f1e6;overflow:hidden;position:relative}
.map-heading{display:flex;justify-content:space-between;align-items:center;padding:20px 24px 0;gap:10px}
.map-heading strong{font-size:16px;font-weight:500}.map-heading span{font-size:10px;letter-spacing:2px;color:#788267}
.store-map svg{display:block;width:100%;height:auto;font-family:Arial,'Microsoft YaHei',sans-serif}
.store-map figcaption{padding:14px 22px;background:#fffdf8;border-top:1px solid #e0dfcf;font-size:11px;color:#7c8270;line-height:1.8}
.map-location:hover .map-pin{fill:#c65f36}.map-location:focus-visible{outline:none}.map-location:focus-visible .pin-ring{stroke:#333a2e;stroke-width:4}
@media(max-width:900px){.visit{gap:25px;grid-template-columns:1fr 1.15fr}.visit .visit-card{padding:18px}.store-actions{flex-wrap:wrap}.map-heading{padding:18px 18px 0}}
@media(max-width:650px){.visit{grid-template-columns:1fr;gap:25px}.store-map{border-radius:16px}.map-heading strong{font-size:14px}.map-heading span{font-size:9px}.visit .visit-card{padding:22px}.store-map figcaption{padding:12px 18px}}
'''
section = f'''<section id="visit" class="wrap section visit" aria-labelledby="visitTitle">
  <div>
    <div class="eyebrow">COME SAY HELLO</div>
    <h2 id="visitTitle">跟着小爪印，<br>来店里坐坐。</h2>
    <p class="visit-lead">我们在沧源路595号，等你和毛孩子来。<br>一份温柔的照顾，从见面开始。</p>
    <div class="visit-card">
      <h3 class="store-name">宠爱屋宠物猫舍犬舍宠物基地</h3>
      <div class="store-kicker">🐾 上海 · 闵行江川路街道</div>
      <div class="visit-row"><span>门店地址</span><strong id="storeAddress">{address}</strong></div>
      <div class="visit-row"><span>位置提示</span><strong>沧源路与德宏路交叉口附近，位置见右侧示意图。</strong></div>
      <div class="visit-row"><span>营业时间</span><strong>到店前请与门店确认</strong></div>
      <div class="store-actions"><a class="button" href="{map_url}" target="_blank" rel="noopener noreferrer">百度地图查看 <span aria-hidden="true">↗</span></a><button class="button outline" id="copyAddress" type="button">复制地址</button></div>
      <p id="addressCopyStatus" class="address-copy-status" role="status" aria-live="polite"></p>
      <button class="button outline" data-book>为毛孩子安排一次洗护 <span aria-hidden="true">↗</span></button>
      <p class="sample-note">预约信息生成后，请发送给门店确认。</p>
    </div>
  </div>
  <figure class="store-map">
    <div class="map-heading"><strong>🐾 毛孩子的到店小地图</strong><span>FIND US HERE</span></div>
    <svg viewBox="0 0 620 570" role="img" aria-labelledby="mapTitle mapDesc">
      <title id="mapTitle">宠爱屋门店位置示意图</title>
      <desc id="mapDesc">按提供的地图截图绘制。门店位于沧源路与德宏路交叉口的右下方，地址为{address}。京浦花园和金榜五期在上方，当代上海万国府MOMA在左下方。本图不按比例绘制。</desc>
      <defs><pattern id="mapDots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#d9deca"/></pattern></defs>
      <rect width="620" height="570" fill="url(#mapDots)"/>
      <g fill="#e3e8d7" stroke="#d6ddc8" stroke-width="2">
        <rect x="27" y="34" width="134" height="122" rx="24" transform="rotate(-18 94 95)"/>
        <rect x="226" y="36" width="143" height="119" rx="24" transform="rotate(-18 297 95)"/>
        <rect x="403" y="49" width="175" height="136" rx="24" transform="rotate(-18 490 117)"/>
        <rect x="23" y="365" width="183" height="154" rx="24" transform="rotate(-18 114 442)"/>
        <rect x="391" y="374" width="180" height="146" rx="24" transform="rotate(-18 481 447)"/>
      </g>
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M155 -30 L257 254 Q265 278 281 319 L374 599 M-30 370 L650 124" stroke="#d0d9bc" stroke-width="54"/>
        <path d="M155 -30 L257 254 Q265 278 281 319 L374 599 M-30 370 L650 124" stroke="#fffdf8" stroke-width="40"/>
        <path d="M155 -30 L257 254 Q265 278 281 319 L374 599 M-30 370 L650 124" stroke="#d9d8c9" stroke-width="2" stroke-dasharray="7 10"/>
        <path d="M10 194 L601 0 M4 555 L635 326" stroke="#fffdf8" stroke-width="12"/>
      </g>
      <g font-size="19" fill="#747e64" text-anchor="middle" font-weight="600">
        <text x="205" y="151" transform="rotate(70 205 151)">沧 源 路</text>
        <text x="120" y="318" transform="rotate(-20 120 318)">德 宏 路</text>
        <text x="345" y="485" transform="rotate(70 345 485)">沧 源 路</text>
      </g>
      <g fill="#fffdf8" stroke="#d8ddcc" stroke-width="1.5">
        <rect x="233" y="63" width="124" height="43" rx="14"/>
        <rect x="424" y="108" width="122" height="43" rx="14"/>
        <rect x="21" y="211" width="149" height="43" rx="14"/>
        <rect x="41" y="422" width="163" height="67" rx="16"/>
      </g>
      <g fill="#7c856d" font-size="17" text-anchor="middle">
        <text x="295" y="91">京浦花园</text><text x="485" y="136">金榜五期</text>
        <text x="95" y="239">上海益居宾馆</text>
        <text x="122" y="449">当代上海</text><text x="122" y="474" font-size="15">万国府 MOMA</text>
      </g>
      <a class="map-location" href="{map_url}" target="_blank" rel="noopener noreferrer" aria-label="在百度地图查看宠爱屋，沧源路595号">
        <ellipse cx="325" cy="317" rx="30" ry="10" fill="#d5b99c" opacity=".45"/>
        <circle class="pin-ring" cx="325" cy="269" r="48" fill="#f9dec9" stroke="#fffdf8" stroke-width="3"/>
        <path class="map-pin" d="M325 317 C314 301 288 289 288 265 A37 37 0 1 1 362 265 C362 289 336 301 325 317Z" fill="#df754c"/>
        <text x="325" y="280" text-anchor="middle" font-size="35" fill="white">🐾</text>
        <rect x="351" y="225" width="188" height="47" rx="18" fill="#fffdf8" stroke="#df754c" stroke-width="1.5"/>
        <text x="445" y="255" text-anchor="middle" font-size="19" fill="#bf603b" font-weight="700">我们在这里！</text>
        <rect x="305" y="333" width="279" height="85" rx="18" fill="#fffdf8" stroke="#e6c6af" stroke-width="1.5"/>
        <text x="444" y="361" text-anchor="middle" font-size="19" fill="#424a38" font-weight="600">宠爱屋</text>
        <text x="444" y="384" text-anchor="middle" font-size="13" fill="#6d755f">宠物猫舍犬舍宠物基地</text>
        <text x="444" y="405" text-anchor="middle" font-size="14" fill="#bf603b">沧源路 595 号</text>
      </a>
      <text x="518" y="482" font-size="31" transform="rotate(-20 518 482)" opacity=".5">🐾</text>
      <text x="470" y="531" font-size="25" transform="rotate(-20 470 531)" opacity=".3">🐾</text>
    </svg>
    <figcaption>根据门店位置绘制的周边示意图，非等比例地图。点击门店标记或“百度地图查看”获取实际位置。</figcaption>
  </figure>
</section>'''
start = html.index('<section id="visit"')
end = html.index('</section>', start) + len('</section>')
html = html[:start] + section + html[end:]
html = html.replace('</style>', css + '\n</style>', 1)
js = '''
document.querySelector('#copyAddress').addEventListener('click',async()=>{
  const address=document.querySelector('#storeAddress'),status=document.querySelector('#addressCopyStatus');
  try{await navigator.clipboard.writeText(address.textContent);status.textContent='地址已复制，出发前记得带好牵引绳或航空箱。';}
  catch{const range=document.createRange();range.selectNodeContents(address);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='已选中地址，请长按或使用 Ctrl/Cmd+C 复制。';}
});
'''
html = html.replace('</script>', js + '\n</script>')
html = html.replace('位置见右侧示意图。', '可参照到店小地图。')
page.write_text(html, encoding='utf-8')
(root / 'dist' / 'index.html').write_text(html, encoding='utf-8')
print('Store map and address added to source and static output.')
