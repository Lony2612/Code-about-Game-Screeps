/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.collector');
 * mod.thing == 'a thing'; // true
 */
function random(min, max) {
 
  return Math.floor(Math.random() * (max - min)) + min;
 
}

var roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(!creep.memory.collecting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.collecting = true;
            //creep.say('🔄 collecte');
        }
        if(creep.memory.collecting && creep.store.getFreeCapacity() == 0) {
            creep.memory.collecting = false;
            //creep.say('🚧 transfer');
        }
        
        if(creep.memory.collecting) {
            
            let linkTo = Game.getObjectById('5eda082f42f75d094f32b918');
            
            if(linkTo.store.getCapacity(RESOURCE_ENERGY) > 0) {
                if(creep.withdraw(linkTo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(linkTo, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        
        else {
            
            let target = Game.getObjectById('5ed84c5142f75d094f325fb4');
            
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            
        }
    }
};

module.exports = roleCollector;