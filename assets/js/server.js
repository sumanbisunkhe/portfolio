document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS with your User ID
  emailjs.init('-KHPB6onwPIp6Xh9u');

  const form = document.getElementById('contact-form');
  const statusMessage = document.getElementById('contact-status');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);
    const data = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    // Sending the email
    emailjs.send('service_erfg3dm', 'template_97y8emc', data)
      .then((response) => {
        statusMessage.innerText = 'Message sent successfully!';
        statusMessage.className = 'status success';
        form.reset(); // Clear form fields

        // Clear the status message after 5 seconds
        setTimeout(() => {
          statusMessage.innerText = '';
          statusMessage.className = '';
        }, 5000);
      }, (error) => {
        statusMessage.innerText = 'Failed to send message. Please try again.';
        statusMessage.className = 'status error';

        // Clear the status message after 5 seconds
        setTimeout(() => {
          statusMessage.innerText = '';
          statusMessage.className = '';
        }, 5000);
      });
  });
});
