import { Component, HostListener, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as uuid from "uuid";
import { Subscription } from 'rxjs';
import { EndpointApiService } from '../zelda-api.service';

import { FacingDirection, Enemy, randomIntFromInterval } from './gameUtils'

interface SpritesInterface {
  "w": HTMLImageElement;
  ".": HTMLImageElement;
  "1": HTMLImageElement;
  "1u": HTMLImageElement;
  "1l": HTMLImageElement;
  "1r": HTMLImageElement;
  "1dead": HTMLImageElement;
  "g": HTMLImageElement;
  "+": HTMLImageElement;
  "A": HTMLImageElement;
  "Ar1": HTMLImageElement;
  "Ar2": HTMLImageElement;
  "Al1": HTMLImageElement;
  "Al2": HTMLImageElement;
  "Au1": HTMLImageElement;
  "Au2": HTMLImageElement;
  "s1": HTMLImageElement;
  "s2": HTMLImageElement;
}

interface Playtrace {
  actions: Array<string>;
  levels: Array<Array<Array<string>>>;
}

// sprites is a variable that contains all
// images as HTMLImageElements
declare var sprites: SpritesInterface;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  zeldaSubs: Subscription;
  originalLevel: Array<Array<string>>;
  level: Array<Array<string>>;
  nRows: number;
  nColumns: number;
  tileSize: number;
  scalingFactor: number;
  canvas: HTMLCanvasElement;
  UI: HTMLCanvasElement;
  playerDied: boolean;
  playerHasKey: boolean;
  playerWon: boolean;
  movementCounter: number;
  playerDirection: FacingDirection;
  avatar: string;
  enemies: Array<Enemy>;
  currentBehavior: Array<number>;
  playtrace: Playtrace;
  sessionID: string;
  message: string;
  windowWidth: number;
  windowHeight: number;
  canvasContainer: HTMLDivElement;
  timeServed: number;
  timeEnded: number;
  curriculum: Array<any>;
  experiment: string;
  loadingNextLevel: boolean;

  constructor(private zeldaApi: EndpointApiService) {}

  ngOnInit() {
    // Initializing stuff
    this.message = "Welcome to the game!"
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.tileSize = 20;
    this.computeScaleSize();
    this.canvas = <HTMLCanvasElement>document.getElementById("scene");
    this.sessionID = uuid.v4();
    this.loadingNextLevel = false;
    let flag = randomIntFromInterval(0, 3);
    // let flag = 0;
    switch (flag) {
      case 0:
        this.experiment = "bayesian"
        break;
      
      case 1:
        this.experiment = "random"
        break;
      
      case 2:
        this.experiment = "baseline"
        break;
    
      default:
        this.experiment = "bayesian"
        break;
    }
    console.log(`Going for ${this.experiment}`)
    this.curriculum = [
      [[
        ["w", "w", "w", "w", "w", "w", "w"],
        ["w", "A", ".", ".", ".", ".", "w"],
        ["w", ".", ".", ".", ".", ".", "w"],
        ["w", ".", ".", "+", ".", ".", "w"],
        ["w", ".", ".", ".", ".", ".", "w"],
        ["w", ".", ".", ".", ".", "g", "w"],
        ["w", "w", "w", "w", "w", "w", "w"]
      ], "Use the arrow keys to move."],
      [[
        ["w", "w", "w", "w", "w", "w", "w"],
        ["w", "A", ".", "+", ".", "g", "w"],
        ["w", "w", "w", "w", "w", "w", "w"],
        ["w", ".", ".", ".", ".", ".", "w"],
        ["w", ".", ".", ".", ".", ".", "w"],
        ["w", ".", "1", ".", "1", ".", "w"],
        ["w", ".", ".", ".", ".", ".", "w"],
        ["w", "w", "w", "w", "w", "w", "w"]
      ], "Ghosts move when you move."],
      [[
        ["w", "w", "w", "w", "w", "w", "w"],
        ["w", "A", ".", ".", ".", "1", "w"],
        ["w", "w", "w", "w", "w", ".", "w"],
        ["w", "w", "w", "w", "w", ".", "w"],
        ["w", "w", "w", "+", ".", ".", "w"],
        ["w", "w", "w", "w", "w", ".", "w"],
        ["w", "w", "w", "w", "w", ".", "w"],
        ["w", "g", ".", ".", ".", "1", "w"],
        ["w", "w", "w", "w", "w", "w", "w"]
      ], "Press space to kill a ghost."]
    ].reverse()
    console.log(`Session ID: ${this.sessionID}`)
    this.queryNewLevel();
  }

  computeScaleSize() {
    console.log(`current sizes: ${this.windowWidth}x${this.windowHeight}`)
    let levelWidth = this.nColumns * this.tileSize;
    let levelHeight = this.nRows * this.tileSize;
    let vScale = this.windowHeight / levelHeight;
    let hScale = this.windowWidth / levelWidth;
    let scalingFactor = Math.min(vScale, hScale);
    this.scalingFactor = Math.min(scalingFactor-0.15, 3.5);
  }

  renderLevel() {
    let ctx = this.canvas.getContext("2d");
    // ctx.imageSmoothingEnabled = false;
    
    // Clear previous level
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Define specs of new level
    let spriteSize = this.tileSize * this.scalingFactor;
    this.canvas.height = this.level.length * spriteSize;
    this.canvas.width = this.level[0].length * spriteSize;
    ctx.scale(this.scalingFactor, this.scalingFactor);

    for (let j = 0; j < this.level.length; j++) {
      const r = this.level[j];
      for (let i = 0; i < r.length; i++) {
          // console.log(this.level[j][i]);
          ctx.drawImage(sprites["."],
            this.tileSize*i,
            this.tileSize*j);

          ctx.drawImage(
            sprites[this.level[j][i]],
            this.tileSize*i,
            this.tileSize*j);
      }
    }
  }

  getCurrentAvatarPos() {
    let i = this.level.findIndex(r => r.includes(this.avatar));
    let j = this.level[i].findIndex(char => char == this.avatar);
    let pos = [i, j];

    return pos
  }

  moveAvatar(direction) {
    // Check if we're facing the direction we want to move
    let [i, j] = this.getCurrentAvatarPos();
    let movingUp = ["ArrowUp", "w"].includes(direction);
    let movingDown = ["ArrowDown", "s"].includes(direction);
    let movingLeft = ["ArrowLeft", "a"].includes(direction);
    let movingRight = ["ArrowRight", "d"].includes(direction);

    if (movingUp && (this.playerDirection != FacingDirection.Up)) {
      this.playerDirection = FacingDirection.Up
      this.avatar = "Au1"
      this.level[i][j] = this.avatar;
      return null;
    }

    if (movingDown && (this.playerDirection != FacingDirection.Down)) {
      this.playerDirection = FacingDirection.Down;
      this.avatar = "A"
      this.level[i][j] = this.avatar;
      return null;
    }

    if (movingLeft && (this.playerDirection != FacingDirection.Left)) {
      this.playerDirection = FacingDirection.Left;
      switch (this.avatar) {
        case "Al1":
          this.avatar = "Al2"
          break;
      
        default:
          this.avatar = "Al1"
          break;
      }
      this.level[i][j] = this.avatar;
      return null;
    }

    if (movingRight && (this.playerDirection != FacingDirection.Right)) {
      this.playerDirection = FacingDirection.Right;
      this.avatar = "Ar1";
      this.level[i][j] = this.avatar;
      return null;
    }

    // If we are moving in the right direction...
    let [new_i, new_j] = [i, j];
    if (movingUp) {
        switch (this.avatar) {
          case "Au1":
            this.avatar = "Au2"
            break;
        
          default:
            this.avatar = "Au1"
            break;
        }
        this.level[i][j] = this.avatar
        new_i -= 1;
    }
    if (movingDown) {
        new_i += 1;
    }
    if (movingRight) {
        switch (this.avatar) {
          case "Ar1":
            // console.log("Going for Ar2")
            this.avatar = "Ar2"
            break;
        
          default:
            this.avatar = "Ar1"
            break;
        }
        this.level[i][j] = this.avatar;
        new_j += 1;
    }
    if (movingLeft) {
        switch (this.avatar) {
          case "Al1":
            this.avatar = "Al2"
            break;
        
          default:
            this.avatar = "Al1"
            break;
        }
        this.level[i][j] = this.avatar;
        new_j -= 1;
    }

    // at this point, (new_i, new_j) is the new avatar position
    // TODO: move this to the 
    // the player bounces, so they stand still.
    if (this.level[new_i][new_j] == "w") {
      new_i = i;
      new_j = j;
      return null;
    }

    // check for collisions with enemies.
    if (["1", "1u", "1l", "1r"].includes(this.level[new_i][new_j])) {
      this.playerDied = true
      this.message = "You died. Press space."
      // TODO: render the enemy killing the avatar.
      this.level[i][j] = "."
      this.timeEnded = new Date().getTime();
      return null;
    }

    // grabbing the key
    if (this.level[new_i][new_j] == "+") {
      this.playerHasKey = true;
      this.level[new_i][new_j] = this.avatar;
      this.level[i][j] = ".";
    }

    // getting to the door
    if (this.level[new_i][new_j] == "g") {
      if (this.playerHasKey) {
        this.playerWon = true
        this.message = "You won! Press enter or space."
        this.level[i][j] = "."
        this.timeEnded = new Date().getTime();
      }
    }

    if (this.level[new_i][new_j] == ".") {
      this.level[new_i][new_j] = this.avatar;
      this.level[i][j] = ".";
      
      return null;
    }
  }

  innerMoveEnemy(enemy: Enemy) {
    let [i, j] = enemy.position;
    let [newi, newj] = enemy.move();
    // in awe that [i, j] == [newi, newj] evaluates to false.
    if (JSON.stringify([i, j]) == JSON.stringify([newi, newj])) {
      this.level[newi][newj] = enemy.avatar;
    }
    if ([i, j] != [newi, newj]) {
      // console.log(`Moving enemy at ${[i,j]} to ${[newi,newj]}`)
      if ([".", "s1"].includes(this.level[newi][newj])) {
        // then just move.
        this.level[i][j] = ".";
        this.level[newi][newj] = enemy.avatar;
        enemy.position = [newi, newj];
      }
      
      if (this.level[newi][newj] == this.avatar) {
        // move and kill.
        this.level[i][j] = ".";
        this.level[newi][newj] = enemy.avatar;
        enemy.position = [newi, newj];
        this.playerDied = true;
        this.timeEnded = new Date().getTime();
        this.message = "You died. Press enter or space."
      }
    }
  }

  moveEnemies() {
    // console.log(`enemies: ${this.enemies}`)
    this.enemies.forEach(enemy => this.innerMoveEnemy(enemy));
    
    return null;
  }

  // prepareLevelForDB() {
  //   let intermediate = this.originalLevel.map(e => e.join(""))
  //   let final = `${intermediate.join('')};${this.level.length}x${this.level[0].length}`
  //   return final
  // }

  consolidateData() {
    console.log("Sending data to database")
    console.log(`It took the player: ${(this.timeEnded - this.timeServed)/1000} seconds`)

    // Sends a POST to a backend database
    // saving level info and amount of events.

    // this If prevents POSTing the onboarding levels.
    if (this.currentBehavior != null) {
      console.log("sending trial to database.")
      this.zeldaApi.saveTrial(
        this.sessionID,
        this.experiment,
        this.originalLevel, 
        this.currentBehavior,
        (this.timeEnded - this.timeServed)/1000,
        this.playerWon
      ).subscribe();
      
      // Remember to also post the playtrace.
      console.log("sending playtraces to database.")
      this.zeldaApi.savePlaytrace(
        this.sessionID,
        this.experiment,
        this.playtrace.levels,
        this.playtrace.actions
      ).subscribe();
    }

  }

  queryNewLevel() {
    // TODO: get the new level from the Python backend.
    if (this.curriculum.length > 0) {
      let [level, message] = this.curriculum.pop()
      this.startNewLevel(level, null, message)
    }
    else {
      this.zeldaSubs = this.zeldaApi
        .getNewLevel(this.sessionID, this.experiment)
        .subscribe(res => {
            this.startNewLevel(res.next_level, res.behavior, "Run!")
          },
          console.error
        );
    }
  }

  initializeEnemies() {
    // This function grabs a new level
    // and starts keeping track of all enemies and their basic AI.
    for (let i = 0; i < this.level.length; i++) {
      const r = this.level[i];
      for (let j = 0; j < r.length; j++) {
        if (r[j] == "1") {
          let newEnemy = new Enemy([i, j], 0.5, 0.3);
          this.enemies.push(newEnemy)

          this.level[i][j] = newEnemy.avatar;
        }
      }
    }

    // console.log(`Initialized enemies: ${this.enemies}`)
  }

  startNewLevel(level: Array<Array<string>>, behavior: Array<number>, message: string) {
    console.log("Starting new level")

    // Reset everything.
    // this.getNewLevel();
    this.message = message;
    
    this.level = level;
    // Deep copy for db.
    this.originalLevel = JSON.parse(JSON.stringify(level));
    this.currentBehavior = behavior;
    // console.log(`level after getNewLevel: ${this.level}`)
    this.playtrace = {
      "actions": [],
      "levels": []
    }
    this.nRows = this.level.length;
    this.nColumns = this.level[0].length;
    this.playerDied = false;
    this.playerHasKey = false;
    this.playerWon = false;
    this.movementCounter = 0;
    this.playerDirection = FacingDirection.Down;
    this.avatar = "A";
    this.enemies = [];
    this.loadingNextLevel = false;
    this.initializeEnemies();
    this.computeScaleSize();
    this.renderLevel();

    this.timeServed = new Date().getTime();
    console.log(`Level served at ${this.timeServed}.`)
  }

  killEnemy(pos: Array<number>) {
    let index: number
    for (let e = 0; e < this.enemies.length; e++) {
      let enemy = this.enemies[e];
      if (JSON.stringify(enemy.position) == JSON.stringify(pos)) {
        index = e;
        break;
      }
    }
    if (index != this.enemies.length - 1) {
      this.enemies.splice(index, 1)
    }
    else {
      let e = this.enemies.pop()
    }
  }

  useSword() {
    let [i, j] = this.getCurrentAvatarPos();
    let [facing_i, facing_j] = [i, j];
    switch (this.playerDirection) {
      case FacingDirection.Right:
        facing_j += 1
        break;

      case FacingDirection.Left:
        facing_j -= 1
        break;
        
      case FacingDirection.Down:
        facing_i += 1
        break;

      case FacingDirection.Up:
        facing_i -= 1
        break;
      }
      
      if (["1", "1l", "1u", "1r"].includes(this.level[facing_i][facing_j])) {
        // removing enemy from the list.
        this.killEnemy([facing_i, facing_j])
        this.level[facing_i][facing_j] = "s1";
      }

      if (!["w", "+", "g"].includes(this.level[facing_i][facing_j])) {
        this.level[facing_i][facing_j] = "s1";
      }
  }

  logMove(key) {
    // An absolute hack to deep-copy the current level
    let copiedLevel: Array<Array<string>> = JSON.parse(JSON.stringify(this.level))
    this.playtrace.actions.push(key);
    this.playtrace.levels.push(copiedLevel);
  }

  cleanLevel() {
    this.level.map((row, i) => {
      row.map((s, j) => {
        if (s == "s1") {
         this.level[i][j] = "."
        }
      })
    })
  }

  gameLoop(event) {
    let actions = [
      "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
      "w", "a", "s", "d", " "
    ]
    // console.log(`current avatar: ${this.avatar}`)
    // console.log(JSON.stringify(this.level))
    this.cleanLevel();
    if (actions.includes(event.key)) {
      this.movementCounter += 1;
      this.moveAvatar(event.key);
      if (event.key == " ") {
        this.useSword();
      }
      this.moveEnemies();
      this.renderLevel();
      this.logMove(event.key);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent) {
    let gameEnded = (this.playerDied || this.playerWon);
    if (!gameEnded) {
      this.gameLoop(event);
    }
    else {
      if ((event.key == "Enter" || event.key == " ") && !this.loadingNextLevel) {
        this.loadingNextLevel = true
        this.message = "Loading next level..."
        // if (this.playerWon) {
        //   this.behaviors.push(this.currentBehavior)
        //   this.times.push(this.movementCounter)
        // }
        
        // Send time, behavior and playtrace to the db.
        this.consolidateData();

        // Start a new level.
        this.queryNewLevel();
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(`Resizing: ${event}`)
    // this.canvasContainer = <HTMLDivElement>document.getElementById("canvasContainer");
    // this.windowWidth = this.canvasContainer.offsetWidth;
    // this.windowHeight = this.canvasContainer.offsetHeight;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.computeScaleSize();
    this.renderLevel();
  }
}
