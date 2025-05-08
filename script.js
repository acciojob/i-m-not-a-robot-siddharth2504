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

        if(clickedImage.getAttribute("data-status") == "clicked"){
            return;
        }

        clickedImage.setAttribute("data-status", "clicked"); // to check how many image is selected

        clickedImage.classList.add("selected");  // for applying styling 



        if (!document.getElementById("reset")) {
        let btn = document.createElement("button")
        btn.innerText = "Reset"
        btn.id = "reset";
        btn.addEventListener("click", reset)
        main.append(btn)
        }

        if(document.querySelectorAll(".selected").length == 2){
            let btn = document.createElement("button")
            btn.innerText = "Verify"
            btn.id = "verify";
            btn.addEventListener("click", verify)
            main.append(btn)
        }

        if(document.querySelectorAll(".selected").length>2){
            let btn = document.getElementById("verify")
            btn.style.display = "none"
        }
    }


function reset(){
    let selectedImage = document.querySelectorAll(".selected")
    for(let t of selectedImage){
        t.classList.remove("selected")
        t.setAttribute("data-status", "")
    }

    let resetBtn = document.getElementById("reset")
    resetBtn.remove()

    let verifyBtn = document.getElementById("verify")
    if(verifyBtn){
        verifyBtn.remove()
    }
    let para = document.getElementById("para")
    if(para){
        para.remove()
    }
}


function verify(e){
    let para = document.createElement("p")
    para.id = "para"
    let selectedImage = document.querySelectorAll(".selected")
    if(selectedImage[0].classList[0] == selectedImage[1].classList[0]){
        para.innerText = "You are a human. Congratulations!"
    }
    else{
        para.innerText = "We can't verify you as a human. You selected the non-identical tiles."
    }
    main.append(para)
    e.target.remove()
}