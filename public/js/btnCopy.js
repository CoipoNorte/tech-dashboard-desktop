document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const selector = btn.getAttribute('data-copy');
    const target = document.querySelector(selector);
    if (target) {
      const text = target.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = '<i class="bi bi-clipboard-check text-success"></i>';
        setTimeout(() => {
          btn.innerHTML = '<i class="bi bi-clipboard"></i>';
        }, 1500);
      }).catch(err => {
        console.error('Error al copiar:', err);
      });
    }
  });
});