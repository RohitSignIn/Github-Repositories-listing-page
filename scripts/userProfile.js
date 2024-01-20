$(document).ready(function () {
  urlParams = new URLSearchParams(window.location.search);

  // Global Variables
  username = urlParams.get("user");
  page = urlParams.get("page") ? urlParams.get("page") : 1;
  per_page = urlParams.get("per_page") ? urlParams.get("per_page") : 10;

  public_repos = 0;

  const apiUserDetail = "https://api.github.com/users/" + username;

  $.ajax({
    type: "get",
    url: apiUserDetail,
    beforeSend: function () {
      $(".loader_con").show();
    },
    complete: function () {
      $(".loader_con").hide();
    },
    success: function (response) {
      $("#user_img img").attr("src", response.avatar_url);
      $("#user_info h1").text(response.name);
      $("#bio").text(response.bio ? response.bio : "");
      $("#other_platform p a").text(
        response.login ? "Twitter: http://twitter.com/" + response.login : ""
      );
      $("#user_img p a").text(response.html_url);
      $("#user_img p a").attr("href", response.html_url);

      if (response.location) {
        $("#location section").attr("id", "pin");
        $("#location p").text(response.location);
      } else {
        $("#location p").text("");
      }

      pagination(response.public_repos);
    },
  });
});
