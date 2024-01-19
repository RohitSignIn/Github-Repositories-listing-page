$(document).ready(function () {
  apiRepos = `https://api.github.com/users/${username}/repos?page=1&per_page=10`;

  function getLanguagesUsed(url) {
    let languages = "";
    $.ajax({
      type: "get",
      url: url,
      success: function (response) {
        if (response) {
          Object.keys(response).forEach((key, val) => {
            languages = `<p>${key}</p> ${languages}`;
          });
          console.log(languages);
          return languages;
        }
      },
    });
  }

  $.ajax({
    type: "get",
    url: apiRepos,
    success: function (response) {
      response.map((repo) => {
        $("#repo_container").append(`
      <section class="repo">
                <p>${repo.name}</p>
                <p>${repo.description ? repo.description : ""}</p>
                <section>
                    ${console.log(getLanguagesUsed(repo.languages_url))}
                    ${getLanguagesUsed(repo.languages_url)}
                </section>
            </section>`);
      });
    },
  });
});
