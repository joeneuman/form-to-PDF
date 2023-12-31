document.getElementById('pdfForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const pdfFile = document.getElementById('pdfFile').files[0];
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!pdfFile) {
        alert('Please select a PDF file.');
        return;
    }

    const fileBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(fileBuffer);
    
    // Get the form fields from the PDF
    const form = pdfDoc.getForm();
    const nameField = form.getTextField('Name');
    const emailField = form.getTextField('Email');

    // Set the values for the form fields
    nameField.setText(name);
    emailField.setText(email);

    // Serialize the PDF to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger a download for the user
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filled_form.pdf';
    link.click();

    
});

// Added for open close funchtion
document.getElementById('toggleButton').addEventListener('click', function() {
    var toggleFields = document.getElementById('toggleFields');
    var toggleButton = document.getElementById('toggleButton');

// Added isClosed for Saved State
var isClosed = toggleFields.style.display === 'none';


    if (toggleFields.style.display === 'none') {
        toggleFields.style.display = 'block';
        toggleButton.classList.remove('flipped');
    } else {
        toggleFields.style.display = 'none';
        toggleButton.classList.add('flipped');
    }

    // Save State
    localStorage.setItem('isClosed', !isClosed);


});
// Store Values
document.getElementById('name').addEventListener('change', function() {
    localStorage.setItem('name', this.value);
});

document.getElementById('email').addEventListener('change', function() {
    localStorage.setItem('email', this.value);
});


// On load, check the saved state
document.addEventListener('DOMContentLoaded', (event) => {
    var toggleFields = document.getElementById('toggleFields');
    var toggleButton = document.getElementById('toggleButton');
    var savedName = localStorage.getItem('name');
    var savedEmail = localStorage.getItem('email');

    const isClosed = localStorage.getItem('isClosed') === 'true';

    if (isClosed) {
        toggleFields.style.display = 'none';
        toggleButton.classList.add('flipped');
    } else {
        toggleFields.style.display = 'block';
        toggleButton.classList.remove('flipped');
    }

    if (savedName) {
        document.getElementById('name').value = savedName;
    }
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
    }
});


