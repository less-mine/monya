function createError(errorName){
  const e=(message)=> {
    this.message = message;
    const last_part = new Error().stack.match(/[^\s]+$/);
    this.stack = `${this.name} at ${last_part}`;
  }
  Object.setPrototypeOf(e, Error);
  e.prototype = Object.create(Error.prototype);
  e.prototype.name = errorName;
  e.prototype.message = "";
  e.prototype.constructor = e;
  return e
}


exports.NoSolutionError=createError("NoSolutionError")
exports.LabelNotFoundError=createError("LabelNotFoundError")
