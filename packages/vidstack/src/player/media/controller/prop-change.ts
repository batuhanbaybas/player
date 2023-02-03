import { effect, Signals } from 'maverick.js';
import { dispatchEvent } from 'maverick.js/std';

import type { MediaContext } from '../context';
import type { MediaControllerProps } from './types';

/**
 * This hook is responsible for dispatching media events that are in response to prop changes. Other
 * events dispatched by the media controller are in response to a media events, these events are
 * the odd ones that are in response to prop changes.
 */
export function useMediaPropChange(
  { $player, $store }: MediaContext,
  {
    $autoplay,
    $poster,
    $loop,
    $controls,
    $playsinline,
    $view,
    $logLevel,
  }: Signals<MediaControllerProps>,
) {
  if (__SERVER__) return;

  effect(() => {
    const player = $player();
    if (!player) return;

    if (__DEV__) {
      effect(() => {
        $store.logLevel = $logLevel();
      });
    }

    effect(() => {
      const autoplay = $autoplay();
      $store.autoplay = autoplay;
      dispatchEvent(player, 'autoplay-change', { detail: autoplay });
    });

    effect(() => {
      const poster = $poster();
      $store.poster = poster;
      dispatchEvent(player, 'poster-change', { detail: poster });
    });

    effect(() => {
      const loop = $loop();
      $store.loop = loop;
      dispatchEvent(player, 'loop-change', { detail: loop });
    });

    effect(() => {
      const controls = $controls();
      $store.controls = controls;
      dispatchEvent(player, 'controls-change', { detail: controls });
    });

    effect(() => {
      const playsinline = $playsinline();
      $store.playsinline = playsinline;
      dispatchEvent(player, 'playsinline-change', { detail: playsinline });
    });

    effect(() => {
      const view = $view();
      $store.view = view;
      dispatchEvent(player, 'view-change', { detail: view });
    });
  });
}