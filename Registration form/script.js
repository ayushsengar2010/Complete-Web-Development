document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var firstName = this.elements.firstName.value;
    var lastName = this.elements.lastName.value;
    var email = this.elements.email.value;
  
    var table = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = firstName;
    cell2.innerHTML = lastName;
    cell3.innerHTML = email;
  
    this.reset();
  });