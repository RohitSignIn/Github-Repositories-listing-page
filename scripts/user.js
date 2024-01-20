$(document).ready(function () {
  urlParams = new URLSearchParams(window.location.search);
  username = urlParams.get("user");

  const apiUserDetail = "https://api.github.com/users/" + username;

  $.ajax({
    type: "get",
    url: apiUserDetail,
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
    },
  });
});
