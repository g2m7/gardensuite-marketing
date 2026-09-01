#!/usr/bin/env node

import {
  buildRegistry,
  collectSources,
  ingestNewsUrls,
  loadCollectedSourceTexts,
  loadGeneratedRegistry,
  validateRegistry,
  writeRegistry,
} from "./dooars_lib.mjs";

async function main() {
  const command = process.argv[2] ?? "check";
  if (command === "collect") {
    const sources = await collectSources({ force: process.argv.includes("--force") });
    console.log(
      JSON.stringify(
        {
          sources_checked: sources.length,
          collected: sources.filter((source) => source.collection_method !== "failed").length,
          failed: sources.filter((source) => source.collection_method === "failed").length,
          sources,
        },
        null,
        2,
      ),
    );
    return;
  }
  if (command === "build") {
    const registry = await buildRegistry({
      sourceTexts: await loadCollectedSourceTexts(),
    });
    const validation = validateRegistry(registry);
    if (!validation.valid) {
      console.error(JSON.stringify(validation, null, 2));
      process.exitCode = 1;
      return;
    }
    const report = await writeRegistry(registry);
    console.log(JSON.stringify({ report, validation }, null, 2));
    return;
  }
  if (command === "ingest-news") {
    console.log(JSON.stringify(await ingestNewsUrls(), null, 2));
    return;
  }
  if (command === "check") {
    const validation = validateRegistry(await loadGeneratedRegistry());
    console.log(JSON.stringify(validation, null, 2));
    if (!validation.valid) process.exitCode = 1;
    return;
  }
  throw new Error(
    "Usage: node dooars_intelligence.mjs [collect [--force]|build|ingest-news|check]",
  );
}

await main();
