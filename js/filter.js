const filter = document.getElementById("filter");

filter.addEventListener("input", (e) => {
  const value = e.target.value;
  const flags = document.querySelectorAll(".flag");
  flags.forEach((flag) => {
    if (flag.textContent.toLowerCase().includes(value.toLowerCase())) {
      flag.style.display = "block";
    } else {
      flag.style.display = "none";
    }
  });
});
