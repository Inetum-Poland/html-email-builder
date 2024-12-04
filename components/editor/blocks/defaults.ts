import type { Editor } from "grapesjs";

export const defaults = {
  "text": {
    "font-family": "Verdana, Geneva, sans-serif",
    "font-size": "14px",
    "line-height": "125%",
  },
  "image": {
    display: "block",
    height: "auto",
    width: "100%",
  },
  "table": {
    "margin": "auto",
    "max-width": "600px",
    "width": "100%",
  },
  "cell": {
    padding: "2px",
  },
  "headers": {
    1: "28px",
    2: "21px",
    3: "16px",
    4: "14px",
    5: "12px",
    6: "10px",
  },
  "mj-image": {
    "padding-bottom": "0px",
    "padding-left": "0px",
    "padding-right": "0px",
    "padding-top": "0px",
  },
  "button": {
    "background-color": "#19647E",
    "border-radius": "4px",
  },
  "palette": [
    ["#00a79d", "#232d4b", "#d4007b", "#ffffff", "#000000", "transparent"],
  ],
};

export const setDefaults = (editor: Editor) => {
  editor.Components.addType("mj-text", {
    model: {
      defaults: {
        style: defaults.text,
      },
    },
  });

  editor.Components.addType("textnode", {
    model: {
      defaults: {
        style: defaults.text,
      },
    },
  });

  editor.Components.addType("link", {
    model: {
      defaults: {
        style: {
          "text-decoration": "none",
        },
        stylable: [
          "color",
          "font-family",
          "font-size",
          "font-style",
          "font-weight",
          "letter-spacing",
          "text-decoration",
        ],
      },
    },
  });

  editor.Components.addType("mj-image", {
    model: {
      defaults: {
        style: defaults["mj-image"],
      },
    },
  });

  editor.Components.addType("mj-button", {
    model: {
      defaults: {
        style: { ...defaults.button, ...defaults.text }
      },
    },
  });
};
