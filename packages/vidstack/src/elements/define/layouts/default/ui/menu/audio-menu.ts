import { html } from 'lit-html';
import { computed } from 'maverick.js';

import { useDefaultLayoutContext } from '../../../../../../components/layouts/default/context';
import { i18n } from '../../../../../../components/layouts/default/translations';
import { useMediaState } from '../../../../../../core/api/media-context';
import { $signal } from '../../../../../lit/directives/signal';
import { IconSlot } from '../../slots';
import { $i18n } from '../utils';
import { DefaultMenuButton } from './items/menu-items';
import { DefaultSliderParts } from './items/menu-slider';

export function DefaultAudioMenu() {
  return $signal(() => {
    const { noAudioGainSlider, translations } = useDefaultLayoutContext(),
      { audioTracks, canSetAudioGain } = useMediaState(),
      $disabled = computed(() => {
        const hasGainSlider = canSetAudioGain() && !noAudioGainSlider();
        return !hasGainSlider && audioTracks().length <= 1;
      });

    if ($disabled()) return null;

    return html`
      <media-menu class="vds-audio-tracks-menu vds-menu">
        ${DefaultMenuButton({
          label: () => i18n(translations, 'Audio'),
          icon: 'menu-audio',
        })}
        <media-menu-items class="vds-menu-items">
          ${[DefaultMenuAudioGainSlider(), DefaultAudioTracksMenu()]}
        </media-menu-items>
      </media-menu>
    `;
  });
}

function DefaultAudioTracksMenu() {
  return $signal(() => {
    const { translations } = useDefaultLayoutContext(),
      { audioTracks } = useMediaState(),
      $defaultText = $i18n(translations, 'Default'),
      $disabled = computed(() => audioTracks().length <= 1);

    if ($disabled()) return null;

    return html`
      <media-menu class="vds-audio-track-menu vds-menu">
        ${DefaultMenuButton({
          label: () => i18n(translations, 'Audio Track'),
        })}
        <media-menu-items class="vds-menu-items">
          <media-audio-radio-group
            class="vds-audio-radio-group vds-radio-group"
            empty-label=${$defaultText}
          >
            <template>
              <media-radio class="vds-audio-radio vds-radio vds-menu-item">
                <slot name="menu-radio-check-icon" data-class="vds-icon"></slot>
                <span class="vds-radio-label" data-part="label"></span>
              </media-radio>
            </template>
          </media-audio-radio-group>
        </media-menu-items>
      </media-menu>
    `;
  });
}

function DefaultMenuAudioGainSlider() {
  return $signal(() => {
    const { noAudioGainSlider, translations } = useDefaultLayoutContext(),
      { canSetAudioGain } = useMediaState(),
      $disabled = computed(() => !canSetAudioGain() || noAudioGainSlider());

    if ($disabled()) return null;

    const { audioGain } = useMediaState(),
      $label = $i18n(translations, 'Audio Boost'),
      $value = $signal(() => Math.round(((audioGain() ?? 1) - 1) * 100) + '%');

    return html`
      <div class="vds-menu-item">
        ${[
          IconSlot('menu-audio-boost-down'),
          DefaultAudioGainSlider(),
          IconSlot('menu-audio-boost-up'),
        ]}
      </div>
    `;
  });
}

function DefaultAudioGainSlider() {
  const { translations, maxAudioGain } = useDefaultLayoutContext(),
    $label = $i18n(translations, 'Audio Boost'),
    $maxAudioGain = $signal(maxAudioGain);
  return html`
    <media-audio-gain-slider
      class="vds-audio-gain-slider vds-slider"
      aria-label=${$label}
      max=${$maxAudioGain}
    >
      ${DefaultSliderParts()}
    </media-audio-gain-slider>
  `;
}
