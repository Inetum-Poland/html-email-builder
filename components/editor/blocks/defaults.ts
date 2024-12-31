import type { Editor } from "grapesjs";

export const defaults = {
  text: {
    "color": "#000000",
    "font-family": "Verdana, Geneva, sans-serif",
    "font-size": "14px",
    "line-height": "1.5",
    "padding-bottom": "8px",
    "padding-left": "0px",
    "padding-right": "0px",
    "padding-top": "8px",
  },
  image: {
    "display": "block",
    "height": "auto",
    "margin-bottom": "0px",
    "margin-left": "0px",
    "margin-right": "0px",
    "margin-top": "0px",
    "max-width": "100%",
    "padding-bottom": "0px",
    "padding-left": "0px",
    "padding-right": "0px",
    "padding-top": "0px",
  },
  table: {
    "background-color": "transparent",
    "border-collapse": "separate",
    "border-spacing": "1px",
    "margin": "auto",
    "table-layout": "fixed",
    "width": "100%",
  },
  cell: {
    "background-color": "transparent",
    "border-color": "transparent",
    "border-style": "none",
    "border-width": "0",
    "padding-bottom": "0px",
    "padding-left": "0px",
    "padding-right": "0px",
    "padding-top": "0px",
    "text-align": "left",
    "vertical-align": "middle",
  },
  headers: {
    1: "28px",
    2: "21px",
    3: "16px",
    4: "14px",
    5: "12px",
    6: "10px",
  },
  button: {
    "align": "center",
    "background-color": "#19647E",
    "border-color": "transparent",
    "border-radius": "4px",
    "border-style": "none",
    "border-width": "0",
    "color": "#ffffff",
    "font-family": "Verdana, Geneva, sans-serif",
    "font-size": "14px",
    "height": "auto",
    "line-height": "125%",
    "padding-bottom": "8px",
    "padding-left": "0px",
    "padding-right": "0px",
    "padding-top": "8px",
    "text-align": "center",
    "width": "auto",
  },
  link: {
    "color": "#00a79d",
    "font-style": "normal",
    "font-weight": "400",
    "text-decoration": "underline",
  },
  divider: {
    "align": "center",
    "border-color": "#00a79d",
    "border-width": "2px",
    "padding-bottom": "8px",
    "padding-left": "8px",
    "padding-right": "8px",
    "padding-top": "8px",
    "width": "100%",
  },
  palette: [
    ["#00a79d", "#232d4b", "#d4007b", "#ffffff", "#000000", "transparent"],
  ],
};

export const setDefaults = (editor: Editor) => {
  editor.Components.addType("wrapper", {
    model: {
      defaults: {
        stylable: false,
        selectable: false,
      },
    },
  });

  editor.Components.addType("mjml", {
    model: {
      defaults: {
        traits: [],
        selectable: false,
      },
    },
  });

  editor.Components.addType("default", {
    model: {
      defaults: {
        copyable: false,
        draggable: false,
        stylable: false,
        traits: [],
        selectable: false,
      },
    },
  });

  editor.Components.addType("mj-body", {
    model: {
      defaults: {
        "toolbar": [],
        "stylable": ["background-color", "padding"],
        "style": {
          "background-color": "transparent",
          "padding-bottom": "8px",
          "padding-left": "0px",
          "padding-right": "0px",
          "padding-top": "8px",
        },
        "style-default": {
          "background-color": "transparent",
          "padding-bottom": "8px",
          "padding-left": "0px",
          "padding-right": "0px",
          "padding-top": "8px",
        },
      },
    },
  });

  editor.Components.addType("mj-section", {
    model: {
      defaults: {
        stylable: ["background-color", "padding"],
        traits: [],
        style: {
          "background-color": "transparent",
          "padding-bottom": "0",
          "padding-left": "8px",
          "padding-right": "8px",
          "padding-top": "0",
        },
      },
    },
  });
};
