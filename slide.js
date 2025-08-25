let state = 0;

if (window.location.search.includes("back")) {
  window.slideChanges?.forEach((change) => {
    change.forward();
    state++;
  });
}

const forwardKeys = ["PageDown", "ArrowRight", "ArrowDown"];
const backwardKeys = ["PageUp", "ArrowLeft", "ArrowUp"];

window.addEventListener("keydown", (e) => {
  const current = Number(location.pathname.match(/(\d+)(\.html)?$/)?.[1] ?? 0);
  if (forwardKeys.includes(e.key)) {
    let change = window.slideChanges?.[state];
    if (change) {
      change.forward();
      state++;
    } else {
      window.location.href = `${current + 1}.html`;
    }
  } else if (backwardKeys.includes(e.key)) {
    let change = window.slideChanges?.[state - 1];
    if (change) {
      change.backward();
      state--;
    } else {
      const url = new URL(window.location);
      url.pathname = `${Math.max(current - 1, 0)}.html`;
      url.search = "back";
      window.location.href = url.toString();
    }
  }
});
