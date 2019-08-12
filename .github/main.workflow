workflow "Publish" {
  on = "push"
  resolves = [
    "Deploy",
    "On Develop",
  ]
}

action "Install" {
  uses = "./.github/actions/node"
  args = "install"
  runs = "yarn"
}

action "Lint" {
  uses = "./.github/actions/node"
  needs = ["Install"]
  args = "lint"
  runs = "yarn"
}

action "On Develop" {
  uses = "actions/bin/filter@25b7b846d5027eac3315b50a8055ea675e2abd89"
  needs = ["Lint"]
  args = "branch develop"
}

action "Build" {
  uses = "./.github/actions/node"
  args = "build"
  needs = ["On Develop"]
  runs = "yarn"
}

action "Deploy" {
  uses = "./.github/actions/deploy"
  needs = ["Build"]
  secrets = ["PERSONAL_ACCESS_TOKEN"]
  env = {
    DIRECTORY = "public"
    USER = "Chris Shepherd <chris@chrisshepherd.me>"
  }
}
