type Function = (...args: any[]) => void;

export default class MouseEvent {
  #leftKeyDownFn: Function = () => {};
  #rightKeyDownFn: Function = () => {};
  #middleKeyDownFn: Function = () => {};
  #leftKeyUpFn: Function = () => {};
  #rightKeyUpFn: Function = () => {};
  #middleKeyUpFn: Function = () => {};
  #move: Function = () => {};
  #wheel: Function = () => {};

  down(e: any) {
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

  up(e: any) {
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

  wheel(e: any) {
    this.#wheel(e);
  }

  move(e: any) {
    this.#move(e);
  }

  setLeftKeyDownFn(fn: Function) {
    this.#leftKeyDownFn = fn;
  }

  setRightKeyDownFn(fn: Function) {
    this.#rightKeyDownFn = fn;
  }

  setMiddleKeyDownFn(fn: Function) {
    this.#middleKeyDownFn = fn;
  }

  setLeftKeyUpFn(fn: Function) {
    this.#leftKeyUpFn = fn;
  }

  setRightKeyUpFn(fn: Function) {
    this.#rightKeyUpFn = fn;
  }

  setMiddleKeyUpFn(fn: Function) {
    this.#middleKeyUpFn = fn;
  }

  setMove(fn: Function) {
    this.#move = fn;
  }

  setWheel(fn: Function) {
    this.#wheel = fn;
  }
}
