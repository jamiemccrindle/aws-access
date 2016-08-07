#!/usr/bin/env node

var AWS = require('aws-sdk');
var Promise = require('bluebird');
var request = require('request-promise');

var argv = require('yargs')
  .usage('access')
  .alias('p', 'profile')
  .alias('g', 'group')
  .alias('r', 'region')
  .alias('P', 'ports')
  .array('P')
  .demand(['p', 'g'])
  .default('r', 'us-east-1')
  .default('P', ['22'])
  .help('h')
  .argv;


var options = argv.profile ? {profile: argv.profile} : {};
var credentials = new AWS.SharedIniFileCredentials(options);
AWS.config.update({region: argv.region});
AWS.config.credentials = credentials;

var ec2 = Promise.promisifyAll(new AWS.EC2());

var ip;
var groupId;

request('https://wtfismyip.com/text')
  .then(function (result) {
  ip = result.trim();
  console.log('using ip ' + ip);
  return ec2.describeSecurityGroupsAsync({
    GroupNames: [argv.group]
  })
}).then(function (data) {
  if (!data['SecurityGroups']) {
    return Promise.reject("No security groups found with name " + argv.group)
  }
  if (data['SecurityGroups'].length != 1) {
    return Promise.reject("Should only be 1 security group but was " + data['SecurityGroups'].length)
  }
  var group = data['SecurityGroups'][0];
  groupId = group.GroupId;
  console.log('found group ' + groupId);
  var ipPermissions = group.IpPermissions.map(function(permission) {
    var result = {};
    Object.keys(permission).forEach(function(key) {
      if(permission[key]) {
        if(Array.isArray(permission[key])) {
          if(permission[key].length > 0) {
            result[key] = permission[key];
          }
        } else {
          result[key] = permission[key];
        }
      }
    });
    return result;
  });
  return ec2.revokeSecurityGroupIngressAsync({
    GroupId: groupId,
    IpPermissions: ipPermissions
  })
}).then(function () {
  return ec2.authorizeSecurityGroupIngressAsync({
    GroupId: groupId,
    IpPermissions: argv.ports.map(function (port) {
      var p = parseInt(port);
      return {
        IpRanges: [
          {CidrIp: ip + '/32'}
        ],
        FromPort: p,
        ToPort: p,
        IpProtocol: 'tcp'
      }
    })
  });
}).then(function () {
  console.log('updated group ' + groupId + ' to ip ' + ip + '/32 and ports ' + argv.ports);
  process.exit(0);
}).error(function (error) {
  console.log(error.stack);
  process.exit(1);
});
