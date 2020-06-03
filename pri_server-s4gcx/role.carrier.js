/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.carrier');
 * mod.thing == 'a thing'; // true
 */

function random(min, max) {
 
  return Math.floor(Math.random() * (max - min)) + min;
 
}

var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.loading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.loading = true;
            creep.say('🔄 load');
        }
        if(creep.memory.loading && creep.store.getFreeCapacity() == 0) {
            creep.memory.loading = false;
            //creep.say('🚧 transfer');
        }
        
        // find transfer target
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN 
                || structure.structureType == STRUCTURE_EXTENSION 
                || structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        
        if(creep.memory.loading) {
            
            if (targets.length > 0){
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
            // work as a collector when idle
            else {
                var drops = creep.room.find(FIND_DROPPED_RESOURCES);
                if(drops) {
                    chosen = random(0,drops.length)
                    if(creep.pickup(drops[chosen]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(drops[chosen]);
                    }
                }
            }
            
        }
        
        else {
            
            if(targets.length > 0) {
                
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            
            // work as a collector when idle
            else {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                
                if(containers.length > 0) {
                    if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            
        }
    }
};

module.exports = roleCarrier;