$(document).ready(function () {
  function getLanguagesUsed(url, callback) {
    return $.ajax({
      type: "get",
      url: url,
      beforeSend: function () {
        $(".loader_con").show();
      },
      complete: function () {
        $(".loader_con").hide();
      },
      success: callback,
    });
  }

  function getRepository(apiRepos) {
    $.ajax({
      type: "get",
      url: apiRepos,
      beforeSend: function () {
        $(".loader_con").show();
      },
      complete: function () {
        $(".loader_con").hide();
      },
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

          const languages = repo.languages_url
            ? $("<section></section>")
            : false;
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
  }

  const apiRepos = `https://api.github.com/users/${username}/repos?type=owner&sort=updated&direction=desc&per_page=${per_page}&page=${page}`;

  getRepository(apiRepos);
});
