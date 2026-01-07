const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// const toggle = document.getElementById('darkToggle');
//   toggle.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
// });

function toggleMobileMenu(){
	document.getElementById("menu").classList.toggle("active");
};
