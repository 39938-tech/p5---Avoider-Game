/* VARIABLES */
let avoider1, avoider2, avoider3;
let player;
let gameWon = false;

/* PRELOAD LOADS FILES */
function preload() {

}

/* SETUP RUNS ONCE */
function setup() {
    createCanvas(400, 400);

    // Create the player
    player = {
        x: 200,
        y: 20,
        size: 30,
        speed: 3
    };

    // Create the avoiders
    avoider1 = {
        x: 10,
        y: 100,
        w: 120,
        h: 20,
        speed: 3,
        color: "green"
    };

    avoider2 = {
        x: -100,
        y: 200,
        w: 80,
        h: 20,
        speed: 5,
        color: "blue"
    };

    avoider3 = {
        x: -100,
        y: 300,
        w: 180,
        h: 20,
        speed: 2,
        color: "purple"
    };
}

/* DRAW LOOP REPEATS */
function draw() {
    background(137, 213, 210);

    // Stop game if player wins
    if (gameWon) {
        youWin();
        return;
    }

    // STEP 1: Program player movement
    // TODO: Add LEFT_ARROW movement
    if (keyIsDown(LEFT_ARROW)) {
      player.x -= player.speed;
    }
    // TODO: Add RIGHT_ARROW movement
    if (keyIsDown(RIGHT_ARROW)) {
      player.x += player.speed;
    }
    // TODO: Add UP_ARROW movement
    if (keyIsDown(UP_ARROW)) {
      player.y -= player.speed;
    }
    // TODO: Add DOWN_ARROW movement
    if (keyIsDown(DOWN_ARROW)) {
      player.y += player.speed;
    }


    // STEP 2: Keep player inside boundaries
    // TODO: Use constrain() for horizontal movement
    player.x = constrain(player.x, player.size / 2, 400 - player.size / 2);
    // TODO: Use max() to prevent moving above screen
    player.y = max(player.y, player.size / 2);


    // STEP 3: Move the avoiders
    // TODO: Increase each avoider's x-coordinate
    avoider1.x += avoider1.speed;
    avoider2.x += avoider2.speed;
    avoider3.x += avoider3.speed;


    // STEP 4: Reset avoiders when they leave screen
    // TODO: Check avoider1
    if (avoider1.x > 400 + avoider1.w / 2) {
      avoider1.x = -avoider1.w / 2;
    }
    // TODO: Check avoider2
    if (avoider2.x > 400 + avoider2.w / 2) {
      avoider2.x = -avoider2.w / 2;
    }
    // TODO: Check avoider3
    if (avoider3.x > 400 + avoider3.w / 2) {
      avoider3.x = -avoider3.w / 2;
    }


    // STEP 5: Check collisions
    // TODO: Call checkCollision() for all three avoiders
    if (checkCollision(player, avoider1) || checkCollision(player, avoider2) || checkCollision(player, avoider3)) {

      // TODO: If a collision occurs, reset player to (200, 20)
      player.x = 200;
      player.y = 20;
    }
    

    // STEP 6: Check if player reached bottom
    // TODO: Check the bottom edge of the player
    if (player.y + player.size / 2 >= 400) {
      // TODO: Set gameWon to true
      gameWon = true;

      // TODO: Call youWin() and return
      youWin();
      return;
    }
    

    // Draw player
    fill("black");
    noStroke();
    circle(player.x, player.y, player.size);

    // Draw avoiders
    rectMode(CENTER);

    fill(avoider1.color);
    rect(avoider1.x, avoider1.y, avoider1.w, avoider1.h);

    fill(avoider2.color);
    rect(avoider2.x, avoider2.y, avoider2.w, avoider2.h);

    fill(avoider3.color);
    rect(avoider3.x, avoider3.y, avoider3.w, avoider3.h);
}

/* COLLISION DETECTION */
/* COLLISION DETECTION */
function checkCollision(p, a) {

  // Find the closest X point on the rectangle
  let closestX = constrain(p.x, a.x - a.w / 2, a.x + a.w / 2);

  // Find the closest Y point on the rectangle
  let closestY = constrain(p.y, a.y - a.h / 2, a.y + a.h / 2);

  // Calculate distanceX and distanceY
  let distanceX = p.x - closestX;
  let distanceY = p.y - closestY;

  // Calculate the distance
  let distance = sqrt(distanceX * distanceX + distanceY * distanceY);

  // Return the circle-versus-rectangle collision result
  return distance < p.size / 2;
}

/* WIN FUNCTION */
function youWin() {
    background(137, 213, 210);

    fill(0, 128, 128);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("You win!", 200, 200);
}