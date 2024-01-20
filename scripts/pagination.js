function pagination(publicRepos) {
  pages = Math.ceil(publicRepos / per_page);

  for (let i = 1; i <= pages; i++) {
    pageLink = `/index.html?user=rohitsignin&page=${i}&per_page=${per_page}`;
    const pageNode = $("<a></a>").attr("href", pageLink);
    pageNode.text(i);

    $("#pages").append(pageNode);
  }
}
