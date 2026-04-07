// Shared setup device data — used by both server page (schema) and client tabs

export interface Step {
  readonly title: string;
  readonly description: string;
}

export interface Device {
  readonly id: string;
  readonly label: string;
  readonly emoji: string;
  readonly intro: string;
  readonly steps: readonly Step[];
}

export const DEVICES: readonly Device[] = [
  {
    id: "firestick",
    label: "Firestick",
    emoji: "\u{1F525}",
    intro:
      "Amazon Firestick is one of the easiest devices to set up with our IPTV service. Follow these steps to start streaming in minutes.",
    steps: [
      {
        title: "Enable Developer Options",
        description:
          'Go to Settings \u2192 My Fire TV \u2192 Developer Options and enable "Apps from Unknown Sources". This allows you to install apps outside the Amazon App Store.',
      },
      {
        title: "Download Downloader App",
        description:
          'Search for "Downloader" in the Amazon App Store and install it. This free app lets you sideload APK files onto your Firestick.',
      },
      {
        title: "Install IPTV Smarters Pro",
        description:
          "Open Downloader and enter the APK URL provided in your welcome email. Tap Go, download the file, and install IPTV Smarters Pro.",
      },
      {
        title: "Add Your Subscription",
        description:
          'Open IPTV Smarters Pro and tap "Add New User". Select "Xtream Codes API" and enter the server URL, username, and password from your welcome email.',
      },
      {
        title: "Start Watching",
        description:
          "Wait for your 30,000+ channels and 100,000+ VODs to load. Navigate to Live TV, select a category, and enjoy streaming in HD and 4K!",
      },
    ],
  },
  {
    id: "smart-tv",
    label: "Smart TV",
    emoji: "\u{1F4FA}",
    intro:
      "Our IPTV service works on all major Smart TV brands including Samsung, LG, Sony, Hisense and TCL. Get set up in just a few minutes.",
    steps: [
      {
        title: "Open Your TV App Store",
        description:
          "Navigate to your Smart TV's app store \u2014 Samsung Smart Hub, LG Content Store, or Sony's Google Play Store depending on your TV model.",
      },
      {
        title: "Install IPTV Smarters or Smart IPTV",
        description:
          'Search for "IPTV Smarters" or "Smart IPTV" in the store and install it. Both apps work perfectly with our service. They\'re free to download.',
      },
      {
        title: "Launch the App",
        description:
          "Open the installed app and look for the option to add a new playlist or user. The exact wording varies between apps.",
      },
      {
        title: "Enter Your Credentials",
        description:
          'Select "Xtream Codes API" and enter the server URL, username, and password sent in your welcome email. Or use the M3U URL option if preferred.',
      },
      {
        title: "Load Channels",
        description:
          "The app will fetch all your channels and VODs. This may take a minute on first load. Once complete, browse Live TV and enjoy 4K streaming!",
      },
    ],
  },
  {
    id: "android",
    label: "Android",
    emoji: "\u{1F916}",
    intro:
      "Works on Android phones, tablets, and Android TV boxes. Download from the Play Store and get streaming in under 2 minutes.",
    steps: [
      {
        title: "Open Google Play Store",
        description:
          "Open the Google Play Store on your Android phone, tablet, or Android TV box. Make sure you have a stable internet connection.",
      },
      {
        title: "Install TiviMate or IPTV Smarters",
        description:
          'Search for "TiviMate IPTV Player" or "IPTV Smarters Pro" and install your preferred app. TiviMate offers the best experience for Android TV boxes.',
      },
      {
        title: "Add New Playlist",
        description:
          'Open the app and tap "Add Playlist" or "Add New User". You\'ll be prompted to choose your connection method.',
      },
      {
        title: "Enter Your Details",
        description:
          "Choose Xtream Codes API and enter the server address, username, and password from your welcome email. Or paste your M3U URL directly.",
      },
      {
        title: "Enjoy 30,000+ Channels",
        description:
          "Your channels will load automatically. Browse by category, set favourites, and enjoy live sports, movies, and TV shows in stunning 4K quality!",
      },
    ],
  },
  {
    id: "ios",
    label: "iOS",
    emoji: "\u{1F34E}",
    intro:
      "Works on iPhone and iPad. Use GSE Smart IPTV or IPTV Smarters from the App Store for the best viewing experience.",
    steps: [
      {
        title: "Open the App Store",
        description:
          "Open the App Store on your iPhone or iPad and make sure you have a stable Wi-Fi connection for the best streaming quality.",
      },
      {
        title: "Install GSE Smart IPTV",
        description:
          'Search for "GSE Smart IPTV" or "IPTV Smarters" and install it. GSE Smart IPTV has excellent support for iOS and supports M3U and Xtream Codes.',
      },
      {
        title: "Open the App",
        description:
          "Launch the app and navigate to the playlist/remote add-on section. Tap the + button to add a new source.",
      },
      {
        title: "Add Your Subscription",
        description:
          'Tap "Xtream Codes" and enter the panel URL, username, and password from your welcome email. Or paste your M3U URL in the playlist section.',
      },
      {
        title: "Start Streaming",
        description:
          "Your channels will sync. Browse Live TV, Movies, and Series. For the best 4K experience on iOS, connect to a 5GHz Wi-Fi network.",
      },
    ],
  },
  {
    id: "mag",
    label: "MAG Box",
    emoji: "\u{1F4E1}",
    intro:
      "MAG boxes offer a premium IPTV experience with hardware acceleration for smooth 4K playback. Setup takes less than 5 minutes.",
    steps: [
      {
        title: "Power On Your MAG Box",
        description:
          "Connect your MAG box to your TV via HDMI, plug in the power cable, and connect to your router via ethernet (recommended) or Wi-Fi.",
      },
      {
        title: "Open Settings",
        description:
          "Using your MAG remote, navigate to System Settings \u2192 Servers \u2192 Portals. This is where you configure the IPTV portal URL.",
      },
      {
        title: "Enter the Portal URL",
        description:
          'In the Portal 1 URL field, enter the portal address provided in your welcome email. Leave Portal 1 Name as is or name it "IPTV UK".',
      },
      {
        title: "Save and Restart",
        description:
          "Press OK to save your settings, then navigate to System \u2192 Reboot to restart your MAG box. The portal will load automatically on startup.",
      },
      {
        title: "Activate Your Device",
        description:
          "When prompted, send us your MAG box MAC address (shown on screen or on the device sticker) via WhatsApp. We activate it within minutes and you're ready to watch!",
      },
    ],
  },
];
