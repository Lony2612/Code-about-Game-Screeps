
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCarrier  = require('role.carrier');
var roleDefender = require('role.defender');
var roleCollector = require('role.collector');
var roleWallmaintainer = require('role.wall_maintainer')

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // check the number of harvester //
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});        
    }
    
    // check the number of carrier //
    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');

    if(carriers.length < 3) {
        var newName = 'carrier' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'carrier'}});        
    }
    
    // check the number of collector //
    var collectors = _.filter(Game.creeps, (creep) => creep.memory.role == 'collector');

    if(collectors.length < 3) {
        var newName = 'collector' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'collector'}});        
    }
    
    // check the number of upgrader //
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Harvesters: ' + harvesters.length);

    if(upgraders.length < 2) {
        var newName = 'upgrader' + Game.time;
        //console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
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
    
    
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    
    // var towers = Game.rooms['E8S1'].find(
    //     FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
    // if(towers) {
        
    //     var closestHostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         towers.forEach(tower => tower.attack(closestHostile));
    //     }
        
        // else {
        //     var closestDamagedStructure = towers[0].pos.findClosestByRange(FIND_STRUCTURES, {
        //         filter: (structure) => structure.hits < structure.hitsMax
        //     });
            
        //     if(closestDamagedStructure) {
        //         towers.forEach(tower => tower.repair(closestDamagedStructure));
        //     }
        // }

        

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'collector') {
            roleCollector.run(creep);
        }
        if(creep.memory.role == 'wall_maintainer') {
            roleWallmaintainer.run(creep);
        }
    }
}