/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.remoteharvester');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
        }
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = false;
            //creep.say('🚧 transfer');
        }
        const room = creep.room.name;
        // 如果该房间不存在就先往房间走
        if (room != 'E7S1') {
            creep.moveTo(new RoomPosition(5, 23, 'E7S1'));
        }
        
        let emergency = false;//Game.rooms['E7S1'].find(FIND_HOSTILE_CREEPS).length > 0;
        if(emergency) {
            creep.moveTo(Game.flags.AwayFromInvader);
        }
        else {
            if(creep.memory.harvesting) {
                const room = creep.room.name;
                // 如果该房间不存在就先往房间走
                if (room != 'E7S1') {
                    creep.moveTo(new RoomPosition(5, 23, 'E7S1'));
                }
                else {
                    var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                    
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
            else {
                let target = Game.getObjectById('5edf1c102fbfc309555956a4');
                
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
            }
        }
    }
};