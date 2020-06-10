/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.mining && creep.store[RESOURCE_LEMERGIUM] == 0) {
            creep.memory.mining = true;
            // creep.say('🔄 load');
        }
        if(creep.memory.mining && creep.store.getFreeCapacity(RESOURCE_LEMERGIUM) == 0) {
            creep.memory.mining = false;
            //creep.say('🚧 transfer');
        }
        
        if(creep.memory.mining) {
            let source = Game.getObjectById('4cf047eaaa4a1e6');
            // var source = creep.pos.findClosestByRange(RESOURCE_LEMERGIUM);
            // console.log(source);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getFreeCapacity(RESOURCE_LEMERGIUM) > 0;
                }
            });
            
            if(creep.transfer(target, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        
        
    }
};