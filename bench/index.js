const { performance } = require("perf_hooks");
const fs = require("fs");
const path = require("path");

// Import our competitors
const classnames = require("classnames");
const clsx = require("clsx");
const classigo = require("../dist/index.cjs");

// ============================================================================
// SIZE ANALYSIS
// ============================================================================

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return null;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function analyzeSizes() {
  console.log("📦 Bundle Size Analysis\n");

  // Get all format files
  const packages = [
    {
      name: "classnames",
      formats: [
        { type: "CJS", path: require.resolve("classnames") },
      ],
    },
    {
      name: "clsx",
      formats: [
        { type: "CJS", path: path.resolve("./node_modules/clsx/dist/clsx.js") },
        {
          type: "ESM",
          path: path.resolve("./node_modules/clsx/dist/clsx.mjs"),
        },
        {
          type: "UMD",
          path: path.resolve("./node_modules/clsx/dist/clsx.min.js"),
        },
      ],
    },
    {
      name: "classigo",
      formats: [
        { type: "CJS", path: path.resolve(__dirname, "../dist/index.cjs") },
        { type: "ESM", path: path.resolve(__dirname, "../dist/index.mjs") },
        { type: "UMD", path: path.resolve(__dirname, "../dist/index.umd.js") },
      ],
    },
  ];

  // Analyze each package
  packages.forEach((pkg) => {
    console.log(`📦 ${pkg.name.toUpperCase()}:`);
    console.log("─".repeat(30));

    pkg.formats.forEach((format) => {
      const size = getFileSize(format.path);
      console.log(
        `  ${format.type.padEnd(4)}: ${
          size !== null ? formatBytes(size).padStart(8) : "NOT FOUND"
        }`,
      );
    });

    // Find smallest format
    const sizes = pkg.formats.map((f) => ({ ...f, size: getFileSize(f.path) }))
      .filter((f) => f.size !== null);
    if (sizes.length > 0) {
      const smallest = sizes.reduce((min, f) => f.size < min.size ? f : min);
      console.log(
        `  🏆 Smallest: ${smallest.type} (${formatBytes(smallest.size)})`,
      );
    }

    console.log("");
  });

  // Compare smallest versions
  console.log("🏆 SMALLEST VERSIONS COMPARISON:");
  console.log("─".repeat(40));

  const smallestVersions = packages.map((pkg) => {
    const sizes = pkg.formats.map((f) => ({ ...f, size: getFileSize(f.path) }))
      .filter((f) => f.size !== null);

    if (sizes.length === 0) {
      return { name: pkg.name, size: null, type: "N/A" };
    }

    const smallest = sizes.reduce((min, f) => f.size < min.size ? f : min);
    return { name: pkg.name, ...smallest };
  }).sort((a, b) => {
    if (a.size === null && b.size === null) return 0;
    if (a.size === null) return 1;
    if (b.size === null) return -1;
    return a.size - b.size;
  });

  smallestVersions.forEach((pkg, index) => {
    const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉";
    const sizeDisplay = pkg.size !== null
      ? formatBytes(pkg.size).padStart(8)
      : "NOT FOUND".padStart(8);
    console.log(
      `${medal} ${pkg.name.padEnd(12)} ${sizeDisplay} (${pkg.type})`,
    );
  });

  return smallestVersions;
}

// ============================================================================
// RUNTIME BENCHMARK
// ============================================================================

// Test data
const isActive = true;
const isLarge = false;
const variant = "primary";

// Benchmark configuration
const ITERATIONS = 1000000;
const WARMUP_ITERATIONS = 100000;
const ROUNDS = 20;

// Utility to run benchmark with multiple rounds
function runBenchmark(name, fn) {
  const results = [];

  for (let round = 0; round < ROUNDS; round++) {
    // Warmup
    for (let i = 0; i < WARMUP_ITERATIONS; i++) {
      fn();
    }

    // Actual benchmark
    const start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      fn();
    }
    const end = performance.now();

    const duration = end - start;
    const opsPerSec = Math.round((ITERATIONS / duration) * 1000);
    results.push(opsPerSec);
  }

  // Calculate statistics
  const avg = Math.round(results.reduce((a, b) => a + b, 0) / results.length);
  const min = Math.min(...results);
  const max = Math.max(...results);
  const median = results.sort((a, b) => a - b)[Math.floor(results.length / 2)];

  return { name, results, avg, min, max, median };
}

function runBenchmarks() {
  console.log("🏃‍♂️ Runtime Performance Benchmark\n");
  console.log(`Iterations: ${ITERATIONS.toLocaleString()}`);
  console.log(`Warmup iterations: ${WARMUP_ITERATIONS.toLocaleString()}`);
  console.log(`Rounds: ${ROUNDS}\n`);

  // Test cases
  const testCases = [
    {
      name: "Basic classes",
      classnames: () =>
        classnames("button", "button--primary", "button--large"),
      clsx: () => clsx("button", "button--primary", "button--large"),
      classigo: () => classigo("button", "button--primary", "button--large"),
    },
    {
      name: "Conditional classes",
      classnames: () =>
        classnames(
          "button",
          isActive && "button--active",
          isLarge && "button--large",
        ),
      clsx: () =>
        clsx(
          "button",
          isActive && "button--active",
          isLarge && "button--large",
        ),
      classigo: () =>
        classigo(
          "button",
          isActive && "button--active",
          isLarge && "button--large",
        ),
    },
    {
      name: "Template literals",
      classnames: () =>
        classnames("button", `button--${variant}`, isLarge && "button--large"),
      clsx: () =>
        clsx("button", `button--${variant}`, isLarge && "button--large"),
      classigo: () =>
        classigo("button", `button--${variant}`, isLarge && "button--large"),
    },
    {
      name: "Falsy values",
      classnames: () =>
        classnames("button", null, undefined, false, "button--primary"),
      clsx: () => clsx("button", null, undefined, false, "button--primary"),
      classigo: () =>
        classigo("button", null, undefined, false, "button--primary"),
    },
    {
      name: "Complex SCSS",
      classnames: () =>
        classnames(
          "card",
          "card--elevated",
          isActive && "card--interactive",
          `card--${variant}`,
        ),
      clsx: () =>
        clsx(
          "card",
          "card--elevated",
          isActive && "card--interactive",
          `card--${variant}`,
        ),
      classigo: () =>
        classigo(
          "card",
          "card--elevated",
          isActive && "card--interactive",
          `card--${variant}`,
        ),
    },
  ];

  const results = [];

  testCases.forEach((testCase, index) => {
    console.log(`📊 Test ${index + 1}: ${testCase.name}`);
    console.log("─".repeat(50));

    const classnamesResult = runBenchmark("classnames", testCase.classnames);
    const clsxResult = runBenchmark("clsx", testCase.clsx);
    const classigoResult = runBenchmark("classigo", testCase.classigo);

    // Sort by performance
    const sortedResults = [classnamesResult, clsxResult, classigoResult]
      .sort((a, b) => b.avg - a.avg);

    sortedResults.forEach((result, rank) => {
      const medal = rank === 0 ? "🥇" : rank === 1 ? "🥈" : "🥉";
      console.log(
        `${medal} ${result.name.padEnd(12)} ${
          result.avg.toLocaleString().padStart(8)
        } avg ops/sec`,
      );
      console.log(
        `   └─ Min: ${result.min.toLocaleString().padStart(6)} | Max: ${
          result.max.toLocaleString().padStart(6)
        } | Median: ${result.median.toLocaleString().padStart(6)}`,
      );
    });

    console.log("");
    results.push({ testCase: testCase.name, results: sortedResults });
  });

  // Summary
  console.log("📈 RUNTIME SUMMARY");
  console.log("─".repeat(50));

  const summary = {
    classnames: { total: 0, wins: 0 },
    clsx: { total: 0, wins: 0 },
    classigo: { total: 0, wins: 0 },
  };

  results.forEach(({ results: testResults }) => {
    testResults.forEach((result, rank) => {
      summary[result.name].total += result.avg;
      if (rank === 0) summary[result.name].wins++;
    });
  });

  const sortedSummary = Object.entries(summary)
    .map(([name, data]) => ({
      name,
      ...data,
      avg: Math.round(data.total / results.length),
    }))
    .sort((a, b) => b.avg - a.avg);

  sortedSummary.forEach((lib, rank) => {
    const medal = rank === 0 ? "🥇" : rank === 1 ? "🥈" : "🥉";
    console.log(
      `${medal} ${lib.name.padEnd(12)} ${
        lib.avg.toLocaleString().padStart(8)
      } avg ops/sec (${lib.wins} wins)`,
    );
  });

  return sortedSummary;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

console.log("🎯 CLASSIGO vs CLSX vs CLASSNAMES - COMPLETE ANALYSIS\n");
console.log("=".repeat(60));

// Run size analysis
const sizeResults = analyzeSizes();

console.log("\n" + "=".repeat(60) + "\n");

// Run runtime benchmarks
const runtimeResults = runBenchmarks();

console.log("\n" + "=".repeat(60) + "\n");

// ============================================================================
// FINAL SUMMARY
// ============================================================================

console.log("🏆 FINAL SUMMARY");
console.log("─".repeat(60));

// Size winner
const sizeWinner = sizeResults[0];
console.log(
  `📦 Size Winner: ${sizeWinner.name} (${
    formatBytes(sizeWinner.size)
  } ${sizeWinner.type})`,
);

// Runtime winner
const runtimeWinner = runtimeResults[0];
console.log(
  `⚡ Runtime Winner: ${runtimeWinner.name} (${runtimeWinner.avg.toLocaleString()} ops/sec, ${runtimeWinner.wins} wins)`,
);

// Overall winner
const overallWinner = sizeWinner.name === runtimeWinner.name
  ? sizeWinner.name
  : "Tie";
console.log(`🎯 Overall Winner: ${overallWinner}`);

console.log("\n✨ Analysis completed!");
