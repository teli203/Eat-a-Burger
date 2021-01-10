$(function () {
  $(".change-status").on("click", function (event) {
      const id = $(this).data("id");
      const newStatus = $(this).data("newstatus");

      const newStatusState = {
          eaten: newStatus
      };

      // Send the PUT request //
      $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: newStatusState
      }).then(
          function () {
              console.log("changed status to", newStatus);
              // Reload the page to get the updated list //
              location.reload();
          }
      );
  });

  $(".create-form").on("submit", function (event) {
      event.preventDefault();

      const newBurger = {
          name: $("#burger").val().trim(),
      };

      // Send the POST request //
      $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
      }).then(
          function () {
              console.log("created new burger:", newBurger);
              
              location.reload();
          }
      );
  });

  $(".delete-burger").on("click", function (event) {
      const id = $(this).data("id");

      // Send the DELETE request //
      $.ajax("/api/burgers/" + id, {
          type: "DELETE"
      }).then(
          function () {
              console.log("deleted burger", id);
              
              location.reload();
          }
      );
  });
});
