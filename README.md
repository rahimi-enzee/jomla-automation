# Automation framework for jomla with playwright (WIP)

## What's cover for now

1. login page
2. staff directory page

- search member by name.
- add and delete member to department from staff directory.
- click and view staff profile from staff directory.

## Prerequisite

1. Node, this playwright use Typescript as main language.

## How's To

Clone this repository:

```
git clone https://github.com/rahimi-enzee/jomla-automation.git
```

Install dependencies:

```
npm install
```

To run full test:

```
npx playwright test
```

To run test based on file:

```
npx playwright test tests/<testFileName>
```

**NOTE** change <testFileName> to the file that you want to test. **END**

To run certain test based on test name:

```
npx playwright test -g "test name"
```

**NOTE**: Test name can be found inside tests folder, go into any file, then look into test("test name") **END**

To run test in debug mode, where we can control the flow, use `--debug` argument, eg:

```
npx playwright test --debug //OR
npx playwright test -g "Search Member by name" --debug
```

To run test with allure report:

```
./run.sh <testname>
```

**NOTE**: Change testname with the test file name, eg: `tests/dashboardTest.spec.ts`.
