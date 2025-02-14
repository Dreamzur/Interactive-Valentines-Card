const buttons = document.querySelectorAll('.button-section button');
const gif = document.getElementById('intro-gif');
const text = document.querySelector('.text-section');
const noButton = document.querySelector('.no-button');
const yesButton = document.querySelector('.yes-button');

const scenes = [
    // scene 1
    {
        yes: {
            gif: "https://i.pinimg.com/originals/38/20/04/38200478b91db2d19a12ecf4672391c9.gif",
            text: "Sick! I didn't think I'd get this far...",
            buttonText: "Continue...",
            buttonTextNo: "I'm out!"
        },
        no: {
            gif: "https://media4.giphy.com/media/7SF5scGB2AFrgsXP63/giphy.gif?cid=6c09b952jfyzy2kr9dlkanmt8x4bgb64usrq41zfmxq0vp9s&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g",
            text: "Why would you press such a thing :c",
            buttonText: "I'll go again!",
            buttonTextNo: "Nah"
        }
    },
    // scene 2
    {
        yes: {
            gif: "https://i.pinimg.com/originals/bb/ce/52/bbce52e7c5117fbe92e7ad43bc6162f8.gif",
            text: "Now, you're trapped... you can't press No.",
            buttonText: "I'm just kidding..",
            action: moveNoButton,
        },
        no: {
            gif: "https://media4.giphy.com/media/Ayc5wbcZM5Xyw/giphy.gif?cid=6c09b952656e0owz3w5j3tbme18z7jukn23ahhyot2s9b81v&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            text: "Are you sure?",
            buttonTextNo: "Hell yeah! I'm out!",
            buttonText: "On second thought..."
        }
    },
    // scene 3
    {
        yes: {
            gif: "https://i.pinimg.com/originals/42/fb/a8/42fba891f5f950f69ab8de1b1f818884.gif",
            text: "Now that I really have your attention... I wanted to ask...",
            buttonText: "Yes?"
        },
        no: {
            gif: "https://media0.giphy.com/media/98MaHVwJOmWMz4cz1K/200w.gif?cid=6c09b952eeh44cexxdtyrt5721ym8n3kq1jiuz99oeqp8c2g&ep=v1_gifs_search&rid=200w.gif&ct=g",
            text: "Are you sure? I wanted to ask you something...",
            buttonText: "Fine, what is it?",
            buttonTextNo: "Goodbye"
        }
    },
    // scene 4
    {
        yes: {
            gif: "https://gifdb.com/images/high/tom-cat-with-heart-eyes-vv9c69scptx7jiqo.gif",
            text: "Will you be my valentine?",
            action: () => {
                yesButton.style.transform = "scale(4.5) translateY(15px)";
                noButton.style.transform = "scale(0.3) translate(300px, -50px)";
            }
        },
        no: {
            gif: "https://media.tenor.com/9RCIDZjkhBsAAAAM/hamster-meme.gif",
            text: "This is goodbye",
            action: () => {
                let goodbyeAudio = new Audio("utils/worlds-smallest-violin.mp3");
                goodbyeAudio.play();
                yesButton.style.display = "none";
                noButton.style.display = "none";
            }
        }
    }
];
let currentScene = 0;
let speed = 0.5;

function moveNoButton() {
    const randomX = Math.floor(Math.random() * (window.innerWidth - noButton.clientWidth));
    const randomY = Math.floor(Math.random() * (window.innerHeight - noButton.clientHeight));

    noButton.style.position = "absolute";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;

    noButton.style.transition = `top ${speed}s ease, left ${speed}s ease`;
}
function nextScene(choice) {
    
    if (currentScene < scenes.length) {
        yesButton.style.transform = "scale(1)";
        noButton.removeEventListener("mouseover", moveNoButton);
        noButton.style.position = "";

        const sceneData = scenes[currentScene][choice];
        gif.src = sceneData.gif;
        text.textContent = sceneData.text;
        
        if (sceneData.buttonText) {
            yesButton.textContent = sceneData.buttonText;
        } else {
            yesButton.textContent = "Yes";
        }

        if (sceneData.buttonTextNo) {
            noButton.textContent = sceneData.buttonTextNo;
        } else {
            noButton.textContent = "No";
        }

        if (sceneData.action === moveNoButton) {
            noButton.addEventListener("mouseover", moveNoButton);
            noButton.addEventListener("touchstart", moveNoButton); // possible fix to mobile touch
        } else if (sceneData.action) {
            sceneData.action();
        }

        currentScene++;
    } else if (currentScene === 4 && choice === "no") {
        gif.src ='https://media.tenor.com/9RCIDZjkhBsAAAAM/hamster-meme.gif';
        text.textContent = "This is goodbye!";
        yesButton.style.display = "none";
        noButton.style.display = "none";
        let goodbyeAudio = new Audio("utils/worlds-smallest-violin.mp3");
        goodbyeAudio.play();
    } else {
        gif.src ='https://i.pinimg.com/originals/fe/8e/bb/fe8ebb590e8eb5b76ae59e5d56dbf7f2.gif';
        text.textContent = "I'll see you later ;)";
        yesButton.style.display = "none";
        noButton.style.display = "none";
    }
}

yesButton.addEventListener("click", () => nextScene("yes"));
noButton.addEventListener("click", () => nextScene("no"));