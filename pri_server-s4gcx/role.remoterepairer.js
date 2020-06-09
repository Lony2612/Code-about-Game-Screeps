/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.remoterepairer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
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
        
        let emergency = false;//Game.rooms['E7S1'].find(FIND_HOSTILE_CREEPS).length > 0;
        
        if(emergency) {
            creep.moveTo(Game.flags.AwayFromInvader);
        }
        else {
            if(creep.memory.repairing) {
                let roomName = creep.room.name;
                if(roomName == 'E7S1') {
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
                    
                    // const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    //     filter: (structure) => {
                    //         return (structure.hits < 0.6 * structure.hitsMax) &&
                    //         (structure.structureType != STRUCTURE_WALL)
                    //         }
                    // });
        
                    // if(target) {
                    //     if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //         creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    //     }
                    // }
                    
                }
                else {
                    creep.moveTo(new RoomPosition(5, 23, 'E7S1'));
                }
            }
            else {
                let tgt = Game.getObjectById('5ed84c5142f75d094f325fb4');
                
                if(creep.withdraw(tgt, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tgt, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};