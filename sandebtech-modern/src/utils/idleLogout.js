let timeout;

const EVENTS = [
  "mousemove",
  "mousedown",
  "keypress",
  "scroll",
  "touchstart",
];

export function startIdleLogout(onLogout, idleTime = 30 * 60 * 1000) {
  const resetTimer = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      localStorage.removeItem("token");
      onLogout();
    }, idleTime);
  };

  EVENTS.forEach((event) => {
    window.addEventListener(event, resetTimer);
  });

  resetTimer();

  return () => {
    clearTimeout(timeout);

    EVENTS.forEach((event) => {
      window.removeEventListener(event, resetTimer);
    });
  };
}