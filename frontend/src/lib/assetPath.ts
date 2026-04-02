export const getAssetPath = (path: string): string => {
  // Always prepend /asset-mizumi for public assets when deployed on GitHub Pages
  return `/asset-mizumi${path}`;
};
