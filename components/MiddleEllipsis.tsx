/*

Modified/fixed version of https://github.com/bluepeter/react-middle-ellipsis

*/

import React, { useCallback } from 'react';

type Props = {
  ellipsedText: string;
  children: JSX.Element[] | JSX.Element;
  width?: string | number;
};

const MiddleEllipsis = (props: Props) => {
  const prepEllipse = (node: HTMLElement) => {
      const parent = node.parentNode as HTMLElement;
      if (parent) {
        const child = node.childNodes[0] as HTMLElement;
        const txtToEllipse = (parent.querySelector('.ellipseMe') || child) as HTMLElement;

        if (child !== null && txtToEllipse !== null) {
          txtToEllipse.textContent = props.ellipsedText;

          ellipse(
            // Use the smaller width.
            node.offsetWidth > parent.offsetWidth ? parent : node,
            child,
            txtToEllipse
          );
        }
      }
    },
    measuredParent = useCallback(
      (node) => {
        if (node !== null) {
          window.addEventListener('resize', () => prepEllipse(node));
          prepEllipse(node);
          return () => window.removeEventListener('resize', () => prepEllipse(node));
        }
      },
      [props.children, props.ellipsedText]
    );

  return (
    <div
      ref={measuredParent}
      style={{
        wordBreak: 'keep-all',
        overflowWrap: 'normal',
        ...(props.width && { width: props.width })
      }}
    >
      {props.children}
    </div>
  );
};

const ellipse = (parentNode: HTMLElement, childNode: HTMLElement, txtNode: HTMLElement) => {
  const childWidth = childNode.offsetWidth;
  const containerWidth = parentNode.offsetWidth;
  const txtWidth = txtNode.offsetWidth;
  const targetWidth = childWidth > txtWidth ? childWidth : txtWidth;

  if (targetWidth > containerWidth) {
    const str = txtNode.textContent;
    if (str) {
      const txtChars = str.length;
      const avgLetterSize = txtWidth / txtChars;
      const canFit = (containerWidth - (targetWidth - txtWidth)) / avgLetterSize;
      const delEachSide = (txtChars - canFit + 5) / 2;
      const endLeft = Math.floor(txtChars / 2 - delEachSide);
      const startRight = Math.ceil(txtChars / 2 + delEachSide);

      txtNode.textContent = str.substr(0, endLeft) + '...' + str.substr(startRight);
    }
  }
};

export default MiddleEllipsis;
