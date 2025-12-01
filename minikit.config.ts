export const manifest = {
  miniAppName: 'Launch',
  splashImageUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/splash.png`,
  splashBackgroundColor: '#0052FF',
  homeUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  imageUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/icon.png`,
  miniAppDescription: 'Create your own token on Base in seconds',
  miniAppIconUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/icon.png`,
  accountAssociation: {
    header: 'eyJmaWQiOjU1ODY5NCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDI5OTRlMjIyZjRiNzVjMTUzMjJFODg4QTZjODUyOTcxNjkwNDM3OWIifQ',
    payload: 'eyJkb21haW4iOiJsYXVuY2gtbWluaS1hcHAtc3FncC52ZXJjZWwuYXBwIn0',
    signature: 'JZsh6ohlMM74K5t7i7e2/VZ/nv26mGuxFcNbzlM8lklOo3j9rhOccF1B98YwK7OBWilOeTK7j4ZPTaHmiLKv/Rw=',
  },
  baseBuilder: {
    ownerAddress: '0xC885476F424F92717C0218031b896513828a2ab7',
  },
};
