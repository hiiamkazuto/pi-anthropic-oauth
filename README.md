# pi-anthropic-oauth

[![npm](https://img.shields.io/npm/v/pi-anthropic-oauth?style=flat-square&logo=npm&logoColor=white&label=npm&color=7c3aed)](https://www.npmjs.com/package/pi-anthropic-oauth)

**Use Claude Pro/Max OAuth in Pi, no API key or Claude Code installation required.**

Keeps Pi's built-in models, tools, and Anthropic request handling.

> [!IMPORTANT]
> Requires Pi 0.86.0+

## Features

- Claude Pro/Max login from `/login`
- Automatic token refresh
- No Anthropic API key needed
- No Claude Code installation required
- Uses the Anthropic models available in Pi's built-in model registry
- Uses Pi's built-in Messages API streaming, tool conversion, system prompts, thinking, and prompt caching
- `/usage` for plan usage and limits

## Quick start

```bash
pi install npm:pi-anthropic-oauth
```

Start Pi, then run Pi's login command:

```text
/login
```

Choose:

```text
Claude Pro/Max
```

Complete the browser login. After login, select an Anthropic model in Pi.

When the extension is active, `/login` includes `Claude Pro/Max` and Anthropic models show `(sub)` after OAuth login.

View plan usage and limits:

```text
/usage
```

Update with:

```bash
pi update npm:pi-anthropic-oauth
```

## How it works

- **Login:** `/login` → `Claude Pro/Max`; tokens refresh automatically.
- **Requests:** Pi's built-in Anthropic provider sends requests directly to Anthropic—no proxy or API key.
- **Integration:** Pi owns streaming, message and tool conversion, system prompts, thinking, caching, cancellation, and usage accounting.
- **Extension scope:** This package customizes OAuth login/refresh and adds `/usage`; it does not replace Pi's request path.

The extension does not create a `~/.Claude Code` symlink, rewrite Pi's system prompt, add its own billing system block, or rename custom tools to MCP-style names.

Whether a request uses plan limits or Extra usage is determined by Anthropic and Pi's current provider behavior; this extension does not override that decision.

## Prompt cache retention

Prompt caching is handled by Pi's built-in Anthropic provider. Pi's `cacheRetention` setting and `PI_CACHE_RETENTION` environment variable apply as they do without this extension:

```bash
PI_CACHE_RETENTION=long
```

## Extra models

To add another Anthropic model, create `~/.pi/agent/models.json`:

```json
{
  "providers": {
    "anthropic": {
      "baseUrl": "https://api.anthropic.com",
      "apiKey": "unused",
      "api": "anthropic-messages",
      "models": [
        {
          "id": "your-model-id",
          "name": "Your Model Name"
        }
      ]
    }
  }
}
```

> [!NOTE]
> Available models follow Pi's built-in Anthropic catalog. Update Pi to get the latest models.
>
> Pi requires `baseUrl`, `apiKey`, and `api` when defining custom models in `models.json`. With this extension, requests normally authenticate through Claude Pro/Max OAuth after `/login`, so `apiKey` is only a placeholder to satisfy Pi's config requirements and does not need to be a valid Anthropic API key.
>
> Do not use a fake `sk-ant-oat...` value as the placeholder. If OAuth login has not completed, Pi may try to use that fake token and Anthropic will return `401 Invalid bearer token`. Use a harmless placeholder such as `"unused"`, then run `/login` and choose `Claude Pro/Max`.

## Troubleshooting

- If local callback login does not complete, paste the final callback URL or `code#state` when prompted.
- If you see `401 Invalid bearer token`, remove any fake `sk-ant-oat...` placeholder from `~/.pi/agent/models.json` and log in again.
- If Anthropic reports that third-party apps draw from Extra usage rather than plan limits, check `/usage` for your plan limits and Extra usage status. The extension does not change Anthropic's server-side policy.
- Pi's built-in Extra usage warning may still appear. It can be hidden in `/settings`, but hiding the warning does not change billing.
- If you see `claude_code_version_too_old` or another provider-compatibility error, update Pi. Client headers and provider compatibility are managed by Pi rather than an extension-specific version override.
- If something breaks, please open an issue with your Pi version, extension version, and error output.

## License

MIT
