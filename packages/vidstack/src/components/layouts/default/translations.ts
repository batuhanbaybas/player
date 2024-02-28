import type { ReadSignal } from 'maverick.js';

export type DefaultLayoutWord =
  | 'Announcements'
  | 'Accessibility'
  | 'AirPlay'
  | 'Audio'
  | 'Audio Track'
  | 'Audio Boost'
  | 'Auto'
  | 'Background Color'
  | 'Background Opacity'
  | 'Black'
  | 'Blue'
  | 'Captions'
  | 'Caption Styles'
  | 'Captions look like this'
  | 'Chapters'
  | 'Closed-Captions Off'
  | 'Closed-Captions On'
  | 'Connected'
  | 'Continue'
  | 'Connecting'
  | 'Cyan'
  | 'Default'
  | 'Disabled'
  | 'Disconnected'
  | 'Display Background Color'
  | 'Display Background Opacity'
  | 'Enter Fullscreen'
  | 'Enter PiP'
  | 'Exit Fullscreen'
  | 'Exit PiP'
  | 'Font Family'
  | 'Font Size'
  | 'Fullscreen'
  | 'Google Cast'
  | 'Green'
  | 'Keyboard Animations'
  | 'LIVE'
  | 'Loop'
  | 'Magenta'
  | 'Mute'
  | 'Normal'
  | 'Off'
  | 'Pause'
  | 'Play'
  | 'Playback'
  | 'PiP'
  | 'Quality'
  | 'Red'
  | 'Replay'
  | 'Reset'
  | 'Seek Backward'
  | 'Seek Forward'
  | 'Seek'
  | 'Settings'
  | 'Skip To Live'
  | 'Speed'
  | 'Text Color'
  | 'Text Opacity'
  | 'Text Shadow'
  | 'Unmute'
  | 'Volume'
  | 'White'
  | 'Yellow';

export type DefaultLayoutTranslations = {
  [word in DefaultLayoutWord]: string;
};

export function i18n(
  translations: ReadSignal<Partial<DefaultLayoutTranslations> | null>,
  word: string,
) {
  return translations()?.[word] ?? word;
}
