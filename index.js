const slider = document.getElementById("picture-group-slider");
const sliderContainer = document.getElementById("slider-container");

const slideWidth = slider.clientWidth;
const leftMax = -(slideWidth / 2);
const rightMax = slideWidth / 2;

let scroll = 0;
let scrolly = Math.max(Math.min(rightMax, scroll), leftMax);
let timer = null;
window.onmousedown = (e) => {
  slider.dataset.mouseDownAt = e.clientX;
};

sliderContainer.addEventListener("wheel", function (e) {
  slider.dataset.mouseScrollAt = e.clientX;

  let rangedScroll = scrolly;

  const maxDe = window.innerWidth / 2;
  scroll += e.deltaX;
  rangedScroll = Math.max(scroll, leftMax);

  const percen = (rangedScroll / maxDe) * 10;

  nextPercenRaw = parseFloat(slider.dataset.prevPercentage) + percen;

  const nextPercenRefined = Math.max(Math.min(nextPercenRaw, 0), -100);
  scroll = 0;

  slider.dataset.percentage = nextPercenRefined;

  //slider.style.transform = `translate(${nextPercenRefined}%, -50%)`;

  slider.animate(
    {
      transform: `translate(${nextPercenRefined}%, 0%)`, // `translate(${nextPercenRefined}%, -50%)`
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of slider.getElementsByClassName("image")) {
    image.animate(
      { objectPosition: `${nextPercenRefined + 100}% 0%` }, // `translate(${nextPercenRefined}% -50%)`
      { duration: 1200, fill: "forwards" }
    );
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
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));

const pictures = document.getElementsByClassName("image");
const topRow = document
  .getElementById("title-0")
  .getElementsByClassName("top-letter");

const bottomRow = document
  .getElementById("title-0")
  .getElementsByClassName("bottom-letter");
const letter = document.getElementById("ttestLetter");

for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener("click", function (e) {
    console.log("click", i);
    console.log(topRow);

    const titleName = `title-${i}`;
    console.log(titleName);

    pictures[i].classList.add("chosen");

    for (let x = 0; x < topRow.length; x++) {
      //console.log(topRow[x]);
      let curr = topRow[x];
      let delay = x * 200;
      delay = delay * 0.001;
      curr.style.transform = "translate3d(0%, 0%, 0px)";
      curr.style.animationDelay = `${delay}s`;
      curr.classList.add("glow", "animate");
    }

    const bEndIndex = bottomRow.length - 1;
    const checker = bEndIndex * 200;
    for (let y = bEndIndex; y >= 0; y--) {
      console.log(bottomRow[y], y);
      let curr = bottomRow[y];
      // 4 * 200
      let delay = y * -200 + checker;
      delay = delay * 0.001;
      curr.style.transform = "translate3d(0%, 0%, 0px)";
      curr.style.animationDelay = `${delay}s`;
      curr.classList.add("glow", "animate");
    }
  });
}

//pictures.forEach(());

/*
if (pictures) {
  pictures.forEach((picture) => {
    pictures.addEventListener("click", function (e) {
      console.log("click");
    });
  });
}*/
