import type { Editor } from "grapesjs";
import { FileInput, FilePen, FilePlus2, MessageCircleQuestion } from "lucide-static";
import { clear, restore, upload } from "@utils";
import { demo } from "../demo/demo";
import guide from "../demo/user-guide.json";

const Button = (title: string, onClick: () => void) => {
  const button = document.createElement("button");
  button.className = "button";
  button.innerHTML = title;
  button.onclick = onClick;

  return button;
};

const onRestore = async (editor: Editor) => {
  await restore(editor);
  editor.Modal.close();
};

const onClear = (editor: Editor) => {
  clear(editor);
  editor.Modal.close();
};

const onUpload = (editor: Editor, wrapper: HTMLElement) => {
  const callback = () => editor.Modal.close();
  upload(editor, wrapper, callback);
};

const onDemo = (editor: Editor) => {
  editor.loadProjectData(guide);
  editor.Modal.close();
  demo(editor);
};

export const WelcomeModal = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  const wrapper = document.createElement("div");
  wrapper.id = "welcome-modal";

  const buttons = [
    Button(`${FilePen} ${t("continueFromAutosave")}`, () => onRestore(editor)),
    Button(`${FilePlus2} ${t("createNewProject")}`, () => onClear(editor)),
    Button(`${FileInput} ${t("openExistingProject")}`, () => onUpload(editor, wrapper)),
    Button(`${MessageCircleQuestion} ${t("showDemoTour")}`, () => onDemo(editor)),
  ];

  wrapper.append(...buttons);

  editor.Modal.setTitle(t("createEmail")).setContent(wrapper).open();
};
