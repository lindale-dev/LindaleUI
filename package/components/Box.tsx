// A wrapper around MUI.Box, explicitely declaring the 'component' prop
// in order to avoid typing conflict with @react-three/drei.
// When we need to use the 'component' prop, we can simply switch to MUI.Box.

import React from 'react';
import * as MUI from '@mui/material';

type BoxProps = Omit<MUI.BoxProps, 'component'>;

export const Box = React.memo(function Box(props: BoxProps) {
  return (
    <MUI.Box component='div' {...props}>
      {props.children}
    </MUI.Box>
  );
});
