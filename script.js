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

function toggleSeeMore(link) {
    const p = link.closest('p');
    const truncated = p.querySelector('.truncated-text');
    const dots = p.querySelector('.see-more-dots');
    
    // Use getComputedStyle instead of inline style check
    const isHidden = window.getComputedStyle(truncated).display === 'none';
    
    truncated.style.display = isHidden ? 'inline' : 'none';
    dots.style.display = isHidden ? 'none' : 'inline';
    link.textContent = isHidden ? 'See less' : 'See more';
}