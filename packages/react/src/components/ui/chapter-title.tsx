import * as React from 'react';

import { useChapterTitle } from '../../hooks/use-chapter-title';
import { Primitive, type PrimitivePropsWithRef } from '../primitives/nodes';

/* -------------------------------------------------------------------------------------------------
 * Chapter Title
 * -----------------------------------------------------------------------------------------------*/

export interface ChapterTitleProps extends PrimitivePropsWithRef<'span'> {}

/**
 * This component is used to load and display the current chapter title based on the text tracks
 * provided.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/display/chapter-title}
 * @example
 * ```tsx
 * <ChapterTitle />
 * ```
 */
const ChapterTitle = React.forwardRef<HTMLElement, ChapterTitleProps>(
  ({ children, ...props }, forwardRef) => {
    const $chapterTitle = useChapterTitle();
    return (
      <Primitive.span {...props} ref={forwardRef as any}>
        {$chapterTitle}
        {children}
      </Primitive.span>
    );
  },
);

ChapterTitle.displayName = 'ChapterTitle';
export { ChapterTitle };
