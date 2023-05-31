//const slider = document.getElementById("picture-group-slider");
//const sliderContainer = document.getElementById("slider-container");
const bgColorDiv = document.getElementById("app");
const nameButtonLetters = document
  .getElementById("personNameButton")
  .getElementsByTagName("span");
const aboutBtn = document.getElementById("about-0");
const closeBtn = document.getElementById("close-1");
const abtCloseLines = document.getElementsByClassName("line-about");
const posBottomLeft = document.getElementsByClassName("position");

const slider = document.querySelector(".picture-group-slider");
const sliderContainer = document.getElementById("slider-container");

let currTitle = "title-x";
let currIndex = null;
let currFirstColor = "rgb(186, 196, 184)";
let currSecColor = "#161515";

const defaultFirstColor = "rgb(186, 196, 184)";
const defaultSecColor = "#161515";

slider.dataset.percentage = "0";

const pictures = document.getElementsByClassName("image");
const homeX = window.innerWidth / 2;
const windowHeight = window.innerHeight;

const imageWidthStart = parseFloat((windowHeight * 0.15).toPrecision(7));
const imageGapStart = windowHeight * 0.02;

const imageWidthLarge = parseFloat(windowHeight * 0.6) * (5 / 7);

const imageMargin = windowHeight * 0.1;
const newImageGap = windowHeight * 0.12;

const picNum = pictures.length;
//when small
const slideWidth = imageWidthStart * picNum + imageGapStart * (picNum - 1);
console.log(imageWidthLarge);

//whole thing - 1 image margin to matche n-1 gaps between n images
const slideWidthLarge = imageWidthLarge * picNum + newImageGap * (picNum - 1);
console.log("large", slideWidthLarge);
const leftMax = -(slideWidth / 2);
const rightMax = slideWidth / 2;

let pictureSelected = false;
let pictureSelectedImage = null;

//Percent per 1 pixel moves
const percentPerPixel = (1 / parseFloat(slideWidth)) * 100;

const percentPerPixelLarge = (1 / parseFloat(slideWidthLarge)) * 100;

function changeColor(changeToFirstColor, changeToSecColor) {
  //change bgColor
  bgColorDiv.style.backgroundColor = changeToSecColor;

  //changes nameLetters
  Array.from(nameButtonLetters).forEach(function (nameLetter) {
    nameLetter.style.color = changeToFirstColor;
  });
  //changes bottomleft position info
  Array.from(posBottomLeft).forEach(function (posElem) {
    posElem.style.color = changeToFirstColor;
  });

  //changes about & close color
  aboutBtn.style.color = changeToFirstColor;
  console.log("abt", abtCloseLines);

  Array.from(abtCloseLines).forEach(function (abtCloseLine) {
    console.log("inner", abtCloseLine.children);
    Array.from(abtCloseLine.children).forEach(function (line) {
      console.log("line", line);
      line.style.backgroundColor = changeToFirstColor;
    });
  });
  closeBtn.style.color = changeToFirstColor;
}
/*
console.log(homeX);
console.log(slideWidth);
console.log(percentPerPixel);
console.log(percentPerPixelLarge);
*/
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

  if (pictureSelected) {
    changeColor(defaultFirstColor, defaultSecColor);

    Array.from(pictures).forEach(function (picture, picIndex) {
      picture.classList.remove("chosen");
      picture.classList.add("scroll-on-chosen");
    });
    pictureSelectedImage.classList.remove("selected-pic");
    slider.classList.remove("selected");
    slider.classList.add("unselected");
    pictureSelected = false;

    putTextAway(currTitle, currIndex);
  }

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

  let prevPer = parseFloat(slider.dataset.prevPercentage);

  if (isNaN(prevPer)) {
    prevPer = -1;
  }

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

  //when pic is selected AFTER one pic is in forus
  //we want to center second image, and grey out first + rest
  //keep 12vh gap
  if (pictureSelected) {
    //pictureSelected = false;
    putTextAway(currTitle, currIndex);
  }
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

let testI = 0;
for (const image of slider.getElementsByClassName("image")) {
  imageGap = windowHeight * 0.02;
  imageWidth = windowHeight * 0.15;

  console.log(imageWidth);

  const posValueX = homeX + testI * (imageWidth + imageGap);
  image.dataset.posXStart = posValueX;
  image.dataset.posX = posValueX;
  testI++;
}

function centerImage(clickEvent, currPicSent) {
  const clickX = clickEvent.clientX;

  const imageMargin = windowHeight * 0.1;

  const newImageGap = imageGapStart + imageMargin;

  const imageWidth = currPicSent.clientWidth;

  const scaleHeight = windowHeight * 0.6;
  const scaleWidth = scaleHeight * (5 / 7);

  //const clickedImage = document.getElementById(imageID);
  let position = parseFloat(currPicSent.dataset.posX);
  //let endX = parseFloat(position) + imageWidth;
  let endX = parseFloat(position) + scaleWidth;
  console.log("startX", position, endX);
  console.log("midpoint", (position + endX) / 2);
  console.log("prev%", parseFloat(slider.dataset.prevPercentage));

  let poseScale = position * scaleHeight;
  let posEndX = endX * scaleWidth;

  console.log("sh", scaleHeight, "sw", scaleWidth);

  //let deltaMiddle = (position + endX) / 2 - homeX; //ORIGINAL
  let deltaMiddle = position + scaleWidth / 2 - homeX;

  console.log("deltaMiddle", deltaMiddle);
  //const usingPercentage = deltaMiddle * percentPerPixel * -1; //ORIGINAL
  const usingPercentage = deltaMiddle * percentPerPixelLarge * -1;
  console.log("using", usingPercentage);
  const nextPercentageRaw =
    parseFloat(slider.dataset.prevPercentage) + usingPercentage;
  console.log(nextPercentageRaw);
  const nextPercentageRefined = Math.max(Math.min(nextPercentageRaw, 0), -100);

  console.log("middle%", nextPercentageRefined);

  slider.dataset.percentage = nextPercentageRefined;
  //currPercentage +
  slider.animate(
    {
      transform: `translate(${nextPercentageRefined}%, 0%)`,
    },
    { duration: 1000, fill: "forwards" }
  );

  //500 - (image.width /2)

  slider.dataset.prevPercentage = slider.dataset.prevPercentage;
}

function newPosX(newWidth, newGap) {
  let percentageMoved = parseFloat(slider.dataset.percentage);
  //console.log("moved%", percentageMoved);
  Array.from(pictures).forEach(function (picture, pIndex) {
    //sets x where it would start from in Large Slider

    let wouldStart = homeX + pIndex * (newWidth + newGap);

    picture.dataset.posX = wouldStart + percentageMoved / percentPerPixelLarge;

    //542.5 + 1 + (373.28 + 104.52)
    //542 + + 104.52 + (1 * 373.28)
  });
}

//PICTURE CLICK EVENT LISTENER
for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener("click", function (e) {
    console.log("click", i);

    currPic = pictures[i];

    if (pictureSelected) {
      pictureSelectedImage.classList.remove("selected-pic");

      /*
      let leftPicIndex = currIndex - 1;
      let rightPicIndex = currIndex + 1;

      if (isNaN(leftPicIndex) === false && leftPicIndex >= 0) {
        const leftPic = document.getElementById(`title-${leftPicIndex}`);
        if (leftPic) {
          leftPic.style.display = "none";
        }
      }

      if (isNaN(rightPicIndex) === false && rightPicIndex <= pictures.length) {
        const rightPic = document.getElementById(`title-${rightPicIndex}`);
        if (rightPic) {
          rightPic.style.display = "none";
        }
      }
      */
    }

    pictureSelectedImage = currPic;

    currFirstColor = currPic.dataset.firstColor;
    currSecColor = currPic.dataset.secColor;

    changeColor(currFirstColor, currSecColor);

    let newLeftPicIndex = i - 1;
    let newRightPicIndex = i + 1;

    console.log("left", newLeftPicIndex, "right", newRightPicIndex);

    const newPic = document.getElementById(`title-${i}`);
    newPic.style.display = "block";

    if (isNaN(newLeftPicIndex) === false && newLeftPicIndex >= 0) {
      const newLeftPic = document.getElementById(`title-${newLeftPicIndex}`);
      if (newLeftPic) {
        newLeftPic.style.display = "block";
      }
    }

    if (
      isNaN(newRightPicIndex) === false &&
      newRightPicIndex <= pictures.length
    ) {
      const newRightPic = document.getElementById(`title-${newRightPicIndex}`);
      if (newRightPic) {
        newRightPic.style.display = "block";
      }
    }

    //pictures[i].classList.add("selected");

    const titleName = `title-${i}`;

    currPic.classList.add("selected-pic");

    currTitle = titleName;
    currIndex = i;

    getText(titleName, i);

    const scaleHeight = windowHeight * 0.6;
    const scaleWidth = scaleHeight * (5 / 7);

    //currPic.classList.add("chosen");
    Array.from(pictures).forEach(function (picture) {
      picture.classList.add("chosen");
      picture.classList.remove("scroll-on-chosen");
    });
    pictureSelected = true;
    slider.classList.add("selected");
    slider.classList.remove("unselected");

    //set new X positions
    newPosX(scaleWidth, newImageGap);

    centerImage(e, currPic, i);
  });
}

function getText(titleID) {
  currTitle = titleID;
  console.log("getting", titleID);

  //const pictures = document.getElementsByClassName("image");
  const sTopRow = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("top-letter");

  const sBottomRow = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("bottom-letter");

  const leftInfo = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("info-left-leter");
  const rightInfo = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("info-right-letter");

  for (let x = 0; x < sTopRow.length; x++) {
    //console.log(topRow[x]);
    let curr = sTopRow[x];
    let delay = x * 200;
    delay = delay * 0.001;
    curr.style.transform = "translate3d(0%, 0%, 0px)";
    //curr.style.animationDelay = `${delay}s`;
    curr.style.animationDelay = `${0.3}s`;
    curr.classList.add("glow", "animate");
  }

  const bEndIndex = sBottomRow.length - 1;
  const maxTime = bEndIndex * 200;
  for (let y = bEndIndex; y >= 0; y--) {
    //console.log(sBottomRow[y], y);
    let curr = sBottomRow[y];
    // 4 * 200
    let delay = y * -200 + maxTime;
    delay = delay * 0.001;
    curr.style.transform = "translate3d(0%, 0%, 0px)";
    //curr.style.animationDelay = `${delay}s`;
    curr.style.animationDelay = `${0.3}s`;
    curr.classList.add("glow", "animate");
  }

  /*Lowering delay on entering title text to match 
  speed of ebterin explore items*/

  const lEndIndex = leftInfo.length - 1;
  const lMaxTime = lEndIndex * 200;
  Array.from(leftInfo).forEach(function (leftLetter, lIndex) {
    let delay = lIndex * -200 + lMaxTime;
    delay = delay * 0.001;
    //leftLetter.style.transform = "translate3d(0%, 0%, 0px)";
    leftLetter.animate(
      {
        transform: `translate3d(0%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      { duration: 1200, fill: "forwards" }
    );
    leftLetter.animationDelay = `${delay}s`;
    leftLetter.classList.add("glow");
  });

  const rEndIndex = rightInfo.length;
  const rMaxTime = rEndIndex * 200;
  Array.from(rightInfo).forEach(function (rightLetter, rIndex) {
    let delay = rIndex * -200 + rMaxTime;

    delay = delay * 0.001;
    rightLetter.animate(
      {
        transform: `translate3d(0%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      { duration: 1200, fill: "forwards" }
    );
    rightLetter.animationDelay = `${delay}s`;
    rightLetter.classList.add("glow");
  });

  //adds 'Explore thing' to page
  const eTop = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("explore-top")[0];
  const eMiddle = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("explore-middle")[0];
  const eBottom = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("explore-bottom")[0];
  const exploreArray = [eTop, eMiddle, eBottom];

  Array.from(exploreArray).forEach(function (exploreItem, eIndex) {
    let delay = eIndex * 200 + 200;
    delay = delay * 0.001;

    exploreItem.animate(
      {
        transform: `translate3d(0%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      { duration: 1200, fill: "forwards" }
    );
    exploreItem.animationDelay = `${delay}s`;
  });
}

function putTextAway(currTitle) {
  console.log(currIndex, "putting away");

  const sTopRow = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("top-letter");

  const sBottomRow = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("bottom-letter");

  const leftInfo = document.getElementsByClassName("info-left-leter");
  const rightInfo = document.getElementsByClassName("info-right-letter");

  for (let x = 0; x < sTopRow.length; x++) {
    //console.log(topRow[x]);
    let curr = sTopRow[x];
    let delay = x * 200;
    delay = delay * 0.001;
    curr.style.transform = "translate3d(101%, 0%, 0px)";
    //curr.style.animationDelay = `${delay}s`;
    curr.style.animationDelay = `${0.0}s`;
    curr.classList.remove("glow");
    curr.classList.add("fade");
  }

  const bEndIndex = sBottomRow.length - 1;
  const maxTime = bEndIndex * 200;
  for (let y = bEndIndex; y >= 0; y--) {
    let curr = sBottomRow[y];
    // 4 * 200
    let delay = y * -200 + maxTime;
    delay = delay * 0.001;
    curr.style.transform = "translate3d(101%, 0%, 0px)";
    //curr.style.animationDelay = `${delay}s`;
    curr.style.animationDelay = `${0.0}s`;
    curr.classList.remove("glow");
    curr.classList.add("fade");
  }

  const lEndIndex = leftInfo.length - 1;
  const lMaxTime = lEndIndex * 200;
  Array.from(leftInfo).forEach(function (leftLetter, lIndex) {
    let delay = lIndex * -200 + lMaxTime;
    delay = delay * 0.001;
    //leftLetter.style.transform = "translate3d(0%, 0%, 0px)";
    leftLetter.animate(
      {
        transform: `translate3d(0%, -101%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      { duration: 200, fill: "forwards" }
    );
    leftLetter.animationDelay = `${delay}s`;
    leftLetter.classList.remove("glow");
    leftLetter.classList.add("fade");
  });

  const rEndIndex = rightInfo.length;
  const rMaxTime = rEndIndex * 200;
  Array.from(rightInfo).forEach(function (rightLetter, rIndex) {
    let delay = rIndex * -200 + rMaxTime;

    delay = delay * 0.001;
    rightLetter.animate(
      {
        transform: `translate3d(0%, -101%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      }, //1200?
      { duration: 200, fill: "forwards" }
    );
    rightLetter.animationDelay = `${delay}s`;
    rightLetter.classList.remove("glow");
    rightLetter.classList.add("fade");
    //rightLetter.classList.add("glow");
  });

  //removes 'Explore thing' to page
  const eTop = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("explore-top")[0];
  const eMiddle = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("explore-middle")[0];
  const eBottom = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("explore-bottom")[0];
  const exploreArray = [eTop, eMiddle, eBottom];

  /* NBEED A DELAY HERE. maybe make pic to left & right both block?
  const putLi = document.getElementById(`${currTitle}`);
  putLi.style.display = "none";

  */

  /*
  Array.from(exploreArray).forEach(function (exploreItem, eIndex) {
    console.log(exploreItem);
    let delay = eIndex * 200 + 200;
    delay = delay * 0.001;

    exploreItem.animate(
      {
        transform: `translate3d(0%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      { duration: 200, fill: "forwards" }
    );
    exploreItem.animationDelay = `${delay}s`;
  }); */

  eTop.animate(
    {
      transform: `translate3d(0%, -101%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
    },
    { duration: 200, fill: "forwards" }
  );

  eMiddle.animate(
    {
      transform: `translate3d(0%, 110%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
    },
    { duration: 200, fill: "forwards" }
  );

  eBottom.animate(
    {
      transform: `translate3d(0%, -110%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
    },
    { duration: 200, fill: "forwards" }
  );
}

//if image scrolls though middle x, it has css trnsition that goes and does not stay

//Add event listener for left and right arrow keys
//if pic selected, move one over with arrow key direction

const positionInfo = document.getElementsByClassName("position");
window.onload = (event) => {
  console.log(positionInfo);

  Array.from(positionInfo).forEach(function (posInfoPiece) {
    posInfoPiece.style.color = "rgb(186, 196, 184)";
    posInfoPiece.animate(
      {
        transform: `translate3d(0%, 0%, 0px)`,
      },
      { duration: 1200, fill: "forwards" }
    );
    //posInfoPiece.style.animationDelay = "5500"; NOT WORKING
  });

  aboutBtn.animate(
    {
      transform: `translate3d(0%, 0%, 0px)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  aboutBtn.style.pointerEvents = "all";
};

aboutBtn.addEventListener("click", function (e) {
  console.log(e.target);
  aboutBtn.animate(
    {
      transform: `translate3d(0%, -110%, 0px)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  closeBtn.animate(
    {
      transform: `translate3d(0%, 0%, 0px)`,
    },
    { duration: 1200, fill: "forwards" }
  );
});

closeBtn.addEventListener("click", function (e) {
  aboutBtn.animate(
    {
      transform: `translate3d(0%, -110%, 0px)`,
    },
    { duration: 1200, fill: "forwards" }
  );
});

/*
const t = document.get;

function end(t) {
  const i = "mouseEnter" === t.type ? console.log("in") : console.log("out");
}
*/
