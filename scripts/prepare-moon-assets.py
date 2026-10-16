from pathlib import Path
from PIL import Image
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
convert(art/'We Dig The Moon - header image.png','header.webp',920)
print('Prepared screenshots, thumbnails, and header artwork.')
