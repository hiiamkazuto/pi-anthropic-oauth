import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { OAuthCredentials } from "@earendil-works/pi-ai";
import { loginAnthropic, refreshAnthropicToken } from "./auth.js";
import { registerUsageCommand } from "./usage.js";

export default function (pi: ExtensionAPI) {
  registerUsageCommand(pi);

  // Override only OAuth. Pi keeps its built-in models, Messages API stream,
  // tool conversion, system prompts, thinking, caching, and API-key support.
  pi.registerProvider("anthropic", {
    oauth: {
      name: "Claude Pro/Max",
      login: loginAnthropic,
      refreshToken: refreshAnthropicToken,
      getApiKey: (credentials: OAuthCredentials) => credentials.access,
    },
  });
}
