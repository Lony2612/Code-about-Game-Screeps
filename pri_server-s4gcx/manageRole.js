/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manageRole');
 * mod.thing == 'a thing'; // true
 */

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCarrier  = require('role.carrier');
var roleDefender = require('role.defender');
var roleCollector = require('role.collector');
var roleWallmaintainer = require('role.wall_maintainer')
var roleTransporter = require('role.transporter')

var spawnNames = ['Spawn1', 'Spawn2'];

var manageRole = {

    /** @param {None} none **/
    run: function() {
        
        // var energySpawn = 0;
        // spawnAndExtension = 
        
        // check the number of harvester //
        var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester') && (creep.room.name == 'E8S1'));
        //console.log('Harvesters: ' + harvesters.length);
    
        if(harvesters.length < 2) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'harvester'}});        
        }
        
        // check the number of harvester in room2 //
        var harvester2s = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester') && (creep.room.name == 'E9S1') );
        //console.log('Harvesters: ' + harvesters.length);
    
        if(harvester2s.length < 2) {
            var newName = 'Harvester2' + Game.time;
            console.log('Spawning new harvester2: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'harvester'}});        
        }
        
        // check the number of carrier //
        var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    
        if(carriers.length < 2) {
            var newName = 'carrier' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'carrier'}});        
        }
        
        // check the number of carrier in room2 //
        var carrier2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier2');
    
        if(carrier2s.length < 2) {
            var newName = 'carrier2' + Game.time;
            Game.spawns['Spawn2'].spawnCreep([CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'carrier2'}});        
        }
        
        // check the number of collector //
        var collectors = _.filter(Game.creeps, (creep) => creep.memory.role == 'collector');
    
        if(collectors.length < 1) {
            var newName = 'collector' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'collector'}});        
        }
        
        // check the number of transporter //
        var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
    
        if(transporters.length < 1) {
            var newName = 'transporter' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'transporter'}});        
        }
        
        // check the number of upgrader //
        var upgraders = _.filter(Game.creeps, (creep) => (creep.memory.role == 'upgrader') && (creep.room.name == 'E8S1'));
        //console.log('Harvesters: ' + harvesters.length);
    
        if(upgraders.length < 1) {
            var newName = 'upgrader' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgrader'}});        
        }
        
        // check the number of upgrader in room2 //
        var upgrader2s = _.filter(Game.creeps, (creep) => (creep.memory.role == 'upgrader') && (creep.room.name == 'E9S1'));
        //console.log('Harvesters: ' + harvesters.length);
    
        if(upgrader2s.length < 2) {
            var newName = 'upgrader2' + Game.time;
            //console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'upgrader'}});        
        }
        
        // check the number of builder //
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        //console.log('Harvesters: ' + harvesters.length);
    
        if(builders.length < 1) {
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
        var repairer2s = _.filter(Game.creeps, (creep) => (creep.memory.role == 'repairer') && (creep.room.name == 'E9S1'));
    
        if(repairer2s.length < 1) {
            var newName = 'repairer2' + Game.time;
            Game.spawns['Spawn2'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'repairer'}});        
        }
        
        // check the number of repairer //
        var wall_maintainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wall_maintainer');
    
        if(wall_maintainers.length < 1) {
            var newName = 'wall_maintainer' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'wall_maintainer'}});        
        }
        
        // // check the number of repairer //
        // var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    
        // if(claimers.length < 1) {
        //     var newName = 'claimer' + Game.time;
        //     Game.spawns['Spawn1'].spawnCreep([CLAIM,CLAIM,MOVE,MOVE], newName,
        //         {memory: {role: 'claimer'}});        
        // }
        
        // check the number of repairer //
        var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    
        if(soldiers.length < 1) {
            var newName = 'soldier' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'soldier'}});        
        }
        
        // check the number of remotebuilder //
        var remotebuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remotebuilder');
    
        if(remotebuilders.length < 0) {
            var newName = 'remotebuilder' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'remotebuilder'}});        
        }
        
        // check the number of remotebuilder //
        var remoteupgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteupgrader');
    
        if(remoteupgraders.length < 1) {
            var newName = 'remoteupgrader' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'remoteupgrader'}});        
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