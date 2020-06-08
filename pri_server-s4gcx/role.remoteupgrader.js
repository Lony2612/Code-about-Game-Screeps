/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.remoteupgrader');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            //creep.say('🔄 harvest');
        }
        
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            //creep.say('🚧 upgrade');
        }
        
        if(creep.memory.upgrading) {
            
            const room = Game.rooms['E9S1'];
            // 如果该房间不存在就先往房间走
            if (!room) {
                creep.moveTo(new RoomPosition(5, 23, 'E9S1'));
            }
            else {
                if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(room.controller);
                }
            }
            
        }
        else {
            
            var containers = Game.rooms['E8S1'].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            
            if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        }
        
    }
};