// Game order here is also the display order. All media is hosted locally.
window.STUDIO = {
  email: 'kopylkovandrey@gmail.com',
  members: [{ name: 'Andrei Kopylkov', role: 'Owner, Programmer, Game Designer' }],
  games: [
    {
      id: 'moon', title: 'We Dig the Moon', subtitle: '',
      category: 'A LUNAR ADVENTURE', status: 'In development',
      description: 'Grab your gear, bring your friends, and head beneath the lunar surface. Dig into the unknown, uncover colourful crystals, and make the Moon your next adventure.',
      cover: 'assets/moon/header.webp', trailer: '',
      steam: 'https://store.steampowered.com/app/5436920/We_Dig_the_Moon/',
      discord: 'https://discord.gg/DyczvHPda', pressKit: 'assets/moon-press-kit.zip',
      screenshots: Array.from({ length: 5 }, (_, i) => `assets/moon/screenshot-${i + 1}.webp`),
      thumbnails: Array.from({ length: 5 }, (_, i) => `assets/moon/thumb-${i + 1}.webp`),
      captions: ['Your next stop: the Moon', 'Better with your crew', 'A little lunar chaos', 'Go deeper. Find something extraordinary.', 'Your suit. Your colours.']
    },
    {
      id: 'tankful', title: 'Tankful', subtitle: 'Aquarium Shop Simulator',
      category: 'ANOTHER WORLD TO GET LOST IN', status: 'Coming soon',
      description: 'Build your aquarium shop, care for exotic fish, and grow your business. Run the shop solo or share the shift with friends in online co-op.',
      cover: 'assets/tankful/header.webp', trailer: 'https://youtu.be/Hd3sjt1mLx0',
      steam: 'https://store.steampowered.com/app/5154130/Tankful_Aquarium_Shop_Simulator/',
      discord: 'https://discord.gg/2yaQjbuj8j', pressKit: 'assets/tankful-press-kit.zip',
      screenshots: Array.from({ length: 6 }, (_, i) => `assets/tankful/screenshot-${i + 1}.webp`)
    }
  ]
};
