let theWord1 = "zainab";
let theWord = theWord1.split("");
let wordTries = 5;
let WordChars = theWord.length;
let input = document.querySelector(".input");
let checkBtn = document.querySelector("#check");
let hintBtn = document.querySelector(".hint");
let row = 0;

// إنشاء صفوف ومربعات الإدخال
for (let i = 0; i < wordTries; i++) {
  let div = document.createElement("div");
  div.className = `try-${i} flex gap-2 mb-2 justify-center`;

  for (let j = 0; j < WordChars; j++) {
    let lettertry = document.createElement("input");
    lettertry.className = "border-2 border-amber-800 rounded-lg w-12 h-12 flex items-center justify-center font-bold text-xl uppercase bg-white opacity-10 text-center";
    lettertry.disabled = true;
    lettertry.setAttribute("maxlength", "1");
    div.appendChild(lettertry);
  }
  input.appendChild(div);
}

function activeRow(currentrow) {
  let activeInputs = document.querySelectorAll(`.try-${currentrow} input`);
  if (activeInputs.length === 0) return;

  activeInputs.forEach((inputElement, index) => {
    inputElement.classList.remove("opacity-10");
    inputElement.disabled = false;

    inputElement.addEventListener("input", function () {
      if (this.value.length == 1 && index < activeInputs.length - 1) {
        activeInputs[index + 1].focus();
      }
    });

    inputElement.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        activeInputs[index - 1].focus();
      }
      if (event.key === "ArrowRight" && index < activeInputs.length - 1) {
        event.preventDefault();
        activeInputs[index + 1].focus();
      }
    });
  });

  // التركيز تلقائياً على أول مربع في السطر الجديد
  activeInputs[0].focus();
}

// تفعيل السطر الأول عند بدء اللعبة
activeRow(row);

checkBtn.addEventListener("click", () => {
  let currentInputRow = document.querySelectorAll(`.try-${row} input`);
  let wordEntered = "";

  currentInputRow.forEach((input) => {
    wordEntered += input.value;
  });

  // التحقق من اكتمال إدخال الحروف
  if (wordEntered.length < WordChars) {
    alert("الرجاء إدخال الكلمة كاملة");
    return;
  }
  let theGuessedWord = wordEntered.split("");
  let tempSecret = [...theWord];
  // تعطيل السطر الحالي بعد التحقق
  currentInputRow.forEach((input, index) => {
    if (theWord[index].toLowerCase() === theGuessedWord[index].toLowerCase()) {
      input.classList.remove("bg-white");
      input.classList.add("bg-green-500!", "text-white");
      theGuessedWord[index] = null;
      tempSecret[index] = null;
    }
    if (theGuessedWord[index] !== null) {
      let letterIndex = tempSecret.findIndex((char) => char !== null && char.toLowerCase() === theGuessedWord[index].toLowerCase());
      if (letterIndex !== -1) {
        input.classList.remove("bg-white");
        input.classList.add("bg-yellow-500!");
        tempSecret[letterIndex] = null;
      } else {
        // إذا لم يكن أخضر ولا أصفر، فهو أحمر (غير موجود)
        input.classList.remove("bg-white", "opacity-10");
        input.classList.add("bg-red-500!", "text-white");
      }
    }
    input.disabled = true;
  });

  // الانتقال للسطر التالي
  row++;
  if (row < wordTries) {
    activeRow(row);
  } else {
    alert("انتهت جميع المحاولات!");
    checkBtn.disabled = true;
  }
});
