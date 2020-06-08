/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.carrier2');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
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
            
            // var sources = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (structure.structureType == STRUCTURE_CONTAINER) && 
            //             structure.id != '5ed765bf12b05a0963f2b3df' &&
            //             structure.store[RESOURCE_ENERGY] > 0;
            //     }
            // });
            
            // let len = sources.length 
            // var idx = 0;
            
            // for(let i=0;i<len;i++) {
            //     let source = sources[i]
            //     if(source.id != '5ed765bf12b05a0963f2b3df') {
            //         console.log(source.id);
            //         idx = i;
            //         break;
            //     }
            // }
            
            var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            // var source = sources[idx];
            
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        }
        
        else {
            
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_TOWER) && 
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};