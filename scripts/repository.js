$(document).ready(function () {
  const page = urlParams.get("page") ? urlParams.get("page") : 1;
  const per_page = urlParams.get("per_page") ? urlParams.get("per_page") : 10;

  apiRepos = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}`;

  function getLanguagesUsed(url, callback) {
    return $.ajax({
      type: "get",
      url: url,
      success: callback,
    });
  }

  $.ajax({
    type: "get",
    url: apiRepos,
    success: function (response) {
      response.forEach((repo) => {
        // Entering Data in Repo Container

        // Main Repo that - Initial Repo
        const mainRepo = $("<section></section>").addClass("repo");

        // Repo Data
        const repoName = $("<p></p>").text(repo.name);

        const repoBio = repo.description
          ? $("<p></p>").text(repo.description)
          : false;

        const languages = repo.languages_url ? $("<section></section>") : false;
        if (languages) {
          getLanguagesUsed(repo.languages_url, function (data) {
            Object.keys(data).forEach((key) => {
              const lang = $("<p></p>").text(key);
              languages.append(lang);
            });
          });
        }

        // Appending prepared data in mainRepo
        mainRepo.append(repoName);
        if (repoBio) mainRepo.append(repoBio);
        if (languages) mainRepo.append(languages);

        // Final Append prepared repo in repo container
        $("#repo_container").append(mainRepo);
      });
    },
  });
});
