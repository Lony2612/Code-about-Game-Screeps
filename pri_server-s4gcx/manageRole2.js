/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manageRole2');
 * mod.thing == 'a thing'; // true
 */

// require('config');

var roomNameSpawn = {'E8S1':'Spawn1', 'E9S1':'Spawn2'};
var roomNames = ['E8S1', 'E9S1'];
var roleNames = ['harvester', 'builder', 'carrier', 'claimer', 'collector', 'defender', 
    'remotebuilder', 'remotetransporter', 'remoteupgrader', 'repairer', 'soldier', 'transporter',
    'upgrader', 'wall_maintainer', 'scout', 'remoteharvester', 'remoterepairer', 'miner'];
const roomNameValue = {'E8S1':1, 'E9S1':2};

const numberOfRole = {
    'harvester': {
        'E8S1': 2, 'E9S1': 2
    }, 
    'builder': {
        'E8S1': 2, 'E9S1': 2
    }, 
    'carrier': {
        'E8S1': 3, 'E9S1': 2
    }, 
    'claimer': {
        'E8S1': 0, 'E9S1': 0
    }, 
    'collector': {
        'E8S1': 1, 'E9S1': 0
    }, 
    'defender': {
        'E8S1': 0, 'E9S1': 0
    }, 
    'remotebuilder': {
        'E8S1': 0, 'E9S1': 0
    }, 
    'remotetransporter': {
        'E8S1': 0, 'E9S1': 0
    }, 
    'remoteupgrader': {
        'E8S1': 0, 'E9S1': 0
    }, 
    'repairer': {
        'E8S1': 2, 'E9S1': 2
    }, 
    'soldier': {
        'E8S1': 0, 'E9S1': 0
    }, 
    'transporter': {
        'E8S1': 1, 'E9S1': 0
    },
    'upgrader': {
        'E8S1': 1, 'E9S1': 2
    }, 
    'wall_maintainer': {
        'E8S1': 1, 'E9S1': 0
    },
    'scout': {
        'E8S1': 0, 'E9S1': 0
    },
    'remoteharvester': {
        'E8S1': 0, 'E9S1': 0
    },
    'remoterepairer': {
        'E8S1': 0, 'E9S1': 0
    },
    'miner': {
        'E8S1': 1, 'E9S1': 0
    }
}

const partOfRole = {
    'harvester': {
        'E8S1': [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]
    }, 
    'builder': {
        'E8S1': [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [WORK,CARRY,CARRY,MOVE,MOVE]
    }, 
    'carrier': {
        'E8S1': [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
        // 'E8S1': [CARRY,CARRY,MOVE,MOVE], 
        // 'E8S1': [CARRY,MOVE], 
        'E9S1': [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
    }, 
    'claimer': {
        'E8S1': [CLAIM,CLAIM,MOVE,MOVE], 
        'E9S1': [CLAIM,MOVE]
    }, 
    'collector': {
        'E8S1': [CARRY,CARRY,CARRY,CARRY,MOVE], 
        'E9S1': [CARRY,CARRY,MOVE,MOVE]
    }, 
    'defender': {
        'E8S1': [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK], 
        'E9S1': [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK]
    }, 
    'remotebuilder': {
        'E8S1': [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
    }, 
    'remotetransporter': {
        'E8S1': [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [CARRY,CARRY,MOVE,MOVE]
    }, 
    'remoteupgrader': {
        'E8S1': [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
    }, 
    'repairer': {
        'E8S1': [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]
    }, 
    'soldier': {
        'E8S1': [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL], 
        'E9S1': [TOUGH,ATTACK,MOVE,MOVE]
    }, 
    'transporter': {
        'E8S1': [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
    },
    'upgrader': {
        'E8S1': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
    }, 
    'wall_maintainer': {
        'E8S1': [WORK,CARRY,CARRY,CARRY,MOVE,MOVE], 
        'E9S1': [WORK,CARRY,MOVE,MOVE]
    },
    'scout': {
        'E8S1': [MOVE], 
        'E9S1': [MOVE]
    },
    'remoteharvester': {
        'E8S1': [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [MOVE]
    },
    'remoterepairer': {
        'E8S1': [WORK,WORK,CARRY,CARRY,MOVE,MOVE], 
        'E9S1': [MOVE]
    },
    'miner': {
        'E8S1': [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
        'E9S1': [MOVE]
    }
}

module.exports = {
    /** @param {None} none **/
    run: function() {
        
        for(let i = 0; i < 2; i++) {
            roomName = roomNames[i];
            nameValue = roomNameValue[roomName];
            spawnName = roomNameSpawn[roomName];
            
            let typeOfRole = roleNames.length;
            
            for(let j = 0; j < typeOfRole; j++) {
                
                let roleName = roleNames[j];
                let numberOfRoleInRoom = numberOfRole[roleName][roomName];
                
                let partOfRoleInRoom = partOfRole[roleName][roomName]; //[WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
                
                var populatioins = _.filter(Game.creeps, (creep) => (creep.memory.role == roleName) && (creep.memory.birthRoom == nameValue));
                
                if(populatioins.length < numberOfRoleInRoom) {
                    var newName = roleName + Game.time;
                    Game.spawns[spawnName].spawnCreep(partOfRoleInRoom, newName, {memory: {role: roleName, birthRoom: nameValue}});        
                }
            }
            
        }
        
    }
};