/**
 * Replace the special regular expression characters with their escaped versions for usage with RegExp
 * @param input
 */
const escapeForRegExp = (input: string) => {
  return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

const shortenString = (string: string, delimiter: string) => {
  let shortenedString = '';
  const stringParts = string.split(delimiter);

  for (let i = 0; i < stringParts.length; i++) {
    shortenedString += `${stringParts[i].slice(0, 1)}.${i === stringParts.length -1 ? '' : ' '}`;
  }

  return shortenedString;
};

export {
  escapeForRegExp,
  shortenString
};
