// Api Catch Error
function addCatchError() {
  $(".form-wrapper .row").hide();
  $(".btn-add-save").hide();
  $(".form-wrapper").prepend(
    `<p class="text-center text-danger">Lỗi! Không thể thêm học viên!</p>`
  );
}

// Add new user
function addUserApi(user) {
  $.ajax({
    method: "POST",
    url: "/users",
    data: user,
  })
    .done(function () {
      window.location.href = "/";
    })
    .fail(function () {
      addCatchError();
    });
}

// Button save - Add user
$(".btn-add-save").click(function () {
  removeErrorStyle();
  validateInput();

  if (isValidInput) {
    let newUser = {
      firstName: $("#first-name").val(),
      lastName: $("#last-name").val(),
      birthday: $("#birthday").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
    };

    addUserApi(newUser);
  }
});
