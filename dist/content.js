// Edit links and copy here. Use a full YouTube URL for each trailer.
window.STUDIO = {
  email: 'kopylkovandrey@gmail.com',
  members: [{ name: 'Andrei Kopylkov', role: 'Owner, Programmer, Game Designer' }],
  games: [
    {
      id: 'tankful', title: 'Tankful', subtitle: 'Aquarium Shop Simulator',
      category: 'AQUARIUM SHOP SIMULATOR', status: 'Coming soon',
      description: 'Build your aquarium shop, care for exotic fish, and grow your business. Run the shop solo or share the shift with friends in online co-op.',
      cover: 'assets/tankful/header.webp', trailer: 'https://youtu.be/Hd3sjt1mLx0',
      steam: 'https://store.steampowered.com/app/5154130/Tankful_Aquarium_Shop_Simulator/',
      discord: 'https://discord.gg/2yaQjbuj8j', pressKit: 'assets/tankful-press-kit.zip',
      screenshots: Array.from({ length: 6 }, (_, i) => `assets/tankful/screenshot-${i + 1}.webp`)
    },
    {
      id: 'moon', title: 'How to Digging', subtitle: 'Moon Together',
      category: 'A WORLD ON THE MOON', status: 'In development',
      description: 'A new world from OniDev Studio. Take a first look at How to Digging Moon Together in our gameplay gallery.',
      cover: 'assets/moon/screenshot-2.webp', trailer: '', steam: '', discord: '',
      pressKit: 'assets/moon-press-kit.zip',
      screenshots: Array.from({ length: 3 }, (_, i) => `assets/moon/screenshot-${i + 1}.webp`)
    }
  ]
};
