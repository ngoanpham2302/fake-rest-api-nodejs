// Validate Login input
let isValidLoginInput;

function validateLoginInput() {
  isValidLoginInput = true;

  validateEmail();
  validatePassword();

  return isValidLoginInput;
}

function validateEmail() {
  let emailRegex =
    /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let emailValue = $("#login-email").val().trim();

  if (emailValue === "") {
    $(".email-error").text("Vui lòng nhập địa chỉ email").show();
    isValidLoginInput = false;
  } else if (!emailRegex.test(emailValue)) {
    $(".email-error").text("Địa chỉ email không hợp lệ").show();
    isValidLoginInput = false;
  }
}

function validatePassword() {
  let passValue = $("#login-password").val().trim();

  if (passValue === "") {
    $(".pass-error").text("Vui lòng nhập mật khẩu").show();
    isValidLoginInput = false;
  }
}

$(".form-control").on("input", function () {
  $(this).next().text("").hide();
  $(".error-noti").text("").hide();
});

function removeErrorLoginStyle() {
  $(".error-noti").text("").hide();
  $(".email-error").text("").hide();
  $(".pass-error").text("").hide();
}

// Login Api
function userLoginApi(user) {
  $.ajax({
    method: "POST",
    url: "/login",
    data: user,
  })
    .done(function () {
      window.location.href = "/";
    })
    .fail(function () {
      $(".error-noti").text("Địa chỉ email hoặc mật khẩu không đúng").show();
    });
}

// Button Login

$(".btn-login").click(function () {
  removeErrorLoginStyle();
  validateLoginInput();

  if (isValidLoginInput) {
    let userLogin = {
      email: $("#login-email").val(),
      password: $("#login-password").val(),
    };

    userLoginApi(userLogin);
  }
});
