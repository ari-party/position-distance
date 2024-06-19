import Box from '@mui/joy/Box';

import { useCanvasStore } from '@/stores/canvas';

import type { PropsWithChildren } from 'react';

export default function AbsoluteContainer({
  children,
  zIndex,
}: PropsWithChildren<{ zIndex: number }>) {
  const width = useCanvasStore((s) => s.width);
  const height = useCanvasStore((s) => s.height);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,

        width,
        height,

        zIndex,
      }}
    >
      {children}
    </Box>
  );
}
