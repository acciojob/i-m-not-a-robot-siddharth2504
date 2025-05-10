let main = document.querySelector("main");

let classNameArray = ["img1", "img2", "img3", "img4", "img5"];

// Always duplicate one of them, ensuring at least one duplicate pair
let randomIndex = Math.floor(Math.random() * classNameArray.length);
let duplicate = classNameArray[randomIndex];

// Create new array with 6 total (one duplicate)
let finalArray = [...classNameArray, duplicate];

// Shuffle the array
finalArray.sort(() => Math.random() - 0.5);

// Heading
let h1 = document.createElement("h1");
h1.innerText = "I'm not a robot";
main.append(h1);

// Add images with data-ns-test attributes
for (let t of finalArray) {
    let img = document.createElement("img");
    img.classList.add(t);
    img.setAttribute("data-ns-test", t); // Needed for Cypress
    main.append(img);

    img.addEventListener("click", verifyRobo);
}

// Instructions
let h3 = document.createElement("h3");
h3.innerText = "Please click on the identical tiles to verify that you are not a robot.";
h3.id = "h";
main.append(h3);

function verifyRobo(e) {
    let clickedImage = e.target;

    if (clickedImage.getAttribute("data-status") == "clicked") {
        return;
    }

    clickedImage.setAttribute("data-status", "clicked");
    clickedImage.classList.add("selected");

    if (document.getElementById("reset") == null) {
        let btn = document.createElement("button");
        btn.innerText = "Reset";
        btn.id = "reset";
        main.append(btn);
        btn.addEventListener("click", reset);
    }

    if (document.querySelectorAll(".selected").length == 2) {
        let verifyBtn = document.createElement("button");
        verifyBtn.innerText = "Verify";
        verifyBtn.id = "btn"; // ✅ Match Cypress test expectation
        verifyBtn.addEventListener("click", verify);
        main.append(verifyBtn);
    }

    if (document.querySelectorAll(".selected").length > 2) {
        let btn = document.getElementById("btn");
        if (btn) btn.style.display = "none";
    }
}

function reset() {
    let selectedImages = document.querySelectorAll(".selected");
    for (let img of selectedImages) {
        img.classList.remove("selected");
        img.setAttribute("data-status", "");
    }

    let resetBtn = document.getElementById("reset");
    if (resetBtn) resetBtn.remove();

    let verifyBtn = document.getElementById("btn"); // ✅ Update here too
    if (verifyBtn) verifyBtn.remove();

    let para = document.getElementById("para");
    if (para) para.remove();
}

function verify(e) {
    let para = document.createElement("p");
    para.id = "para";

    let selectedImages = document.querySelectorAll(".selected");

    if (selectedImages[0].classList[0] === selectedImages[1].classList[0]) {
        para.innerText = "You are a human. Congratulations!";
    } else {
        para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    main.append(para);
    e.target.remove(); // Remove the "Verify" button
}
