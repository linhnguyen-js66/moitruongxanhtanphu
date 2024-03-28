export const JSONFiles = {
  country: require('./country.json'),
  flagCountry: require('./flag.json'),
};
export type JSONFileTypes = keyof typeof JSONFiles;
