import Box from '@mui/joy/Box';
import React from 'react';
import { useIsClient } from 'usehooks-ts';

import PreviewWarning from '@/components/organisms/PreviewWarning';
import Theme from '@/components/utils/Theme';
import useIsOverlay from '@/hooks/useIsOverlay';
import OverlayView from '@/views/Overlay';

import type { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  const isClient = useIsClient();
  const isOverlay = useIsOverlay();
  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

  return (
    <Theme>
      {/* only render page if client, site breaks otherwise */}
      {isClient &&
        (isOverlay ? (
          <OverlayView />
        ) : (
          <Box
            sx={{
              minHeight: '100svh',
              maxWidth: '100svw',

              display: 'grid',
              gridTemplateRows: 'min-content 1fr',
            }}
          >
            <Box aria-roledescription="preview warning container">
              {isPreview && <PreviewWarning />}
            </Box>

            <Box
              sx={{
                padding: 4,

                // setting to grid somehow makes the child 100% height and height: 100% doesnt lol
                display: 'grid',
              }}
            >
              {children}
            </Box>
          </Box>
        ))}
    </Theme>
  );
}
