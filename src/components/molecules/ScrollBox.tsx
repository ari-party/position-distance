import Box from '@mui/joy/Box';
import { mergeSx } from 'merge-sx';
import { type PropsWithChildren } from 'react';
import React from 'react';

import type { BoxProps } from '@mui/joy/Box';

function ScrollBox({
  children,
  dependency,
  ...props
}: PropsWithChildren<{ dependency?: unknown } & BoxProps>) {
  const scrollBoxRef = React.useRef<HTMLDivElement | null>(null);

  const [maskImage, setMaskImage] = React.useState('unset');

  React.useEffect(() => {
    if (!scrollBoxRef.current) return;

    function update() {
      // i dont really know how all this works i just copied it from my portfolio site
      if (scrollBoxRef.current)
        if (
          scrollBoxRef.current.scrollHeight > scrollBoxRef.current.clientHeight
        )
          setMaskImage(
            'linear-gradient(rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)',
          );
        else setMaskImage('unset');
    }

    update();

    const observer = new ResizeObserver(update);
    observer.observe(scrollBoxRef.current);
    return () => observer.disconnect();
  }, [dependency]);

  return (
    <Box
      ref={scrollBoxRef}
      {...props}
      sx={mergeSx(
        {
          maxHeight: 250,
          overflow: 'scroll',
          maskImage,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        props.sx,
      )}
      onScroll={(event) => {
        const target = event.target as HTMLDivElement;

        if (!(target.scrollHeight > target.clientHeight))
          return setMaskImage('unset');

        const percentage =
          (target.scrollTop / (target.scrollHeight - target.clientHeight)) *
          100;

        if (percentage === 0)
          setMaskImage(
            'linear-gradient(rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)',
          );
        else if (percentage === 100)
          setMaskImage(
            'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 50%)',
          );
        else
          setMaskImage(
            `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) ${percentage / 2}%, rgb(0, 0, 0) ${percentage / 2 + 50}%, rgba(0, 0, 0, 0) 100%)`,
          );
      }}
    >
      {children}
    </Box>
  );
}

ScrollBox.defaultProps = {
  dependency: false,
};

export default ScrollBox;
