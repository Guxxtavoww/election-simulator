export function capitalizeFirstLetter(word: string): string {
  const [firstLetter, ...rest] = word;

  return firstLetter?.toLocaleUpperCase().concat(...rest);
}

export function capitalize(string: string) {
  const words = string.trim().split(' ');

  if (words.length === 1) return capitalizeFirstLetter(words[0]!);

  const mappedText = words.map((word) => capitalizeFirstLetter(word));

  return mappedText.join(' ');
}

export function getUserName(user_name: string) {
  const words = user_name.split(' ').map((word, index) => {
    if (index > 2) return;

    return word[0]?.toLocaleUpperCase();
  });

  return words.join('');
}

export function limitChars(str: string, limit = 100) {
  if (str.length < limit) return str;

  return str.substring(0, limit).concat('...');
}
