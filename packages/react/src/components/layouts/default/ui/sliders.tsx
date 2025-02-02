import * as React from 'react';

import { useSignal } from 'maverick.js/react';

import { useResizeObserver } from '../../../../hooks/use-dom';
import { useMediaState } from '../../../../hooks/use-media-state';
import { isRemotionSource } from '../../../../providers/remotion/type-check';
import type { TimeSliderInstance } from '../../../primitives/instances';
import * as TimeSlider from '../../../ui/sliders/time-slider';
import * as VolumeSlider from '../../../ui/sliders/volume-slider';
import { RemotionSliderThumbnail } from '../../remotion-ui';
import { useDefaultLayoutContext, useDefaultLayoutWord } from '../context';

/* -------------------------------------------------------------------------------------------------
 * DefaultVolumeSlider
 * -----------------------------------------------------------------------------------------------*/

function DefaultVolumeSlider(props: VolumeSlider.RootProps) {
  const label = useDefaultLayoutWord('Volume');
  return (
    <VolumeSlider.Root className="vds-volume-slider vds-slider" aria-label={label} {...props}>
      <VolumeSlider.Track className="vds-slider-track" />
      <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
      <VolumeSlider.Thumb className="vds-slider-thumb" />
      <VolumeSlider.Preview className="vds-slider-preview" noClamp>
        <VolumeSlider.Value className="vds-slider-value" />
      </VolumeSlider.Preview>
    </VolumeSlider.Root>
  );
}

DefaultVolumeSlider.displayName = 'DefaultVolumeSlider';
export { DefaultVolumeSlider };

/* -------------------------------------------------------------------------------------------------
 * DefaultTimeSlider
 * -----------------------------------------------------------------------------------------------*/

function DefaultTimeSlider() {
  const [instance, setInstance] = React.useState<TimeSliderInstance | null>(null),
    [width, setWidth] = React.useState(0),
    $src = useMediaState('currentSrc'),
    { thumbnails, sliderChaptersMinWidth, disableTimeSlider, seekStep, noScrubGesture } =
      useDefaultLayoutContext(),
    label = useDefaultLayoutWord('Seek'),
    $RemotionSliderThumbnail = useSignal(RemotionSliderThumbnail);

  const onResize = React.useCallback(() => {
    const el = instance?.el;
    el && setWidth(el.clientWidth);
  }, [instance]);

  useResizeObserver(instance?.el, onResize);

  return (
    <TimeSlider.Root
      className="vds-time-slider vds-slider"
      aria-label={label}
      disabled={disableTimeSlider}
      noSwipeGesture={noScrubGesture}
      keyStep={seekStep}
      ref={setInstance}
    >
      <TimeSlider.Chapters
        className="vds-slider-chapters"
        disabled={width < sliderChaptersMinWidth!}
      >
        {(cues, forwardRef) =>
          cues.map((cue) => (
            <div className="vds-slider-chapter" key={cue.startTime} ref={forwardRef}>
              <TimeSlider.Track className="vds-slider-track" />
              <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
              <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />
            </div>
          ))
        }
      </TimeSlider.Chapters>
      <TimeSlider.Thumb className="vds-slider-thumb" />
      <TimeSlider.Preview className="vds-slider-preview">
        {thumbnails ? (
          <TimeSlider.Thumbnail.Root
            src={thumbnails}
            className="vds-slider-thumbnail vds-thumbnail"
          >
            <TimeSlider.Thumbnail.Img />
          </TimeSlider.Thumbnail.Root>
        ) : $RemotionSliderThumbnail && isRemotionSource($src) ? (
          <$RemotionSliderThumbnail className="vds-slider-thumbnail vds-thumbnail" />
        ) : null}
        <TimeSlider.ChapterTitle className="vds-slider-chapter-title" />
        <TimeSlider.Value className="vds-slider-value" />
      </TimeSlider.Preview>
    </TimeSlider.Root>
  );
}

DefaultTimeSlider.displayName = 'DefaultTimeSlider';
export { DefaultTimeSlider };
