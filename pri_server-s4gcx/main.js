// var roleHarvester = require('role.harvester');
// var roleUpgrader = require('role.upgrader');
// var roleBuilder = require('role.builder');
// var roleRepairer = require('role.repairer');
// var roleCarrier  = require('role.carrier');
// var roleDefender = require('role.defender');
// var roleCollector = require('role.collector');
// var roleWallmaintainer = require('role.wall_maintainer')
// var roleTransporter = require('role.transporter')

// var roleRemoteBuilder = require('role.remotebuilder')
// var roleSoldier = require('role.soldier')
// var roleClaimer = require('role.claimer')
// var roleCarrier2 = require('role.carrier2')
// var roleRemoteUpgrader = require('role.remoteupgrader')
// var roleScout = require('role.scout')

var manageRole = require('manageRole2')
var runRole = require('runRole')

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    manageRole.run()
    
    // tower
    var towers = Game.rooms['E8S1'].find(
        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
    if(towers) {
        
        var closestHostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            towers.forEach(tower => tower.attack(closestHostile));
        }
        
        // else {
        //     var closestDamagedStructure = towers[0].pos.findClosestByRange(FIND_STRUCTURES, {
        //         filter: (structure) => structure.hits < structure.hitsMax
        //     });
            
        //     if(closestDamagedStructure) {
        //         towers.forEach(tower => tower.repair(closestDamagedStructure));
        //     }
        // }
    }
    
    // tower
    var towers = Game.rooms['E9S1'].find(
        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
    if(towers) {
        
        var closestHostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            towers.forEach(tower => tower.attack(closestHostile));
        }
        
        // else {
        //     var closestDamagedStructure = towers[0].pos.findClosestByRange(FIND_STRUCTURES, {
        //         filter: (structure) => structure.hits < structure.hitsMax
        //     });
            
        //     if(closestDamagedStructure) {
        //         towers.forEach(tower => tower.repair(closestDamagedStructure));
        //     }
        // }
    }
    
    // link
    let linkTo = Game.getObjectById('5eda082f42f75d094f32b918');
    let linkFrom = Game.getObjectById('5eda0946c0e847095c5a32c2');
    
    if(linkTo && linkFrom) {
        // console.log('exist', linkFrom.store.getFreeCapacity(RESOURCE_ENERGY));
        if(linkFrom.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            linkFrom.transferEnergy(linkTo);
        }
    }

    runRole.run();    

    // for(var name in Game.creeps) {
    //     var creep = Game.creeps[name];
    //     if(creep.memory.role == 'harvester') {
    //         roleHarvester.run(creep);
    //     }
    //     if(creep.memory.role == 'upgrader') {
    //         roleUpgrader.run(creep);
    //     }
    //     if(creep.memory.role == 'builder') {
    //         roleBuilder.run(creep);
    //     }
    //     if(creep.memory.role == 'repairer') {
    //         roleRepairer.run(creep);
    //     }
    //     if(creep.memory.role == 'carrier') {
    //         roleCarrier.run(creep);
    //     }
    //     if(creep.memory.role == 'carrier2') {
    //         roleCarrier2.run(creep);
    //     }
    //     if(creep.memory.role == 'defender') {
    //         roleDefender.run(creep);
    //     }
    //     if(creep.memory.role == 'collector') {
    //         roleCollector.run(creep);
    //     }
    //     if(creep.memory.role == 'wall_maintainer') {
    //         roleWallmaintainer.run(creep);
    //     }
    //     if(creep.memory.role == 'transporter') {
    //         roleTransporter.run(creep);
    //     }
        
    //     if(creep.memory.role == 'remotebuilder') {
    //         roleRemoteBuilder.run(creep);
    //     }
    //     if(creep.memory.role == 'claimer') {
    //         roleClaimer.run(creep);
    //     }
    //     if(creep.memory.role == 'soldier') {
    //         roleSoldier.run(creep);
    //     }
    //     if(creep.memory.role == 'remoteupgrader') {
    //         roleRemoteUpgrader.run(creep);
    //     }
    //     if(creep.memory.role == 'scout') {
    //         roleScout.run(creep);
    //     }
    // }
}