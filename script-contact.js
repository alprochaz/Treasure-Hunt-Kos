// Script pro contact form
const contactForm = document.querySelector("#contact-form")
contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    contactForm.innerHTML = `
         <p>Contact form currently out of order. </p>
         <p>Please send an email directly to: treasure.hunt.kos@gmail.com</p>
         <p>Thank you.</p>
    `
})