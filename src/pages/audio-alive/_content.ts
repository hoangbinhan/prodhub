/**
 * Audio Alive page data. Shared by the visible page and its JSON-LD so the two never drift
 * (search engines and AI answer engines penalise structured data that the page does not show).
 */
import { SITE, SOCIALS } from '../../config';

export const APP = {
  name: 'Audio Alive',
  slug: 'audio-alive',
  packageId: 'com.audioalive.app',
  developer: 'Hoang Binh An',
  email: SITE.email,
  /** Change to the Play Store URL and flip `released` when the app ships. */
  released: false,
  playUrl: 'https://play.google.com/store/apps/details?id=com.audioalive.app',
  minAndroid: 'Android 8.0',
  icon: '/icons/audioalive.png',
  icon128: '/icons/audioalive-128.png',
  ogImage: '/og/audio-alive.png',
  socials: SOCIALS.map((s) => s.href),
};

export const PAGE = {
  title: 'Audio Alive — Fix USB-C Dongles Cutting Off the Start of Audio (Android)',
  description:
    'Audio Alive is an Android app that stops USB-C to 3.5mm DAC dongles from clipping the first 1–2 seconds of sound after a pause, using an inaudible 20 kHz keep-alive tone.',
};

/** One-sentence definition: first thing crawlers and AI answer engines quote. */
export const DEFINITION =
  'Audio Alive is an Android utility that keeps the DAC inside a USB-C to 3.5mm headphone dongle awake, so the first one to two seconds of a song, video or notification are no longer cut off after a pause.';

export const STEPS = [
  {
    title: 'Turn it on once',
    desc: 'Tap the power button. Audio Alive runs as a small foreground service and waits for a USB audio device.',
  },
  {
    title: 'Plug in your dongle',
    desc: 'When a USB-C DAC appears, the app starts a 20 kHz tone at about −70 dBFS, pinned to that output only.',
  },
  {
    title: 'Listen as usual',
    desc: 'Android mixes the tone under your music, so the DAC never sees silence and never falls asleep. Unplug and it stops.',
  },
];

export const FEATURES = [
  {
    icon: 'pause',
    title: 'Never pauses your music',
    desc: 'No audio focus is requested, so Spotify, YouTube and other players are never ducked, paused or interrupted.',
  },
  {
    icon: 'ear',
    title: 'Inaudible by design',
    desc: 'A 20 kHz tone at roughly 10 LSB of 16-bit audio (about −70 dBFS): above what most adults can hear, below anything you would notice.',
  },
  {
    icon: 'volume',
    title: 'Volume-compensated',
    desc: 'Android lowers the stream with your media volume. Audio Alive measures that and corrects for it, so the DAC gets the same level at any volume. Capped at −15 dBFS.',
  },
  {
    icon: 'usb',
    title: 'Automatic plug & unplug',
    desc: 'The tone starts when a USB audio device connects and stops when it disconnects. Nothing plays through your phone speaker.',
  },
  {
    icon: 'sliders',
    title: 'Tunable per dongle',
    desc: 'Some DACs need a stronger signal. Adjust amplitude from 1 to 50 LSB and frequency from 16 to 23.5 kHz.',
  },
  {
    icon: 'battery',
    title: 'Light on battery',
    desc: 'One small 48 kHz stereo stream, only while a dongle is connected. With nothing plugged in, the app just waits.',
  },
];

export const SPECS: [string, string][] = [
  ['Platform', 'Android 8.0 (API 26) or newer'],
  ['Works with', 'USB-C DAC dongles and USB headsets (USB audio class)'],
  ['Keep-alive signal', '20 kHz sine tone, default level 10 LSB (≈ −70 dBFS)'],
  ['Audio format', '48 kHz, 16-bit, stereo, routed only to the USB output'],
  ['Adjustable', 'Amplitude 1–50 LSB · Frequency 16–23.5 kHz'],
  ['Audio focus', 'None — other apps are never paused or ducked'],
  ['Status', 'Coming soon to Google Play'],
];

export const FAQS = [
  {
    q: 'Why does my USB-C dongle cut off the first second of audio?',
    a: 'Many inexpensive USB-C to 3.5mm adapters contain a DAC that powers down after it receives a few seconds of digital silence. When playback resumes, the DAC needs a moment to wake up and the first one to two seconds of sound are lost.',
  },
  {
    q: 'How does Audio Alive fix it?',
    a: 'It plays a near-silent 20 kHz tone into the USB output while the dongle is plugged in. Because the DAC never receives pure silence, it never goes to sleep, and the start of every sound plays normally.',
  },
  {
    q: 'Can I hear the tone?',
    a: 'Most adults cannot. The default tone is 20 kHz at about −70 dBFS. If you can hear it, lower the amplitude or move the frequency higher, up to 23.5 kHz.',
  },
  {
    q: 'Will it pause or lower my music?',
    a: 'No. Audio Alive does not request audio focus, so music, video and podcast apps keep playing at full volume. Android simply mixes the tone underneath.',
  },
  {
    q: 'Does it work with Bluetooth headphones or the built-in headphone jack?',
    a: 'No, and it is not needed there. Audio Alive only targets USB audio outputs such as USB-C DAC dongles and USB headsets, which is where the sleep problem happens.',
  },
  {
    q: 'Does it drain the battery?',
    a: 'Very little. It runs one low-rate audio stream only while a USB dongle is connected, and idles when nothing is plugged in.',
  },
  {
    q: 'Why does it stop after a reboot?',
    a: 'Android 15 and newer do not allow media-playback services to start automatically at boot. Open Audio Alive once after restarting your phone. On Xiaomi, Samsung and Oppo phones, also allow autostart and disable battery optimisation for the app.',
  },
  {
    q: 'Is Audio Alive available yet?',
    a: 'Not yet. It is coming soon to Google Play. You can email us to be notified when it launches.',
  },
];
