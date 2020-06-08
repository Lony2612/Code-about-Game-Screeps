/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.scout');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        const roomName = creep.room.name;
        // console.log(roomName);
        // 如果该房间不存在就先往房间走
        creep.moveTo(Game.flags.Flag1);
        // if (roomName != 'E6S1') {
        //     creep.moveTo(new RoomPosition(17, 29, 'E6S1'))
        // }
    }
};