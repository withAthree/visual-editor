const isFunction = (fn) => {
  return fn && typeof fn === 'function';
};

export default class MouseEvent {
  #leftKeyDownFn = () => {};
  #rightKeyDownFn = () => {};
  #middleKeyDownFn = () => {};
  #leftKeyUpFn = () => {};
  #rightKeyUpFn = () => {};
  #middleKeyUpFn = () => {};
  #move = () => {};
  #wheel = () => {};

  down(e) {
    if (e.button === 0) {
      this.#leftKeyDownFn(e);
    }
    else if (e.button === 1) {
      this.#middleKeyDownFn(e);
    }
    else if (e.button === 2) {
      this.#rightKeyDownFn(e);
    }
  }

  up(e) {
    if (e.button === 0) {
      this.#leftKeyUpFn(e);
    }
    else if (e.button === 1) {
      this.#middleKeyUpFn(e);
    }
    else if (e.button === 2) {
      this.#rightKeyUpFn(e);
    }
  }

  wheel(e) {
    this.#wheel(e);
  }

  move(e) {
    this.#move(e);
  }

  setLeftKeyDownFn(fn) {
    if (isFunction(fn)) {
      this.#leftKeyDownFn = fn;
    }
  }

  setRightKeyDownFn(fn) {
    if (isFunction(fn)) {
      this.#rightKeyDownFn = fn;
    }
  }

  setMiddleKeyDownFn(fn) {
    if (isFunction(fn)) {
      this.#middleKeyDownFn = fn;
    }
  }

  setLeftKeyUpFn(fn) {
    if (isFunction(fn)) {
      this.#leftKeyUpFn = fn;
    }
  }

  setRightKeyUpFn(fn) {
    if (isFunction(fn)) {
      this.#rightKeyUpFn = fn;
    }
  }

  setMiddleKeyUpFn(fn) {
    if (isFunction(fn)) {
      this.#middleKeyUpFn = fn;
    }
  }

  setMove(fn) {
    if (isFunction(fn)) {
      this.#move = fn;
    }
  }

  setWheel(fn) {
    if (isFunction(fn)) {
      this.#wheel = fn;
    }
  }
}
