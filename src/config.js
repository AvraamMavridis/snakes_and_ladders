export default {
  boardWidth: 560,
  boardHeight: 560,
  pausingFrames: {
    1: 48,
    2: 52,
    3: 96,
    4: 20,
    5: 60,
    6: 56,
  },
  // pausingFrames: {
  //   20: 4,
  //   25: 4,
  //   48: 1,
  //   52: 2,
  //   56: 6,
  //   60: 5,
  //   64: 1,
  //   68: 2,
  //   72: 6,
  //   76: 5,
  //   96: 3,
  //   112: 3,
  // },
  laddersPositions: {
    2: {
      position: 38,
      offsetX: 50,
      offsetY: -150, 
    },
    4: {
      position: 14,
      offsetX: 150,
      offsetY: -50, 
    },
    9: {
      position: 31,
      offsetX: 50,
      offsetY: -150, 
    },
    33: {
      position: 85,
      offsetX: -150,
      offsetY: -250, 
    },
    52: {
      position: 88,
      offsetX: -50,
      offsetY: -150, 
    },
    80: {
      position: 99,
      offsetX: 50,
      offsetY: -100, 
    },
  },
  snakePositions: {
    98: {
      position: 8,
      offsetX: 250,
      offsetY: 450, 
    },
    92:{
      position: 53,
      offsetX: -50,
      offsetY: 200, 
    },
    62: {
      position: 57,
      offsetX: 100,
      offsetY: 50, 
    },
    56: {
      position: 15,
      offsetX: 50,
      offsetY: 200, 
    },
    51: {
      position: 11,
      offsetX: 0,
      offsetY: 200, 
    },
  }
}
