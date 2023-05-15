class Contact {
    constructor(name, number, id) {
      this.name = name;
      this.number = number;
      this.id = id;
    }
  }
  
  class UI {
    static addContactToList(contact) {
      let tbody = document.querySelector("tbody");
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.number}</td>
        <td>${contact.id}</td>
        <td><a href="#" class="btn btn-danger remove">X</a></td>
      `;
      tbody.appendChild(row);
    }
  
    static clearInput() {
      document.querySelector("#name").value = "";
      document.querySelector("#number").value = "";
      document.querySelector("#id").value = "";
    }
  
    static removeContact(element) {
      if (element.classList.contains("remove")) {
        element.parentElement.parentElement.remove();
      }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }
  }

  class Store{
    static getContact() {
       let contacts;
       if (localStorage.getItem("contacts") === null) {
          contacts = [];
       } else {
          contacts = JSON.parse(localStorage.getItem("contacts"));
       }
       console.log(contacts);
       return contacts
    }
 
    static addContact(contact) {
       const contacts = Store.getContact();
       contacts.push(contact);
       localStorage.setItem('contacts', JSON.stringify(contacts));
    }
 
    static removeContact(id) {
       const contacts = Store.getContact();
       contacts.forEach((contact, i) => {
          if (contact.id === id) {
             contacts.splice(i, 1);
          }
       });
       localStorage.setItem('contacts', JSON.stringify(contacts));
    }
 }
 

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    let name = document.querySelector("#name").value;
    let number = document.querySelector("#number").value;
    let id = document.querySelector("#id").value;
  
    if (name === "" || number === "" || id === "") {
      UI.showAlert("Заповніть поля для додавання контакту", "danger")
    } else {
      let contact = new Contact(name, number, id);
      UI.addContactToList(contact);
      Store.addContact(contact);
      UI.clearInput();
      UI.showAlert("Контакт додано!", "success")
    }
  });

  document.querySelector("tbody").addEventListener("click", (e) => {
    UI.removeContact(e.target);
    UI.showAlert("Контакт видалено!", "warning")
    Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
  });
  


