export default (prevState, action) => {
  switch (action) {
    case 'ROLL_DICE':
      return {
        ...prevState,
        rolls: prevState.rolls + 1,
        dice_state: 'rolling',
      };

    case 'STOP_DICE':
      return {
        ...prevState,
        dice_state: 'pause',
      };
  
    default:
      return prevState;
  }
}