# Access

## Prerequisites

* nodejs 4.2+
* aws credentials file in ~/.aws/credentials

## AWS Setup

aws-access works by updating an AWS security group with your current ip. You'll
need to create this group and attach it whichever resources you need to access.

## Installing

    npm install -g aws-access

## Command Line

    access

    Options:
      -h             Show help                                             [boolean]
      -p, --profile                                                       [required]
      -g, --group                                                         [required]
      -r, --region                                            [default: "us-east-1"]
      -P, --ports                                          [array] [default: ["22"]]

## Example

    access -p myprofile -g mysecuritygroup
