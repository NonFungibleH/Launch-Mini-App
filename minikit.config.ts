import { MiniAppManifest } from '@farcaster/miniapp-sdk';

export const manifest: MiniAppManifest = {
  miniAppName: 'Launch',
  splashImageUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/splash.png`,
  splashBackgroundColor: '#0052FF',
  homeUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  imageUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/icon.png`,
  miniAppDescription: 'Create your own token on Base in seconds',
  miniAppIconUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/icon.png`,
  accountAssociation: {
    header:
      'eyJmaWQiOjAsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn0',
    payload: 'eyJkb21haW4iOiJleGFtcGxlLmNvbSJ9',
    signature:
      'MHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA',
  },
};
