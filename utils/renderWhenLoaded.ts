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

    const root = ReactDOM.createRoot(container);
    root.render(element);

    if (callback) {
      callback();
    }
  });
}
