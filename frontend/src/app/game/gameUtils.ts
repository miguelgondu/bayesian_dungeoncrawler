enum FacingDirection {
  Up,
  Down,
  Left,
  Right
}

function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Enemy {
    position: Array<number>;
    avatar: string;
    direction: FacingDirection;
    probMovement: number;
    probDirection: number;
    currentlyMoving: boolean;
    constructor(position, probMovement=0.5, probDirection=0.3) {
      this.position = position
      this.direction = randomIntFromInterval(0, 3);
      switch (this.direction) {
        case FacingDirection.Up:
          this.avatar = "1u"
          break;
      
        case FacingDirection.Down:
          this.avatar = "1"
          break;
      
        case FacingDirection.Left:
          this.avatar = "1l"
          break;
      
        case FacingDirection.Right:
          this.avatar = "1r"
          break;
      }
      // console.log(`enemy avatar at pos ${this.position}: ${this.avatar} (${this.direction})`)
      this.probMovement = probMovement;
      this.probDirection = probDirection;
    }
  
    move(): Array<number> {
      // with 0.5
      let flag = Math.random();
      if (flag <= this.probDirection) {
        // changing direction.
        this.direction = randomIntFromInterval(0, 3);
        switch (this.direction) {
          case FacingDirection.Up:
            this.avatar = "1u"
            break;
        
          case FacingDirection.Down:
            this.avatar = "1"
            break;
        
          case FacingDirection.Left:
            this.avatar = "1l"
            break;
        
          case FacingDirection.Right:
            this.avatar = "1r"
            break;
        }
        // console.log(`Changing direction of enemy at ${this.position}: ${this.avatar} (${this.direction})`)
        return this.position
      }
      else if (flag > this.probDirection && flag <= this.probDirection + this.probMovement) {
        // Move.
        return this.innerMove();
      }
      else {
        return this.position
      }
    }
  
    innerMove() {
      let [newi, newj] = [...this.position];
      switch (this.direction) {
        case FacingDirection.Left:
          newj -= 1
          break;
        case FacingDirection.Right:
          newj += 1
          break;
        case FacingDirection.Down:
          newi += 1
          break;
        case FacingDirection.Up:
          newi -= 1
          break;
      }
      return [newi, newj]
    }
}

// TODO: add export.
export { Enemy, randomIntFromInterval, FacingDirection };