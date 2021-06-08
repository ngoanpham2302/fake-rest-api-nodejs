let currentPage = 1;
let sortQuery = "_sort=id&_order=desc";
let pageQuery = "_page=" + currentPage + "&_limit=2";
let searchValue = "";
let searchQuery = "q=" + searchValue;
let pageLimitUsers = 2;
let maxPages = 5;
let pageDiff;

function getUsersFail() {
  renderAllUsers([]);
  $(".table-responsive").children("p").remove();
  $(".table-responsive").append(
    "<p class='text-center text-danger'>Không tìm thấy học viên!</p>"
  );
}

// Ready function
$(function () {
  getUsersByPageApi(currentPage);
});

// Render thông tin tất cả users ra bảng
function renderAllUsers(userArr) {
  let tbodyContent = "";

  for (let i = 0; i < userArr.length; i++) {
    let user = userArr[i];
    tbodyContent += `<tr>
              <th scope="row">${user.firstName} ${user.lastName}</th>
              <td>${user.birthday || "Chưa có thông tin"}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td class="text-center td-edit">
                <a
                  href="./html/edit.html?id=${user.id}"
                  class="btn-edit link-success text-decoration-none px-1"
                >
                  <i class="fas fa-edit"></i>
                  <span>Chỉnh sửa</span>
                </a>
                <a
                  href="#"
                  class="btn-remove-${
                    user.id
                  } link-danger text-decoration-none px-1"
                  data-bs-toggle="modal"
                  data-bs-target="#removeUserModal"
                  onclick="removeUser(${user.id})"
                >
                  <i class="fas fa-trash-alt"></i>
                  <span>Xóa</span>
                </a>
              </td>
            </tr>`;
  }

  $("table tbody").html(tbodyContent);
}

// Remove user
function removeUserApi(id, btnRemoveClass) {
  $.ajax({
    method: "DELETE",
    url: "/users/" + id,
  })
    .done(function () {
      $(btnRemoveClass).parent().parent().remove();
    })
    .fail(function () {
      alert("Lỗi! Không thể xóa học viên này!");
    });
}

// Button remove user
let userId;

function removeUser(id) {
  userId = id;
}

// Button confirm remove (modal)
$(".btn-confirm").click(function () {
  removeUserApi(userId, `.btn-remove-${userId}`);
});

//******************************//

// Pagination
function getUsersByPageApi(pageNumber) {
  pageQuery = "_page=" + pageNumber + "&_limit=2";

  $.ajax({
    method: "GET",
    url: "/users?" + sortQuery + "&" + pageQuery + "&" + searchQuery,
  })
    .done(function (pageUsers) {
      renderAllUsers(pageUsers);
      changePrevNextStatus();
    })
    .fail(function () {
      getUsersFail();
    });
}

// Page number button
$(".page-number").click(function () {
  $(".page-number").removeClass("active");
  $(this).addClass("active");

  currentPage = Number($(this).children().text());
  getUsersByPageApi(currentPage);
});

// Page prev button
$(".prev-page").click(function () {
  if (currentPage > 1) {
    currentPage--;
  } else {
    currentPage = 1;
  }

  $(".page-number").removeClass("active");
  $($(".page-number")[currentPage - 1]).addClass("active");
  getUsersByPageApi(currentPage);
});

// Page next button
$(".next-page").click(function () {
  if (currentPage < maxPages) {
    currentPage++;
  } else {
    currentPage = maxPages;
  }

  $(".page-number").removeClass("active");
  $($(".page-number")[currentPage - 1]).addClass("active");
  getUsersByPageApi(currentPage);
});

// Add/remove class active for page prev/next button
function changePrevNextStatus() {
  if (currentPage > 1) {
    $(".prev-page").removeClass("disabled-btn");
  } else {
    $(".prev-page").addClass("disabled-btn");
  }

  if (currentPage < maxPages) {
    $(".next-page").removeClass("disabled-btn");
  } else {
    $(".next-page").addClass("disabled-btn");
  }
}

//******************************//

// Sort users by properties
let isAsc = false;

function getUsersBySortApi(sortQuery) {
  $.ajax({
    method: "GET",
    url: "/users?" + sortQuery + "&" + pageQuery + "&" + searchQuery,
  })
    .done(function (users) {
      renderAllUsers(users);
    })
    .fail(function () {
      getUsersFail();
    });
}

// Table header - click to sort
$(".table-header").click(sortUsers);

function sortUsers() {
  setSortStyle(this);
  let dataSort = $(this).attr("data-sort");

  if (!isAsc) {
    if (dataSort == "name") {
      sortQuery = getSortQuery("firstName,lastName", "asc,asc");
    } else {
      sortQuery = getSortQuery(dataSort, "asc");
    }

    showSortupIcon(this);
    isAsc = true;
  } else {
    if (dataSort == "name") {
      sortQuery = getSortQuery("firstName,lastName", "desc,desc");
    } else {
      sortQuery = getSortQuery(dataSort, "desc");
    }

    showSortDownIcon(this);
    isAsc = false;
  }

  getUsersBySortApi(sortQuery);
}

// Get sort query
function getSortQuery(sort, order) {
  sortParams = "_sort=" + sort + "&_order=" + order;
  return sortParams;
}

// Set CSS style for sort icon
function setSortStyle(element) {
  $(".table-header").not(element).find(".sortdown-btn").addClass("d-none");
  $(".table-header").not(element).find(".sortup-btn").addClass("d-none");
  $(".table-header").not(element).find(".sort-btn").removeClass("d-none");
}

function showSortupIcon(element) {
  $(element).find(".sort-btn").addClass("d-none");
  $(element).find(".sortdown-btn").addClass("d-none");
  $(element).find(".sortup-btn").removeClass("d-none");
}

function showSortDownIcon(element) {
  $(element).find(".sort-btn").addClass("d-none");
  $(element).find(".sortup-btn").addClass("d-none");
  $(element).find(".sortdown-btn").removeClass("d-none");
}

//******************************//

// Search for users
function getUsersBySearchApi(searchQuery) {
  $.ajax({
    method: "GET",
    url: "/users?" + sortQuery + "&" + pageQuery + "&" + searchQuery,
  })
    .done(function (users) {
      renderAllUsers(users);
    })
    .fail(function () {
      getUsersFail();
    });
}

// Search input event listener
$("#search-input").keyup(function () {
  searchValue = $("#search-input").val();
  searchQuery = "q=" + searchValue;

  // Take back to page 1, update pageQuery
  currentPage = 1;
  pageQuery = "_page=1&_limit=2";
  $(".page-number").removeClass("active");
  $($(".page-number")[0]).addClass("active");

  getUsersBySearchApi(searchQuery);
});
