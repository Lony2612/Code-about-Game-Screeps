/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            //creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            
            /* repaire when idle */
            else {
                
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < 0.6 * structure.hitsMax) &&
                        (structure.structureType != STRUCTURE_WALL)
                        }
                });
                //targets.sort((a,b) => a.hits - b.hits);
                
                if(targets.length > 0) {
                    if(creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            
            // const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            // if(target) {
            //     if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(target);
            //     }
            // }
            
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getCapacity(RESOURCE_ENERGY) > 10;
                }
            });
            
            if(creep.withdraw(containers[3], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[3], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
            
            // var sources = creep.room.find(FIND_SOURCES);
            // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
            
        }
    }
};

module.exports = roleBuilder;