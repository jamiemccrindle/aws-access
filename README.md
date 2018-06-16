# AWS Access

aws-access is a command line utility to update an AWS security group 
with your current IP across one or more regions.

This is a relatively cheap way to lock down access to AWS resources to whitelisted ips.

To use:

* Step 1: Create security group for whitelisted ips e.g. 'remote-working'
* Step 2: Assign security group to appropriate resources
* Step 3: Install aws-access `npm install -g aws-access`
* Step 4: [Set up aws credentials](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html)
* Step 5: Run aws-access to whitelist your current ip e.g. `aws-access -g remote-working`

## Example

    aws-access -p myprofile -g mysecuritygroup -r us-east-1 eu-west-1

## Installing

    npm install -g aws-access

## AWS Setup

aws-access works by updating an AWS security group with your current ip. You'll
need to create this group and attach it whichever resources you need to access.

You'll also need your aws credentials set up either in ~/.aws/credentials or
using environment variables.

## Prerequisites

* nodejs 7.6+
* aws credentials file in ~/.aws/credentials

## Command Line

    aws-access

    Options:
      -h             Show help                                             [boolean]
      -p, --profile                                                       [optional]
      -g, --group                                                         [required]
      -r, --region                                            [default: "us-east-1"]
      -P, --ports                                          [array] [default: ["22"]]

## Example

    aws-access -p myprofile -g mysecuritygroup
