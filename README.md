# pi-deepseek-balance-status

A [pi](https://pi.dev) extension that displays your DeepSeek account balance in the status bar.

## Installation

```bash
pi install git:github.com/creynosa/pi-deepseek-balance-status
```

After installing, the status bar will show your balance on every session.

## Configuration

The extension works out of the box with the default prefix `DS - 💰`. To customize it, create `~/.pi/agent/deepseek-status.json`:

```json
{
  "prefix": "DS - 💰"
}
```

The `prefix` value is any string you want displayed before the balance amount:

| Config value | Status bar result |
|--------------|-------------------|
| `"DS - 💰"` (default) | `DS - 💰 ¥110.00` |
| `"DeepSeek 💰"` | `DeepSeek 💰 ¥110.00` |
| `"🔋"` | `🔋 ¥110.00` |
| `""` | `¥110.00` |

The prefix also applies to error states (`no-model`, `no-auth`, `err`, `n/a`).

## Reload

After editing the config file, run `/reload` or start a new session to pick up the change.

## Requirements

- A DeepSeek API key configured in pi (`deepseek` provider with a model like `deepseek-v4-flash`)

## License

MIT
