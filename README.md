# AWS Access

aws-access is a command line utility to update an AWS security group 
with your current IP across one or more regions

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

* nodejs 4.2+
* aws credentials file in ~/.aws/credentials

## Command Line

    aws-access

    Options:
      -h             Show help                                             [boolean]
      -p, --profile                                                       [required]
      -g, --group                                                         [required]
      -r, --region                                            [default: "us-east-1"]
      -P, --ports                                          [array] [default: ["22"]]

## Example

    aws-access -p myprofile -g mysecuritygroup
