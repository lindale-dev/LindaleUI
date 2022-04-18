import React, { useCallback } from 'react';

function ellipse(parentNode: HTMLElement, childNode: HTMLElement) {
  const childWidth = childNode.offsetWidth;
  const containerWidth = parentNode.offsetWidth;

  if (childWidth > containerWidth) {
    const str = childNode.textContent;
    if (str) {
      const txtChars = str.length;
      const avgLetterSize = childWidth / txtChars;
      const canFit = containerWidth / avgLetterSize;
      const delEachSide = (txtChars - canFit + 5) / 2;
      const endLeft = Math.floor(txtChars / 2 - delEachSide);
      const startRight = Math.ceil(txtChars / 2 + delEachSide);

      childNode.textContent = str.substr(0, endLeft) + '...' + str.substr(startRight);
    }
  }
}

// Style to apply to the children.
// Exported for convenience.
// TODO possible to do this internally instead of relying on the user?
export const middleEllipsisStyle: React.CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  direction: 'rtl'
};

export type MiddleEllipsisProps = {
  ellipsedText: string;
  children: JSX.Element[] | JSX.Element;
  width?: string | number;
};

export const MiddleEllipsis = React.memo(function MiddleEllipsis(props: MiddleEllipsisProps) {
  const measuredParent = useCallback(
    (rootNode: HTMLDivElement) => {
      function prepEllipse(node: HTMLElement) {
        const parent = node.parentNode as HTMLElement;
        if (parent) {
          const child = node.childNodes[0] as HTMLElement;

          if (child !== null) {
            child.textContent = props.ellipsedText;

            ellipse(
              // Use the smaller width.
              node.offsetWidth > parent.offsetWidth ? parent : node,
              child
            );
          }
        }
      }

      if (rootNode) {
        window.addEventListener('resize', () => prepEllipse(rootNode));
        prepEllipse(rootNode);
        return () => window.removeEventListener('resize', () => prepEllipse(rootNode));
      }
    },
    [props.ellipsedText]
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
});
