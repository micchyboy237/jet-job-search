export const sortWithPriority = (
  items: string[],
  priorityList: string[]
): string[] => {
  return [...items].sort((a, b) => {
    const aIndex = priorityList.indexOf(a.toLowerCase());
    const bIndex = priorityList.indexOf(b.toLowerCase());

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex; // Maintain priority order
    if (aIndex !== -1) return -1; // `a` is a priority keyword, move it up
    if (bIndex !== -1) return 1; // `b` is a priority keyword, move it up

    return a.localeCompare(b); // Default alphabetical sorting
  });
};
