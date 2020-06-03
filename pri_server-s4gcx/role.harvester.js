/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
function random(min, max) {
 
  return Math.floor(Math.random() * (max - min)) + min;
 
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        
    }
};

module.exports = roleHarvester;