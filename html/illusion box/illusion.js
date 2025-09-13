document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') === 'link') {
        document.getElementById("goBackBtn").style.display = "block";
    }
});

function goBack() {
    window.history.back();
}
let num = 0;

function blockIllusion() {
  if (num % 2 === 0) {
    document.body.style.background = "white";
    document.getElementById("start").classList.remove("start");
    document.getElementById("start").classList.add("end");
    document.getElementById("btn").innerHTML="Back"
  } else {
    document.body.style.background = `linear-gradient(90deg, rgba(0, 0, 0, 1) 1%, rgba(255, 255, 255, 1) 100%)`;
    document.getElementById("start").classList.remove("end");
    document.getElementById("start").classList.add("start");
    document.getElementById("btn").innerHTML="Dissapear The Illusion"
  }

  num++; // 🔁 increment to toggle on next call
}
