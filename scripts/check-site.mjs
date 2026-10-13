import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const context = { window: {} };
runInNewContext(readFileSync(resolve(root, 'content.js'), 'utf8'), context);
const { games } = context.window.STUDIO;
const assets = new Set([...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]).filter(path => !/^https?:/.test(path)));
for (const game of games) {
  for (const path of [game.cover, game.pressKit, ...game.screenshots, ...(game.thumbnails || [])]) assets.add(path);
  for (const link of [game.steam, game.discord]) {
    if (new URL(link).protocol !== 'https:') throw new Error(`Invalid game link: ${link}`);
  }
}
for (const asset of assets) {
  const path = resolve(root, asset);
  if (!existsSync(path) || !statSync(path).size) throw new Error(`Missing or empty asset: ${asset}`);
}
if (games[0].id !== 'moon' || games[0].screenshots.length !== 5) throw new Error('We Dig the Moon must lead with five approved screenshots.');
if (/How to Digging/.test(html + JSON.stringify(games))) throw new Error('Outdated game name.');
console.log(`Site ready: ${games.length} games, ${assets.size} local files verified.`);
