/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.soldier');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        const roomName = creep.room.name;
        // console.log(roomName);
        // 如果该房间不存在就先往房间走
        if (roomName != 'E7S1') {
            creep.moveTo(new RoomPosition(17, 29, 'E7S1'))
        }
        
        // 如果房间存在了就说明已经进入了该房间
        const enermy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    
        if(enermy) {
            if(creep.attack(enermy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enermy);
            }
        }
        
        if(creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }
        
    }
};