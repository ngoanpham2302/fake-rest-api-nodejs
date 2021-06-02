// Ready function
$(function () {
  getAllUsersApi();
});

function getAllUsersApi() {
  $.ajax({
    method: "GET",
    url: "/users",
  })
    .done(function (users) {
      renderAllUsers(users);
    })
    .fail(function () {
      renderAllUsers([]);
      $(".table-responsive").append(
        "<p class='text-center text-danger'>Không tìm thấy học viên!</p>"
      );
    });
}

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
