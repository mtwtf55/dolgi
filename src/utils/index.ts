export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(/\s+/);

  if (!firstName && !lastName) return "N.N.";
  if (!lastName) return firstName[0].toUpperCase();
  return `${firstName[0].toUpperCase()}.${lastName[0].toUpperCase()}.`;
};
