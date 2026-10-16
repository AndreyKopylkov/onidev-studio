# Regenerates hero layers, studio logo and team photo from the source folders next to this repo.
from pathlib import Path
from PIL import Image, ImageFilter, ImageChops
root = Path(__file__).resolve().parents[1]
src = root.parent
out = root / 'dist/assets'

def save(im, target, width, quality=86):
    im = im.crop(im.getbbox()) if im.mode == 'RGBA' else im
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(out / target, 'WEBP', quality=quality, method=6)
    print(target, im.size)

moon = src / 'We Dig the Moon'
save(Image.open(moon / 'Background.png').convert('RGB'), 'hero/background.webp', 1828, 82)
save(Image.open(moon / 'Ground down part.png'), 'hero/ground.webp', 2172)
save(Image.open(moon / 'Front astronaut.png'), 'hero/astronaut-front.webp', 960)
save(Image.open(moon / 'Back astronaut.png'), 'hero/astronaut-back.webp', 760)
save(Image.open(moon / 'UFO.png'), 'hero/ufo.webp', 420)
save(Image.open(moon / 'Game Name.png'), 'hero/title.webp', 1100, 90)

# Gallery: numbered screenshots in the source folder, in numeric order. Old ones are removed first.
for old in (out / 'moon').glob('*.webp'):
    if old.name.startswith(('screenshot-', 'thumb-')): old.unlink()
shots = sorted((p for p in moon.iterdir() if p.stem.isdigit() and p.suffix.lower() in ('.png', '.jpg', '.jpeg')), key=lambda p: int(p.stem))
for i, shot in enumerate(shots, 1):
    im = Image.open(shot).convert('RGB')
    save(im, f'moon/screenshot-{i}.webp', 1920, 84)
    save(im, f'moon/thumb-{i}.webp', 480, 80)
print(f'{len(shots)} screenshots:', ', '.join(p.name for p in shots))

def clean_logo(path):
    # The exported logo has semi-transparent speckles; keep only solid white shapes.
    im = Image.open(path).convert('RGBA')
    lum = im.convert('L')
    solid = ImageChops.multiply(im.getchannel('A').point(lambda v: 255 if v > 150 else 0), lum.point(lambda v: 255 if v > 190 else 0))
    opened = solid.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(9))
    alpha = ImageChops.multiply(solid, opened).filter(ImageFilter.GaussianBlur(.6))
    white = Image.new('RGBA', im.size, (255, 255, 255, 0))
    white.putalpha(alpha)
    return white

studio = src / 'Studio Crumbslinger'
icon = clean_logo(studio / 'Crumbslinger icon.png')
save(icon, 'studio/icon.webp', 240, 92)
fav = icon.crop(icon.getbbox()); side = max(fav.size)
square = Image.new('RGBA', (side, side), (0, 0, 0, 0)); square.paste(fav, ((side - fav.width) // 2, (side - fav.height) // 2))
badge = Image.new('RGBA', (side, side), (255, 106, 26, 255)); badge.alpha_composite(square)
badge.resize((96, 96), Image.LANCZOS).save(out / 'studio/favicon.png')
save(clean_logo(studio / 'Crumbslinger logo + name.png'), 'studio/logo.webp', 640, 92)
save(Image.open(studio / 'Team/Andrey Kopylkov - Xlebniy_Samurai.png').convert('RGB'), 'studio/andrey-kopylkov.webp', 512, 86)
