// Site-wide settings. Replace the [PLACEHOLDERS] before going live.
export const SITE = {
  siteTitle: 'ProdHub — Small apps that do one thing well',
  studioMono: 'h',
  email: 'hoangbinhana3@gmail.com',
  eyebrow: 'Indie apps, built in Vietnam',
  headline: 'Small tools that do one thing well.',
  intro:
    'A home for every app I make — karaoke videos, photo splitting, snowfall for your screen and more. Pick an app to open its page.',
};

/** Social profiles shown in the home page footer. */
export const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/Hoang.Binh.An.5398/' },
  { label: 'GitHub', href: 'https://github.com/hoangbinhan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hoangbinhan/' },
  { label: 'X', href: 'https://x.com/Hoang_Binh_An' },
];

/** Policy documents an app can have, in display order. File name = key. */
export const POLICY_DOCS = {
  privacy: 'Privacy policy',
  terms: 'Terms of service',
  refund: 'Refund policy',
  'delete-data': 'Delete my data',
} as const;

export type PolicyDoc = keyof typeof POLICY_DOCS;

/** Platform filter tabs on the home page. "Desktop" groups the desktop OSes. */
export const PLATFORM_FILTERS = ['All', 'Web', 'Android', 'Desktop'] as const;
export const DESKTOP_PLATFORMS = ['Windows', 'macOS', 'Linux'];
