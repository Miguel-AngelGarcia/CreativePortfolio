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

const defaultFirstColor = "rgb(186, 196, 184)";
const defaultSecColor = "#161515";

let currTitle = "title-x";
let currIndex = null;
let currFirstColor = defaultFirstColor;
let currSecColor = defaultSecColor;
let oldTitle = null;

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

//whole thing - 1 image margin to matche n-1 gaps between n images
const slideWidthLarge = imageWidthLarge * picNum + newImageGap * (picNum - 1);

const leftMax = -(slideWidth / 2);
const rightMax = slideWidth / 2;

let pictureSelected = false;
let pictureSelectedImage = null;
let selectedPicLineItem = null;

let selectedPicRowLetters = null;

let exploreLock = false;

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

  Array.from(abtCloseLines).forEach(function (abtCloseLine) {
    Array.from(abtCloseLine.children).forEach(function (line) {
      line.style.backgroundColor = changeToFirstColor;
    });
  });
  closeBtn.style.color = changeToFirstColor;
}

function emergencyRowLayout(currentRow) {
  let widthToUse = window.innerWidth;
  let count = currentRow.length + 1;
  Array.from(currentRow).forEach(function (currLetter, clIndex) {
    let funcThang = widthToUse / (count + 1);
    // 500 - 100 * abs(0 - 5) - letterWidth/2

    const funcLocation =
      widthToUse -
      funcThang * Math.abs(clIndex - count) -
      parseFloat(currLetter.clientWidth) / 2;

    currLetter.style.transform = `translate3d(${funcLocation}px, 0%, 0px)`;
  });
}

const positionInfo = document.getElementsByClassName("position");
window.onload = (event) => {
  console.log("posInfo", positionInfo);

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

  Array.from(pictures).forEach(function (picture) {
    //remove the "unexplore class thing"
    picture.classList.remove("un-explore-action");
  });

  aboutBtn.style.pointerEvents = "all";
};

let scroll = 0;
let scrolly = Math.max(Math.min(rightMax, scroll), leftMax);
let timer = null;

let testScrollCount = 0;
let maxCount = Math.max(testScrollCount, leftMax);

window.onmousedown = (e) => {
  slider.dataset.mouseDownAt = e.clientX;
};

//while moving slide container
sliderContainer.addEventListener("wheel", function (e) {
  slider.dataset.mouseScrollAt = e.clientX;

  //console.log(e.deltaX);

  //if user click on "explore," can only click exit to go back
  if (exploreLock) return;

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
    pictureSelectedImage = null;

    putTextAway(currTitle, currIndex);
    console.log("slideEventListener");
    //removeExploreClick();
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

  const percen = (rangedScroll / maxDe) * -10;
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
  /*do nothing if explore is clicked. dont want pic to move*/
  if (exploreLock) return;

  /*
  bug workaround
  after clicking on image, if you click on "explore" text will not be put away
  instead, "exploreClick" will run
  added this because if user clicked 'explore' while image was centering, 
  images would leave screen but would return clicked image to non-centered size
  */
  if (pictureSelected && e.toElement.nodeName == "DIV") {
    return;
  }

  // NOTICED pictures pop on and aut for some reason
  //move this to mouseup? if delta x > 1?
  // IF NOT EXPLORE
  if (pictureSelected && e.toElement.nodeName !== "IMG") {
    changeColor(defaultFirstColor, defaultSecColor);

    Array.from(pictures).forEach(function (picture, picIndex) {
      picture.classList.remove("chosen");
      picture.classList.add("scroll-on-chosen");
    });
    pictureSelectedImage.classList.remove("selected-pic");
    slider.classList.remove("selected");
    slider.classList.add("unselected");
    pictureSelected = false;
    pictureSelectedImage = null;

    putTextAway(currTitle, currIndex);
    //removeExploreClick();
    return;
  }

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

// Do we need to fix track logic again?
//MAybe add a last xPos?

window.onmouseup = (e) => {
  slider.dataset.mouseDownAt = 0;
  slider.dataset.prevPercentage = slider.dataset.percentage;
  //when pic is selected AFTER one pic is in forus
  //we want to center second image, and grey out first + rest
  //keep 12vh gap

  console.log("is pic selected?", pictureSelected);

  if (pictureSelected && e.target === pictureSelectedImage) {
    return;
  }

  //if image is selected (large image in focus) and another image is clicked, put title text away
  //(pictureSelected && e.toElement.nodeName === "IMG") didnt work on firefox
  if (pictureSelected && e.target.localName === "img") {
    console.log("onmouseup going to putTextAway");
    putTextAway(currTitle, currIndex);
  }

  //if click target NOT already selected image, put text away
  //also move slider back to original position
  // MAKE A RESET TRACK FUNCTION?

  /* ITS OK TO CLICK. ONLY a wheel scroll will reset page
  if (pictureSelected && e.toElement.nodeName !== "IMG") {
    changeColor(defaultFirstColor, defaultSecColor);
    putTextAway(currTitle, currIndex);

    Array.from(pictures).forEach(function (picture, picIndex) {
      picture.classList.remove("chosen");
      picture.classList.add("scroll-on-chosen");
    });
    pictureSelectedImage.classList.remove("selected-pic");
    slider.classList.remove("selected");
    slider.classList.add("unselected");
    pictureSelected = false;
    pictureSelectedImage = null;
    //pictureSelectedImage.classList.remove("selected-pic");
  }
  */

  /*
  if (pictureSelected) {
    //pictureSelected = false;
    console.log("mouseup");
    putTextAway(currTitle, currIndex);
  }
  */
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

  const posValueX = homeX + testI * (imageWidth + imageGap);
  image.dataset.posXStart = posValueX;
  image.dataset.posX = posValueX;
  testI++;
}

/*
MAKE images next to centered image zoomed in a little?
*/

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

  let poseScale = position * scaleHeight;
  let posEndX = endX * scaleWidth;

  //let deltaMiddle = (position + endX) / 2 - homeX; //ORIGINAL
  let deltaMiddle = position + scaleWidth / 2 - homeX;
  /*
  console.log("startX", position, endX);
  console.log("midpoint", (position + endX) / 2);
  console.log("prev%", parseFloat(slider.dataset.prevPercentage));
  console.log("deltaMiddle", deltaMiddle);
  */
  //const usingPercentage = deltaMiddle * percentPerPixel * -1; //ORIGINAL
  const usingPercentage = deltaMiddle * percentPerPixelLarge * -1;

  const nextPercentageRaw =
    parseFloat(slider.dataset.prevPercentage) + usingPercentage;

  const nextPercentageRefined = Math.max(Math.min(nextPercentageRaw, 0), -100);

  slider.dataset.percentage = nextPercentageRefined;
  //currPercentage +
  slider.animate(
    {
      transform: `translate(${nextPercentageRefined}%, 0%)`,
    },
    { duration: 800, fill: "forwards" } //500 instead of 1000
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
    currPic = pictures[i];

    console.log("click", i /*currPic*/);

    //do nothing if same pic is selected
    if (currPic === pictureSelectedImage) return;

    if (pictureSelected) {
      //add grey filter back to old image
      pictureSelectedImage.classList.remove("selected-pic");
      //MOVE THIS IN GOOD SPOT
      //THIS CAUSED PROBLEM
      //NEED TO CHANGE/
      //IFFFFF image is outisde viewport, make hidden?
      //selectedPicLineItem.style.display = "none";

      oldTitle = currTitle;
      //console.log(oldTitle, currTitle);
      //(oldTitle);
      //console.log("puttextawat", oldTitle);
    }
    pictureSelected = true;
    //console.log("lastPic", pictureSelectedImage);
    //sets selected picture to the pic in question
    pictureSelectedImage = currPic;
    //console.log("currPic", pictureSelectedImage);

    currFirstColor = currPic.dataset.firstColor;
    currSecColor = currPic.dataset.secColor;

    changeColor(currFirstColor, currSecColor);

    let newLeftPicIndex = i - 1;
    let newRightPicIndex = i + 1;

    //console.log("left", newLeftPicIndex, "right", newRightPicIndex);

    const newPicText = document.getElementById(`title-${i}`);
    newPicText.style.display = "block";

    selectedPicLineItem = newPicText;

    //pictures[i].classList.add("selected");

    const titleName = `title-${i}`;

    currPic.classList.add("selected-pic");

    currTitle = titleName;
    currIndex = i;

    //getText(titleName, i);

    const scaleHeight = windowHeight * 0.6;
    const scaleWidth = scaleHeight * (5 / 7);

    newPosX(scaleWidth, newImageGap);

    centerImage(e, currPic, i);
    getText(titleName, i);
    //currPic.classList.add("chosen");
    Array.from(pictures).forEach(function (picture) {
      //added below to remove effects after 1st image explored
      picture.classList.remove("un-explore-action");
      picture.classList.add("chosen");
      picture.classList.remove("scroll-on-chosen");
    });

    slider.classList.add("selected");
    slider.classList.remove("unselected");

    //set new X positions
    /*
    newPosX(scaleWidth, newImageGap);

    centerImage(e, currPic, i);
    */

    /*
    PROBLEM: sometimes clicking on explore does not move active text.
    Instead, a previously selected image's text is moved.
    Why is the old text called instead of current?

    */
    const rowRow = document
      .getElementById(`${titleName}`)
      .getElementsByClassName("title");

    const exploreWord = document.getElementsByClassName("line-w")[i];
    //console.log("eword", exploreWord);
    exploreWord.style.pointerEvents = "auto";
    exploreWord.style.cursor = "pointer";
    exploreWord.addEventListener("click", function () {
      exploreClick(e, currIndex);

      const testRow = rowRow;
      const topRow = testRow[0].children;
      const bottomRow = testRow[1].children;

      exploreTextLeft(topRow, 0);
      exploreTextLeft(bottomRow, 200);
    });
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

  //Moving text to be responsive, like the row. not the letters
  const rowRow = document
    .getElementById(`${titleID}`)
    .getElementsByClassName("title");
  const topRow = rowRow[0].children;
  const bottomRow = rowRow[1].children;
  //.log("actual row of top", bottomRow);

  selectedPicRowLetters = rowRow;

  const pageWidth = window.innerWidth;

  for (let tX = 0; tX < topRow.length; tX++) {
    let currTItem = topRow[tX];

    // # if slots each row has per half
    let thang = homeX / (topRow.length + 1);

    //if letter size exceeds slot size, Letts will go across entire width, not half
    //-> |[T][O][P]|       |
    if (parseFloat(thang) < parseFloat(currTItem.clientWidth / 2)) {
      emergencyRowLayout(topRow);
      break;
    }

    const locationTop =
      homeX -
      thang * Math.abs(tX - topRow.length) -
      parseFloat(currTItem.clientWidth) / 2;
    currTItem.style.transform = `translate3d(${locationTop}px, 0%, 0px)`;
  }

  //using a for loop so we can use the break keyword in case our letter is too large for screen
  //using the code below in emergencyRowLayout()
  /*
  Array.from(bottomRow).forEach(function (letterXBot, lxbIndex) {
    // absolute of 0 - 3 = 3. perfect bc last is 0
    //width - (letter size * (absValue(index - letter.length))

    let thang = homeX / (bottomRow.length + 1);

    if (parseFloat(thang) < parseFloat(letterXBot.clientWidth / 2)) {
      emergencyRowLayout(bottomRow);
      break;
    }

    const locationBot =
      homeX + thang * (lxbIndex + 1) - parseFloat(letterXBot.clientWidth) / 2;


    letterXBot.style.transform = `translate3d(${locationBot}px, 0%, 0px)`;
  }); */

  for (let bX = 0; bX < bottomRow.length; bX++) {
    let currBItem = bottomRow[bX];
    // absolute of 0 - 3 = 3. perfect bc last is 0
    //width - (letter size * (absValue(index - letter.length))

    let thang = homeX / (bottomRow.length + 1);

    if (parseFloat(thang) < parseFloat(currBItem.clientWidth / 2)) {
      emergencyRowLayout(bottomRow);
      break;
    }

    const locationBot =
      homeX + thang * (bX + 1) - parseFloat(currBItem.clientWidth) / 2;

    currBItem.style.transform = `translate3d(${locationBot}px, 0%, 0px)`;

    //console.log(currBItem);
    //currBItem.dataset.origPos = `translate3d(${locationBot}px, 0%, 0px)`;
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

  addExplore();
}

function putTextAway(currTitle) {
  console.log(currIndex, "putting away", currTitle);

  const sTopRow = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("top-letter");

  //console.log("sTopRow", sTopRow);

  const sBottomRow = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("bottom-letter");

  const leftInfo = document.getElementsByClassName("info-left-leter");
  const rightInfo = document.getElementsByClassName("info-right-letter");

  /*
  for (let x = 0; x < sTopRow.length; x++) {
    //console.log(topRow[x]);
    let curr = sTopRow[x];
    console.log(curr, "curr");
    let delay = x * 200;
    delay = delay * 0.001;
    curr.style.transform = "translate3d(101%, 0%, 0px)";
    //curr.style.animationDelay = `${delay}s`;
    curr.style.animationDelay = `${0.0}s`;
    curr.classList.remove("glow");
    curr.classList.add("fade");
  }*/
  removeRow(sTopRow);

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

  removeExplore(currTitle);

  /* NBEED A DELAY HERE. maybe make pic to left & right both block?
  const putLi = document.getElementById(`${currTitle}`);
  putLi.style.display = "none";

  */
}

//if image scrolls though middle x, it has css trnsition that goes and does not stay

//Add event listener for left and right arrow keys
//if pic selected, move one over with arrow key direction

//NEED TO FIX THIS CLOSE THANG

aboutBtn.addEventListener("click", function (e) {
  //console.log(e.target);
  aboutBtn.animate(
    {
      transform: `translate3d(0%, -110%, 0px)`,
      color: currSecColor,
    },
    { duration: 600, fill: "forwards" }
  );

  aboutBtn.style.pointerEvents = "none";

  removeExploreClick();

  closeBtn.animate(
    {
      transform: `translate3d(0%, 0%, 0px)`,
      color: currFirstColor,
    },
    { duration: 1200, fill: "forwards" }
  );

  closeBtn.style.pointerEvents = "all";
});

closeBtn.addEventListener("click", function (e) {
  /*
  aboutBtn.animate(
    {
      transform: `translate3d(0%, 0%, 0px)`,
      color: currFirstColor,
    },
    { duration: 1200, fill: "forwards" }
  ); */

  closeBtn.animate(
    {
      transform: `translate3d(0%, -110%, 0px)`,
      color: currSecColor,
    },
    { duration: 600, fill: "forwards" }
  );
});

/*
const t = document.get;

function end(t) {
  const i = "mouseEnter" === t.type ? console.log("in") : console.log("out");
}
*/

//will move all other photos (not selected) up and off screen
function exploreClick(e, index) {
  exploreLock = true;
  fillPhotosSign();
  Array.from(pictures).forEach(function (picture, pIndex) {
    if (pIndex !== index) {
      console.log("moving index pic", pIndex);
      //picture.style.translate = "translate3d(0%, -100%, 0px)";
      picture.classList.remove("un-explore-action");
      picture.classList.add("explore-action");
    }
  });

  removeExplore(currTitle);
}

//will move all other photos (not selected) up and off screen
function exploreClickV2(e, index) {
  exploreLock = true;
  fillPhotosSign();
  Array.from(pictures).forEach(function (picture, pIndex) {
    if (pIndex !== index) {
      picture.animate(
        {
          transform: "translate(0%, -100vh)",
        },
        {
          duration: 1000,
          fill: "both",
          easing: "cubic-bezier(0.17, 0.74, 0.27, 0.94)",
        }
      );
    }
  });

  removeExplore(currTitle);
}

function removeExploreClick() {
  exploreLock = false;

  Array.from(pictures).forEach(function (picture, pIndex) {
    if (picture !== pictureSelectedImage) {
      console.log("moving index pic", pIndex);
      //picture.style.translate = "translate3d(0%, -100%, 0px)";

      //picture.classList.add("un-explore-action");
      picture.classList.remove("explore-action");
      picture.classList.add("un-explore-action");
      //picture.classList.remove("un-explore-action");

      /*
      picture.animate(
        {
          //transform: "translate(0%, -10vh)",
          transform: "translate(0%, -10vh)",
        },
        { duration: 1000, fill: "forwards" }
      );
      */
    }
  });

  resetText();
}

function removeExploreClickV2() {
  Array.from(pictures).forEach(function (picture, pIndex) {
    if (picture !== pictureSelectedImage) {
      console.log("moving index pic", pIndex);

      picture.animate(
        {
          //transform: "translate(0%, -10vh)",
          transform: "translate(0%, -10vh)",
        },
        {
          duration: 1000,
          fill: "both",
          easing: "cubic-bezier(0.17, 0.74, 0.27, 0.94)",
          //easing: "ease-in",
        }
      );
    }
  });

  resetText();
  exploreLock = false;
}

function exploreTextLeft(rowOfLetters, constant) {
  let startPosX = 0;
  let lastLetter = 0;

  for (let rX = 0; rX < rowOfLetters.length; rX++) {
    let rItem = rowOfLetters[rX];

    let currLetterWidth = rItem.clientWidth - 0.0333 * 2 * windowHeight;

    //console.log("item", rItem);

    const locationTopExplore = startPosX;

    //make a variable that goes into aspect ratios?

    let potentialTime = rowOfLetters.length * 100 + constant;

    const duration = 500 < potentialTime ? 500 : potentialTime;

    transformString = `translate3d(${locationTopExplore}px, 0%, 0px)`;

    //WHY ANIMATE?
    //IF WE ANIMATE, HTML property does not get changed.
    //=>we can easily grab old value to reset text back to original position
    rItem.animate(
      {
        transform: transformString,
      },
      { duration: duration, fill: "forwards" }
    );

    lastLetter = currLetterWidth;
    startPosX += lastLetter;
  }
}

function resetText() {
  const firstRow = selectedPicRowLetters[0].children;
  const secRow = selectedPicRowLetters[1].children;
  getOldPos(firstRow);
  getOldPos(secRow);
  removePhotosSign();
}

function getOldPos(givenRow) {
  for (let bX = 0; bX < givenRow.length; bX++) {
    let cuuItem = givenRow[bX];

    let ogPos = cuuItem.style.transform;
    transformString = ogPos;

    let constant = 200;
    let potentialTime = givenRow.length * 100 + constant;

    const duration = potentialTime > 600 ? potentialTime : 600;

    cuuItem.animate(
      {
        transform: transformString,
      },
      { duration: duration, fill: "forwards" }
    );
  }
}

const photosReturn = document.getElementById("photos");
const photosSign = document.getElementById("photos-sign");
const photosLine = document.getElementById("photos-line");
const photosTarget = document.getElementById("photos-target");
const photosX = document.getElementById("p-s-p");

function fillPhotosSign() {
  //div right under '#photos-sign' -> tranform: translate3d(0%, 0%, 0px)
  const sign = photosSign.children[0];
  sign.style.transform = "translate3d(0%, 0%, 0px)";

  /*
  div under '#photos-line' ->
  style="border-right-color: rbg(PicPrimaryColor); tranform: translate3d(0 %, 0 %, 0px)"
  */
  const line = photosLine.children[0];

  line.style.borderRightColor = currFirstColor;
  line.style.transform = "translate3d(0%, 0%, 0px)";

  /*
  div under '#picture-target" -> "color: rbg(PicPrimaryColor); tranform: translate3d(0 %, 0 %, 0px)"
  divs under ".line" (x2) style="background: rbg(PicPrimaryColor)"
  */

  const target = photosTarget.children[0];
  photosTarget.getElementsByClassName("line")[0];
  const targetDiv = target.getElementsByClassName("line")[0].children;

  const photosArray = [targetDiv[1], targetDiv[0], target, line, sign];

  Array.from(targetDiv).forEach(function (tDivLine) {
    tDivLine.style.background = currFirstColor;
  });

  target.style.transform = "translate3d(0%, 0%, 0px)";
  target.style.color = currFirstColor;

  photosX.style.fill = currFirstColor;

  photosReturn.style.pointerEvents = "all";
  photosReturn.style.cursor = "pointer";

  photosReturn.addEventListener("click", () => {
    removeExploreClick();
  });
}

//after a user clicks to go back to photos, the "photographs" label will disapear
function removePhotosSign() {
  const sign = photosSign.children[0];
  sign.style.transform = "translate3d(0%, -101%, 0px)";

  const line = photosLine.children[0];

  line.style.borderRightColor = currFirstColor;
  line.style.transform = "translate3d(0%, -110%, 0px)";

  const target = photosTarget.children[0];

  photosTarget.getElementsByClassName("line")[0];
  const targetDiv = target.getElementsByClassName("line")[0].children;

  const photosArray = [targetDiv[1], targetDiv[0], target, line, sign];

  Array.from(targetDiv).forEach(function (tDivLine) {
    tDivLine.style.background = defaultSecColor;
  });

  target.style.transform = "translate3d(0%, 101%, 0px)";
  target.style.color = defaultSecColor;

  photosReturn.style.pointerEvents = "none";
  photosReturn.style.cursor = "auto";

  photosReturn.removeEventListener("click", () => {
    removeExploreClick();
  });

  addExplore();
}

//reading material
//https://udn.realityripple.com/docs/Web/API/Element/animate

function removeExplore(givenCurrTitle) {
  const eTop = document
    .getElementById(`${givenCurrTitle}`)
    .getElementsByClassName("explore-top")[0];
  const eMiddle = document
    .getElementById(`${givenCurrTitle}`)
    .getElementsByClassName("explore-middle")[0];
  const eBottom = document
    .getElementById(`${givenCurrTitle}`)
    .getElementsByClassName("explore-bottom")[0];

  eTop.style.transform = "translate3d(0%, -101%, 0px)";
  eTop.style.transitionDelay = "0s";
  eMiddle.style.transform = "translate3d(0%, 110%, 0px)";
  eMiddle.style.transitionDelay = "0s";
  eBottom.style.transform = "translate3d(0%, -110%, 0px)";
  eBottom.style.transitionDelay = "0s";
}

function addExplore() {
  const eTop = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("explore-top")[0];
  const eMiddle = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("explore-middle")[0];
  const eBottom = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("explore-bottom")[0];
  const exploreArrayItems = [eTop, eMiddle, eBottom];

  eTop.style.transform = "translate3d(0%, 0%, 0px)";
  eMiddle.style.transform = "translate3d(0%, 0%, 0px)";
  eBottom.style.transform = "translate3d(0%, 0%, 0px)";

  exploreArrayItems.forEach(function (eArrayItem) {
    eArrayItem.style.transform = "translate3d(0%, 0%, 0px)";
    eArrayItem.style.transitionDelay = "1s";
  });
}

function removeRow(sTopRow) {
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
}

//REALIZING after first click, "exlpore' tages clash with each other"
//Maybe trisiton delay needs to be added back?
