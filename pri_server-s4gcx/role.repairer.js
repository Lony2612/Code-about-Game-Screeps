/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            //creep.say('🔄 harvest');
        }
        
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            //creep.say('🚧 repair');
        }
        
        if(creep.memory.repairing) {
            
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.hits < 0.6 * structure.hitsMax) &&
                    (structure.structureType != STRUCTURE_WALL)
                    }
            });

            targets.sort((a,b) => a.hits - b.hits);
            
            if(targets.length > 0) {
                if(creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            
            let roomName = creep.room.name;
            
            if(roomName == 'E8S1') {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
                
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
            if(roomName == 'E9S1') {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
                
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
        }
        
    }
};

module.exports = roleRepairer;