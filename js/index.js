getData();

//filter
$("form").submit(function (e) {
  e.preventDefault();

  let category = $("#category").val();

  let search = $("#search").val();

  getData(category, search, (page = 1));
});
