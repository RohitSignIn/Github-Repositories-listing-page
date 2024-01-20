$(document).ready(function () {
  $(`#perPage option[value=${per_page}]`).prop("selected", true);
  $("#perPage").on("change", function () {
    if (per_page != this.value) {
      window.location.replace(
        `index.html?user=usernames&page=${page}&per_page=${this.value}`
      );
    }
  });
});
