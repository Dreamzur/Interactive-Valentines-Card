const buttons = document.querySelectorAll('.button-section button');
const gif = document.getElementById('intro-gif');
const text = document.querySelector('.text-section');
const noButton = document.querySelector('.no-button');
const yesButton = document.querySelector('.yes-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();

        if (buttonText === 'Yes') {
            gif.src = 'https://i.pinimg.com/originals/38/20/04/38200478b91db2d19a12ecf4672391c9.gif';
            text.textContent = "Sick! I didn't think I'd get this far..."
            noButton.disabled = true;
            yesButton.style.transform = "scale(1) translate(0)";
            yesButton.style.backgroundColor = "";

            // after user presses 'yes', 3 second wait and 'yes' screen is updated
            setTimeout(() => {
                gif.src = 'https://i.pinimg.com/originals/bb/ce/52/bbce52e7c5117fbe92e7ad43bc6162f8.gif'
                text.textContent = "Now, you're trapped... you can't press no."
                noButton.style.display = "";
                noButton.disabled = false;
                noButton.addEventListener('mouseover', () => {
                    const randomX = Math.floor(Math.random() * (window.innerWidth - noButton.clientWidth));
                    const randomY = Math.floor(Math.random() * (window.innerHeight - noButton.clientHeight));

                    noButton.style.position = "absolute";
                    noButton.style.left = `${randomX}px`;
                    noButton.style.top = `${randomY}px`;

                    speed -= 0.05;
                    noButton.style.transition = `top ${speed}s ease, left ${speed}s ease`;
                });
            }, 3000);
        } else if (buttonText === 'No') {
            gif.src ='https://media4.giphy.com/media/7SF5scGB2AFrgsXP63/giphy.gif?cid=6c09b952jfyzy2kr9dlkanmt8x4bgb64usrq41zfmxq0vp9s&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g'
            text.textContent = "Really? Breaking my heart already... :("

            // after user presses 'no', 3 second wait and 'no' screen is updated
            setTimeout(() => {
                gif.src = 'https://pa1.aminoapps.com/6056/6cb9c95f38bd41dce307df9ae6fe7ea9bcd051c2_hq.gif'
                text.textContent = "I'm gonna give you another chance to say yes..."
                noButton.style.display = "none";
                yesButton.style.transform = "scale(5.5) translateY(15px)";
                yesButton.style.backgroundColor = "green";
            }, 3000);
        }
    });
});