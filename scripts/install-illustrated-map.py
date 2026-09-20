"""Install the approved AI-generated location illustration without modifying its pixels."""
from pathlib import Path
import re
import shutil
import sys
from urllib.parse import quote

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]).resolve()
if not source.is_file():
    raise SystemExit('Generated image was not found.')
asset = Path('assets') / ('store-location-ai' + source.suffix.lower())
for directory in [root, root / 'dist']:
    target = directory / asset
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)

page = root / 'index.html'
html = page.read_text(encoding='utf-8')
url = 'https://map.baidu.com/search/' + quote('上海市闵行区江川路街道沧源路595号')
image = f'''<a class="illustrated-map-link" href="{url}" target="_blank" rel="noopener noreferrer" aria-label="在百度地图查看宠爱屋，沧源路595号">
      <img class="illustrated-map-image" src="{asset.as_posix()}" width="1024" height="1024" loading="lazy" decoding="async" alt="宠爱屋宠物店的猫狗主题插画地图：沧源路和德宏路相交，门店在路口右下方，地址为上海市闵行区江川路街道沧源路595号。">
    </a>'''
html, count = re.subn(r'    <svg viewBox="0 0 620 570"[\s\S]*?</svg>', image, html, count=1)
if count != 1:
    raise SystemExit('Expected original map was not found; page was not changed.')
html = re.sub(r'\.store-map svg\{[^}]+\}', '.illustrated-map-link{display:block;margin-top:16px}.illustrated-map-image{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:contain}.illustrated-map-link:focus-visible{outline-offset:-4px}', html)
html = re.sub(r'\.map-location[^\n]+\n', '', html)
html = html.replace('根据门店位置绘制的周边示意图，非等比例地图。点击门店标记或“百度地图查看”获取实际位置。', 'AI 插画位置示意 · 非等比例地图。点击图片可在百度地图查看实际位置。')
page.write_text(html, encoding='utf-8')
(root / 'dist' / 'index.html').write_text(html, encoding='utf-8')
print(f'Installed {asset.as_posix()} and updated the location section.')
