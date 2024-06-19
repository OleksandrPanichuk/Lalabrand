const IMAGES_PER_VIEW = 3;

export function getSlides(
  currentIndex: number,
  data: string[],
  perView: number = IMAGES_PER_VIEW,
): string[] {
  const images = [...data];
  const lastIndex = currentIndex + perView;

  if (lastIndex > images.length - 1) {
    const endIndex = lastIndex - images.length;
    const firstPart = images.slice(currentIndex + 1);
    const secondPart = images.slice(0, endIndex + 1);

    return firstPart.concat(secondPart);
  } else {
    return images.splice(currentIndex + 1, perView);
  }
}
