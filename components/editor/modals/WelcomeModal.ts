import type { Editor } from "grapesjs";
import {
  FileInput,
  FilePen,
  FilePlus2,
  FileX2,
  MessageCircleQuestion,
} from "lucide-static";
import { clear, getMjBody, isValidProjectFile, restore, upload } from "@utils";
import { demo } from "../demo/demo";
import guide from "../demo/user-guide.json";

const Button = (props: Partial<HTMLButtonElement>) => {
  const button = document.createElement("button");
  Object.assign(button, { className: "button", ...props });
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
  const { $i18n: { t } } = useNuxtApp();

  const setError = (message: string) => {
    const button = document.querySelector("#open-existing-project") as HTMLElement;
    const innerHTML = button.innerHTML;

    const setNormalMessage = () => {
      button.classList.remove("invalid");
      button.innerHTML = innerHTML;
    };

    const setErrorMessage = () => {
      button.classList.add("invalid");
      button.innerHTML = `${FileX2} ${t(message)}`;
    };

    setErrorMessage();
    setTimeout(setNormalMessage, 3000);
  };

  const callback = (data?: string) => {
    if (!data) {
      setError("noFileSpecified");
      return;
    }

    try {
      const json = JSON.parse(data);
      const isValid = isValidProjectFile(json);

      if (!isValid) {
        setError("invalidProjectFileStructure");
        return;
      }

      editor.loadProjectData(json);
      editor.Modal.close();
    }
    catch {
      setError("invalidProjectFileType");
      return;
    }
  };

  upload(wrapper, callback);
};

const onDemo = (editor: Editor) => {
  editor.loadProjectData(guide);
  editor.Modal.close();
  editor.select(getMjBody(editor));
  demo(editor);
};

export const WelcomeModal = (editor: Editor) => {
  const { $i18n: { t } } = useNuxtApp();

  const wrapper = document.createElement("div");
  wrapper.id = "welcome-modal";
  wrapper.className = "button-list";

  const buttons = [
    Button({
      innerHTML: `${FilePen} ${t("continueFromAutosave")}`,
      onclick: () => onRestore(editor)
    }),
    Button({
      innerHTML: `${FilePlus2} ${t("createNewProject")}`,
      onclick: () => onClear(editor)
    }),
    Button({
      id: "open-existing-project",
      innerHTML: `${FileInput} ${t("openExistingProject")}`,
      onclick: () => onUpload(editor, wrapper),
    }),
    Button({
      innerHTML: `${MessageCircleQuestion} ${t("showDemoTour")}`,
      onclick: () => onDemo(editor)
    }),
  ];

  wrapper.append(...buttons);

  editor.Modal.setTitle(t("createEmail")).setContent(wrapper).open();
};
