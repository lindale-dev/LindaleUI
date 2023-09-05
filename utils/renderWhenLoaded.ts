import ReactDOM from "react-dom/client";

// Waits for the page to be fully loaded before mounting a UI element

export function renderWhenLoaded(
  element: React.ReactElement,
  callback?: () => void,
) {
  window.addEventListener("load", () => {
    // Reacts discourages rendering directly at the body's root so we create a container for our dialog
    const container = document.createElement("div");
    container.id = "root";

    document.body.appendChild(container);

    // To this date, these types definitions are still missing from @types/react-dom
    /* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    // @ts-ignore
    const root = ReactDOM.createRoot(container);
    // @ts-ignore
    root.render(element);
    /* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

    if (callback) {
      callback();
    }
  });
}
