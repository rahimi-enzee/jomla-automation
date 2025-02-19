#!/bin/bash

# Exit immediately if a command fails
set -e

npx playwright test "$@"

allure generate allure-results/ -o allure-report/ --clean
allure open allure-report/
