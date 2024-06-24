#!/bin/bash

read -p "Enter your GitHub username or email: " github_name_email
read -p "Enter your GitHub username: " github_username
read -p "Enter your GitHub repository name: " github_repo_name

git log --author="$github_name_email" | grep ^commit | sed "s/commit /https:\/\/github.com\/$github_username\/$github_repo_name\/commit\//"