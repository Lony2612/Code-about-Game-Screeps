/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.remotetransporter');
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
        
        let emergency = Game.rooms['E7S1'].find(FIND_HOSTILE_CREEPS).length > 0;
        
        if(emergency) {
            creep.moveTo(Game.flags.AwayFromInvader);
        }
        else {
            if(creep.memory.loading) {
                const room = creep.room.name;
                if (room != 'E7S1') {
                    creep.moveTo(new RoomPosition(5, 23, 'E7S1'));
                }
                else {
                    let drops = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                    if(drops) {
                        if(creep.pickup(drops) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(drops);
                        }
                    }
                    
                    var src = creep.room.find(FIND_STRUCTURES,  {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store[RESOURCE_ENERGY] > 0;
                    }});
                    
                    if(creep.withdraw(src[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(src[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
            else {
                let dst = Game.getObjectById('5ed84c5142f75d094f325fb4');
                if(dst.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    if(creep.transfer(dst, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dst, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};