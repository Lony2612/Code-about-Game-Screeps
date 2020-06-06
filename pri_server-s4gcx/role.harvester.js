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
        
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            // creep.say('🔄 load');
        }
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = false;
            //creep.say('🚧 transfer');
        }
        
        if(creep.memory.harvesting) {
            //var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.id != '5ed765bf12b05a0963f2b3df' &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            
            
            // let linkFrom = Game.getObjectById('5eda0946c0e847095c5a32c2');
            // if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(linkFrom, {visualizePathStyle: {stroke: '#ffffff'}});
            // }
            // if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_FULL) {
            //     var targets = creep.room.find(FIND_STRUCTURES, {
            //         filter: (structure) => {
            //             return (structure.structureType == STRUCTURE_CONTAINER) &&
            //                 structure.store.getCapacity(RESOURCE_ENERGY) > 0;
            //         }
            //     });
                
            //     if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
                
            // }
        }
        
        
    }
};

module.exports = roleHarvester;