export const sortWithPriority = (
  items: string[],
  priorityList: string[]
): string[] => {
  return [...items].sort((a, b) => {
    const aIndex = priorityList.indexOf(a);
    const bIndex = priorityList.indexOf(b);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex; // Maintain priority order
    if (aIndex !== -1) return -1; // `a` is a priority item, move it up
    if (bIndex !== -1) return 1; // `b` is a priority item, move it up

    return a.localeCompare(b); // Default alphabetical sorting
  });
};
