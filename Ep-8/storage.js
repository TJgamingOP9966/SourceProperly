/**
 * Made by Monkey#8028
 * JSON as persistent storage example module
 * Queues the writeFile operation
 *  - Way less data corruption due to queuing
 *  - No sync I/O used
 *   - No unnecessary eventloop blocking
 *
 * Make sure you have the storage.js module!
 */
 
 // All credits go to Monkey#8028 for this file.
 // Notes made for reference on how this file works.

const storage = require('./storage.js');
client.warns = storage(`${__dirname}/warnings.json`);

// Just modify client.warns like you always do
// Only you don't need to save it using writeFile
// Since that's already done for you!

// Add a warning
if(!client.warns[member.id]) {
  client.warns[member.id] = 0;
}
client.warns[member.id]++;

console.log(client.warns);

// Optionally specify how you would like to handle possible errors that occur
client.warns = storage(`${__dirname}/warnings.json`, err => {
  console.error('Whoops! An error occured while trying to save warnings.json\n', err);
})
