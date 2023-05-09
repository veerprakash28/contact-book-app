// Add New Contact
const addContactForm = document.getElementById("addContactForm");
addContactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {
    first_name: document.getElementById("first_name").value,
    middle_name: document.getElementById("middle_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    phone_number_1: document.getElementById("phone_number_1").value,
    phone_number_2: document.getElementById("phone_number_2").value,
    address: document.getElementById("address").value,
  };

  fetch("/book/addContact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert("Contact Added Succesfully");
      window.location.href = "/";
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

// View All Contacts
window.addEventListener("load", () => {
  fetch("/book/viewAllContact")
    .then((response) => response.json())
    .then((data) => {
      const contacts = data.data;
      const contactListContainer = document.querySelector(
        ".contact-list-container"
      );

      if (contacts.length > 0) {
        contacts.forEach((contact) => {
          listingContacts(contact, contactListContainer);
        });
      } else {
        const message = document.createElement("h2");
        message.innerHTML = "No Contacts Added";
        contactListContainer.appendChild(message);
      }
    })
    .catch((error) => {
      console.error("Error fetching contacts:", error);
    });
});

// SEARCH AND DISPLAY CONTACT
const searchInput = document.querySelector('input[type="search"]');
searchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && searchInput.value.trim() === "") {
    window.location.href = "/";
  }
  if (event.keyCode === 13) {
    const query = searchInput.value;
    const response = await fetch(`/book/searchContact?searchValue=${query}`);
    const contacts = await response.json();

    const contactListContainer = document.querySelector(
      ".contact-list-container"
    );
    contactListContainer.querySelector("ul").innerHTML = "";

    if (contacts.data.length > 0) {
      contacts.data.forEach((contact) => {
        listingContacts(contact, contactListContainer);
      });
    } else {
      const message = document.createElement("h2");
      message.innerHTML = "No Contact Found";
      contactListContainer.appendChild(message);
    }
  }
});

// Function for listing Contacts
function listingContacts(contact, contactListContainer) {
  const listItem = document.createElement("li");
  const fullName =
    contact.first_name + " " + contact.middle_name + " " + contact.last_name;
  listItem.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between"
  );
  listItem.setAttribute("data-email", contact.email);
  const contactDetails = document.createElement("div");
  const contactName = document.createElement("h4");
  const contactPhone = document.createElement("p");
  const phoneDetails = document.createElement("div");
  const phoneIcon = document.createElement("i");

  contactName.innerText = fullName;
  contactPhone.innerText = contact.phone_number_1;
  phoneIcon.classList.add("bi", "bi-telephone");
  phoneDetails.classList.add("d-flex", "align-items-center");
  contactPhone.classList.add("contactPhone");
  contactDetails.appendChild(contactName);
  phoneDetails.appendChild(phoneIcon);
  phoneDetails.appendChild(contactPhone);
  contactDetails.appendChild(phoneDetails);

  const contactButtons = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  editButton.setAttribute("onclick", "editTask(this)");
  deleteButton.setAttribute("onclick", "removeTask(this)");

  editButton.classList.add("btn", "btn-warning", "mx-1");
  editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>';

  deleteButton.classList.add("btn", "btn-danger", "delete-btn");
  deleteButton.innerHTML =
    '<span class="material-symbols-outlined">delete</span>';

  contactButtons.appendChild(editButton);
  contactButtons.appendChild(deleteButton);

  listItem.appendChild(contactDetails);
  listItem.appendChild(contactButtons);

  contactListContainer.querySelector("ul").appendChild(listItem);
}

// DELETE THE CONTACT
function removeTask(buttonElement) {
  const listItem = buttonElement.closest(".list-group-item");
  const email = listItem.dataset.email;

  fetch("/book/deleteContact", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/";
      } else {
        throw new Error("Failed to delete contact");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to delete contact");
    });
}

// Editing a Contact
async function editTask(buttonElement) {
  const listItem = buttonElement.closest(".list-group-item");
  const email = listItem.dataset.email;
  console.log(email);
  const response = await fetch(`/book/searchContact?searchValue=${email}`);

  const contact = await response.json();
  const contactDetails = contact.data[0];

  console.log(contactDetails.middle_name);
  // create the modal element
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.setAttribute("id", "myModal");
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", "exampleModalLabel");
  modal.setAttribute("aria-hidden", "true");

  // create the modal dialog
  const modalDialog = document.createElement("div");
  modalDialog.classList.add(
    "modal-dialog",
    "modal-dialog-centered",
    "modal-lg"
  );
  modalDialog.setAttribute("role", "document");

  // create the modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // create the modal header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  // create the modal title
  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.setAttribute("id", "exampleModalLabel");
  modalTitle.textContent = "Update Existing Contact";

  // create the close button
  const closeButton = document.createElement("button");
  closeButton.setAttribute("type", "button");
  closeButton.classList.add("close");
  closeButton.setAttribute("data-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");
  closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

  // append the modal title and close button to the modal header
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // create the modal body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalBody.innerHTML = `<div class="form-container">
  <form id="updateContactForm">
    <div class="form-row">
      <div class="form-group col-md-4">
        <label for="first_name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first_name"
          name="first_name"
          placeholder="Enter First Name"
          value = ${contactDetails.first_name}
        />
      </div>
      <div class="form-group col-md-4">
        <label for="middle_name">Middle Name</label>
        <input
          type="text"
          class="form-control"
          id="middle_name"
          name="middle_name"
          placeholder="Enter Middle Name"
          value = ${contactDetails.middle_name}
        />
      </div>
      <div class="form-group col-md-4">
        <label for="last_name">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="last_name"
          name="last_name"
          placeholder="Enter Last Name"
          value = ${contactDetails.last_name}
        />
      </div>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        name="email"
        placeholder="Enter your Email"
        readonly
        value = ${contactDetails.email}
      />
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="phone_number_1">Phone Number 1</label>
        <input
          type="text"
          class="form-control"
          id="phone_number_1"
          name="phone_number_1"
          placeholder="Enter Phone Number"
          value = ${contactDetails.phone_number_1}
        />
      </div>
      <div class="form-group col-md-6">
        <label for="phone_number_2">Phone Number 2</label>
        <input
          type="text"
          class="form-control"
          id="phone_number_2"
          name="phone_number_2"
          placeholder="Enter Alternate Number"
          value = ${contactDetails.phone_number_2}
        />
      </div>
    </div>
    <div class="form-group">
      <label for="address">Address</label>
      <input
        type="text"
        class="form-control"
        id="address"
        placeholder="Apartment, studio, or floor"
        value = ${contactDetails.address}
      />
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        data-dismiss="modal"
      >
        Close
      </button>
      <button
        type="submit"
        class="btn btn-primary update-contact"
      >
        Update Contact
      </button>
    </div>
  </form>
</div>`;

  // append the header, body, and footer to the modal content
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  // append the modal content to the modal dialog
  modalDialog.appendChild(modalContent);

  // append the modal dialog to the modal
  modal.appendChild(modalDialog);

  // add the modal to the page
  document.body.appendChild(modal);

  // show the modal
  $("#myModal").modal("show");

  const updateContactFormDetails =
    modalBody.querySelector("#updateContactForm");

  updateContactFormDetails.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event.target);
    updateContact(event.target);
  });
}

function updateContact(form) {
  const formData = {
    first_name: form.elements["first_name"].value,
    middle_name: form.elements["middle_name"].value,
    last_name: form.elements["last_name"].value,
    email: form.elements["email"].value,
    phone_number_1: form.elements["phone_number_1"].value,
    phone_number_2: form.elements["phone_number_2"].value,
    address: form.elements["address"].value,
  };

  console.log(formData);
  fetch("/book/editContact", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert("Contact Updated Succesfully");
      window.location.href = "/";
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
