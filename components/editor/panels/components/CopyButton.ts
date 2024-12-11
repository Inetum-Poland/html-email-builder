import { Clipboard } from "lucide-static";

export const CopyButton = (label: string, onclick: () => void) => {
  const { $i18n: { t } } = useNuxtApp();
  const button = document.createElement("button");
  button.className = "button";
  button.innerHTML = `${Clipboard} ${t(label)}`;
  button.onclick = onclick;

  return button;
};
