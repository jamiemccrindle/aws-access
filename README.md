# Access

## Prerequisites

* nodejs 4.2+
* aws credentials file in ~/.aws/credentials

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
