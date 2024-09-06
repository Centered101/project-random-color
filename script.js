function resetWindow() {
    window.location.reload(true);
}

function usernameSubmit() {
    const input = document.querySelector("input[name='username']");
    // รับค่าจาก input และลบช่องว่างข้างหน้าและข้างหลังF
    let value = input ? input.value.trim() : "";

    // ตรวจสอบว่าข้อความเป็นภาษาไทยทั้งหมด
    const isThai = /^[\u0E00-\u0E7F\s]+$/.test(value);

    // ตรวจสอบว่ามีช่องว่างในข้อความหรือไม่
    const hasSpace = value.includes(" ");

    // แทนที่ช่องว่างหลายตัวด้วยช่องว่างเดียว
    if (hasSpace) {
        value = value.replace(/\s+/g, ' ').trim();
    }

    // ตรวจสอบว่าความยาวของข้อความอยู่ระหว่าง 7 ถึง 20 ตัวอักษรและเป็นภาษาไทย
    if (value.length >= 7 && value.length <= 20 && hasSpace && isThai) {
        document.querySelector(".usernameSubmit").style.display = 'none';
        document.querySelector(".container_error").style.display = 'block';
        document.querySelector(".container_error").style.textAlign = 'center';
        document.querySelector(".textAlert").style.display = 'none';
        document.querySelector(".buttonSubmit").style.display = 'flex';
        error.innerHTML = 'ชื่อของคุณถูกหรือไม่ ?' + '<br />' + '<u>' + value + '</u>';
        document.querySelector("u").style.color = '#00CC4F';
        document.querySelector("#displayUsername").style.display = 'block';
        document.querySelector('#displayUsername').innerHTML = 'สุ่มสีของคุณ: ' + value;
    } else {
        document.querySelector(".textAlert").style.display = 'none';
        let errorMessage = '';
        error.innerHTML = '';
        if (value.length < 7 || value.length > 20) {
            errorMessage += '- ความยาวของข้อความต้องอยู่ระหว่าง 7 ถึง 20 ตัวอักษร<br>';
        }
        if (!hasSpace) {
            errorMessage += '- ข้อความต้องมีช่องว่างระหว่าง ชื่อ-นามสกุล<br>';
        }
        if (!isThai) {
            errorMessage += '- ข้อความต้องเป็นภาษาไทยเท่านั้น<br>';
        }
        error.innerHTML = 'ข้อผิดพลาด:<br>' + errorMessage.trim();
    }
}

document.addEventListener("keyup", keyup);

function keyup(event) {
    if (
        event.key === "Enter"
    ) {
        usernameSubmit();
    }
}

function hide() {
    document.querySelector("u").style.color = 'none';
    document.querySelector(".container_error").style.display = 'none';
    document.querySelector(".usernameSubmit").style.display = 'none';
    document.querySelector(".container_randomColor").style.display = 'block';
}


function showSection2() {
    const requiredFields = document.querySelectorAll('.section-1 input[required]');
    let allFilled = true;

    requiredFields.forEach(function (field) {
        if (!field.value) {
            allFilled = false;
            field.style.borderColor = '#ff0000';
        } else {
            field.style.borderColor = '#0056b3';
        }
    });

    if (allFilled) {
        document.querySelector('.section-1').style.display = 'none';
        document.querySelector('.section-2').style.display = 'block';

        document.querySelector('input[name="username"]').style.display = "none";
        document.querySelector('button[type="button"]').style.display = "none";
        document.getElementById('submitDiv').style.display = "block";

        updateSectionTracker(2);
    } else {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
}

let isRandomized = false;
let redCount = 0;
let blueCount = 0;
const totalPeople = 200;

function randomizeColor() {
    if (isRandomized) {
        alert("คุณได้สุ่มสีไปแล้ว!");
        return;
    }

    document.getElementById("randomButton").style.display = "none";

    const colorBox = document.getElementById("container_color");
    const result = document.getElementById("result");
    const stats = document.getElementById("stats");
    const selectedColorInput = document.getElementById("selectedColor");
    let counter = 0;

    const interval = setInterval(() => {
        if (counter < 10) {
            colorBox.innerHTML =
                Math.random() < 0.5
                    ? '<div id="blue" class="color-box selected"></div><div id="red" class="color-box unselected"></div>'
                    : '<div id="blue" class="color-box unselected"></div><div id="red" class="color-box selected"></div>';
            counter++;
        } else {
            clearInterval(interval);

            const selectedColor = Math.random() < 0.5 ? "แดง" : "น้ำเงิน";
            result.textContent = `คุณสุ่มได้: สี${selectedColor}`;
            selectedColorInput.value = selectedColor;

            if (selectedColor === "แดง") {
                redCount++;
            } else {
                blueCount++;
            }

            document.getElementById("red").classList.remove("unselected");
            document.getElementById("blue").classList.remove("unselected");

            if (selectedColor === "แดง") {
                document.getElementById("red").classList.add("selected");
                document.getElementById("blue").classList.add("hidden");
            } else {
                document.getElementById("blue").classList.add("selected");
                document.getElementById("red").classList.add("hidden");
            }

            stats.textContent = `สถิติ: สีแดง ${redCount}, สีน้ำเงิน ${blueCount} จาก ${totalPeople} คน`;
            document.getElementById("confirmButton").classList.remove("hidden");

            document.body.style.backgroundColor =
                selectedColor === "แดง" ? "#FE4040" : "#409EFE";

            isRandomized = true;
        }
    }, 1000);
}

document.getElementById("surveyForm").addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("https://script.google.com/macros/s/AKfycbzzF-GNwZW3h99qiqKZRXcLxtZp4r-VEFcx7PE5FI-k8FxTr7G2wwZ_s9bBw6K5AkgE/exec", {
        method: "POST",
        body: new FormData(document.getElementById("surveyForm"))
    })
        .then((response) => {
            alert("ขอบคุณ! แบบฟอร์มของคุณถูกส่งเรียบร้อยแล้ว");
            window.location.reload();
        })
        .catch((error) => {
            handleError(error);
        });
});

function handleError(error) {
    console.error("Error!", error.message);

    document.querySelector('input[name="username"]').style.display = "block";
    document.querySelector('button[type="button"]').style.display = "block";
    document.getElementById('submitDiv').style.display = "none";
}