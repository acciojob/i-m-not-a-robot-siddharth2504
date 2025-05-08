let main = document.querySelector("main");

let classNameArray = ["img1", "img2", "img3", "img4", "img5"];

// Add a duplicate image randomly
let randomIndex = Math.floor(Math.random() * classNameArray.length);
classNameArray.push(classNameArray[randomIndex]);

// Shuffle the array
classNameArray.sort(() => Math.random() - 0.5);

// Heading
let h1 = document.createElement("h1");
h1.innerText = "I'm not a robot";
main.append(h1);

// Render images
for (let t of classNameArray) {
	let img = document.createElement("img");
	img.classList.add(t);
	main.append(img);

	img.addEventListener("click", verifyRobo);
}

// Instruction
let h3 = document.createElement("h3");
h3.innerText = "Please click on the identical tiles to verify that you are not a robot.";
h3.id = "h";
main.append(h3);

// Handle image click
function verifyRobo(e) {
	let clickedImage = e.target;

	// Prevent double-clicking same image
	if (clickedImage.classList.contains("selected")) return;

	clickedImage.classList.add("selected");
	clickedImage.setAttribute("data-status", "clicked");

	// Show Reset button if not already shown
	if (!document.getElementById("reset")) {
		let btn = document.createElement("button");
		btn.innerText = "Reset";
		btn.id = "reset";
		btn.addEventListener("click", reset);
		main.append(btn);
	}

	const selected = document.querySelectorAll(".selected");

	// Show Verify button only when exactly two tiles are selected
	if (selected.length === 2 && !document.getElementById("verify")) {
		let btn = document.createElement("button");
		btn.innerText = "Verify";
		btn.id = "verify";
		btn.addEventListener("click", verify);
		main.append(btn);
	}

	// If more than two selected, remove verify button (state 2)
	if (selected.length > 2 && document.getElementById("verify")) {
		document.getElementById("verify").remove();
	}
}

// Reset to initial state
function reset() {
	const selectedImages = document.querySelectorAll(".selected");
	for (let img of selectedImages) {
		img.classList.remove("selected");
		img.removeAttribute("data-status");
	}

	const resetBtn = document.getElementById("reset");
	if (resetBtn) resetBtn.remove();

	const verifyBtn = document.getElementById("verify");
	if (verifyBtn) verifyBtn.remove();

	const para = document.getElementById("para");
	if (para) para.remove();
}

// Verify if selected tiles are identical
function verify(e) {
	const selected = document.querySelectorAll(".selected");
	const para = document.createElement("p");
	para.id = "para";

	if (selected[0].classList[0] === selected[1].classList[0]) {
		para.innerText = "You are a human. Congratulations!";
	} else {
		para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
	}

	main.append(para);

	// Hide verify button after use
	e.target.remove();
}
