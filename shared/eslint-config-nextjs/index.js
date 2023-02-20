module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  plugins: ['unused-imports', 'simple-import-sort'],
  settings: {
    react: {
      version: "detect",
    },
  }
};
