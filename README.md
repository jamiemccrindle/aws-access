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

    # enable access to SSH and Postgres from the current IP
    aws-access -p myprofile -g mysecuritygroup -r us-east-1 eu-west-1 -P 22 5432

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

## Security Considerations

* It's likely that a users IP will be stale over time, potentially allowing access to the AWS resources from unexpected IPs. This is still better than allowing access from the whole internet (i.e. 0.0.0.0/0) but this should be part of a defense in depth i.e. resources that are made accessible via aws-access should also be properly secured.
* Removing old users from the security group managed by aws-access should be part of any offboarding process
* If a user is renamed, their old username should be cleaned from the security group managed by aws-access
* If this is used for multiple users, any of the users have the ability to modify rules set up by other users

