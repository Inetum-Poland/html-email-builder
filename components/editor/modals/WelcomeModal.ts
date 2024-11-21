import type { Editor } from "grapesjs";
import { FileInput, FilePen, FilePlus2, MessageCircleQuestion } from "lucide-static";
import { demo } from "../demo/demo";
import guide from "../demo/user-guide.json";

const Button = (title: string, onClick: () => void) => {
  const button = document.createElement("button");
  button.className = "button";
  button.innerHTML = title;
  button.onclick = onClick;

  return button;
};

export const WelcomeModal = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  const wrapper = document.createElement("div");
  wrapper.className = "welcome-modal";

  const buttons = [
    Button(`${FilePen} ${t("continueFromAutosave")}`, async () => {
      const data = await editor.StorageManager.load();
      editor.loadProjectData(data);
      editor.Modal.close();
    }),
    Button(`${FilePlus2} ${t("createNewProject")}`, () => editor.Modal.close()),
    Button(`${FileInput} ${t("openExistingProject")}`, () => {
      const input = document.querySelector("#file-input") as HTMLInputElement;
      input.click();
    }),
    Button(`${MessageCircleQuestion} ${t("showDemoTour")}`, async () => {
      editor.loadProjectData(guide);
      editor.Modal.close();
      demo(editor);
    }),
  ];

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.className = "file-input";
  fileInput.accept = ".json, .txt";
  fileInput.id = "file-input";
  fileInput.style.display = "none";
  fileInput.onchange = (event: any) => {
    if (!event.target.files?.[0]) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(event.target.files?.[0]);
    reader.onload = (e) => {
      const data = JSON.parse(e.target?.result?.toString() || "{}");
      editor.loadProjectData(data);
      editor.Modal.close();
    };
  };

  wrapper.append(...buttons, fileInput);

  editor.Modal.setTitle(t("createEmail")).setContent(wrapper).open();
};
