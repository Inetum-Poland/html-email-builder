import type { Editor, PanelProperties } from "grapesjs";
import { Monitor, Tablet, TabletSmartphone } from "lucide-static";
import { Device } from "@types";

const setDevice = (editor: Editor, device: Device) => {
  editor.setDevice(device);

  if (device !== Device.Desktop) {
    document.querySelector("#set-device-desktop")?.classList.remove("gjs-pn-active");
  }
};

const resetDevice = (editor: Editor) => {
  editor.setDevice(Device.Desktop);
  document.querySelector("#set-device-desktop")?.classList.add("gjs-pn-active");
};

const toggle = (device: Device) => ({
  run: (editor: Editor) => setDevice(editor, device),
  stop: resetDevice,
});

export const DeviceManager = (): PanelProperties => {
  const { $i18n: { t } } = useNuxtApp();

  return {
    id: "device-manager",
    buttons: [
      {
        active: true,
        attributes: { id: "set-device-desktop", title: t("desktop") },
        command: toggle(Device.Desktop),
        id: "set-device-desktop",
        label: Monitor,
        tagName: "button",
        togglable: false,
      },
      {
        attributes: { title: t("tablet") },
        command: toggle(Device.Tablet),
        id: "set-device-tablet",
        label: Tablet,
        tagName: "button",
      },
      {
        attributes: { title: t("mobile") },
        command: toggle(Device.Mobile),
        id: "set-device-mobile",
        label: TabletSmartphone,
        tagName: "button",
      },
    ],
  };
};
