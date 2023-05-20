const slider = document.getElementById("picture-group-slider");
const sliderContainer = document.getElementById("slider-container");

const slideWidth = slider.clientWidth;
const leftMax = -(slideWidth / 2);
const rightMax = slideWidth / 2;

const homeX = window.innerWidth / 2;
const windowHeight = window.innerHeight;

//Percent per 1 pixel moves
const percentPerPixel = ((homeX - 1) / homeX / slideWidth) * 100;

let scroll = 0;
let scrolly = Math.max(Math.min(rightMax, scroll), leftMax);
let timer = null;

let testScrollCount = 0;
let maxCount = Math.max(testScrollCount, leftMax);

window.onmousedown = (e) => {
  slider.dataset.mouseDownAt = e.clientX;
};

sliderContainer.addEventListener("wheel", function (e) {
  slider.dataset.mouseScrollAt = e.clientX;

  let rangedScroll = scrolly;

  const maxDe = window.innerWidth / 2;

  let testX = parseFloat(e.deltaX) / parseFloat(Math.abs(e.deltaX));

  if (isNaN(testX)) {
    testX = -1;
  }

  scroll += e.deltaX; //ORIGINAL
  //scroll += testX; TEST

  testScrollCount += testX;
  maxCount = Math.max(testScrollCount, leftMax);

  rangedScroll = Math.max(scroll, leftMax);

  const percen = (rangedScroll / maxDe) * 10;
  //ORIGINAL;
  //const percen = (rangedScroll / maxDe) * 100; //v2

  //const percen = testX; //v3 TEST

  nextPercenRaw = parseFloat(slider.dataset.prevPercentage) + percen;
  //ORIGINAL;
  //nextPercenRaw = parseFloat(slider.dataset.prevPercentage) + percen; //TEST

  const nextPercenRefined = Math.max(Math.min(nextPercenRaw, 0), -100);
  scroll = 0;

  slider.dataset.percentage = nextPercenRefined;

  //slider.style.transform = `translate(${nextPercenRefined}%, -50%)`;

  slider.animate(
    {
      transform: `translate(${nextPercenRefined}%, 0%)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
    },
    { duration: 1200, fill: "forwards" }
  );

  let testI = 0;
  for (const image of slider.getElementsByClassName("image")) {
    image.animate(
      { objectPosition: `${nextPercenRefined + 100}% 0%` }, // `translate(${nextPercenRefined}% -50%)`
      { duration: 1200, fill: "forwards" }
    );

    image.dataset.posX =
      parseFloat(image.dataset.posXStart) + nextPercenRefined / percentPerPixel;
    //parseFloat(image.dataset.posXStart) + testX;
    //parseFloat(image.dataset.posXStart) + nextPercenRefined * 20;
    //parseFloat(image.dataset.posXStart) + testScrollCount;

    testI++;
  }

  slider.dataset.prevPercentage = nextPercenRefined;

  //e.preventDefault();

  //wheelStopListener(timer);
});

sliderContainer.addEventListener(
  "wheel",
  function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      scroll = 0;
      slider.dataset.mouseScrollAt = 0;
    }, 100);
  },
  false
);

/* clicking and dragging across screen need to move our pictures on 
 the track/slider
*/
window.onmousemove = (e) => {
  /*do nothing unless click down occurs*/
  if (slider.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(slider.dataset.mouseDownAt) - e.clientX;

  const maxDelta = window.innerWidth / 2; // why? we start at 50%

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageRaw =
    parseFloat(slider.dataset.prevPercentage) + percentage;

  const nextPercentageRefined = Math.max(Math.min(nextPercentageRaw, 0), -100);
  //need to keep track of where x% is, bc it restarts at 0 if else
  slider.dataset.percentage = nextPercentageRefined;
  slider.animate(
    {
      transform: `translate(${nextPercentageRefined}%, 0%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of slider.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${nextPercentageRefined + 100}% 0%`, //// `translate(${nextPercenRefined}% -50%)`
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmouseup = () => {
  slider.dataset.mouseDownAt = 0;
  slider.dataset.prevPercentage = slider.dataset.percentage;
};

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));

const pictures = document.getElementsByClassName("image");

let testI = 0;
for (const image of slider.getElementsByClassName("image")) {
  imageGap = windowHeight * 0.04;
  imageWidth = image.clientWidth;

  const posValueX = homeX + testI * (imageWidth + imageGap);
  image.dataset.posXStart = posValueX;
  image.dataset.posX = posValueX;
  testI++;
}

function centerImage(clickEvent, currPicSent, picIndex) {
  const clickX = clickEvent.clientX;

  const imageGap = windowHeight * 0.04;
  const imageWidth = currPicSent.clientWidth;

  const scaleHeight = windowHeight * 0.6;
  const scaleWidth = scaleHeight * (5 / 7);

  //const clickedImage = document.getElementById(imageID);
  let position = parseFloat(currPicSent.dataset.posX);
  let endX = parseFloat(position) + imageWidth;
  //let endX = parseFloat(position) + scaleWidth;
  console.log("startX", position, endX);
  console.log("midpoint", (position + endX) / 2);
  console.log("prev%", slider.dataset.prevPercentage);

  let poseScale = position * scaleHeight;
  let posEndX = endX * scaleWidth;

  console.log("sh", scaleHeight, "sw", scaleWidth);

  let deltaMiddle = (position + endX) / 2 - homeX;
  console.log("deltaMiddle", deltaMiddle);
  const usingPercentage = deltaMiddle * percentPerPixel * -1;
  console.log("using", usingPercentage);
  const nextPercentageRaw =
    parseFloat(slider.dataset.prevPercentage) + usingPercentage;
  console.log(nextPercentageRaw);
  const nextPercentageRefined = Math.max(Math.min(nextPercentageRaw, 0), -100);

  currPercentage = slider.dataset.percentage;
  currPercentage +
    slider.animate(
      {
        transform: `translate(${nextPercentageRefined}%, 0%)`,
      },
      { duration: 1200, fill: "forwards" }
    );
  //500 - (image.width /2)
}

/*
const topRow = document
  .getElementById("title-0")
  .getElementsByClassName("top-letter");

const bottomRow = document
  .getElementById("title-0")
  .getElementsByClassName("bottom-letter");
const letter = document.getElementById("ttestLetter");
*/

for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener("click", function (e) {
    console.log("click", i);

    currPic = pictures[i];

    currPic.classList.add("chosen");
    //pictures[i].classList.add("selected");

    const titleName = `title-${i}`;
    console.log(titleName);

    //getText(titleName);

    centerImage(e, currPic, i);
  });
}

function getText(titleID) {
  //const pictures = document.getElementsByClassName("image");
  const sTopRow = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("top-letter");

  const sBottomRow = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("bottom-letter");

  console.log(sTopRow);

  for (let x = 0; x < sTopRow.length; x++) {
    //console.log(topRow[x]);
    let curr = sTopRow[x];
    let delay = x * 200;
    delay = delay * 0.001;
    curr.style.transform = "translate3d(0%, 0%, 0px)";
    curr.style.animationDelay = `${delay}s`;
    curr.classList.add("glow", "animate");
  }

  const bEndIndex = sBottomRow.length - 1;
  const maxTime = bEndIndex * 200;
  for (let y = bEndIndex; y >= 0; y--) {
    console.log(sBottomRow[y], y);
    let curr = sBottomRow[y];
    // 4 * 200
    let delay = y * -200 + maxTime;
    delay = delay * 0.001;
    curr.style.transform = "translate3d(0%, 0%, 0px)";
    curr.style.animationDelay = `${delay}s`;
    curr.classList.add("glow", "animate");
  }
}
