import 'flag-icons';
import SvgIcon from '@mui/joy/SvgIcon';
import React from 'react';

import type { SvgIconProps } from '@mui/joy/SvgIcon';

export default function Flag({
  code,
  ...props
}: SvgIconProps & { code: string }) {
  return (
    <SvgIcon {...props}>
      <svg className={`fi fi-${code}`} />
    </SvgIcon>
  );
}
