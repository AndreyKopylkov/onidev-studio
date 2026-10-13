from pathlib import Path
from PIL import Image
import zipfile
root = Path(__file__).resolve().parents[1] / 'dist'
shots = Path('C:/Users/assas/OneDrive/Изображения/DiggingMoon')
art = Path('C:/Users/assas/.codex/generated_images/01a0f7e7-09b3-7e31-ba94-c1fc2f0221fd/WeDigTheMoon/Steam')
selected = ['22.png', '3.png', '7.jpg', '23.png', '14.png']
def convert(source, target, width):
 with Image.open(source) as im:
  im.thumbnail((width,width))
  im.save(root/'assets/moon'/target,'WEBP',quality=88)
for i,name in enumerate(selected,1):
 convert(shots/name,f'screenshot-{i}.webp',1920)
 convert(shots/name,f'thumb-{i}.webp',480)
for target,source,width in [('hero.webp','Library main',2560),('logo.webp','Library logo',960),('header.webp','header image',920)]:
 convert(art/f'We Dig The Moon - {source}.png',target,width)
with zipfile.ZipFile(root/'assets/moon-press-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
 for i,name in enumerate(selected,1): z.write(shots/name,f'screenshots/{i:02d}-{name}')
 for name in ['header image','Library logo','main image','vertical image']:
  p=art/f'We Dig The Moon - {name}.png';z.write(p,f'artwork/{p.name}')
 z.writestr('README.txt','We Dig the Moon\nOniDev Studio\nSteam: https://store.steampowered.com/app/5436920/We_Dig_the_Moon/\nDiscord: https://discord.gg/DyczvHPda\nContact: kopylkovandrey@gmail.com\n\nOriginal artwork and the five selected Steam screenshots. Please credit OniDev Studio.\n')
print('Prepared screenshots, thumbnails, artwork and press kit.')
