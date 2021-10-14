const os = require('os');
const path = require('path');
const fs = require('fs');

const core = require('@actions/core');
const tc = require('@actions/tool-cache');

async function downloadCLI(url) {
  core.debug(`Downloading tfsec CLI from ${url}`);
  const pathToCLI = await tc.downloadTool(url,`${process.env.RUNNER_TEMP}`+'/tfsec_tmpdir/tfsec');
  core.debug(`tfsec CLI path is ${pathToCLI}.`);

  fs.chmod(pathToCLI,'0755',()=>{});
  
  if (!pathToCLI) {
    throw new Error(`Unable to download tfsec from ${url}`);
  }

  return pathToCLI;
}

async function run() {
  try {
    const inputVersion = core.getInput('tfsec_version');

    core.debug(`Getting download URL for tfsec version ${inputVersion}`);
    const url = `https://github.com/aquasecurity/tfsec/releases/download/${inputVersion}/tfsec-linux-amd64`;

    const pathToCLI = await downloadCLI(url);
    core.addPath(`${process.env.RUNNER_TEMP}`+'/tfsec_tmpdir/');
    core.debug(`PATH=${process.env.PATH}`);
    // const matchersPath = path.join(__dirname, '..', '.github');
    // core.info(`##[add-matcher]${path.join(matchersPath, 'matchers.json')}`);

    return inputVersion;
  } catch (ex) {
    core.error(ex);
    throw ex;
  }
}

module.exports = run;
