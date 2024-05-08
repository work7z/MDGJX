import ChefApp from "./core/App.mjs";

export default () => {
  function main() {
    const defaultFavourites = [
      "To Base64",
      "From Base64",
      "To Hex",
      "From Hex",
      "To Hexdump",
      "From Hexdump",
      "URL Decode",
      "Regular expression",
      "Entropy",
      "Fork",
      "Magic",
    ];

    const defaultOptions = {
      updateUrl: true,
      showHighlighter: true,
      wordWrap: true,
      showErrors: true,
      errorTimeout: 4000,
      attemptHighlight: true,
      theme: "classic",
      useMetaKey: false,
      logLevel: "info",
      autoMagic: true,
      imagePreview: true,
      syncTabs: true,
    };

    let Categories = {};
    let OperationConfig = {};

    // document.removeEventListener("DOMContentLoaded", main, false);
    let app = new ChefApp(
      Categories,
      OperationConfig,
      defaultFavourites,
      defaultOptions,
    );
    app.setup();
  }
  main();
};
