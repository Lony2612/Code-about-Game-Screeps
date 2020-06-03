/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.defender');
 * mod.thing == 'a thing'; // true
 */

var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        const enermy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if(enermy) {
            if(creep.attack(enermy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enermy);
            }
        }
    }
};

module.exports = roleDefender;