//key binding

let keyInfo = {
  /*'{code}' : {
        isPressed: false,
        action: '{actionName}'
    }
    */
  KeyA: {
    isPressed: false,
    action: "move_left",
  },
  KeyD: {
    isPressed: false,
    action: "move_right",
  },
  KeyW: {
    isPressed: false,
    action: "move_up",
  },
  KeyS: {
    isPressed: false,
    action: "move_down",
  },
};

export function getAllKeys() {
  return keyInfo;
}

export function changeKeyStatus(key, status) {
  keyInfo[key].isPressed = status;
}

export function addNewKey(key, action) {
  if (keyInfo.hasOwnProperty(key)) return "Such key already exists";
  else {
    keyInfo[key] = {
      isPressed: false,
      action,
    };
    return "Successfully added";
  }
}
