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
  const { ref, width: rootWidth, height: rootHeight } = useResizeObserver<HTMLDivElement>();

  const [innerDimensions, setInnerDimensions] = React.useState({
    width: '100%',
    height: '100%'
  });

  React.useEffect(() => {
    if (ratio && rootWidth && rootHeight) {
      const rootRatio = rootWidth / rootHeight;
      if (ratio === rootRatio) {
        setInnerDimensions({
          width: `${Math.min(rootWidth, rootHeight)}px`,
          height: `${Math.min(rootWidth, rootHeight)}px`
        });
      } else if (ratio > rootRatio) {
        setInnerDimensions({ width: `${rootWidth}px`, height: `${rootWidth / ratio}px` });
      } else {
        setInnerDimensions({ width: `${rootHeight * ratio}px`, height: `${rootHeight}px` });
      }
    }
  }, [ratio, rootWidth, rootHeight]);

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
