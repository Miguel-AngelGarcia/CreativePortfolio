sliderContainer.addEventListener("touchstart", function (e) {
  //slider.dataset.toughScrollAt = e.clientX;
  slider.dataset.userTouchAt = e.touches[0].clientx;
});

sliderContainer.addEventListener("ontouchmove", function (e) {
  //slider.dataset.userTouchAt = e.clientX;
  console.log(pictureSelected, e.touches[0].target);
  if (exploreLock) return;

  if (pictureSelected && e.touches.target === pictureSelectedImage) {
    console.log(e.target.localName);
    return;
  }

  if (
    pictureSelected &&
    e.touches.target.localName === "img" &&
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

  console.log(e.touches[0]);

  let touchX = e.touches[0].clientx;
  let touchXDelta = parseFloat(slider.dataset.userTouchAt) - touchX;
  const maxDelta = window.innerWidth / 2;

  let workingX = parseFloat(touchX) / parseFloat(Math.abs(e.deltaX));

  const percentage = (touchXDelta / maxDelta) * -100;
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
