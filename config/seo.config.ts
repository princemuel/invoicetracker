import type { Metadata } from 'next';
import { getBaseUrl } from './baseurl';

type MetaFunction = (data?: Metadata) => Metadata;

export const defineMeta: MetaFunction = (metadata) => {
  const title: Metadata['title'] = 'Invoice Tracker - The...';
  const description: Metadata['description'] = '';

  return {
    title: {
      default: title,
      template: '%s - Invoice Tracker',
    },
    description,

    metadataBase: new URL('/', getBaseUrl()),
    generator: 'Next.js',
    applicationName: 'Invoice Tracker',
    referrer: 'origin-when-cross-origin',
    manifest: '/site.webmanifest',
    keywords: [
      'next.js',
      'react',
      'javascript',
      'invoice',
      'invoice manager',
      'e-commerce',
      title,
    ],

    creator: 'Prince Muel',
    publisher: 'Prince Muel',
    authors: [{ name: 'Prince Muel', url: 'https://github.com/princemuel' }],
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
      other: {
        bing: 'msvalidate.01=0',
        me: ['vansomecsam@gmail.com', 'my-link'],
      },
    },
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    // icons: {
    //   icon: [
    //     { url: '/icon.png' },
    //     { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    //     {
    //       rel: 'icon',
    //       url: '/favicon-32x32.png',
    //       sizes: '32x32',
    //       type: 'image/png',
    //     },
    //   ],
    //   shortcut: ['/shortcut-icon.png'],
    //   apple: [
    //     { url: '/apple-icon.png' },
    //     { url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
    //   ],
    //   other: [
    //     {
    //       rel: 'apple-touch-icon-precomposed',
    //       url: '/apple-touch-icon-precomposed.png',
    //     },
    //     {
    //       rel: 'android-chrome-192x192',
    //       url: '/android-chrome-192x192.png',
    //     },
    //     {
    //       rel: 'android-chrome-512x512',
    //       url: '/android-chrome-512x512.png',
    //     },
    //     { rel: 'mask-icon', url: '/safari-pinned-tab.svg' },
    //   ],
    // },

    // other: {
    //   'msapplication-TileColor': '#ffffff',
    //   'msapplication-TileImage': '/mstile-144x144.png',
    // },

    openGraph: {
      type: 'website',
      title,
      description,
      url: '/',
      locale: 'en_US',
      siteName: title,
      // images: images.map((image) => ({
      //   url: image.url,
      //   alt: image.alt,
      //   type: 'image/jpeg',
      //   width: 1200,
      //   height: 630,
      // })),
    },

    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: '@iamprincemuel',
      creator: '@iamprincemuel',
    },

    colorScheme: 'dark light',
    themeColor: [
      { media: '(prefers-color-scheme: dark)', color: '#000112' },
      { media: '(prefers-color-scheme: light)', color: '#635fc7' },
    ],

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...metadata,
  };
};
