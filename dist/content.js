// Game order here is also the display order. All media is hosted locally.
window.STUDIO = {
  name: 'Crumbslinger',
  email: 'kopylkovandrey@gmail.com',
  members: [{
    name: 'Andrey Kopylkov', handle: 'Xlebniy_Samurai', photo: 'assets/studio/andrey-kopylkov.webp',
    role: 'Founder · Programmer · Game Designer',
    previousGames: ['Chickenoidz Super Party', 'Shooter Construct VR']
  }],
  games: [
    {
      id: 'moon', title: 'We Dig the Moon', subtitle: '',
      category: 'CO-OP LUNAR MINING', status: 'In development',
      description: "A mining adventure for 1–4 players. Stranded on the Moon, dig for valuable ores, upgrade your gear, and repair your ship. Fight hungry creatures, uncover alien secrets, and answer to a sarcastic corporate AI. Your survival matters. The company's profit matters more.",
      cover: 'assets/moon/header.webp', trailer: 'https://youtu.be/e6Fhu8Gu5eg',
      steam: 'https://store.steampowered.com/app/5436920/We_Dig_the_Moon/',
      discord: 'https://discord.gg/DyczvHPda',
      pressKit: 'https://drive.google.com/drive/folders/1sqNcdDFJzDMRJmg5gCC0Cc3yV6TiRRjZ?usp=sharing',
      screenshots: Array.from({ length: 5 }, (_, i) => `assets/moon/screenshot-${i + 1}.webp`),
      thumbnails: Array.from({ length: 5 }, (_, i) => `assets/moon/thumb-${i + 1}.webp`),
      captions: ['Your next stop: the Moon', 'Better with your crew', 'A little lunar chaos', 'Go deeper. Find something extraordinary.', 'Your suit. Your colours.']
    },
    {
      id: 'tankful', title: 'Tankful', subtitle: 'Aquarium Shop Simulator',
      category: 'AQUARIUM SHOP SIMULATOR', status: 'Coming soon',
      description: 'Build your aquarium shop, care for exotic fish, and grow your business. Run the shop solo or share the shift with friends in online co-op.',
      cover: 'assets/tankful/header.webp', trailer: 'https://youtu.be/Hd3sjt1mLx0',
      steam: 'https://store.steampowered.com/app/5154130/Tankful_Aquarium_Shop_Simulator/',
      discord: 'https://discord.gg/2yaQjbuj8j', pressKit: 'assets/tankful-press-kit.zip',
      screenshots: Array.from({ length: 6 }, (_, i) => `assets/tankful/screenshot-${i + 1}.webp`)
    }
  ]
};
