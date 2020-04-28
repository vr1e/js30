const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

function scrollClear() {
  isDown = false;
  slider.classList.remove('active');
}

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;

  console.log({ x, startX });
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('mouseleave', scrollClear);
slider.addEventListener('mouseup', scrollClear);
