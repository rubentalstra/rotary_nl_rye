import type { ConfigContext, ExpoConfig } from 'expo/config';

const plugins: ExpoConfig['plugins'] = [
  'expo-router',
  'expo-system-ui',
  'expo-localization',
  [
    'expo-splash-screen',
    {
      image: './assets/images/splash.png',
      imageWidth: 200,
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      dark: {
        image: './assets/images/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#000000',
      },
    },
  ],
  [
    'expo-video',
    {
      supportsBackgroundPlayback: false,
      supportsPictureInPicture: false,
    },
  ],
  [
    'expo-audio',
    {
      enableBackgroundPlayback: false,
      enableBackgroundRecording: false,
      recordAudioAndroid: false,
      microphonePermission: false,
    },
  ],
  'expo-web-browser',
  'expo-asset',
  'expo-font',
  'expo-image',
  'expo-sharing',
  ['expo-status-bar', { style: 'auto' }],
  ['expo-navigation-bar', { style: 'auto' }],
  [
    'expo-build-properties',
    {
      android: {
        usePrecompiledHeaders: true,
      },
      ios: {
        deploymentTarget: '16.4',
      },
    },
  ],
];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Rotary YEP NL',
  slug: 'rotary-yep-nl',
  description:
    'The official app for Rotary Youth Exchange Netherlands, providing resources, information, and support for exchange students, families, and Rotary clubs.',
  owner: 'rotary-nederland',
  version: '13.0.1',
  scheme: 'rotaryyepnl',
  userInterfaceStyle: 'automatic',
  githubUrl: 'https://github.com/rubentalstra/rotary_nl_rye',
  platforms: ['ios', 'android'],
  locales: {
    nl: './assets/locales/nl.json',
    en: './assets/locales/en.json',
  },
  ios: {
    appleTeamId: 'A8S2486A44',
    backgroundColor: '#17458f',
    appStoreUrl:
      'https://apps.apple.com/nl/app/rotary-youth-exchange-nl/id1567096118',
    supportsTablet: true,
    requireFullScreen: false,
    bundleIdentifier: 'com.caelitechnologies.rotary-nl-rye',
    icon: './assets/app.icon',
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      UIBackgroundModes: ['fetch'],
      LSApplicationCategoryType: 'public.app-category.education',
    },
  },
  android: {
    package: 'com.caelitechnologies.rotary_nl_rye',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.caelitechnologies.rotary_nl_rye',
    backgroundColor: '#17458f',
    predictiveBackGestureEnabled: true,
    adaptiveIcon: {
      backgroundColor: '#17458f',
      foregroundImage: './assets/images/adaptive-icon.png',
    },
    permissions: [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.WAKE_LOCK',
      'android.permission.VIBRATE',
    ],
  },
  plugins,
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
    tsconfigPaths: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: '9adc4b3d-eed4-4546-aa20-ca8c0cc2b2b0',
    },
  },
  updates: {
    enableBsdiffPatchSupport: true,
  },
});
