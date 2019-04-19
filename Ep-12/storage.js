/**
 * Made by Monkey#8028
 * JSON as persistent storage example module
 * Queues the writeFile operation
 *  - Way less data corruption
 *  - No sync I/O used
 *   - No unnecessary eventloop blocking
 * Usage example: https://hasteb.in/gewajaho.js
 */

const { writeFile } = require('fs');

module.exports = (path, onError) =>{
  const data = require(path);
  let queue = Promise.resolve();

  const write = () => {
    queue = queue.then(() => new Promise(res =>
      writeFile(path, JSON.stringify(data, null, 2), err => {
        if(!err) return res();
        if(onError) return onError(err);
        throw err;
      })
    ))
  }

  return new Proxy(data, {
    set: (obj, prop, value) => {
      obj[prop] = value;
      write();
    }
  })
}
