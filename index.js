//const slider = document.getElementById("picture-group-slider");
//const sliderContainer = document.getElementById("slider-container");
const bgColorDiv = document.getElementById("app");
const loadNum = document.getElementsByClassName("loadNum");
const nameButtonLetters = document
  .getElementById("personNameButton")
  .getElementsByTagName("span");
const aboutBtn = document.getElementById("about-0");
const closeBtn = document.getElementById("close-1");
const abtCloseLines = document.getElementsByClassName("line-about");
const posBottomLeft = document.getElementsByClassName("position");

//this is the "photographs" return "button"
const photosReturn = document.getElementById("photos");
const photosSign = document.getElementById("photos-sign");
const photosLine = document.getElementById("photos-line");
const photosTarget = document.getElementById("photos-target");
const photosX = document.getElementById("p-s-p");

//for when about gets clicked
const aboutNames = document.getElementById("a-left").children;
const aboutFirst = aboutNames[0].children;
const aboutLast = aboutNames[1].children;

const aboutContacts = document.getElementById("a-cont").children;

const aboutLists = document.getElementById("a-list").children;
const projList = aboutLists[0].getElementsByTagName("li");
const langList = aboutLists[1].getElementsByTagName("li");
const techList = aboutLists[2].getElementsByTagName("li");

//like person's position
const positionInfo = document.getElementsByClassName("position");
const linksInfo = document.getElementsByClassName("links");

const slider = document.querySelector(".picture-group-slider");
const sliderContainer = document.getElementById("slider-container");

const defaultFirstColor = "rgb(186, 196, 184)";
const defaultSecColor = "#161515";

let currTitle = "title-x";
let currIndex = null;
let currExploreWord = null;
let currFirstColor = defaultFirstColor;
let currSecColor = defaultSecColor;
let oldTitle = null;
let viewMode = false;
let currBlog = null;

let currRow = null;

//slider.dataset.percentage = "0";

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

let prevSelectedPicLineItem = null;

let selectedPicRowLetters = null;

let exploreLock = false;

//Percent per 1 pixel moves
const percentPerPixel = (1 / parseFloat(slideWidth)) * 100;

const percentPerPixelLarge = (1 / parseFloat(slideWidthLarge)) * 100;

window.onload = (event) => {
  Array.from(pictures).forEach(function (picture) {
    //remove the "unexplore class thing"
    picture.classList.remove("un-explore-action");
  });

  let loadNumString = "";
  //work on 000 numbers to show loading
  Array.from(loadNum).forEach(function (num) {
    num.style.color = "rgb(186, 196, 184)";
    loadNumString += num.innerHTML;
  });

  aboutBtn.style.pointerEvents = "all";

  //starts at 0
  let i = 0;
  let myInterval = setInterval(function () {
    if (i == 100) {
      clearInterval(myInterval);
      loadRest();
    }

    loadNumString = String(i).padStart(3, "0");

    loadNum[0].innerHTML = loadNumString[0];
    loadNum[1].innerHTML = loadNumString[1];
    loadNum[2].innerHTML = loadNumString[2];

    i++;
  }, 7);
};

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

  Array.from(linksInfo).forEach(function (linkInfoPiece) {
    linkInfoPiece.style.color = changeToFirstColor;
    //posInfoPiece.style.animationDelay = "5500"; NOT WORKING
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

function loadRest() {
  Array.from(loadNum).forEach(function (loadedNum) {
    loadedNum.animate(
      {
        transform: `translate3d(110%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      { duration: 400, fill: "forwards" }
    );
  });

  Array.from(nameButtonLetters).forEach(function (nameLetter) {
    nameLetter.animate(
      {
        transform: `translate3d(0%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      {
        duration: 400,
        fill: "forwards",
        delay: 200,
        easing: "cubic-bezier(0, 0, 0.19, 1)",
      }
    );
  });

  sliderContainer.classList.remove("hidden");

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

  Array.from(linksInfo).forEach(function (linkInfoPiece) {
    linkInfoPiece.style.color = "rgb(186, 196, 184)";
    linkInfoPiece.animate(
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
    { duration: 1200, fill: "forwards", easing: "cubic-bezier(0, 0, 0.19, 1)" }
  );

  Array.from(pictures).forEach(function (picture, picIndex) {
    delay = picIndex * 100 + 1000;
    // 1000 +
    //delay = 1000 + (1 / (picIndex + 1)) * 100;
    picture.animate(
      { left: "0%" },
      {
        duration: 400,
        fill: "forwards",
        easing: "cubic-bezier(0, 0, 0.19, 1)",
        delay: delay,
      }
    );
  });
}

let scroll = 0;
let scrolly = Math.max(Math.min(rightMax, scroll), leftMax);
let timer = null;

let testScrollCount = 0;
let maxCount = Math.max(testScrollCount, leftMax);

window.onmousedown = (e) => {
  slider.dataset.mouseDownAt = e.clientX;
};

function resetImagesToStart() {
  Array.from(pictures).forEach(function (picture, picIndex) {
    picture.classList.remove("chosen");
    picture.classList.add("scroll-on-chosen");
    //added below to remove effects after 1st image explored
    picture.classList.remove("un-explore-action");
  });
}

/*
This will make slider go from Large images to Small
Will also return last selected image to grey/no color
*/
function resetSliderToStart() {
  slider.classList.remove("selected");
  slider.classList.add("unselected");
  slider.classList.remove("slider-in-focus");
}

function resetSelectedImageColor() {
  pictureSelectedImage.classList.remove("selected-pic");
}

//while moving slide container
sliderContainer.addEventListener("wheel", function (e) {
  slider.dataset.mouseScrollAt = e.clientX;

  //console.log(e.deltaX);

  //if user click on "explore," can only click exit to go back
  if (exploreLock) return;

  if (pictureSelected /*|| viewMode*/) {
    changeColor(defaultFirstColor, defaultSecColor);
    //line 176 of old files will show original code
    resetImagesToStart();
    resetSliderToStart();
    resetSelectedImageColor();

    putTextAway(currTitle, currIndex);
    console.log("slideEventListener");
    putBackSmallImage(pictureSelectedImage, currIndex);
    //removeExploreClick();

    pictureSelected = false;
    pictureSelectedImage = null;
  }

  let rangedScroll = scrolly;

  const maxDe = window.innerWidth / 2;

  let testX = parseFloat(e.deltaX) / parseFloat(Math.abs(e.deltaX));

  if (isNaN(testX)) {
    console.log(testX, "NAN");
    testX = -1;
  }

  scroll += e.deltaX; //ORIGINAL
  //scroll += testX; TEST

  console.log("SCROLL", scroll);

  testScrollCount += testX;
  maxCount = Math.max(testScrollCount, leftMax);

  rangedScroll = Math.max(scroll, leftMax);

  const percenV1 = (rangedScroll / maxDe) * -10;
  //ORIGINAL;
  const percen = (rangedScroll / maxDe) * -25; //v2

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

  //slider.style.transform = `translate(${nextPercenRefined}%, 0%)`;

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

let touchStartX = 0;
let touchEndX = 0;
/*
sliderContainer.addEventListener("touchstart", function (e) {
  //slider.dataset.toughScrollAt = e.clientX;

  console.log(e);
});

sliderContainer.addEventListener("touchend", function (e) {
  //slider.dataset.toughScrollAt = e.clientX;

  console.log(e);
});
*/
/*
sliderContainer.addEventListener("touchmove", function (e) {
  //slider.dataset.toughScrollAt = e.clientX;

  console.log("MOOOOVE", e.touches[0].clientX);
});
*/

sliderContainer.addEventListener("touchstart", function (e) {
  //slider.dataset.toughScrollAt = e.clientX;
  slider.dataset.userTouchAt = e.touches[0].clientX;
  console.log(slider.dataset.userTouchAt);
});

sliderContainer.addEventListener("touchmove", function (e) {
  //slider.dataset.userTouchAt = e.clientX;

  console.log(e.touches[0].clientX);

  let touchX = e.touches[0].clientX;
  let touchXDelta = parseFloat(slider.dataset.userTouchAt) - touchX;
  const maxDelta = window.innerWidth / 2;

  let workingX = parseFloat(touchX) / parseFloat(Math.abs(touchX));

  //const percentage = (touchXDelta / maxDelta) * -100;
  const percentage = (touchXDelta / 100 / maxDelta) * -100;

  console.log(percentage, "%");

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

  Array.from(pictures).forEach(function (picture) {
    picture.animate(
      {
        objectPosition: `${nextPercentageRefined + 100}% 0%`,
      },
      { duration: 1200, fill: "forwards" }
    );
  });

  slider.dataset.prevPercentage = nextPercentageRefined;
});

sliderContainer.addEventListener("touchend", function (e) {
  //slider.dataset.toughScrollAt = e.clientX;
  slider.dataset.userTouchAt = 0;
  slider.dataset.prevPercentage = slider.dataset.percentage;
});

/* clicking and dragging across screen need to move our pictures on 
 the track/slider
*/
window.onmousemove = (e) => {
  /*do nothing unless click down occurs*/

  if (slider.dataset.mouseDownAt === "0") return;
  /*do nothing if explore is clicked. dont want pic to move*/
  if (exploreLock) return;

  if (pictureSelected && e.target === pictureSelectedImage) {
    console.log(e.target.localName);
    return;
  }

  if (
    pictureSelected &&
    e.target.localName === "img" &&
    e.target !== pictureSelectedImage
  ) {
    console.log(e.target.localName);
    changeColor(defaultFirstColor, defaultSecColor);

    resetImagesToStart();
    resetSliderToStart();
    resetSelectedImageColor();

    pictureSelected = false;
    pictureSelectedImage = null;

    putTextAway(currTitle, currIndex);
    return;
  }

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
  //OLD -> (pictureSelected && e.toElement.nodeName !== "IMG")
  if (pictureSelected && e.toElement.localName !== "img") {
    changeColor(defaultFirstColor, defaultSecColor);

    resetImagesToStart();
    resetSliderToStart();
    resetSelectedImageColor();

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

  //slider.style.transform = `translate(${nextPercentageRefined}%, 0%)`;

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

    /*
    console.log(currExploreWord, "EXPLOREPIC");
    currExploreWord.removeEventListener("click", function () {
      exploreClick();
    });
    */
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
  const posValueLargeX = homeX + testI * (imageWidthLarge + newImageGap);
  image.dataset.posXStart = posValueX;
  image.dataset.posX = posValueX;
  image.dataset.posXStartLarge = posValueLargeX;
  testI++;
}

function setPrevListItem() {
  prevSelectedPicLineItem = selectedPicLineItem;
  console.log("PREVLISTITEM", prevSelectedPicLineItem);
}

/*
MAKE images next to centered image zoomed in a little?
*/

function centerImage(clickEvent, currPicSent, currPicIndex) {
  //new height of image
  const scaleHeight = windowHeight * 0.6;

  console.log("centering image");

  //new width of image
  const scaleWidth = scaleHeight * (5 / 7);

  //get start of image and end of image
  let position = parseFloat(currPicSent.dataset.posX);
  //new version
  let positionV2 = parseFloat(currPicSent.dataset.posX) + scaleWidth / 2;

  let endX = parseFloat(position) + scaleWidth;

  //let deltaMiddle = (position + endX) / 2 - homeX; //ORIGINAL
  //distance from middle of image to center of page
  let deltaMiddle = position + scaleWidth / 2 - homeX;
  let deltaMiddleV2 = position - scaleWidth / 2 - homeX;
  let deltaMiddleV3 = position + scaleWidth / 2 - homeX;
  /*
  console.log("startX", position, endX);
  console.log("midpoint", (position + endX) / 2);
  console.log("prev%", parseFloat(slider.dataset.prevPercentage));
  console.log("deltaMiddle", deltaMiddle);
  */
  //const usingPercentage = deltaMiddle * percentPerPixel * -1; //ORIGINAL

  const usingPercentage = deltaMiddle * percentPerPixelLarge * -1;

  //console.log("deltaMiddle", deltaMiddle);
  //console.log("usingper", usingPercentage);
  //how far image is pixel wise from middle
  const nextPercentageRaw =
    parseFloat(slider.dataset.prevPercentage) + usingPercentage;
  usingPercentage;

  //console.log("nextpR", nextPercentageRaw);
  const nextPercentageRefined = Math.max(Math.min(nextPercentageRaw, 0), -100);
  //console.log("nextpR", nextPercentageRefined);
  slider.dataset.percentage = nextPercentageRefined;
  //currPercentage +

  slider.animate(
    {
      transform: `translate(${nextPercentageRefined}%, 0%)`,
    },
    { duration: 1000, fill: "forwards", easing: "cubic-bezier(0, 0, 0.19, 1)" } //500 instead of 1000
  );

  //slider.style.transform = `translate(${nextPercentageRefined}%, 0%)`;
  //500 - (image.width /2)

  const currPicPosX = position - scaleWidth / 2;
  currPicSent.dataset.posX = currPicPosX;
  slider.dataset.prevPercentage = nextPercentageRefined;

  setNewPosXFromLarge();
  viewMode = true;
}

function newPosX(newWidth, newGap) {
  let percentageMoved = parseFloat(slider.dataset.percentage);
  //console.log("moved%", percentageMoved);
  Array.from(pictures).forEach(function (picture, pIndex) {
    //sets x where it would start from in Large Slider

    let wouldStart = homeX + pIndex * (newWidth + newGap);

    let wouldStartV2 = homeX + pIndex * (newWidth + newGap) - newWidth / 2;

    picture.dataset.posX = wouldStart + percentageMoved / percentPerPixelLarge;
    //console.log(picture.dataset.posX);
    //542.5 + 1 + (373.28 + 104.52)
    //542 + + 104.52 + (1 * 373.28)
  });
}

function setNewPosX() {
  const sliderPercentage = parseFloat(slider.dataset.percentage);

  const pixelsMoved = slideWidth * (sliderPercentage / 100);

  Array.from(pictures).forEach(function (picture, pIndex) {
    const newPosX = parseFloat(picture.dataset.posXStart) + pixelsMoved;
    //console.log(sliderPercentage, pixelsMoved, newPosX);
    picture.dataset.posX = newPosX;
  });
}

function setNewPosXFromLarge() {
  const sliderPercentage = parseFloat(slider.dataset.percentage);

  const pixelsMoved = slideWidthLarge * (sliderPercentage / 100);

  Array.from(pictures).forEach(function (picture, pIndex) {
    const imageLargePosX = parseFloat(picture.dataset.posXStartLarge);
    const newPosX = imageLargePosX + pixelsMoved;
    //console.log(sliderPercentage, pixelsMoved, imageLargePosX, newPosX);
    picture.dataset.posX = newPosX;
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

      //oldTitle = currTitle;
      //console.log("OLD TITLE", oldTitle);
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

    const newPicText = document.getElementById(`title-${i}`);
    newPicText.style.display = "block";

    selectedPicLineItem = newPicText;

    //pictures[i].classList.add("selected");

    const titleName = `title-${i}`;

    currPic.classList.add("selected-pic");

    currTitle = titleName;
    currIndex = i;

    //getText(titleName, i);

    //OLD newPosX position
    const scaleHeight = windowHeight * 0.6;
    const scaleWidth = scaleHeight * (5 / 7);

    slider.classList.add("slider-in-focus");

    /*
    if (!viewMode) {
      newPosX(scaleWidth, newImageGap);
    }
    */
    newPosX(scaleWidth, newImageGap);
    //setNewPosX();
    centerImage(e, currPic, i);
    getText(titleName, i);
    //currPic.classList.add("chosen");
    Array.from(pictures).forEach(function (picture) {
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

    currRow = rowRow;

    //gets blog element of current li/image and sets it.
    //add this to arrow function
    const testBlog = document
      .getElementById(`${titleName}`)
      .getElementsByClassName("blog")[0];

    currBlog = testBlog;
    console.log("CURRGETTEXT", testBlog);

    //const exploreWord = document.getElementsByClassName("line-w")[i];
    const exploreWord = newPicText.getElementsByClassName("explore")[0];

    console.log("EXPLOREWORD", exploreWord);

    currExploreWord = exploreWord;
    //console.log("eword", exploreWord);
    exploreWord.style.pointerEvents = "auto";
    exploreWord.style.cursor = "pointer";

    exploreWord.addEventListener("click", exploreWordAction);
  });
}

function exploreWordAction() {
  console.log("in exploreClick", currIndex, currRow[0].innerText);
  exploreClick(currIndex);

  const testRow = currRow;
  const topRow = testRow[0].children;
  const bottomRow = testRow[1].children;

  console.log("TESTROW", testRow, topRow, bottomRow);

  exploreTextLeft(topRow, 0);
  exploreTextLeft(bottomRow, 200);

  /* move to getText???
  const testBlog = document
    .getElementById(`title-${currIndex}`)
    .getElementsByClassName("blog")[0];

  currBlog = testBlog;
  console.log("CURR", testBlog);
  */

  /*
  currBlog.style.display = "block";
  currBlog.style.color = currFirstColor;

  const textBlog = currBlog.children[0];
  //textBlog.style.transform = "translate3d(-50%, 0%, 0px)";
  console.log(textBlog);

  textBlog.animate(
    {
      opacity: 1,
    },
    {
      duration: 800,
      fill: "forwards",
      easing: "ease-in",
      delay: 400,
    }
  ); */

  blogTestReturn();
}

function blogTestReturn() {
  currBlog.style.display = "block";
  currBlog.style.color = currFirstColor;

  const textBlog = currBlog.children[0];
  console.log(textBlog);

  textBlog.animate(
    { opacity: 1 },
    {
      duration: 800,
      fill: "forwards",
      easing: "ease-in",
      delay: 400,
    }
  );
}

function getText(titleID, titleIndex) {
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

function putTextAway(currTitle, currIndex) {
  console.log(currIndex, "putting away", currTitle);

  setPrevListItem();

  const sTopRow = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("top-letter");

  //console.log("sTopRow", sTopRow);

  const sBottomRow = document
    .getElementById(`${currTitle}`)
    .getElementsByClassName("bottom-letter");

  const leftInfo = document.getElementsByClassName("info-left-leter");
  const rightInfo = document.getElementsByClassName("info-right-letter");

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

  /*
  console.log(currExploreWord, "EXPLOREPIC");
  currExploreWord.removeEventListener("click", exploreWordAction);
  */

  /*
  setTimeout(function () {
    console.log(currBlog);
    console.log("here");
    currBlog.style.color = currSecColor;
    currBlog.style.display = "none";
    currBlog = null;
  }, 500);
  */

  //gotta move this to when "photographs" is clicked

  console.log("CURRBLOG", currBlog);

  if (currBlog !== null) {
    currBlog.style.color = currSecColor;
    currBlog.style.display = "none";
    currBlog = null;
  }

  setTimeout(function () {
    prevSelectedPicLineItem.style.display = "none";
  }, 300); //was 1000
}

//if image scrolls though middle x, it has css trnsition that goes and does not stay

//Add event listener for left and right arrow keys
//if pic selected, move one over with arrow key direction

//NEED TO FIX THIS CLOSE THANG
function moveAboutNameRight(aboutRowSent) {
  Array.from(aboutRowSent).forEach(function (aboutLetter) {
    aboutLetter.children[0].animate(
      {
        transform: `translate3d(0%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
        color: defaultFirstColor,
      },
      {
        duration: 400,
        fill: "forwards",
        delay: 200,
        easing: "cubic-bezier(0, 0, 0.19, 1)",
      }
    );
  });
}

//for things that move up when about is clicked
function moveAboutIn(aboutSentItemSet, timeDuration, timeDelay) {
  Array.from(aboutSentItemSet).forEach(function (aboutItem) {
    aboutItem.children[0].style.color = defaultFirstColor;
    aboutItem.children[0].animate(
      {
        transform: `translate3d(0%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      {
        duration: timeDuration,
        fill: "forwards",
        delay: timeDelay,
        easing: "cubic-bezier(0, 0, 0.19, 1)",
      }
    );
  });
}

//puts about stuff back
function moveAboutOut(
  aboutSentItemSet,
  timeDuration,
  timeDelay,
  coords,
  resetCoords
) {
  Array.from(aboutSentItemSet).forEach(function (aboutItem) {
    console.log("ABTITEM", aboutItem);
    aboutItem.children[0].animate(
      {
        transform: `translate3d${coords}`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
        //color: defaultFirstColor,
      },
      {
        duration: timeDuration,
        fill: "forwards",
        delay: timeDelay,
        easing: "cubic-bezier(0, 0, 0.19, 1)",
      }
    );

    let toDelay = timeDuration + timeDelay + 10;
    resetAnimatedElement(aboutItem.children[0], `${resetCoords}`, toDelay);
  });
}

calcTopForAboutListItem(projList);
calcTopForAboutListItem(langList);
calcTopForAboutListItem(techList);

function calcTopForAboutListItem(listItem) {
  //const workingWith = listItem;
  let lastStartLetter = null;
  let lastLetterValue = 0;
  let order = 0;

  for (let i = 1; i < listItem.length; i++) {
    let element = listItem[i];
    let workingWith = listItem[i].children[0].innerText;
    let startLetter = workingWith[0];
    let letterValue = startLetter.charCodeAt(0) - 65;

    if (startLetter === lastStartLetter) {
      console.log(lastStartLetter);
      console.log(order);
      order += 1;
    }

    lastStartLetter = startLetter;

    let topValue = 44 + (letterValue + order) * 14;
    let topValueString = topValue + "px";
    element.style.top = topValueString;
  }
  //Array.from(listItem)
}

function resetAnimatedElement(elementToReset, resetCoords, resetDelay) {
  elementToReset.animate(
    { transform: `translate3d${resetCoords}`, opacity: 0 },
    { duration: 0, fill: "forwards", delay: resetDelay }
  );

  elementToReset.animate(
    { opacity: 1 },
    { duration: 0, fill: "forwards", delay: resetDelay + 10 }
  );
}

aboutBtn.addEventListener("click", function (e) {
  //console.log(e.target);

  aboutBtn.animate(
    {
      transform: `translate3d(0%, -120%, 0px)`,
      //color: currSecColor,
    },
    { duration: 600, fill: "forwards" }
  );

  resetAnimatedElement(aboutBtn, "(0%, 120%, 0px)", 600);

  if (viewMode) {
    putTextAway(currTitle, currIndex);
  }

  if (exploreLock) {
    removePhotosSign();
  }

  moveAboutIn(aboutFirst, 400, 200);
  moveAboutIn(aboutLast, 400, 200);
  moveAboutIn(aboutContacts, 600, 400);
  moveAboutIn(projList, 600, 400);
  moveAboutIn(langList, 600, 400);
  moveAboutIn(techList, 600, 400);

  slider.animate(
    { opacity: 0 },
    { duration: 400, fill: "forwards", easing: "cubic-bezier(0, 0, 0.19, 1)" }
  );

  slider.animate(
    { gap: "12vh" },
    { duration: 400, fill: "backwards", easing: "cubic-bezier(0, 0, 0.19, 1)" }
  );

  slider.animate(
    {
      left: "101%",
    },
    {
      duration: 1000,
      fill: "forwards",
      easing: "cubic-bezier(0, 0, 0.19, 1)",
      delay: 0,
    }
  );

  Array.from(pictures).forEach(function (picture, picIndex) {
    duration = Math.max(0, 600 - picIndex * 100);
    console.log(duration);
    // 1000 +
    delay = 1000 + (1 / (picIndex + 1)) * 100;
    picture.animate(
      {
        left: "100%",
      },
      {
        duration: 1000,
        fill: "forwards",
        easing: "cubic-bezier(0, 0, 0.19, 1)",
        delay: delay,
      }
    );
  });

  changeColor(defaultFirstColor, defaultSecColor);
  Array.from(nameButtonLetters).forEach(function (nameLetter) {
    nameLetter.animate(
      {
        transform: `translate3d(110%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      {
        duration: 400,
        fill: "forwards",
        delay: 200,
        easing: "cubic-bezier(0, 0, 0.19, 1)",
      }
    );

    resetAnimatedElement(nameLetter, "(-110%, 0%, 0px)", 610);
  });

  Array.from(linksInfo).forEach(function (linkInfoPiece) {
    linkInfoPiece.style.color = "rgb(186, 196, 184)";
    linkInfoPiece.animate(
      {
        transform: `translate3d(0%, -101%, 0px)`,
      },
      { duration: 400, fill: "forwards" }
    );
    //posInfoPiece.style.animationDelay = "5500"; NOT WORKING

    resetAnimatedElement(linkInfoPiece, "(0%, 101%, 0px)", 400);
  });

  aboutBtn.style.pointerEvents = "none";

  closeBtn.style.color = defaultFirstColor;
  closeBtn.animate(
    {
      transform: `translate3d(0%, 0%, 0px)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  closeBtn.style.pointerEvents = "all";
});

closeBtn.addEventListener("click", function (e) {
  moveAboutOut(projList, 200, 0, "(0%, -110%, 0px)", "(0%, 110%, 0px)");
  moveAboutOut(langList, 200, 0, "(0%, -110%, 0px)", "(0%, 110%, 0px)");
  moveAboutOut(techList, 200, 0, "(0%, -110%, 0px)", "(0%, 110%, 0px)");
  moveAboutOut(aboutFirst, 200, 0, "(110%, 0%, 0px)", "(-110%, 0%, 0px)");
  moveAboutOut(aboutLast, 200, 0, "(110%, 0%, 0px)", "(-110%, 0%, 0px)");
  moveAboutOut(aboutContacts, 200, 0, "(0, -110%, 0px)", "(0%, 110%, 0px)");

  closeBtn.animate(
    {
      transform: `translate3d(0%, -120%, 0px)`,
      //color: currSecColor,
    },
    { duration: 600, fill: "forwards" }
  );

  resetAnimatedElement(closeBtn, "(0%, 120%, 0px)", 600);

  Array.from(nameButtonLetters).forEach(function (nameLetter) {
    nameLetter.style.transform = "transalte3d(-110%, 0%, 0px)";
    nameLetter.animate(
      {
        transform: `translate3d(0%, 0%, 0px)`, //OLD<- `translate(${nextPercenRefined}%, -50%)`
      },
      {
        duration: 400,
        fill: "forwards",
        delay: 200,
        easing: "cubic-bezier(0, 0, 0.19, 1)",
      }
    );
  });

  Array.from(linksInfo).forEach(function (linkInfoPiece) {
    linkInfoPiece.style.transform = "translate3d(0%, 110%, 0px)";
    linkInfoPiece.style.color = "rgb(186, 196, 184)";
    linkInfoPiece.animate(
      {
        transform: `translate3d(0%, 0%, 0px)`,
      },
      { duration: 1200, fill: "forwards" }
    );
    //posInfoPiece.style.animationDelay = "5500"; NOT WORKING
  });

  //aboutBtn.style.transform = "translate3d(110%, 0%, 0px)";
  aboutBtn.animate(
    {
      transform: `translate3d(0%, 0%, 0px)`,
      //color: defaultFirstColor,
    },
    { duration: 1200, fill: "forwards", easing: "cubic-bezier(0, 0, 0.19, 1)" }
  );

  slider.animate({ opacity: 1 }, { duration: 0, fill: "forwards" });

  slider.animate(
    {
      left: "50%",
    },
    {
      duration: 400,
      fill: "forwards",
      easing: "cubic-bezier(0, 0, 0.19, 1)",
      delay: 0,
    }
  );

  Array.from(pictures).forEach(function (picture, picIndex) {
    delay = picIndex * 100 + 500;
    // 1000 +
    //delay = 1000 + (1 / (picIndex + 1)) * 100;
    picture.animate(
      { left: "0%" },
      {
        duration: 400,
        fill: "forwards",
        easing: "cubic-bezier(0, 0, 0.19, 1)",
        delay: delay,
      }
    );
  });

  closeBtn.style.pointerEvents = "none";
  aboutBtn.style.pointerEvents = "all";

  //should we replace the below with some sort of saveState?
  //abd just restore?
  if (viewMode) {
    changeColor(currFirstColor, currSecColor);
    console.log(currTitle, currIndex);

    const resetPicText = document.getElementById(`title-${currIndex}`);
    resetPicText.style.display = "block";

    getText(currTitle, currIndex);
  }

  if (exploreLock) {
    removeExplore(currTitle);
    fillPhotosSign();
  }
});

/*
const t = document.get;

function end(t) {
  const i = "mouseEnter" === t.type ? console.log("in") : console.log("out");
}
*/

//will move all other photos (not selected) up and off screen
function exploreClick(index) {
  exploreLock = true;
  fillPhotosSign();
  Array.from(pictures).forEach(function (picture, pIndex) {
    if (pIndex !== index) {
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
      //picture.classList.add("un-explore-action");
      picture.classList.remove("explore-action");
      picture.classList.add("un-explore-action");
      //picture.classList.remove("un-explore-action");
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

  console.log("CURRBLOGRESETTEXT", currBlog);
  const textBlog = currBlog.children[0];
  //textBlog.style.transform = "translate3d(-50%, 0%, 0px)";

  textBlog.animate(
    {
      opacity: 0,
    },
    {
      duration: 300,
      fill: "forwards",
      easing: "ease-in",
      delay: 0,
    }
  );
  /*
  setTimeout(function () {
    console.log(currBlog);
    console.log("here");
    currBlog.style.color = currSecColor;
    currBlog.style.display = "none";
    currBlog = null;
  }, 500);
  */
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
  //photosTarget.getElementsByClassName("line")[0];
  const targetDiv = target.getElementsByClassName("line-photos")[0].children;

  const photosArray = [targetDiv[1], targetDiv[0], target, line, sign];

  Array.from(targetDiv).forEach(function (tDivLine) {
    //tDivLine.style.transitionDuration = "0ms";
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

/* MOVE THIS TO changeColor()
const sign = photosSign.children[0];
const line = photosLine.children[0];
const target = photosTarget.children[0];
const targetDiv = target.getElementsByClassName("line")[0].children;

line.style.borderRightColor = currFirstColor;

 Array.from(targetDiv).forEach(function (tDivLine) {
    //tDivLine.style.transitionDuration = "0ms";
    tDivLine.style.background = currFirstColor;
  });

  target.style.color = currFirstColor;
  
photosX.style.fill = currFirstColor;
*/

//after a user clicks to go back to photos, the "photographs" label will disapear
function removePhotosSign() {
  const sign = photosSign.children[0];
  sign.style.transform = "translate3d(0%, -101%, 0px)";

  const line = photosLine.children[0];

  line.style.borderRightColor = currFirstColor;
  line.style.transform = "translate3d(0%, -110%, 0px)";

  const target = photosTarget.children[0];

  photosTarget.getElementsByClassName("line")[0];
  const targetDiv = target.getElementsByClassName("line-photos")[0].children;

  const photosArray = [targetDiv[1], targetDiv[0], target, line, sign];

  /*
  Array.from(targetDiv).forEach(function (tDivLine) {
    tDivLine.style.background = defaultSecColor;
  });
  */

  target.style.transform = "translate3d(0%, 101%, 0px)";

  photosReturn.style.pointerEvents = "none";
  photosReturn.style.cursor = "auto";

  setTimeout(function () {
    target.style.color = defaultSecColor;
  }, 1000);

  addExplore();
}

//reading material
//https://udn.realityripple.com/docs/Web/API/Element/animate
//gets rids of the "explore" button on bottom of page for image/li
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

/*take centered image and make it center in small slider
1.) take x-position, add 1/2 of large image width 
---> ex: start x of large is 747 (small statr is 864)
---> large image middle is at 1/2 of page. when it becomes small left side starts at middle?
2.) calc % slider moves for this image to be at mid point of page
3.) turn large pics into small
4.) mode previous centered image (selected image) to middle of screen
*/
function putBackSmallImage(centeredPic, currPicIndex) {
  //new height of image
  const scaleHeight = windowHeight * 0.6;

  //new width of image
  const scaleWidth = scaleHeight * (5 / 7);

  //console.log(centeredPic);

  //get start of image and add 1/2 of large0image width
  let position = parseFloat(centeredPic.dataset.posX) + scaleWidth / 2;
  //console.log("px", position);

  //let deltaMiddle = (position + endX) / 2 - homeX; //ORIGINAL
  //distance from middle of image to center of page
  let deltaMiddleV1 = position + scaleWidth / 2 - homeX;
  let deltaMiddleV2 = position - homeX;
  let deltaMiddle = parseFloat(centeredPic.dataset.posXStart) - homeX;

  //does this have to be calc from start x of small image?????

  const usingPercentage = deltaMiddle * percentPerPixel * -1;

  console.log("using%", usingPercentage);

  //how far image is pixel wise from middle
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

  const currPicPosX = homeX;
  centeredPic.dataset.posX = currPicPosX;
  slider.dataset.prevPercentage = nextPercentageRefined;

  //NEED THIS
  //need to give proper X
  setNewPosX();

  viewMode = false;
}

addEventListener("keyup", ({ key }) => {
  if (!viewMode) return;

  if (exploreLock) return;

  switch (key) {
    case "ArrowRight":
      if (currIndex < pictures.length - 1) {
        const rightIndex = currIndex + 1;
        const rightPicture = pictures[rightIndex];

        putTextAway(currTitle, currIndex);
        resetSelectedImageColor();
        arrowSelect(rightPicture, rightIndex, "ArrowRight");
      }
      break;

    case "ArrowLeft":
      if (currIndex > 0) {
        const leftIndex = currIndex - 1;
        const leftPicture = pictures[leftIndex];

        putTextAway(currTitle, currIndex);
        resetSelectedImageColor();
        arrowSelect(leftPicture, leftIndex, "ArrowRight");
      }
      break;
  }
});

function imageTexts() {
  console.log("in imageTexts");
  const imageTexts = document.getElementById("li").children;
  console.log("CURRINDEX", currIndex);
  /*
  Array.from(imageTexts).forEach(function (imageText, itIndex) {
    console.log("IMIndex", itIndex, "Curr", currIndex);
    console.log(typeof itIndex, typeof currIndex);
    if (itIndex != currIndex) {
      setTimeout(function () {
        imageText.style.display = "none";
      }, 1000);
    }
  });
  */
  console.log("her now");
}

function arrowSelect(sentPicture, sentIndex, key) {
  const titleName = `title-${sentIndex}`;

  //dont need this bc only works when in viewMode anyway???
  pictureSelected = true;
  pictureSelectedImage = sentPicture;

  currFirstColor = sentPicture.dataset.firstColor;
  currSecColor = sentPicture.dataset.secColor;

  changeColor(currFirstColor, currSecColor);

  const nextPicText = document.getElementById(`title-${sentIndex}`);
  nextPicText.style.display = "block";

  sentPicture.classList.add("selected-pic");

  //sets outer variables
  currTitle = titleName;
  currIndex = sentIndex;
  selectedPicLineItem = nextPicText;

  const scaleHeight = windowHeight * 0.6;
  const scaleWidth = scaleHeight * (5 / 7);

  const testBlog = document
    .getElementById(`${titleName}`)
    .getElementsByClassName("blog")[0];

  currBlog = testBlog;
  console.log("CURRGETTEXT", currBlog, titleName);

  //newPosX(scaleWidth, newImageGap);
  setNewPosXFromLarge();
  centerImage(key, sentPicture, sentIndex);
  getText(titleName, sentIndex);

  //DONT NEED THIS IN ARROW FUNCTIONS???
  //Array.from(pictures).forEach(function (picture) {
  //  picture.classList.add("chosen");
  //  picture.classList.remove("scroll-on-chosen");
  //});

  //DONT NEED THIS IN ARROW FUNCTIONS???
  //slider.classList.add("selected");
  //slider.classList.remove("unselected");

  const rowRow = document
    .getElementById(`${titleName}`)
    .getElementsByClassName("title");

  const exploreWord = document.getElementsByClassName("line-w")[sentIndex];
  //console.log("eword", exploreWord);
  exploreWord.style.pointerEvents = "auto";
  exploreWord.style.cursor = "pointer";

  exploreWord.addEventListener("click", function () {
    exploreClick(currIndex);

    const testRow = rowRow;
    const topRow = testRow[0].children;
    const bottomRow = testRow[1].children;

    exploreTextLeft(topRow, 0);
    exploreTextLeft(bottomRow, 200);

    blogTestReturn();
  });

  imageTexts();

  //exploreWord.addEventListener("click", exploreWordAction);
}
