import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getAgentDir } from "@earendil-works/pi-coding-agent";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

const CONFIG_PATH = join(getAgentDir(), "deepseek-status.json");

function loadPrefix(): string {
  if (!existsSync(CONFIG_PATH)) return "DS - 💰";
  try {
    const data = JSON.parse(readFileSync(CONFIG_PATH, "utf-8"));
    if (typeof data.prefix === "string" && data.prefix.trim()) return data.prefix.trim();
  } catch {
    console.debug("[deepseek-balance-status] Failed to parse config, using default prefix");
  }
  return "DS - 💰";
}

export default function deepseekBalanceStatus(pi: ExtensionAPI) {
  const prefix = loadPrefix();
  let cachedStatus = `${prefix} ...`;

  /**
   * Fetch DeepSeek account balance from /user/balance API.
   * Returns formatted status string using the configured prefix (e.g. "DS ¥110.00") or fallback.
   */
  async function fetchBalance(ctx: ExtensionContext): Promise<string> {
    // Guard 1: model existence
    const model = ctx.modelRegistry.find("deepseek", "deepseek-v4-flash");
    if (!model) {
      console.debug("[deepseek-balance-status] DeepSeek model not found");
      cachedStatus = `${prefix} no-model`;
      return cachedStatus;
    }

    // Guard 2+3: auth resolution + apiKey presence
    let auth;
    try {
      auth = await ctx.modelRegistry.getApiKeyAndHeaders(model);
    } catch {
      console.debug("[deepseek-balance-status] Auth resolution failed");
      cachedStatus = `${prefix} no-auth`;
      return cachedStatus;
    }
    if (!auth.ok) {
      console.debug("[deepseek-balance-status] Auth not ok:", auth.error);
      cachedStatus = `${prefix} no-key`;
      return cachedStatus;
    }
    if (!auth.apiKey) {
      console.debug("[deepseek-balance-status] No API key configured");
      cachedStatus = `${prefix} no-key`;
      return cachedStatus;
    }

    // Fetch balance (AbortController pattern from working-vibes.ts:248-269)
    const controller = new AbortController();
    const timeoutSignal = AbortSignal.timeout(5000);
    const combinedSignal = AbortSignal.any([controller.signal, timeoutSignal]);

    let resp;
    try {
      resp = await fetch("https://api.deepseek.com/user/balance", {
        headers: { Authorization: `Bearer ${auth.apiKey}` },
        signal: combinedSignal,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.debug("[deepseek-balance-status] Balance fetch aborted");
      } else {
        console.debug("[deepseek-balance-status] Balance fetch failed:", error);
      }
      cachedStatus = `${prefix} err`;
      return cachedStatus;
    }

    if (!resp.ok) {
      console.debug(`[deepseek-balance-status] API HTTP ${resp.status}`);
      cachedStatus = `${prefix} err`;
      return cachedStatus;
    }

    // Parse + format
    let data;
    try {
      data = await resp.json();
    } catch {
      console.debug("[deepseek-balance-status] Invalid JSON response");
      cachedStatus = `${prefix} err`;
      return cachedStatus;
    }

    const bal = data.balance_infos?.[0];
    if (!bal?.total_balance) {
      console.debug("[deepseek-balance-status] No balance info in response");
      cachedStatus = `${prefix} n/a`;
      return cachedStatus;
    }

    const sym = bal.currency === "CNY" ? "\u00A5" : "$";
    cachedStatus = `${prefix} ${sym}${bal.total_balance}`;
    return cachedStatus;
  }

  pi.on("session_start", async (_event, ctx) => {
    cachedStatus = await fetchBalance(ctx);
    ctx.ui.setStatus("deepseek-balance-status", cachedStatus);
  });

  pi.on("agent_end", async (_event, ctx) => {
    cachedStatus = await fetchBalance(ctx);
    ctx.ui.setStatus("deepseek-balance-status", cachedStatus);
  });
}
