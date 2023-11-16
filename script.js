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

    document.getElementById('toggleButton').addEventListener('click', function() {
        var nameField = document.getElementById('name').parentNode;
        var emailField = document.getElementById('email').parentNode;
    
        if (nameField.style.display === 'none') {
            nameField.style.display = 'block';
            emailField.style.display = 'block';
        } else {
            nameField.style.display = 'none';
            emailField.style.display = 'none';
        }
    });
});
