//your JS code here. If required.

let main = document.querySelector("main")

let classNameArray = ["img1", "img2", "img3", "img4", "img5"]

let randomIndex = Math.floor(Math.random() * classNameArray.length);

classNameArray.push(classNameArray[randomIndex]);

classNameArray.sort(() => Math.random() - 0.5)

let h1 = document.createElement("h1");
h1.innerText = "I'm not a robot"
main.append(h1);

for (let t of classNameArray) {
    let img = document.createElement("img")
    img.classList.add(t);
    main.append(img)

    img.addEventListener("click", verifyRobo)
}


let h3 = document.createElement("h3")
h3.innerText = "Please click on the identical tiles to verify that you are not a robot."
h3.id = "h";
main.append(h3)


function verifyRobo(e) {
    let clickedImage = e.target;

    if (clickedImage.classList.contains("selected")) return;

    clickedImage.classList.add("selected");
    clickedImage.setAttribute("data-status", "clicked");

    if (!document.getElementById("reset")) {
        let btn = document.createElement("button")
        btn.innerText = "Reset"
        btn.id = "reset";
        btn.addEventListener("click", reset)
        main.append(btn)
    }

    let selected = document.querySelectorAll(".selected");

    if (selected.length === 2 && !document.getElementById("verify")) {
        let btn = document.createElement("button")
        btn.innerText = "Verify"
        btn.id = "verify";
        btn.addEventListener("click", verify)
        main.append(btn)
    }

    if (selected.length > 2 && document.getElementById("verify")) {
        document.getElementById("verify").remove();
    }
}


function reset() {
    let selectedImage = document.querySelectorAll(".selected")
    for (let t of selectedImage) {
        t.classList.remove("selected")
        t.removeAttribute("data-status")
    }

    let resetBtn = document.getElementById("reset")
    if (resetBtn) resetBtn.remove()

    let verifyBtn = document.getElementById("verify")
    if (verifyBtn) verifyBtn.remove()

    let para = document.getElementById("para")
    if (para) para.remove()
}
