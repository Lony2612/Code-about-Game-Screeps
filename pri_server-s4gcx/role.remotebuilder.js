/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.remotebuilder');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            //creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            // creep.say('🚧 build');
        }

        if(creep.memory.building) {
            
            const room = creep.room.name;
            // 如果该房间不存在就先往房间走
            if (room != 'E7S1') {
                creep.moveTo(new RoomPosition(5, 23, 'E7S1'));
            }
            else {
                var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(targets) {
                    // console.log(creep.build(targets));
                    if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                
                // const tgt = Game.getObjectById('5edbba793a737d001b6cd1ba');
                
                // if(tgt) {
                //     if(creep.build(tgt) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(tgt)
                //     }
                // }
            }
            
        }
        else {
            
            var containers = Game.rooms['E8S1'].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getCapacity(RESOURCE_ENERGY) > 10;
                }
            });
            
            if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};