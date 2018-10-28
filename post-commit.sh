#!/bin/sh

# Get tag of last commit.
tag_name=$(git tag -l --points-at HEAD)
echo $tag_name

# If tag is not set, use nightly.
if [ "$tag_name" == "" ]
then
  echo $(git tag -f nightly)
fi
