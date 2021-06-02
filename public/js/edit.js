// Api Catch Error
function editCatchError(message) {
  $(".form-wrapper .row").hide();
  $(".btn-update-save").hide();
  $(".form-wrapper").prepend(
    `<p class="text-center text-danger">${message}</p>`
  );
}

// Lấy thông tin user cần edit và render ra form

// Lấy user id
function getEditId() {
  let urlQueryPart = window.location.search;
  let urlParams = new URLSearchParams(urlQueryPart);
  return urlParams.get("id");
}

let editId = getEditId();

// Ready function
$(function () {
  getUserInfoApi(editId);
});

// Lấy thông tin user cần edit
function getUserInfoApi(id) {
  $.ajax({
    method: "GET",
    url: "/users/" + id,
  })
    .done(function (userEdit) {
      renderUserInfo(userEdit);
    })
    .fail(function () {
      renderUserInfo({});
      editCatchError("Học viên không tồn tại!");
    });
}

function renderUserInfo(user) {
  $("#first-name").val(user.firstName);
  $("#last-name").val(user.lastName);
  $("#birthday").val(user.birthday);
  $("#email").val(user.email);
  $("#phone").val(user.phone);
}

// Cập nhật thông tin mới cho user

function updateUserApi(user) {
  $.ajax({
    method: "PUT",
    url: "/users/" + user.id,
    data: user,
  })
    .done(function () {
      window.location.href = "/";
    })
    .fail(function () {
      editCatchError("Lỗi! Không thể cập nhật thông tin học viên!");
    });
}

// Button save - update user
$(".btn-update-save").click(function () {
  removeErrorStyle();
  validateInput();

  if (isValidInput) {
    let updatedUser = {
      id: editId,
      firstName: $("#first-name").val(),
      lastName: $("#last-name").val(),
      birthday: $("#birthday").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
    };

    updateUserApi(updatedUser);
  }
});
