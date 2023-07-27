import React from "react";
import { mergeRefs } from "react-merge-refs";
import useResizeObserver from "use-resize-observer";

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

      childNode.textContent =
        str.substr(0, endLeft) + "..." + str.substr(startRight);
    }
  }
}

// Style to apply to the children.
// Exported for convenience.
// TODO possible to do this internally instead of relying on the user?
export const middleEllipsisStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  direction: "rtl",
};

export type MiddleEllipsisProps = {
  ellipsedText: string;
  children: JSX.Element[] | JSX.Element;
  width?: string | number;
};

export const MiddleEllipsis = React.memo(function MiddleEllipsis(
  props: MiddleEllipsisProps,
) {
  const { ref } = useResizeObserver<HTMLDivElement>();

  const mergedCallbackRef = mergeRefs([
    ref,
    // Tricky part to access the resized element
    (element: HTMLDivElement) => {
      if (!element) {
        return;
      }

      const parent = element.parentNode as HTMLElement;

      if (parent) {
        const child = element.childNodes[0] as HTMLElement;

        if (child) {
          child.textContent = props.ellipsedText;

          ellipse(
            // Use the smaller width.
            element.offsetWidth > parent.offsetWidth ? parent : element,
            child,
          );
        }
      }
    },
  ]);

  return (
    <div
      ref={mergedCallbackRef}
      style={{
        wordBreak: "keep-all",
        overflowWrap: "normal",
        ...(props.width && { width: props.width }),
      }}
    >
      {props.children}
    </div>
  );
});
