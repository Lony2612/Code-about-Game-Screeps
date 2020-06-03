/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.collector');
 * mod.thing == 'a thing'; // true
 */
function random(min, max) {
 
  return Math.floor(Math.random() * (max - min)) + min;
 
}

var roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.collecting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.collecting = true;
            creep.say('🔄 collecte');
        }
        if(creep.memory.collecting && creep.store.getFreeCapacity() == 0) {
            creep.memory.collecting = false;
            //creep.say('🚧 transfer');
        }
        
        if(creep.memory.collecting) {
            
            // const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            // if(target) {
            //     if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(target);
            //     }
            // }
            
            var drops = creep.room.find(FIND_DROPPED_RESOURCES);
            if(drops) {
                chosen = 0//random(0,drops.length)
                if(creep.pickup(drops[chosen]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(drops[chosen]);
                }
            }
            
        }
        
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleCollector;