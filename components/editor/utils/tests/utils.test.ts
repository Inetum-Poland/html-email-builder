import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { Component, Editor } from "grapesjs";
import grapesJS from "grapesjs";
import grapesJSMJML from "grapesjs-mjml";
import {
  clear,
  exportProject,
  getMjBody,
  getMJML,
  isValidProjectFile,
  selectChildren,
} from "@utils";
import { Format } from "@types";

let editor: Editor;

beforeEach(async (done: () => void) => {
  editor = grapesJS.init({
    container: "#editor",
    plugins: [grapesJSMJML],
  });

  editor.getModel().loadOnStart();
  editor.on("change:readyLoad", done);
});

afterEach(() => {
  editor.destroy();
  vi.clearAllMocks();
});

describe("getMjBody", () => {
  test("returns the mj-body component", () => {
    editor.addComponents("<mjml><mj-body /></mjml>");
    expect(getMjBody(editor)?.attributes.tagName).toBe("mj-body");
  });
});

describe("selectChildren", () => {
  test("selects child components", () => {
    editor.addComponents(
      "<mjml><mj-body><mj-button>test</mj-button></mj-body></mjml>"
    );

    const mjbody = getMjBody(editor);
    selectChildren(editor, mjbody as Component);
    const selectedChildren = editor
      .getSelectedAll()
      .map(({ tagName }: { tagName: string }) => tagName);

    expect(selectedChildren).toStrictEqual(["mj-button"]);
  });
});

describe("getHTML", () => {
  test.todo("returns the HTML content", () => {
  });
});

describe("getMJML", () => {
  test("returns the MJML content", () => {
    const content = "<mjml><mj-body><mj-button>test</mj-button></mj-body></mjml>";
    editor.addComponents(content);
    expect(getMJML(editor)).toBe(content);
  });
});

describe("getJSONProjectData", () => {
  test.todo("returns the JSON project data", () => {
  });
});

describe.skip("exportProject", () => {
  test("downloads the specified HTML data", () => {
    const date = new Date("2024-11-26T16:34:55Z");
    vi.useFakeTimers();
    vi.setSystemTime(date);

    const link = { click: vi.fn() } as any;
    vi.spyOn(document, "createElement").mockImplementation(() => link);

    exportProject(Format.HTML, "test");

    expect(link.download).toEqual("2024-11-26-HTML.html");
    expect(link.href).toContain("blob:nodedata:");
    vi.useRealTimers();
  });

  test("downloads the specified MJML data", () => {
    const date = new Date("2024-11-26T16:34:55Z");
    vi.useFakeTimers();
    vi.setSystemTime(date);

    const link = { click: vi.fn() } as any;
    vi.spyOn(document, "createElement").mockImplementation(() => link);

    exportProject(Format.MJML, "test");

    expect(link.download).toEqual("2024-11-26-MJML.txt");
    expect(link.href).toContain("blob:nodedata:");

    vi.useRealTimers();
  });

  test("downloads the specified JSON data", () => {
    const date = new Date("2024-11-26T16:34:55Z");
    vi.useFakeTimers();
    vi.setSystemTime(date);

    const link = { click: vi.fn() } as any;
    vi.spyOn(document, "createElement").mockImplementation(() => link);

    exportProject(Format.JSON, "test");

    expect(link.download).toEqual("2024-11-26-JSON.json");
    expect(link.href).toContain("blob:nodedata:");

    vi.useRealTimers();
  });
});

describe("copyRichText", () => {
  test.todo("adds the rich text to clipboard", async () => {
  });
});

describe("resize", () => {
  test.todo("resizes the specified image", () => {
  });
});

describe("uploadImage", () => {
  test.todo("uploads the specified image", () => {
  });
});

describe("restore", () => {
  test.todo("restores the project state", () => {
  });
});

describe("clear", () => {
  test("clears the project state", () => {
    const content = "<mjml><mj-body><mj-button>test</mj-button></mj-body></mjml>";
    editor.addComponents(content);
    expect(getMJML(editor)).toBe(content);
    clear(editor);
    expect(getMJML(editor)).toBe("<mjml><mj-body></mj-body></mjml>");
  });
});

describe("upload", () => {
  test.todo("executes callback with the uploaded data", () => {
  });
});

describe("isValidProjectFile", () => {
  test("is true when file has all required properties", () => {
    const data = {
      assets: [],
      styles: [],
      pages: [],
      symbols: [],
      dataSources: []
    };

    expect(isValidProjectFile(data)).toBe(true);
  });

  test("is false when file does not have all required properties", () => {
    const data = {
      assets: [],
      styles: [],
      pages: [],
    };

    expect(isValidProjectFile(data)).toBe(false);
  });

  test("is true when file has extra properties", () => {
    const data = {
      assets: [],
      styles: [],
      pages: [],
      symbols: [],
      dataSources: [],
      extra: [],
      comment: "comment",
    };

    expect(isValidProjectFile(data)).toBe(true);
  });
});
