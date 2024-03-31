export const JSONFiles = {
  country: require('./country.json'),
  flagCountry: require('./flag.json'),
  serviceDefault: require('./service.json'),
};
export type JSONFileTypes = keyof typeof JSONFiles;
