export const animateCSS = (
  element: string,
  animation: string,
  prefix = 'animate__'
) =>
  // We create a Promise and return it
  new Promise((resolve) => {
    try {
      const animationName = `${prefix}${animation}`;
      const node = document.querySelector(element);
      if (node) {
        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event: any) {
          event.stopPropagation();
          node!.classList.remove(`${prefix}animated`, animationName);
          resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {
          once: true,
        });
      }
    } catch (e) {
      console.error('could not animateCSS', e);
    }
    resolve(true);
  });
