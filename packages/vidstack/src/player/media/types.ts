/**
 * Indicates the type of media currently loading/loaded.
 */
export type MediaType = 'unknown' | 'audio' | 'video' | 'live-video';

/**
 * Indicates the current view type which determines how the media will be presented.
 */
export type MediaViewType = 'audio' | 'video';

/**
 * Indicates the type of strategy that should be used to initiate the loading process.
 *
 * @docs {@see https://www.vidstack.io/docs/player/core-concepts/loading#loading-strategies}
 */
export type MediaLoadingStrategy = 'eager' | 'idle' | 'visible' | 'custom';

/**
 * A number which represents the general type of error that occurred.
 *
 * - *Abort Error Code (1):* The fetching of the associated resource was aborted by the user's
 * request.
 *
 * - *Network Error Code (2):* Some kind of network error occurred which prevented the media from
 * being successfully fetched, despite having previously been available.
 *
 * - *Decode Error Code (3):* Despite having previously been determined to be usable, an error
 * occurred while trying to decode the media resource, resulting in an error.
 *
 * - *Invalid Resource Error Code (4):* The associated resource or media provider object (such as
 * a `MediaStream`) has been found to be unsuitable.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaError
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaError/code
 */
export type MediaErrorCode = 1 | 2 | 3 | 4;

export interface MediaErrorDetail {
  message: string;
  code: MediaErrorCode;
  mediaError?: MediaError;
}

export interface MediaSrc {
  src: string;
  type?: string;
}
