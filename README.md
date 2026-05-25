# pi-deepseek-balance-status

A [pi](https://pi.dev) extension that displays your DeepSeek account balance in the status bar.

## Installation

```bash
pi install git:github.com/carlos-reynosa/pi-deepseek-balance-status
```

After installing, the status bar will show your balance on every session.

## Requirements

- **DeepSeek provider** — built into pi, no setup needed
- **A DeepSeek model** — `deepseek-v4-flash` and `deepseek-v4-pro` are built-in. No `models.json` required.
- **A DeepSeek API key** — configure in `~/.pi/agent/auth.json`:

```json
{
  "deepseek": {
    "type": "api_key",
    "key": "sk-..."
  }
}
```

> **Note:** This extension requires a raw DeepSeek API key. Pi subscription plans (OAuth, cookie-based auth) are not supported — the DeepSeek balance API only accepts Bearer tokens.

After adding your key, run `/reload`.

### What you'll see

| Status | Meaning |
|--------|---------|
| `DS - 💰 ¥110.00` | Balance retrieved successfully |
| `DS - 💰 no-model` | DeepSeek models not available in pi |
| `DS - 💰 no-key` / `DS - 💰 no-auth` | API key missing or invalid |
| `DS - 💰 err` | Network error or API is down |
| `DS - 💰 n/a` | Balance not available in API response |

## Configuration

The extension works out of the box with the default prefix `DS - 💰`. To customize it, create `~/.pi/agent/deepseek-status.json`:

```json
{
  "prefix": "DS - 💰"
}
```

| Config value | Status bar result |
|--------------|-------------------|
| `"DS - 💰"` (default) | `DS - 💰 ¥110.00` |
| `"DeepSeek 💰"` | `DeepSeek 💰 ¥110.00` |
| `"🔋"` | `🔋 ¥110.00` |
| `""` | `¥110.00` |

The prefix also applies to all error states.

## Reload

Edit config → `/reload` or start a new session to pick up changes.

## Development

```bash
npm install
npm run check        # TypeScript type checking
pi install .         # Test locally without publishing
```

## License

MIT
