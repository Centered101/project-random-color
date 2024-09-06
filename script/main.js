// ประกาศตัวแปรที่จำเป็น
let isRandomized = false; // ใช้ตรวจสอบว่าการสุ่มสีได้ดำเนินการไปแล้วหรือไม่
let redCount = 0; // จำนวนผู้ที่เลือกสีแดง
let blueCount = 0; // จำนวนผู้ที่เลือกสีน้ำเงิน
const totalPeople = 200; // จำนวนทั้งหมดของผู้เข้าร่วม

// ฟังก์ชันสุ่มสี
function randomizeColor() {
    if (isRandomized) {
        alert("คุณได้สุ่มสีไปแล้ว!");
        return;
        
    }

    // ซ่อนหัวเรื่อง
    const h1 = document.querySelector("h1");
    const randomButton = document.getElementById("randomButton");
    const confirmButton = document.getElementById("confirmButton");
    const resultHeading = document.getElementById("resultHeading");
    randomButton.style.display = "none"; // ซ่อนปุ่มสุ่ม

    const colorBox = document.getElementById("container_color");
    const result = document.getElementById("result");
    const stats = document.getElementById("stats");
    let counter = 0;

    // สร้างอินเทอร์วาลเพื่อเปลี่ยนสี
    const interval = setInterval(() => {
        if (counter < 10) {
            colorBox.innerHTML =
                Math.random() < 0.5
                    ? '<div id="blue" class="color-box selected"></div><div id="red" class="color-box unselected"></div>'
                    : '<div id="blue" class="color-box unselected"></div><div id="red" class="color-box selected"></div>';
            counter++;
        } else {
            clearInterval(interval); // หยุดอินเทอร์วาลเมื่อครบจำนวนรอบ
            const selectedColor = Math.random() < 0.5 ? "แดง" : "น้ำเงิน";
            result.textContent = `คุณสุ่มได้: สี${selectedColor}`;
            resultHeading.textContent = `คุณสุ่มได้: สี${selectedColor}`;

            // อัปเดตจำนวนผู้เลือกสี
            if (selectedColor === "แดง") {
                redCount++;
            } else {
                blueCount++;
            }

            // แสดงเฉพาะสีที่เลือก
            document.getElementById("red").classList.remove("unselected");
            document.getElementById("blue").classList.remove("unselected");

            if (selectedColor === "แดง") {
                document.getElementById("red").classList.add("selected");
                document.getElementById("blue").classList.add("hidden");
            } else {
                document.getElementById("blue").classList.add("selected");
                document.getElementById("red").classList.add("hidden");
            }

            // แสดงสถิติ
            stats.textContent = `สถิติ: สีแดง ${redCount}, สีน้ำเงิน ${blueCount} จาก ${totalPeople} คน`;
            confirmButton.classList.remove("hidden"); // แสดงปุ่มตกลง
            // เปลี่ยนสีพื้นหลังของ body
            document.body.style.backgroundColor =
                selectedColor === "แดง" ? "#FE4040" : "#409EFE";

            // ตั้งค่าว่ามีการสุ่มสีแล้ว
            isRandomized = true;
        }
    }, 1000);
}