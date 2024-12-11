import { FileDown } from "lucide-static";

export const DownloadButton = (label: string, onclick: () => void) => {
  const { $i18n: { t } } = useNuxtApp();

  const button = document.createElement("button");
  button.className = "button";
  button.innerHTML = `${FileDown} ${t(label)}`;
  button.onclick = onclick;

  return button;
};
