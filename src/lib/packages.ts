/**
 * Packages published to npm as temitayo_. Left out on purpose: forks and
 * republished third-party code (@deserialize/providers, @deserialize/privacero)
 * and internal builds (@deserialize/meta-sdk).
 */
type Published = { name: string; description: string; org?: string };

export type Package = Published & { url: string; version: string | null; downloads: number | null };

export const npmProfile = 'https://www.npmjs.com/~temitayo_';

export const published: Published[] = [
  { name: 'arkstore-cli', description: 'Publish signed Android apps to Ark Store from a terminal or CI.' },
  {
    name: 'expo-portcullis',
    description: 'A remote pause and update gate for Expo apps. The server can never put words or links on your screen.',
  },
  { name: 'linkpay-partner', description: 'Typed client for the LinkPay partner API: rides, collections and webhooks.' },
  {
    name: '@deserialize/swap-sdk',
    org: 'Deserialize',
    description: 'TypeScript client for Deserialize swaps on Solana that hides the conversion between SVM types and the API.',
  },
  {
    name: '@deserialize/multi-vm-wallet',
    org: 'Deserialize',
    description: 'The wallet core behind Decane: BIP-39 keys for EVM and Solana, ZeroDev smart accounts and passkeys.',
  },
  {
    name: '@deserialize/ultra-agg-sdk',
    org: 'Deserialize',
    description:
      'Client for the Deserialize Ultra Aggregator: one API for swaps, memecoins, perps, prediction markets and RWAs on Solana and EVM.',
  },
  {
    name: '@deserialize/evm-limit-sdk',
    org: 'Deserialize',
    description: 'TypeScript client for a Permit2 limit-order contract on EVM chains.',
  },
  { name: '@deserialize/auction-sdk', org: 'Deserialize', description: 'An SDK for on-chain auctions on Solana.' },
  { name: '@deserialize/terminal', org: 'Deserialize', description: 'A React widget for swapping Solana tokens.' },
];

const daily = { next: { revalidate: 86400 } };

const json = async (url: string) => {
  try {
    const res = await fetch(url, daily);
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
};

/** The packages with their latest version and last month's downloads (refreshed daily). */
export const getPackages = (): Promise<Package[]> =>
  Promise.all(
    published.map(async (pkg) => {
      const [latest, downloads] = await Promise.all([
        json(`https://registry.npmjs.org/${pkg.name}/latest`),
        json(`https://api.npmjs.org/downloads/point/last-month/${pkg.name}`),
      ]);
      return {
        ...pkg,
        url: `https://www.npmjs.com/package/${pkg.name}`,
        version: latest?.version ?? null,
        downloads: downloads?.downloads ?? null,
      };
    })
  );
