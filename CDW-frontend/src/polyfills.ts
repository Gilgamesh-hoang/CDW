// Polyfills for sockjs-client and other libraries that expect Node.js globals

// Add global to window
(window as any).global = window;

// Add process.env if missing
if (!(window as any).process) {
  (window as any).process = {};
}
if (!(window as any).process.env) {
  (window as any).process.env = {};
}

// Add Buffer if missing
if (!(window as any).Buffer) {
  (window as any).Buffer = {
    isBuffer: () => false,
  };
}

// Add setImmediate and clearImmediate if missing
if (!(window as any).setImmediate) {
  (window as any).setImmediate = (fn: Function) => setTimeout(fn, 0);
}
if (!(window as any).clearImmediate) {
  (window as any).clearImmediate = (id: number) => clearTimeout(id);
}

export default {};
