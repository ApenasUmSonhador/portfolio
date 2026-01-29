/* ===== FILTRO DE PROJETOS ===== */
document.addEventListener("DOMContentLoaded", () => {

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-item");

  let activeFilters = new Set();

  function applyFilters() {
    projects.forEach(project => {
      const categories = project.dataset.category.split(" ");
      const matches =
        activeFilters.size === 0 ||
        [...activeFilters].every(f => categories.includes(f));

      if (matches) {
        project.classList.remove("is-hidden");
      } else {
        project.classList.add("is-hidden");
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Reset geral
      if (filter === "all") {
        activeFilters.clear();
        filterButtons.forEach(b => b.classList.remove("active"));
        applyFilters();
        return;
      }

      // Toggle do filtro
      if (activeFilters.has(filter)) {
        activeFilters.delete(filter);
        btn.classList.remove("active");
      } else {
        activeFilters.add(filter);
        btn.classList.add("active");
      }

      applyFilters();
    });
  });

});