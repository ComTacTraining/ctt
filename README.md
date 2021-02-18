# Command Tactical Training

First run of serverless:
On Linux / Mac:
`export AWS_PROFILE="profileName"`
`serverless`

On Windows:
`set AWS_SDK_LOAD_CONFIG=1`
`set AWS_PROFILE="profileName"`
`npx serverless`

Check `.serverless/` directory into repo (used by GitHub Workflows).
Attempting to use S3 as the directory.

After update via Amplify Admin UI run `amplify pull` and `amplify codegen`
