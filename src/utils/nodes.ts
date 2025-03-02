const displayClassTree = (element: HTMLElement, depth: number = 0): void => {
  if (!(element instanceof HTMLElement)) {
    console.error("Invalid element provided.");
    return;
  }

  const indent = "  ".repeat(depth);
  const classList = element.classList.length
    ? Array.from(element.classList).join(", ")
    : "";

  console.log(
    `${indent}${element.tagName.toLowerCase()}${
      classList ? ` (${classList})` : ""
    }`
  );

  Array.from(element.children).forEach((child) =>
    displayClassTree(child as HTMLElement, depth + 1)
  );
};

const getElementTree = (
  element: HTMLElement
): { tag: string; classes: string[]; children: any[] } | null => {
  if (!(element instanceof HTMLElement)) {
    console.error("Invalid element provided.");
    return null;
  }

  return {
    tag: element.tagName.toLowerCase(),
    classes: Array.from(element.classList),
    children: Array.from(element.children).map((child) =>
      getElementTree(child as HTMLElement)
    ),
  };
};

const getFilteredElementTree = (
  element: HTMLElement
): { tag: string; classes: string[]; children: any[] } | null => {
  if (!(element instanceof HTMLElement)) {
    console.error("Invalid element provided.");
    return null;
  }

  let children = Array.from(element.children)
    .map((child) => getFilteredElementTree(child as HTMLElement))
    .filter((child) => child !== null);

  // If a child has no classes but contains children with classes, reduce the hierarchy
  children = children.flatMap((child) =>
    child?.classes.length ? [child] : child?.children || []
  );

  if (element.classList.length || children.length) {
    return {
      tag: element.tagName.toLowerCase(),
      classes: Array.from(element.classList),
      children,
    };
  }

  return null;
};
