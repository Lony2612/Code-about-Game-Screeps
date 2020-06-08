/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.carrier');
 * mod.thing == 'a thing'; // true
 */

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
        
        if(creep.memory.loading) {
            
            let roomName = creep.room.name;
            
            if(roomName == 'E8S1') {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
                
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
            if(roomName == 'E9S1') {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store[RESOURCE_ENERGY] > 0;
                    }
                });
                
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
        }
        
        else {
            
            // // find transfer target
            // var targets = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (structure.structureType == STRUCTURE_SPAWN 
            //         || structure.structureType == STRUCTURE_EXTENSION 
            //         || structure.structureType == STRUCTURE_TOWER) &&
            //             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            //     }
            // });
            
            // if(targets.length > 0) {
            //     // console.log(creep.transfer(targets[0], RESOURCE_ENERGY));
            //     if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
            let roomName = creep.room.name;
            
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN 
                    || structure.structureType == STRUCTURE_EXTENSION 
                    || structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if(roomName == 'E8S1') {
                if(target) {
                    // console.log(creep.transfer(targets[0], RESOURCE_ENERGY));
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                
                else {
                    let update_container = Game.getObjectById('5ed765bf12b05a0963f2b3df');
                
                    if(update_container.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                        if(creep.transfer(update_container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(update_container, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
            
            if(roomName == 'E9S1') {
                if(target) {
                    // console.log(creep.transfer(targets[0], RESOURCE_ENERGY));
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            
        }
    }
};

module.exports = roleCarrier;