// A wrapper around MUI.Box, explicitely declaring the 'component' prop
// in order to avoid typing conflict with @react-three/drei.
// When we need to use the 'component' prop, we can simply switch to MUI.Box.

import React, { forwardRef, memo } from 'react';
import * as MUI from '@mui/material';

type BoxProps = Omit<MUI.BoxProps, 'component'>;

const Box_ = function Box(props: BoxProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  return (
    <MUI.Box component='div' {...props} ref={ref}>
      {props.children}
    </MUI.Box>
  );
};

export const Box = memo(forwardRef(Box_));
