$(document).ready(function () {
  function getDay(date) {
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return "" + date.getFullYear() + "-" + month + "-" + day;
  }

  var currentDate = new Date();

  var currentDay = getDay(currentDate);
  var currentTime =
    "" + currentDate.getHours() + ":" + currentDate.getMinutes();

  var yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  var yesterdayDay = getDay(yesterdayDate);

  $("#date").val(currentDay);

  function typeFinished() {
    setTimeout(validate, 0);
  }

  function validate() {
    var validName = false;
    var validComment = false;

    var name = $("#name").val();
    var comment = $("#comment").val();

    if (name == "" || name == undefined) {
      $("#name_error").show();
    } else {
      $("#name_error").hide();
      validName = true;
    }

    if (comment == "" || comment == undefined) {
      $("#comment_error").show();
    } else {
      $("#comment_error").hide();
      validComment = true;
    }

    return validName && validComment;
  }

  $("#name").on("input", function () {
    typeFinished();
  });

  $("#comment").on("input", function () {
    typeFinished();
  });

  $("#form").on("submit", (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = new FormData(e.target);
    const dataArray = [...data.entries()];
    const userName = dataArray[0][1];
    var userDate = dataArray[1][1];
    const userComment = dataArray[2][1];

    if (userDate == currentDay) {
      userDate = "сегодня, " + currentTime;
    } else if (userDate == yesterdayDay) {
      userDate = "вчера, 18:39";
    }

    const newListItem = document.createElement("li");
    const liName = document.createElement("p");
    liName.append(userName);
    $(liName).addClass("userName");
    const liComment = document.createElement("p");
    liComment.append(userComment);
    $(liComment).addClass("userComment");
    const liDate = document.createElement("p");
    liDate.append(userDate);
    $(liDate).addClass("userDate");

    const deleteButton = document.createElement("button");
    const iconDelete = document.createElement("i");
    $(iconDelete).addClass("fa fa-trash-o");
    deleteButton.append(iconDelete);

    $(deleteButton).addClass("delete");

    const likeButton = document.createElement("button");
    const iconLike = document.createElement("i");
    $(iconLike).addClass("fa fa-heart-o");
    likeButton.append(iconLike);

    $(likeButton).addClass("like");

    newListItem.append(liName);
    newListItem.append(liComment);
    newListItem.append(liDate);
    newListItem.append(deleteButton);
    newListItem.append(likeButton);

    $("#list").append(newListItem);

    $("#name_error").hide();
    $("#comment_error").hide();
    $("#name").val("");
    $("#comment").val("");
    $("#date").val(currentDay);

    $(deleteButton).on("click", function () {
      $(this).parent().remove();
    });

    $(deleteButton).hover(function () {
      $(this).find(".fa").toggleClass("fa-trash-o fa-trash");
    });

    $(likeButton).on("click", function () {
      $(this).find(".fa").toggleClass("fa-heart-o fa-heart");
    });
  });

  $("#form").keypress(function (event) {
    if (event.key === "Enter") {
      event.preventDefault();

      $("#form").submit();
      return false;
    }
  });
});
