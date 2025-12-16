var allElems = document.querySelectorAll(".elem");
var allFullElem = document.querySelectorAll(".fullScreen");

allElems.forEach(function (elem) {
  elem.addEventListener("click", function () {
    var index = Number(elem.id);

    allFullElem.forEach(function (fs) {
      fs.style.display = "none";
    });

    allFullElem[index].style.display = "block";
    console.log("Clicked element index:", index);
  });
});
