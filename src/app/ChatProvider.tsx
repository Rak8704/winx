"use client";
import { useEffect } from "react";
declare global {
  interface Window {
    chatwootSettings: {
      websiteToken: string;
      baseUrl: string;
    };
    chatwootSDK: {
      run: (settings: { websiteToken: string; baseUrl: string }) => void;
      // add other methods or properties of chatwootSDK here if you want
    };
  }
}
const ChatProvider = () => {
  useEffect(() => {
    const BASE_URL = "https://app.chatwoot.com";
    const script = document.createElement("script");
    script.src = BASE_URL + "/packs/js/sdk.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.chatwootSettings = {
        websiteToken: "vYbUD5FCDNPsQJEYgX6BBDpp",
        baseUrl: BASE_URL,
      };

      window.chatwootSDK.run(window.chatwootSettings);
    };

    document.body.appendChild(script);

    return () => {
      // Clean up
      const chatWidget = document.getElementById("chatwoot-widget");
      if (chatWidget) chatWidget.remove();
    };
  }, []);
  return null;
};

export default ChatProvider;
