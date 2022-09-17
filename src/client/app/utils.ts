export function getCls(classes: { [key: string]: boolean }) {
  let res = "";
  for (let key of Object.keys(classes)) {
    if (classes[key]) res += " " + key;
  }
  return res;
}
