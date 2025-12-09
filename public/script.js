"use strict";

(function () {

  window.addEventListener("load", init);
  function init() {

    let newButton = id("new-event-btn");
    newButton.addEventListener("click", function () {
      id("form-popup").style.display = "block";
    });

    let saveButton = id("save-event");
    saveButton.addEventListener("click", function (e) {
      e.preventDefault();
      submitForm();
    });

    let closeButton = id("cancel-btn");
    closeButton.addEventListener("click", function (e) {
      id("form-container").reset();
      id("form-popup").style.display = "none";
    });

  }

  function submitForm() {
    let params = new FormData(id("form-container"));
    let jsonBody = JSON.stringify(Object.fromEntries(params));
    fetch("/events/", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: jsonBody,
    })
      .then(() => {
        window.location.href = '/events';
      })

      .catch(alert);
  }

  let updateButton = id("update-event");
  updateButton.addEventListener("click", function (e) {
      e.preventDefault();
      updateForm();
  });

  function updateForm() {
    let form = id("update-event-form");
    let params = new FormData(form);
    let jsonBody = JSON.stringify(Object.fromEntries(params));

    let urlParts = window.location.pathname.split("/");
    let eventId = urlParts[urlParts.length - 1];

    fetch(`/events/${eventId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: jsonBody
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to update event");
        }
        window.location.href = "/events";
      })
      .catch(alert);
  }

  let deleteButtons = qsa(".delete-event");
  for (let index = 0; index < deleteButtons.length; index++) {
    const element = deleteButtons[index];
    element.addEventListener("click", function (e) {
      let myId = e.currentTarget.getAttribute("id");
      deleteEvent(e.currentTarget.getAttribute("id"));
    });

  }

  function deleteEvent(eventId) {
    console.log("/events/" + eventId);
    fetch("/events/" + eventId, {
      method: "DELETE"
    })
      .then(() => {
        window.location.href = '/events';
      })
      .catch(alert);
  }


  function id(idName) {
    return document.getElementById(idName);
  }

  function qsa(className) {
    return document.querySelectorAll(className);
  }

})();