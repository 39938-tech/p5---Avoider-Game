/* VARIABLES */
let avoider1, avoider2, avoider3, avoider4, avoider5;
let player;

let gameOver = false;

/* Player Lives */
let lives = 3;

/* Timer */
let startTime;
let elapsedTime = 0;

/* Collision */
let hitCooldownUntil = 0;

/* PRELOAD LOADS FILES */
function preload() {

}

/* SETUP RUNS ONCE */
function setup() {
    createCanvas(400, 400);

    // Create the player
    player = {
        x: 200,
        y: 200,
        size: 30,
        speed: 3
    };

    // Create the avoiders
    avoider1 = {
        x: 10,
        y: random(50, 350),
        w: 120,
        h: 20,
        speed: 6,
        color: "green"
    };

    avoider2 = {
        x: -100,
        y: random(50, 350),
        w: 80,
        h: 20,
        speed: 10,
        color: "blue"
    };

    avoider3 = {
        x: -100,
        y: random(50, 350),
        w: 180,
        h: 20,
        speed: 4,
        color: "purple"
    };
    
    avoider4 = {
        x: -100,
        y: random(50, 350),
        w: 180,
        h: 20,
        speed: 8,
        color: "pink"
    };

    avoider5 = {
        x: -100,
        y: random(50, 350),
        w: 180,
        h: 20,
        speed: 6,
        color: "red"
    };

    // Start the survival timer
    startTime = millis();
}

/* DRAW LOOP REPEATS */
function draw() {
    background(137, 213, 210);

    // Stop game if player loses
    if (gameOver) {
      youLose();
      return;
    }

    // Calculate survival time
    elapsedTime = floor((millis() - startTime) / 1000);

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
    player.y = constrain(player.y, player.size / 2, 400 - player.size / 2);


    // STEP 3: Move the avoiders
    // TODO: Increase each avoider's x-coordinate
    avoider1.x += avoider1.speed;
    avoider2.x += avoider2.speed;
    avoider3.x += avoider3.speed;
    avoider4.x += avoider4.speed;
    avoider5.x += avoider5.speed;


    // STEP 4: Reset avoiders when they leave screen
    // TODO: Check avoider1
    if (avoider1.x > 400 + avoider1.w / 2) {
      avoider1.x = -avoider1.w / 2;
      avoider1.y = random(50, 350);
    }
    // TODO: Check avoider2
    if (avoider2.x > 400 + avoider2.w / 2) {
      avoider2.x = -avoider2.w / 2;
      avoider2.y = random(50, 350);
    }
    // TODO: Check avoider3
    if (avoider3.x > 400 + avoider3.w / 2) {
      avoider3.x = -avoider3.w / 2;
      avoider3.y = random(50, 350);
    }
    // TODO: Check avoider4
    if (avoider4.x > 400 + avoider4.w / 2) {
      avoider4.x = -avoider4.w / 2;
      avoider4.y = random(50, 350);
    }
    // TODO: Check avoider5
    if (avoider5.x > 400 + avoider5.w / 2) {
      avoider5.x = -avoider5.w / 2;
      avoider5.y = random(50, 350);
    }

    
    // STEP 5: Check collisions
    if (millis() > hitCooldownUntil) {
      // TODO: Call checkCollision() for all three avoiders
        if (checkCollision(player, avoider1) ||
            checkCollision(player, avoider2) ||
            checkCollision(player, avoider3) ||
            checkCollision(player, avoider4) ||
            checkCollision(player, avoider5)) {

            // Remove one life
            lives--;

            // Give player 1 second of protection
            hitCooldownUntil = millis() + 1000;

            // Check if player has lost all lives
            if (lives <= 0) {
                gameOver = true;
            }
        }
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

    fill(avoider4.color);
    rect(avoider4.x, avoider4.y, avoider4.w, avoider4.h);

    fill(avoider5.color);
    rect(avoider5.x, avoider5.y, avoider5.w, avoider5.h);

    // Display lives and timer
    fill("black");
    textSize(18);
    textAlign(LEFT, TOP);

    text("Lives: " + lives, 10, 10);
    text("Time: " + elapsedTime + "s", 10, 35);
}

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

/* GAME OVER FUNCTION */
function youLose() {
    background(137, 213, 210);

    fill("red");
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Game Over!", 200, 170);

    fill("black");
    textSize(20);
    text("You survived " + elapsedTime + " seconds!", 200, 220);

    textSize(16);
    text("You ran out of lives.", 200, 260);
}