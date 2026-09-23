//get data function
async function getData(category = "business", search = "", page = 1) {
  let parameters = new URLSearchParams({
    category: category,
    q: search, //in documentation
    from: "2026-08-23",
    sortBy: "publishedAt",
    apiKey: "1c0432d22fca44d98a2ac0f2529e7540",
    pageSize: 10, //at any time =10
    page: page,
  });

  let myResponse = await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`);

  let myData = await myResponse.json();

  console.log(myData);

  showData(myData, page);
}

//show data
function showData(data, currentPage) {
  let numberOfPages = Math.ceil(data.totalResults / 10),
    news = data.articles,
    dataRow = $(".data .container .row");

  dataRow.html("");
  //.html method exist on jQuery and if we select elements by js we must not use it

  if (news.length > 0) {
    for (let item of news) {
      dataRow.append(cardComponents(item));
    }

    $(".pagination").html(preparePagination(currentPage, numberOfPages));
  } else {
    showNoResultsMessage();
  }
}

//cardComponents
function cardComponents(item) {
  return `
    <div class="col-lg-4 mb-4 d-flex">
      <div class="card h-100 w-100">
        <img src="${item.urlToImage}" onerror="this.src='../images/photo_2026-09-23_12-45-03.jpg'" class="card-img-top" >
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.title.slice(0, 25)}</h5>
          <p class="card-text flex-grow-1">${item.description ?? "No description available."}</p>
          <a href="${item.url}" target="_blank" class="btn btn-primary">See more</a>
        </div>
      </div>
    </div>
  `;
}

//prepare pagination
function preparePagination(currentPage, totalPages) {
  let lis = `<li class='page-item ${currentPage == 1 ? "disabled" : ""}'><a class="page-link" onclick="paginate(${currentPage > 1 ? currentPage - 1 : 1})">Previous</a></li>`;

  for (let i = 1; i <= totalPages; i++) {
    lis += `<li class="page-item ${currentPage == i ? "active" : ""}"><a class="page-link" onclick="paginate(${i})">${i}</a></li>`;
  }

  lis += `<li class='page-item ${currentPage == totalPages ? "disabled" : ""}'><a class="page-link" onclick="paginate(${currentPage < totalPages ? currentPage + 1 : totalPages})">Next</a></li>`;

  return lis;
}

//paginate
function paginate(pageNumber) {
  let category = $("#category").val();

  let search = $("#search").val();

  getData(category, search, pageNumber);
}

//no found search message
function showNoResultsMessage() {
  let dataRow = $(".data .container .row");

  dataRow.html(`
    <div class="col-12 text-center py-5">
      <i class="fa-solid fa-newspaper" style="font-size: 48px; color: #bf953f; margin-bottom: 16px;"></i>
      <h4 style="color: #fcf6ba;">No results found</h4>
      <p style="color: #a8a8a8;">Try a different search or category.</p>
    </div>
  `);
}
