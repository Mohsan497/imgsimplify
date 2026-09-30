// Passes a file from the home-page dropzone to the tool page.
let pending: File | null = null;
export const setPendingFile = (f: File) => { pending = f; };
export const takePendingFile = () => { const f = pending; pending = null; return f; };
