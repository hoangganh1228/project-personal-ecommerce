// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

// Sort

const buttonSort = document.querySelectorAll("[sort-button]");
// console.log(buttonSort);
if(buttonSort.length > 0) {
  let url = new URL(window.location.href);
  buttonSort.forEach(button => {
    console.log(button);
    button.addEventListener("click", (e) => {
      const value = e.target.value;
      // console.log(value);
      // e.preventDefault();
      const [sortKey, sortValue] = value.split("-");
      // console.log(sortKey)  ;
      // console.log(sortValue);
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
      e.target.classList.add('btn--primary');
      window.location.href = url.href;
    })
  })



}

// End Sort
