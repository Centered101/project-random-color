function resetWindow() {
    window.location.reload(true);
}

function usernameSubmit() {
    const input = document.querySelector("input[name='username']");
    // รับค่าจาก input และลบช่องว่างข้างหน้าและข้างหลัง
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
        document.querySelector('#displayUsername').innerHTML = 'สุ่มสีของคุณ ' + value;

        // เก็บชื่อผู้ใช้ใน localStorage
        localStorage.setItem("username", value);
    } else {
        // ... (ส่วนที่เหลือของ else ยังคงเหมือนเดิม)
    }
}

document.addEventListener("keyup", keyup);
function keyup(event) {
    if (event.key === "Enter") {
        usernameSubmit();
    }
}

function hide() {
    document.querySelector("u").style.color = 'none';
    document.querySelector(".container_error").style.display = 'none';
    document.querySelector(".usernameSubmit").style.display = 'none';
    document.querySelector(".container_randomColor").style.display = 'block';
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

    document.querySelector("img").style.display = "none";
    document.querySelector(".container_box").style.display = "none";
    document.getElementById("randomButton").style.display = "none";

    let counter = 0;
    let selectedColor = "";

    const username = localStorage.getItem('username');
    const interval = setInterval(() => {
        if (counter < 10) {
            selectedColor = Math.random() < 0.5 ? "น้ำเงิน" : "แดง";
            document.getElementById("container_color").innerHTML =
                selectedColor === "น้ำเงิน"
                    ? '<div id="blue" class="color_box selected" title="สีน้ำเงิน"></div><div id="red" class="color_box unselected" title="สีแดง"></div>'
                    : '<div id="blue" class="color_box unselected" title="สีน้ำเงิน"></div><div id="red" class="color_box selected" title="สีแดง"></div>';
            counter++;
            document.querySelector(".unselected").style.opacity = ".3";
        } else {
            clearInterval(interval);
            document.getElementById("displayUsername").innerHTML = username + " คุณสุ่มได้ สี" + `${selectedColor}`;
            document.getElementById('displayFaculty').textContent = `คุณอยู่คณะ สี${selectedColor}`;
            document.getElementById("result").textContent = `คุณสุ่มได้: สี${selectedColor}`;
            document.querySelector(".container_box").style.display = "block";
            document.querySelector(".container_box").style.marginTop = "50px";

            if (selectedColor === "แดง") {
                redCount++;
            } else {
                blueCount++;
            }

            document.querySelector(".selected").style.transform = "scale(1.2)";
            document.querySelector(".unselected").style.display = "none";
            document.getElementById("stats").textContent = `สถิติ: สีแดง ${redCount}, สีน้ำเงิน ${blueCount} จาก ${totalPeople} คน`;
            document.getElementById("confirmButton").classList.remove("hidden");

            const backgroundColor = selectedColor === "แดง" ? "#FE4040" : "#409EFE";
            document.body.style.backgroundColor = backgroundColor;

            // เก็บสีพื้นหลังใน localStorage
            localStorage.setItem("backgroundColor", backgroundColor);

            isRandomized = true;
        }
    }, 500);
}

function goToNextPage() {
    // ย้ายไปที่หน้า index.html
    window.location.href = 'index.html';
}
