/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('runRole');
 * mod.thing == 'a thing'; // true
 */

var roles = {
    'harvester': require('role.harvester'),
    'builder': require('role.builder'),
    'upgrader': require('role.upgrader'),
    'repairer': require('role.repairer'),
    'carrier': require('role.carrier'),
    'defender': require('role.defender'),
    'collector': require('role.collector'),
    'wall_maintainer': require('role.wall_maintainer'),
    'transporter': require('role.transporter'),
    
    'remotebuilder': require('role.remotebuilder'),
    'soldier': require('role.soldier'),
    'claimer': require('role.claimer'),
    'remoteupgrader': require('role.remoteupgrader'),
    'scout': require('role.scout'),
    'remoteharvester': require('role.remoteharvester'),
    'remotetransporter': require('role.remotetransporter'),
    'remoterepairer': require('role.remoterepairer')
};

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            let roleName = creep.memory.role;
            roles[roleName].run(creep);
        }
        
    }
};