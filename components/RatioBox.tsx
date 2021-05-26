import React from 'react';
import useResizeObserver from 'use-resize-observer/polyfilled';
import * as MUI from '@material-ui/core';

type Props = {
  ratio?: number;
  rootProps?: MUI.BoxProps;
  children: any;
};

export default function RatioBox(props: Props) {
  const { ratio, rootProps } = props;
  const { ref, width, height } = useResizeObserver<HTMLDivElement>();

  const [innerDimensions, setInnerDimensions] = React.useState({
    width: '100%',
    height: '100%'
  });

  React.useEffect(() => {
    if (ratio && width && height) {
      if (ratio === 1) {
        setInnerDimensions({
          width: `${Math.min(width, height)}px`,
          height: `${Math.min(width, height)}px`
        });
      } else if (ratio > 1) {
        setInnerDimensions({ width: `${width}px`, height: `${width / ratio}px` });
      } else {
        setInnerDimensions({ width: `${height * ratio}px`, height: `${height}px` });
      }
    }
  }, [ratio, width, height]);

  return (
    <MUI.Box
      // ref is missing from the type definition
      // @ts-ignore
      ref={ref}
      {...rootProps}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <MUI.Box style={{ width: innerDimensions.width, height: innerDimensions.height }}>
        {props.children}
      </MUI.Box>
    </MUI.Box>
  );
}
