/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manageRole');
 * mod.thing == 'a thing'; // true
 */

var manageRole = {

    /** @param {None} none **/
    run: function() {
        
        // check the number of harvester //
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        //console.log('Harvesters: ' + harvesters.length);
    
        if(harvesters.length < 2) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'harvester'}});        
        }
        
        // check the number of carrier //
        var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    
        if(carriers.length < 3) {
            var newName = 'carrier' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'carrier'}});        
        }
        
        // check the number of collector //
        var collectors = _.filter(Game.creeps, (creep) => creep.memory.role == 'collector');
    
        if(collectors.length < 3) {
            var newName = 'collector' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'collector'}});        
        }
        
        // check the number of upgrader //
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        //console.log('Harvesters: ' + harvesters.length);
    
        if(upgraders.length < 1) {
            var newName = 'upgrader' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgrader'}});        
        }
        
        // check the number of builder //
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        //console.log('Harvesters: ' + harvesters.length);
    
        if(builders.length < 2) {
            var newName = 'builder' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'builder'}});        
        }
        
        // check the number of repairer //
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
        if(repairers.length < 1) {
            var newName = 'repairer' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'repairer'}});        
        }
        
        // check the number of repairer //
        var wall_maintainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wall_maintainer');
    
        if(wall_maintainers.length < 1) {
            var newName = 'wall_maintainer' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'wall_maintainer'}});        
        }
        
        // // check the number of defender //
        // var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    
        // if(defenders.length < 0) {
        //     var newName = 'defender' + Game.time;
        //     //console.log('Spawning new upgrader: ' + newName);
        //     Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK], newName,
        //         {memory: {role: 'defender'}});        
        // }
        
    }
};

module.exports = manageRole;