export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(/\s+/);

  if (!firstName && !lastName) return 'N.N.';
  if (!lastName) return firstName[0].toUpperCase();
  return `${firstName[0].toUpperCase()}.${lastName[0].toUpperCase()}.`;
};

export const slugifyToLatin = (text: string) => {
  const cyrillicToLatin: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ь: '',
    ы: 'y',
    ъ: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  return text
    .toLowerCase()
    .split('')
    .map((char) => cyrillicToLatin[char] || char)
    .join('')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const getFullName = (firstName: string, lastName?: string) => {
  return lastName ? `${firstName} ${lastName}` : firstName;
};
