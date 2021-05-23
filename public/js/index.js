// Ready function
$(function () {
  getAllUsers();
});

function getAllUsers() {
  $.ajax({
    method: "GET",
    url: "/users",
  }).done(function (users) {
    renderAllUsers(users);
  });
}

// Render thông tin tất cả users ra bảng
function renderAllUsers(userArr) {
  let tbodyContent = "";

  for (let i = 0; i < userArr.length; i++) {
    tbodyContent += `<tr>
            <th scope="row">${userArr[i].firstName} ${userArr[i].lastName}</th>
              <td>${userArr[i].birthday || "Chưa có thông tin"}</td>
              <td>${userArr[i].email}</td>
              <td>${userArr[i].phone}</td>
              <td class="text-center td-edit">
                <a
                  href="./html/edit.html"
                  class="btn-edit link-success text-decoration-none px-1"
                >
                  <i class="fas fa-edit"></i>
                  <span>Chỉnh sửa</span>
                </a>
                <a
                  href="#"
                  class="btn-remove-${
                    userArr[i].id
                  } link-danger text-decoration-none px-1"
                  data-bs-toggle="modal"
                  data-bs-target="#removeModal"
                  onclick="removeUser(${userArr[i].id})"
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
function removeUserApi(id, btnClass) {
  $.ajax({
    method: "DELETE",
    url: "/users/" + id,
  }).done(function () {
    $(btnClass).parent().parent().remove();
  });
}

// Button remove user
let userId;

function removeUser(id) {
  userId = id;
}

// Confirm remove (modal)
$(".btn-confirm").click(function () {
  removeUserApi(userId, `.btn-remove-${userId}`);
});
