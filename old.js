const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const startX = canvas.width / 2;
const startY = canvas.height / 2;

class Picture {
  constructor() {
    const image = new Image();
    let pictureFileName = `./Images/matera.jpg`;
    image.src = "./Images/matera.jpg";

    image.onload = () => {
      const scale = 0.25; //1000 x 1400
      this.image = image;
      this.width = image.width; //250
      this.height = image.height; //350

      console.log(this.width, this.height);
    };

    this.position = {
      x: startX - 131.25 / 2,
      y: startY - 350 / 2,
    };
  }

  /*

drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
FROM SOURCE
sx - subrectangle x -> think startX of image
sx - subrectangle y -> think startY of image 
sWidth - subrectangle width
sHeight - subrectangle height

TO CANVAS
dx - destinationX
dy - destination y
drawImage 
    */
  // 15 x 40 aspect ratio is goal
  draw() {
    context.drawImage(
      this.image,
      370,
      300,
      131.25,
      350,
      this.position.x,
      this.position.y,
      131.25,
      350
    );
  }

  update() {
    if (this.image) {
      this.draw();
    }
  }
}

const picture = new Picture();

function animate() {
  requestAnimationFrame(animate);

  context.fillStyle = "transparent";
  context.fillRect(0, 0, canvas.width, canvas.height);

  picture.update();
}

animate();


function(t) {
  const i = _A;
  R.Is.def(t) && "n0" === t.target.id && "out" === i.mode && (location.href = "/"), i.mode = "out", this.gMax();
  const s = i.data.modeOut();
  this.pSet(this.pTarg, s), this.color.targ = this.colorBase, i.nav.color({
    default: !0
  }), i.pgn.up(), i.fx.title({
    a: "hide",
    d: 500,
    delay: 0,
    r: !1
  }), i.fx.info({
    a: "hide",
    d: 500,
    delay: 0
  }), i.fx.explore({
    a: "hide",
    d: 500,
    delay: 0
  }), i.pgnX.hideCurr({
    r: !1,
    out: !0
  })
}




function(t) {
  const i = "mouseenter" === t.type ? "arrow" : "cross";
  this.morph({
    d: 700,
    e: "o5",
    shape: i
  })
}