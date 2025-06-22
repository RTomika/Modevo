
const moreMsgBtn = document.querySelectorAll(".moreMsgBtn");

moreMsgBtn.forEach(moreMsgB => {
    moreMsgB.parentElement.addEventListener("mouseover", () => {
        moreMsgB.style.opacity = "1";
    })
    moreMsgB.parentElement.addEventListener("mouseleave", () => {
        moreMsgB.style.opacity = "0";
    })
})

const contentCont = document.getElementById("contentCont");
const overlay = document.getElementById("overlay");

document.querySelectorAll('.moreMsgBtn').forEach(button => {
        button.addEventListener('click', function () {
            const data = {
                name: this.dataset.name,
                email: this.dataset.email,
                message: this.dataset.message,
                date: this.dataset.date
            }

            contentCont.innerHTML = `
            <div class="showCont">
                <h2 class="text-center nameShow">${data.name}</h2>
                <h4 class="text-center emailShow">${data.email}</h4>
                <p class="text-center messageShow">${data.message}</p>
                <hr>
                <h6 class="dateShow">Sent at: ${data.date}</h6>
            </div>
            `
            contentCont.style.display = "block";
            overlay.style.display = "block";

            setTimeout(() => {
                contentCont.classList.add("show");
                overlay.style.opacity = "1";
            }, 100);
        });
    });

    document.addEventListener("click", function(event) {
        if(contentCont.classList.contains("show")) {
            if(!contentCont.contains(event.target)) {
                contentCont.classList.remove("show");
                overlay.style.opacity = "0";
                setTimeout(() => {
                    contentCont.style.display = "none";
                    overlay.style.display = "none";
                }, 501);
            }
        }
        
    })
