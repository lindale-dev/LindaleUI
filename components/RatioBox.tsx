import React from 'react';
import useResizeObserver from 'use-resize-observer/polyfilled';
import * as MUI from '@material-ui/core';

type Props = {
  ratio?: number;
  rootWidth?: string;
  rootHeight?: string;
  className?: string;
  style?: React.CSSProperties;
  children: any;
};

export default function RatioBox(props: Props) {
  const { ratio, rootWidth, rootHeight, className, style } = props;
  const { ref, width, height } = useResizeObserver<HTMLDivElement>();

  const [innerDimensions, setInnerDimensions] = React.useState({
    width: '100%',
    height: '100%'
  });

  React.useEffect(() => {
    if (ratio && width && height) {
      if (ratio === 1) {
        setInnerDimensions({ width: `${width}px`, height: `${height}px` });
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
      width={rootWidth}
      height={rootHeight}
      style={style}
      className={className}
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
