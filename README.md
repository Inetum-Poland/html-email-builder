<div align="center">
  <a href="https://github.com/Inetum-Poland/html-email-builder">
    <img src="public/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">HTML Email Builder</h3>
</div>

## Concept

With this tool, using a drag-and-drop interface and predefined blocks, you can build an HTML email template that is safe to use in email clients. The result is responsive. Using the preview mode, you can see what the email will look like on different devices. The generated MJML markup gets translated into HTML, which can be used in emails. The project state is saved in a JSON file that contains all the settings and images that are used in the project and can be imported back into the app. Changes will also be automatically saved in the browser to prevent data loss.

## Features

- Drag and drop components:
  - Text boxes
  - Images
  - Buttons
  - Columns
  - Tables
- Image management:
  - Provide source URLs for the images
  - Upload images from a drive directly. Uploaded images will be scaled to a maximum resolution and embedded into the document. To keep the size of the document lower, it is recommended to host the images somewhere else and only provide the URLs.
- Edit HTML attributes (e.g. the alt attribute to provide alt text for images or the href attribute for links)
- Edit CSS styles (e.g., text alignment, color changes)
- Preview mode: see what the email will look like on different devices
- Export options:
  - Copy HTML to clipboard
  - Download the HTML file
  - Download the JSON project state file
- Autosave in browser

## Integration with email clients

The generated MJML markup gets translated into HTML, which can be used in emails. Email clients require HTML to have specific structure and MJML is an abstraction layer embarking all of these specificities. Compatibility may differ slightly among email clients.

[🔗 MJML component compatibilty with email clients](https://mjml.io/faq#email-clients).

### Outlook

To paste the email into Outlook, use an Outlook Add-In such as [Insert HTML - Outlook Add-In by Inetum](https://github.com/Inetum-Poland/html-email-builder-outlook-addin) and paste the exported HTML code there.

## Available scripts

- `pnpm run build` - build application
- `pnpm run dev` - run dev server
- `pnpm run generate` - build static output
- `pnpm run preview` - start a server to preview the application after the build command
- `pnpm run postinstall` - create a .nuxt directory and generate types
- `pnpm run test` - run tests
- `pnpm run lint` - run linter
- `pnpm run lint:fix` - run linter with autofix
- `pnpm icons:generate` - generate the favicon and the PWA icons based on the `public/logo.svg` image
