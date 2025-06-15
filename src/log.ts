export const log = (text: any) => {
  const debug = document.getElementById("debug");
  if (debug) debug.innerText = JSON.stringify(text, null, 2);
};
